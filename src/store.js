import Vuex from 'vuex'
import Vue from 'vue'

Vue.use(Vuex)


//manages data related to menus in this application
import moduleMenu from './storeModules/menus' 

//manages items related to Pages the user is building
import modulePage from  './storeModules/pages/pages'

//manages calls to Lambda
import moduleLambda from './storeModules/lambda'

//manages user Auth and settings
import moduleUser from './storeModules/user'

//manages data for help cards as used in the lets get started page and potentially other tutorials
import moduleCard from './storeModules/helpCards'

//manages data associated with creating a new site
import moduleSite from './storeModules/sites'

//manages application wide global settings
import moduleGlobal from './storeModules/globals'

//manages the properties linked to controls that can be edited i.e. the user has some control over how the 
// component looks as in a toolbar menu etc

import moduleProps from './storeModules/controlProps/controlProps'

// holds the data about the current page being built /edited
import modulePageContents from './storeModules/pageContent/pageContent'

// manages the store for settings
import moduleSettings from './storeModules/settings/settings'



export default new Vuex.Store({
    data(){
        return {
         applicationVerion:"1.0.0",

        }
      },
     
    modules: {
        moduleGlobals : moduleGlobal,
        moduleLambdaFns : moduleLambda,
        modulePageMenus : moduleMenu,
        modulePages : modulePage,
        moduleUsers : moduleUser,
        moduleCards : moduleCard,
        moduleSites : moduleSite,
        moduleProperties : moduleProps,
        modulePageContent : modulePageContents,
        moduleSetting : moduleSettings,
    }
})
