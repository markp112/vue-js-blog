<template>
    <v-container grid-list-xs grey>

        <v-layout wrap row justify-center>
            <v-flex xs12 elevation-13>
               
                   <v-toolbar background-color="grey darken-4" dense>
                        
                         <v-menu open-on-hover bottom ripple offset-y>
                                <v-btn color="primary" dark slot="activator">Layouts</v-btn>
                                
                                <v-list>
                                    <v-list-tile v-for="item in pageLayouts" :key="item.template" @click="addLayoutElement({layout:item.template,elements:item.elements})">
                                        <v-list-tile-title>{{ item.menuText }}</v-list-tile-title>
                                    </v-list-tile>
                                    <v-divider></v-divider>
                                   
                                    <v-list-tile @click="removeSelectedLayout">
                                           <v-list-tile-title>
                                               <v-icon>delete</v-icon>
                                               Delete Layout</v-list-tile-title>
                                    </v-list-tile>

                                </v-list>
                            </v-menu>
                </v-toolbar>
            </v-flex>
            <v-flex xs12>
                
            </v-flex>
            <v-divider></v-divider>
           
           
            <v-flex xs11>

                <v-card height="auto">
                    <!-- using components as a way to switch between different versions of the toolbar depending on properties set 
                    this should be put lower down in the tool bar piece to avoid duplication of code subject to where the binding can sit
                -->

                   <!-- Toolbar for users top of page -->

                    <toolbarComponent />
                    <!-- Section for site intro -->
                 
         
                    <component :is="layout.template" v-for="(layout,i) in layoutElements"
                                 :key="i"
                                 :index="i" 
                                 :elements = "layout.elements"
                                 :class = "{border: isSelected, noBorder:!isSelected}"
                                 @click = "isSelected = !isSelected"
                                 z-index = "0"
                                 >
                         
                    </component>

               

                </v-card>
   
            </v-flex>


        </v-layout>
    </v-container>



</template>

<script>
  

    import tbComponent from '../../Editor/components/views/userToolbar'

//Layouts - TODO componentise
    import fullWidth from '../layouts/fullWidth'
    
    import WLNR from '../layouts/WLNR'
    
    import NLWR from '../layouts/NLWR'
    import L4C4R4 from '../layouts/L4C4R4'

    //contains the data classes for defining pages
    import pageDataClasses from '../../../dataClasses/pageSection'
   
    export default {
        components: {

            toolbarComponent: tbComponent,
            
            fullWidth,
            
            WLNR,
            
            NLWR,

            L4C4R4,
          
        },

        data(){
            return{
                initialText:'<div> <h2 style="text-align: center;"><span style="color: #5866b8;">This space is for you to create the content for your home page to your website</span></h2> </div>',

                //menu items for layouts option on editor toolbar
                pageLayouts:[
                {
                    icon:"",
                    menuText:"Full Width",
                    template:"fullWidth",
                    elements:1
                },
                {
                    icon:"",
                    menuText:"Wide Left Narrow Right",
                    template:"WLNR",
                    elements: 2
                },
                {
                    icon:"",
                    menuText:"Narrow Left Wide Right",
                    template:"NLWR",
                    elements: 2
                },
                 {
                    icon:"",
                    menuText:"3 Panels of the same size",
                    template:"L4C4R4",
                    elements: 3
                },

              
            ],

            // activated when control is clicked to be used to remove a layout component
            isSelected:false,
         
            // name of the current page as in Home, About etc
            pageName: "",

     
            }
        },


        created() {
            
            this.$store.dispatch("updateIsInEditor", true)

        },

        methods: {


            // Create a new layout component based on the option the user has selected
            // template contains the name of the layout(component) 
            //and the number of elements with the layout

           addLayoutElement(template){
               console.log(" -->addLayoutElement Called", template)

                //update the store with data about this element
                this.$store.dispatch("createLayout", template )
      
            },
  
         removeSelectedLayout(){

           //TO DO:implement removal of a layout section
          },

        
        },

        computed: {

            checkToolBar: function () {

                console.log("check toolBar called")
                const property = {
                    control: "toolBarProps",
                    property: "isFlat"
                }

                //switch between a flat toolbar vs an elevated toolbar
                let value = this.$store.getters.getProperty(property)

                console.log("Check Toolbar Value = ", value)

                if (value) {
                    console.log("returning Flat Toolbar", value)
                    return "toolbarComponentFlat"
                } else {
                    console.log("returning Toolbar", value)
                    return "toolbarComponent"
                }
            },

            layoutElements : function(){
                              
                return this.$store.getters.getLayouts
            },

            layouts: function(){
                return this.$store.getLayouts
            },

        }


    }
</script>

<style scoped>
    .border {

        border: 1px dotted red;    }
    
  

   
</style>