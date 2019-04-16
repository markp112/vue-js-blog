import Vuex from 'vuex'
import Vue from 'vue'

Vue.use(Vuex)



import moduleMenu from './storeModules/menus'
import modulePage from  './storeModules/pages'
import moduleLambda from './storeModules/lambda'

export default new Vuex.Store({
    data(){
        return {
         applicationVerion:"1.0.0",

        }
      },
     
    modules: {
        moduleLambdaFns : moduleLambda,
        modulePageMenus : moduleMenu,
        modulePages : modulePage
        
    }
})
