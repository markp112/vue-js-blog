<template>
    <v-container grid-list-xs grey>

        <v-layout wrap row justify-center>
            <v-flex xs12 >
               
                   <v-toolbar color="grey darken-4" dense elevation-25>
                        
                      
                    <editor-Menu :menuItems="pageLayouts" title="Layouts" @onMenuClicked="onLayoutsMenuClicked"></editor-Menu>

                     <editor-Menu :menuItems="toolBarMenu" title="Toolbar" @onMenuClicked="onToolBarMenuClicked"></editor-Menu>

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

    import editorMenu from '../components/propertyControls/base/baseProperty/baseEditorMenu'

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
            
            "editor-Menu" : editorMenu,

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

            
            toolBarMenu:[
                {
                    icon:"",
                    menuText:"Edit Properties",
                    
                    
                }
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

            onLayoutsMenuClicked(item){
               
                this.addLayoutElement({layout:item.template,elements:item.elements})
            },


           addLayoutElement(template){
               console.log(" -->addLayoutElement Called", template)

                //update the store with data about this element
                this.$store.dispatch("createLayout", template )
      
            },
            
  
        //remove a layout from the page this is to be implemented
         removeSelectedLayout(){
           //TO DO:implement removal of a layout section
          },

        onToolBarMenuClicked(){
            console.log("--> toolBarClicked Called")
            this.activateToolBarPropertyEditor()
               
        },
        
       activateToolBarPropertyEditor (){
             console.log("--> toolBarClicked Called")
             
                let  isAlreadyLoaded = this.$store.getters.getIsPropLoaded(this.controlToActivate)
                
                //console.log("isAlreadyLoaded = >",isAlreadyLoaded)

                if(!isAlreadyLoaded){
                    const CONTROLTOACTIVATE ="toolBarProps"
                    
                    const data = {
                        item:"editors",
                        subItem:"toolBar",
                        key: CONTROLTOACTIVATE
                        }

                    this.$store.dispatch("retrieveNonUserProperties",data)
                    .then(() =>{
                        //console.log("toolbar Created result returned")
                    
                        const data ={
                            controlName: CONTROLTOACTIVATE,
                            value: true
                        }
                        this.$store.dispatch("updateIsPropLoaded",data)
                    
                    
                    })

                    }


                // if clicked again deselect
                let component = "toolbar"

                    // show the editor component for the toolbar
                const data = {
                    component : component,
                    item : "editors",
                    subItem : "toolBar"
                }

                this.$store.dispatch ("showProperties", data)
            },

        },

        computed: {

         

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