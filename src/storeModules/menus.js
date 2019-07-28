

const defaultstate ={
    
    //menu items for the left hand drawer, depending on the button clicked on the toolbar
    menuItems:[],       

    //menu items for the main toolbar at the top of the page, these will change according to the current page being viewed
    toolbarItems:[],    

    
    isInEditor: false,


}
const mutations = {

    setMenuItems: (state,menu)=>{
       console.log('setMenuItems called',menu)
        
       state.menuItems=[...menu]
    },

    //set the main toolbar Items at the top of the page
    setToolbarItems: (state,toolbar) => {

        console.log('setToolBarItems Called', toolbar)

        state.toolbarItems=[...toolbar]

    },

    setIsInEditor:(state,value)=>{
        state.isInEditor = value
    }

    
    }
    


const getters = {


    //return the menu Items for the left hand navigation drawer
    getMenuItems: state =>{
        console.log('getMenuItems Called',state)

        if (state.menuItems !== undefined){
            return state.menuItems
        }else{
            
            return [{menuItem:"No Items",component:'',icon:''}]
        }
        
    },

    // return the buttons for the top toolbar
    getToolbarItems: state =>{

        console.log('getToolbarItems Called',state)

        if (state.toolbarItems !== undefined){
          
            return state.toolbarItems

        }else{
            return [{route:"No Items",title:'Not Set'}]
        }
        
    },

    //get the state of isInEditor
    getIsInEditor: state =>{
        console.log("getIsInEditor",state.isInEditor)
        return state.isInEditor
    }

}



const actions = {
   
    // retrieveMenuItems
    // controls what appears in the LHS menu bar
    //
    retrieveMenuItems:  ({commit,dispatch}, dataItems) => {
        console.log('retrieveMenuItems Called',dataItems)
        
        try {

            dispatch("LambdaGetData",dataItems,{root:true})
            .then(menuItems =>{
                console.log('menuItems =',menuItems)
                
                if(menuItems !== undefined){

                    commit('setMenuItems', menuItems);
                }

            })
                }
   
        catch (err) {
            console.log('error from dynamodb', err);
        }
    },

    retrieveToolbarItems: ({commit,dispatch}, dataItems) => {
        
        console.log('--> retrieveToolbarItems Called',dataItems)
        
        try {
        
          //  return new Promise(function(resolve, reject){
        
                dispatch("LambdaGetData", dataItems, {root:true})
                .then(toolbarItems =>{
        
                    console.log('ToolBarItems =',toolbarItems)
                    
                    if( toolbarItems !== undefined ){
     
                         commit('setToolbarItems', toolbarItems);
                       // resolve()
                    }
     
                })
           // })
            
               }
  
       catch (err) {
           console.log('error from dynamodb', err);
       }

    },

    // update is In Editor toggles the component shown in the side bar
    updateIsInEditor:({commit},value) =>{
        commit("setIsInEditor",value)
    }
};

   



export default {
  
   state: defaultstate,
   getters,
   mutations,
   actions
}