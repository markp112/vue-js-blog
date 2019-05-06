

const defaultstate ={
    
    pageItems:[],
    currentPage:'',


}

const mutations = {

    setPageItems(state,items){
       console.log('setPageItems called',items)
        
        state.pageItems=[...items]
 
     
     },  
    }

const getters = {

    getPageItems:state => {
    
        return state.pageItems
    }

}

const actions = {

    retrievePageItems:({commit,dispatch}, dataItems)=>{
       

        console.log('retrievePageItems Called with parameter', dataItems);
      
        try {
            dataItems.item="pageItems"
            dataItems.subItem ="mainMenu"
            dispatch("LambdaretrieveMenuItems",dataItems,{root:true})
            .then(pages=>{
                
            console.log('pages =',pages)
            if(pages !== undefined)     {
                commit('setPageItems', pages);

             }
            
            })
            
        }
        
        catch (err) {
            console.log('error from dynamodb', err);
        }
    },

    }





export default{
    state:defaultstate,
    mutations,
    getters,
    actions

}