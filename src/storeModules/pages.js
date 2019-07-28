

const defaultstate = {
    
    // This holds a list of pages the user has created for their current site
    pageItems:[],

    currentPage:'',

    // this holds the data for the active page the user is working on
    pageData:[]

}

const mutations = {

    setPageItems(state,items){
       console.log('setPageItems called',items)
        
        state.pageItems=[...items]
 
     
     },  

     //setPageData
     setPageData(state,pageData){
         state.pageData = pageData
     },
    }

const getters = {

    getPageItems:state => {
    
        return state.pageItems
    },

    getPageData:state => {
        return state.pageData
    }

}

const actions = {


    // retrievePageItems -- retrieve the list of pages for the current section
    // i.e a home page might have an about contact and blog section
    //   
    //
    // TODO: remove hard coded values and substitue with Params    
    retrievePageItems:({commit,dispatch}, dataItems)=>{
       

        console.log('retrievePageItems Called with parameter', dataItems);
      
        try {
            dataItems.item = "pageItems"
            
            dataItems.subItem = "mainMenu"
            
            dispatch("LambdaretrieveMenuItems",dataItems,{root:true})
            .then(pages=>{
            
                if(pages !== undefined)     {
                    commit('setPageItems', pages);

                }
            
            })
            
        }
        
        catch (err) {
            console.log('error from dynamodb', err);
        }
    },

    //
    // retrievePageDetail - retrieves the details about the current page the user has clicked on
    // from the list of pages in their site
    //
    retrievePageDetail:({ commit, dispatch, rootState}, page)=>{
        
        console.log("retrievePageDetail Called",page)

        return new Promise(function (resolve, reject){
            
            const siteId = rootState.moduleSites.siteId
            
            const userId = rootState.moduleUsers.user.idToken
            
            const dataItems = {
                item : userId + siteId + "pageDetails",
                subItem : page
            }
            
            dispatch("LambdaretrieveMenuItems",dataItems,{root:true})
            .then(pageData =>{
            
                if(pageData !== undefined)     {
                    console.log("pageData.template =",pageData) 
                  
                  commit("setPageData", pageData)
                 
                  if(pageData.hasOwnProperty('toolBarProps')){

                    dispatch("updateAllToolBarProps", pageData.toolBarProps)
                  /*   dataItems.item = userId + siteId
                    dataItems.subItem = "mainToolBar"
                    
                    dispatch("lambdaGetToolBarProps",dataItems,{root:true})
                    .then (toolbarProps =>{
                        dispatch("updateAllToolBarProps", toolbarProps)
                    }) */
                    
                  }
                 
                  resolve( pageData.template)

                }else{
                    //No data has been saved
                    const err = {err:"pageData has no content", statusCode:1002}
                    reject (err)
                }
            
            })
            .catch(err =>{
                console.log('error from dynamodb', err);
                reject (err)
            })
        })

     
    },

    }





export default{
    state:defaultstate,
    mutations,
    getters,
    actions

}