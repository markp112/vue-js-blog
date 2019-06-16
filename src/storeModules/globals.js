const defaultState  ={

   
    maxPageHeight: "80px"



}

const mutations = {

    setPageHeight:(state, newHeight) =>{
        state.maxPageHeight = newHeight
    }

}

const actions = {
    updatePageHeight : ({commit}, newHeight) =>{
    commit("setPageHeight", newHeight)
    }
}
const getters = {

    getPageHeight:state =>{
        console.log("getPageHeight Called")
    
        return state.maxPageHeight
    }
}

export default {
    state : defaultState,
    mutations,
    getters,
    actions
}