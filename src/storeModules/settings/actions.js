
// retrieve the list of menu items for the settings page
export const retrieveSettingsList =  ({dispatch},subItemKey)=>{
        
    const dataItems = {
            
            item : "settings",
            subItem : subItemKey
        }

   
        return new Promise(function(resolve,reject){

    
       dispatch("LambdaGetData",dataItems,{root: true})
       .then(settingsMenu =>{
        console.log("settingsMenu =", settingsMenu)
       resolve( settingsMenu)
       })
      
    
    .catch(err=>{
        
            console.log("### retreive settings Error", err)
           reject(err)
        }
    )
    }
    )
}
//call the mutation to store the siteId of the site the user is editing settings for
export const setSettingsSiteId = ({commit},siteId)=>{

    commit("updateSettingsSiteId",siteId)

}

