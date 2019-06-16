<template>
<v-container >
    

    <v-toolbar 
      :fixed = "isFixed"
      :dark = "isDark"
      :light = "!isDark"
      :color = "selectedColour"
      :prominent = "isProminent"
      :extended = "isExtended"
      >
    </v-toolbar>

    <v-menu
      
        :close-on-content-click = "false"
        :nudge-width ="100"
        offset-x
      >
        <template v-slot:activator="{ on }" align-content-start>

         
            <v-btn flat icon color="grey"
                large
                dark
                v-on="on"

                >
                <v-icon large >settings</v-icon>
            </v-btn>
       
        </template>
  
        <v-card fluid>
          <v-list>
            <v-list-tile >
  
              <v-list-tile-content>
                <v-list-tile-title>Properties</v-list-tile-title>
                
              </v-list-tile-content>
  
             
            </v-list-tile>
          </v-list>
  
          <v-divider></v-divider>
  
          <v-list >
            <v-list-tile v-for = "(item,index) in props" :key="index">
              
              <v-list-tile-action fluid>
                  
            <template v-if = "item.controlType === 'switch'">
                  <v-switch  :v-model = "item.model" color="secondary" @click="processSwitch(item)" ></v-switch>
                  
            </template>

            <template  v-else-if = "item.controlType === 'colourPicker'" >
                <v-expansion-panel popout>
                  
                  <v-expansion-panel-content>
                    <template v-slot:header >
                        <div class="body-2"> Toolbar Colour </div>
                    </template>
               
                    <colours  v-model="selectedColour"></colours>  
                                   
                  </v-expansion-panel-content>

                </v-expansion-panel>
                
            </template>
              

              </v-list-tile-action >
              <v-list-tile-title body-2 v-if="item.hasLabel"> {{ item.menuItemName }}</v-list-tile-title>
            </v-list-tile>
          
          </v-list>


        
  
          <v-card-actions>
            <v-divider></v-divider>
  
            <v-btn flat @click="menu = false">close</v-btn>
           
          </v-card-actions>
        </v-card>
      </v-menu>
     
       
</v-container>
</template>


<script>
import theme from '../../../plugins/theme'
import colourPicker from './utils/colourPicker'
import colourPickerSelect from './utils/colourPickerSelect'

export default {
  
    components:{
        colours:colourPicker,
        colours2: colourPickerSelect

    },

  data(){

    return{
        props : [],
        menu:false,
        isFixed:false,
        isDark:false,
        isProminent: false,
        isExtended: false,
        backColour:"primary",
        selectedColour:"primary",
        showColourPalette:false,
        colourList:[],
    }

  },
  methods:{

    processSwitch(index){
     
      this[index.model] = !this[index.model]

    }


  },
  
  created(){
 

    const data = {
      item:"toolBarEditor"

    }
    this.$store.dispatch("LambdaretrieveMenuItems",data)
    .then(res =>{
      this.props = [...res]
    console.log("props=",this.props)
    })

    
    this.colourList = Object.keys(theme).map(function(key) {
    
    return key;
  });
  console.log("ColourList2=",this.colourList2)   
},
  computed:{
    cardItems(){
      console.log("cardItems called")
      return this.props   
    }

  }

}
</script>
