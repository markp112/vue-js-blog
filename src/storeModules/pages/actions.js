   
   const MAINTOOLBAR = "toolBarProps"
   
   // retrievePageItems -- retrieve the list of pages for the current section
        // i.e a home page might have an about contact and blog section
        //   
        //
        // TODO: remove hard coded values and substitue with Params    
        export const retrievePageItems = ({commit,dispatch}, dataItems)=>{
        

            console.log('retrievePageItems Called with parameter', dataItems);
        
            try {
                dataItems.item = "pageItems"
                
                dataItems.subItem = "mainMenu"
                
                dispatch("LambdaGetData",dataItems,{root:true})
                .then(pages=>{
                
                    if(pages !== undefined)     {
                        commit('setPageItems', pages);

                    }
                
                })
                
            }
            
            catch (err) {
                console.log('error from dynamodb', err);
            }
        }

        //
        // retrievePageDetail - retrieves the details about the current page the user has clicked on
        // from the list of pages in their site
        // retrieve the page layout
        // properties for the toolbar
        // text conntent
        
        export const    retrievePageDetail = ({state, getters,dispatch}, page)=>{
            
            console.log("retrievePageDetail Called", page)

            return new Promise(function (resolve, reject){
                
                              // retrieve the basic details for this page
                const dataItems = {

                    item : getters.userIdSiteId + "pageDetails",
                    subItem : page
                }
               // console.log("dataItems =", dataItems)
                
                dispatch("getPageDetails", dataItems)
                    .then(dispatch("retrieveProperties", MAINTOOLBAR,{root:true}))      //retreive content for the users Navbar at the top of the page (toolbar)
                    .then(dispatch("pageContent_retrieveContent",page,{root:true}))
                    .then(dispatch("pageContent_retrieveTextContent",page,{root:true}))
                    .then(()=>{
                    //return the template name for this page
                        resolve( state.pageData.template)
                })   
                              
                .catch(err =>{
                    console.log("retrievePageDetail--> Error ",err)
                    reject(err)
                })
                
               
            })
        }
        
        
    export const   getPageDetails=({commit,dispatch},dataItems)=>{
            console.log("--> GetPageDetails called",dataItems)
            
            return new Promise(function (resolve, reject){
                dispatch("LambdaGetData",dataItems,{root:true})
                .then( data =>{
                
                    if(data !== undefined)     {
                        
                        commit("setPageData", data)
                        resolve(data)

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
    }

   
    



    
        //set the name of the page we are working on
        export const updateCurrentPageName = ({commit},pageName)=>{
            commit("setCurrentPageName",pageName)
        }