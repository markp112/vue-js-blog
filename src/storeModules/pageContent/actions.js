import dataClasses from '../../dataClasses/pageSection'

const LAYOUTS = "layouts/"
const DEFAULTS3CONTENTBUCKET="sparkzcmssites" // primary bucket in S3
const CONTENTFILENAME = "content.txt"        // default filename that holds text content




//creates the placeholders for each element within a layout
export const   createElements = ({state},number)=>{

    //console.log("--> createElements called",number)
   
    let elements=[]
         return new Promise(function(resolve,reject){
             
            try {
              //var elements = []
                for(var i = 0 ; i < number; i++){

                    let newElement = new dataClasses.element(i,dataClasses.types.undefined)
            
                    elements.push(newElement)
                
                }
                resolve(elements)
                }
                
                catch(err){
                    reject(err)
                }
        
    }
         )
}


// createLayout
// create the layout component and add it to layouts
// based on the template:
//  layout - layout to use
// elements the number of components making up this layout
//
export const createLayout = ({state,dispatch},template)=>{
    
    
      
    //layout.template = template     
     
  dispatch("createElements",template.elements)
  .then(elements=>{
    let layout = new dataClasses.Layout(template.layout,"",elements)
        
        // capture which row on the page this occupies e.g. if three different layouts had been added this 
        // would occupy the 3rd row if it had been added last, this is needed so we know when bringing back data
        // where this data should sit on the page that is contained within the layout
        
        layout.index = state.layouts.length
         
      
        //update the store with data about this element
        dispatch("addLayout", layout )
  })
.catch(err=>{
    console.log("###err", err)
})

       
}


// when a new layout is updated update it in the Layouts
export const updateLayouts = ({commit}, layoutComponent) => {
    
    console.log("--> updateLayouts",layoutComponent)

    commit("updateLayout", layoutComponent)

}

export const addLayout = ({commit}, layoutComponent) => {
    
    console.log("--> addLayout",layoutComponent)

    commit("addLayout", layoutComponent)
    //create an entry in contents to make it reactive
    commit("addContent",layoutComponent)

}
// when the content type of the element changes update the element
// expects an object- elementComponent containing the:
// element:new element content 
// index: the index of the layout where this component sits

export const updateElement = ({ commit, dispatch}, elementComponent) => {

    commit("updateElement", elementComponent)
    
    const contentData ={
        key:"###L" + elementComponent.index + "E" + elementComponent.element.number + "###",
        content : elementComponent.element.content
    }
    
    commit("updateContent",contentData)
    dispatch("setDirty")
}

//update the text for the element defined by the key in contentData 
// Key: key to the element to update
// content: text to store
export const updateContentText=({commit},contentData) =>{
    commit("updateContent",contentData)
}

export const setDirty = ({
    dispatch
}) => {
    console.log("setDirtyCalled")
    dispatch("updateDirtyFlag", true, {
        root: true
    })
}

//
// scan all the Layouts looking for isDirty being set on any of the elements
// where isDirty is true write the content out to AWS
// Expects userData which contains:
// userId
// siteId
// pageName
// item- fn returns userId + SiteId
// s3BucketName = returns name of the s3Bucket by combining - userId siteId and pagename
export const pageContent_saveContent = ({  state,  dispatch}, siteData) => {
   
    console.log("--> pageContent_saveContent Called", siteData)

    let layouts = []


    // represents each layout on the page

    return new Promise(function (resolve, reject) {

        for (let item of state.layouts) {

            let layout = new dataClasses.Layout(item.template, siteData.s3BucketName(), item.elements, item.index)
            
            layouts.push(layout)
        }

        //write layouts Record to Dynamodb
        const dataItems = {
            key: siteData.key(),
            subKey: LAYOUTS + siteData.pageName,
            data: layouts
        }

        dispatch("lambda_putDynamodb", dataItems, { root: true})
            .then(() => {

                //write text to S3
                const s3Data = {
                    s3BucketName: siteData.s3BucketName(),
                    content: JSON.stringify(state.Elementcontents),
                    fileName: CONTENTFILENAME
                }
                // write contents to text file
                dispatch("lambda_putcontentToS3", s3Data, {
                        root: true
                    })

                    .then(res => {
                        console.log("returned from wrting object", res)
                    })
            })


            .catch(err => {
                console.log("### lambda_putS3Object Error", err)
                reject(err)
            })
    })
}


////  pageContent_retrieveContent
// retrieve the current page Layouts and associated content, including text and images
// Expects the name of the Page we are retrieving content for
// this recreates the layout -- content needs to be added seperately
// this only retrieves the type of content but not the content itself
export const pageContent_retrieveContent = ({commit,getters,dispatch}, pageName)=>{
    
    console.log("--> pageContent_retrieveContent",pageName)

    const dataItems ={
        item: getters.userIdSiteId,
        subItem : LAYOUTS + pageName
    }

    return new Promise(function(resolve, reject){

        dispatch("LambdaGetData", dataItems,{root: true})
        .then(layout => {
      //console.log('pageContent_retrieveContent', layout)
            commit("setRetrievedLayouts",layout)

            commit("createEmptyContentPlaceholder")
            resolve()
        })
        .catch(err=>{
            reject (err)
        })

    })


}


// pageContent_retrieveTextContent 
// read the text file which contains the texxt content and populate the elements held in the layouts
//
export const pageContent_retrieveTextContent = async ({commit,getters, dispatch},pageName)=>{

        const dataItems ={
           s3BucketName : DEFAULTS3CONTENTBUCKET,
           key : "users/" + getters.userId + "/" + getters.getSiteId + "/" + pageName + "/" + CONTENTFILENAME

        }
       // Promise(function (resolve, reject){
           try{
                 let content = await dispatch("lambda_GetContentFromS3", dataItems)
            //.then( content => {
                 //add the text to the array               
                commit("addSavedContentToElementContents", content)
            //    resolve()

            //})
           }
           catch{err=>{
                console.log("### pageContent_retrieveTextContent Error ", err)
                return err
           }}
           // .catch(err=>{
              //  console.log("### pageContent_retrieveTextContent Error ", err)
               // reject (err)
            //})
        //})
        
}
/* 
export const parseContent = ({commit},content)=>{

  let index = content.indexOf("###L")

  while (index !== -1){

    //find the next three hashes these will be the end of our delimiter
        
        let contentStart = content.indexOf("###",index + 1)

        //find the next text block for an element
        let contentEnd = content.indexOf("###L",contentStart + 1 )

        if (contentEnd == -1){
            contentEnd == content.length
        }
        
        console.log(index, contentStart, contentEnd)

        let text = content.slice (contentStart + 8, contentEnd)

        let layoutEnd = content.indexOf("E",index ) 
        let layout =  content.slice(index+4, layoutEnd)

        let elementEnd = content.indexOf("#",layoutEnd)
        let element = content.slice(layoutEnd+1, elementEnd)

        console.log("text = ",text ,layout,element)
        
        let data = {
            element:element,
            layout: layout,
            content: text
        }
        
        commit("setElementText",data)

        index = content.indexOf("###L",elementEnd )
      

  }

} */