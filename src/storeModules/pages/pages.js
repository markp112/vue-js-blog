
import * as actions from "./actions"

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

     setCurrentPageName(state,pageName){
         state.currentPage = pageName
     }
    }

const getters = {

    getPageItems:state => {
    
        return state.pageItems
    },

    getPageData:state => {
        return state.pageData
    },

    getCurrentPageName:state => {
        return state.currentPage
    }
}


export default{
    state:defaultstate,
    mutations,
    getters,
    actions

}