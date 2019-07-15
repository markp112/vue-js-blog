 <template>
      <v-toolbar  dense flat>
            <v-menu open-on-hover bottom ripple offset-y>
                                        
                    <v-list>
                        <v-list-tile v-for="item in menuItems" :key="item.template" @click="onMenuClicked(item.template)">
                            <v-list-tile-title>{{ item.menuText }}</v-list-tile-title>
                        </v-list-tile>
                    </v-list>
                <v-btn fab dark small color="primary" slot="activator" align-left>
                    <v-icon dark>expand_more</v-icon>
                </v-btn>
            
            </v-menu>   
            <v-btn flat icon color="tertiary" @click = "onEditClicked" :disabled="editButtonActive">
                <v-icon>edit</v-icon>
            </v-btn>   
        </v-toolbar>    
 </template>
 
 <script>
 export default {

     props:{
         editButtonActive:{ type:Boolean,
                            default:false,
                            }
     },

     data(){
       return {
           menuItems:[
                {
                    icon:"",
                    menuText:"Add Text",
                    template:"textComponent"
                },
                {
                    icon:"",
                    menuText:"Add Image",
                    template:"imageComponent"
                }
            ] 
       }
     },
     methods:{
         onMenuClicked(template){
             this.$emit("menuClicked",template)
         },

         onEditClicked(){
             this.$emit("onEditClicked")
         }
     }
 }
 </script>
 
