 /* 
    this is the standard toolbar which appears at the top of all the layouts and allows the user to control content
    within the layout component

  */
 
 
 <template>
      <v-toolbar  dense flat >
           
            <v-menu open-on-hover bottom ripple offset-y>
                                        
                    <v-list>
                        <v-list-tile v-for="item in menuItems" 
                                    :key="item.template" 
                                    @click="onMenuClicked(item)">

                            <v-list-tile-action>
                                <v-icon> {{ item.icon }} </v-icon> 
                            </v-list-tile-action>
                            <v-list-tile-content>{{ item.menuText }} </v-list-tile-content>

                        </v-list-tile>
                    </v-list>
                <v-btn flat dark small color="primary" slot="activator" align-left>
                    <v-icon dark>expand_more</v-icon>
                </v-btn>
                
            </v-menu>   
            <v-btn flat icon color="tertiary" @click = "onEditClicked" :disabled="editButtonActive">
                <v-icon>edit</v-icon>
            </v-btn>   
            
            <v-spacer></v-spacer>
                 <v-btn flat icon small color="primary"  align-left @click="onAlignLeftClicked">
                    <v-icon dark>format_align_left</v-icon>
                </v-btn>
                 <v-btn flat icon small color="primary"  align-left @click="onAlignCentreClicked">
                    <v-icon dark>format_align_center</v-icon>
                </v-btn>
                 <v-btn flat icon small color="primary"  align-left @click="onAlignRightClicked">
                    <v-icon dark>format_align_right</v-icon>
                </v-btn>
        </v-toolbar>    
 </template>
 
 <script>
 export default {

     props:{

         editButtonActive:{ type: Boolean,
                            default:false,
                            },
       
     },

     data(){
    
       return {
           
          

           menuItems:[
                {
                    icon:"waves",
                    menuText:"Add Text",
                    template:"textComponent"
                },
                {
                    icon:"insert_photo",
                    menuText:"Add Image",
                    template:"imageComponent"
                }
            ] 
       }
     },
     methods:{

     

         onMenuClicked(item){

             var template = item.template

             console.log("ToolbarEditor -->menuClicked=",item,template)

             this.$emit("onMenuClicked", template)
         },

         onEditClicked(){
             this.$emit("onEditClicked")
         },
         onAlignLeftClicked(){
             this.$emit("onAlignLeftClicked")
         },
         onAlignRightClicked(){
             this.$emit("onAlignRightClicked")
         },
          onAlignCentreClicked(){
             this.$emit("onAlignCentreClicked")
         },

     }
 }
 </script>
 
