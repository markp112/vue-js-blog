

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

    getPageItems:state => {return state.pageItems}

}

const actions = {

    retrievePageItems:async ({commit,dispatch}, dataItems)=>{
       

        console.log('retrievePageItems Called with parameter', dataItems);
      
        try {
            dataItems.menu="pageItems"
            dataItems.menuLocation ="mainMenu"
            var result =  await dispatch("LambdaretrieveMenuItems",dataItems,{root:true})
           
                    
            commit('setPageItems', pages);
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