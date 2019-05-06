import Vuex from 'vuex'
import Vue from 'vue'

Vue.use(Vuex)


//manages data related to menus in this application
import moduleMenu from './storeModules/menus' 

//manages items related to Pages the user is building
import modulePage from  './storeModules/pages'

//manages calls to Lambda
import moduleLambda from './storeModules/lambda'

//manages user Auth and settings
import moduleUser from './storeModules/user'

//manages data for help cards as used in the lets get started page and potentially other tutorials
import moduleCard from './storeModules/helpCards'


export default new Vuex.Store({
    data(){
        return {
         applicationVerion:"1.0.0",

        }
      },
     
    modules: {
        moduleLambdaFns : moduleLambda,
        modulePageMenus : moduleMenu,
        modulePages : modulePage,
        moduleUsers : moduleUser,
        moduleCards : moduleCard
    }
})
