<template>
<v-container grid-list-md text-xs-center >
    


    <v-layout row  wrap >

        <v-flex class="xs12"
                
                :class = "{redborderStyle2: styleSelector, borderStyle3: !styleSelector }" ml-2 mr-2 
                @click = "headingClicked">
            Page header 
            <buttoncomp>Click me </buttoncomp>
        </v-flex>    
    

    
        <v-flex md8 class="redborderStyle2"  pa-2 mt-2 mr-5 ml-3 >
            <v-layout column  >           
               <v-card-text class="px-0" fill-height >12</v-card-text>
            </v-layout>    
            <div  ref  = "thisCard"></div>

        </v-flex>
     
    
        <v-flex md3 class="redborderStyle2"  mt-2 ml-5>
           <v-layout column fill-height >           
                 
                Some content
                <v-btn round color="primary" dark @click="loadPic">insert Picture</v-btn>
 
           </v-layout>


        </v-flex>
       
        <v-flex xs12>
            <v-card>
                           
                    <v-card-title primary-title>
                        <div>
                            <v-menu open-on-hover bottom ripple offset-y>
                                <v-btn color="primary" dark slot="activator">Add Layout</v-btn>
                                <v-list>
                                    <v-list-tile v-for="item in layouts" :key="item.template" @click="addFlexComponent(item.template)">
                                        <v-list-tile-title>{{ item.menuText }}</v-list-tile-title>
                                    </v-list-tile>
                                </v-list>
                            </v-menu>
                          
                    
                        </div>
                    </v-card-title>
                <div ref="flextest">
                </div>

                 <v-layout row ma-2 >
      <v-flex xs8>
      <masterContainer flexElement='xs12'/>
      </v-flex>
      <v-flex xs4>
      <masterContainer flexElement='xs12'/>
      </v-flex>
  </v-layout>
            </v-card>

        </v-flex>
    </v-layout>  
 
 
    </v-container>
</template>

<script>



import flexComp from "./flexEdit"

import buttoncomp from "./button"
import tiny from '../components/utils/textComponent'
import Vue from "vue"
import imge from "./layouts/helpers/image"

import fullWidth from './layouts/fullWidth'
import WLNR from './layouts/WLNR'
import NLWR from './layouts/NLWR'
import masterContainer from './layouts/helpers/masterContainer'

var componentClass = Vue.extend(buttoncomp)

var instance = new componentClass({
        propsData:{type:'primary'}
})


var cc = Vue.extend(tiny)
var inst = new cc({
          propsData:{   
                        placeholder:'Hello world'}
})

var imageComponent = Vue.extend(imge)
var imageInst = new imageComponent();


var flexInst;

function   clean(node){
     for (var n = 0; n < node.childNodes.length; n++ ){
        var child = node.childNodes[n];
        console.log("childType",child.nodeType)
            
                console.log("remove Node",child)
                node.removeChild(child);
                n --;
         
                }
        }

export default {
    
    components:{
        buttoncomp,
        masterContainer,
    },


    data(){
        return{

            styleSelector: false,
            
            layouts:[
                {
                    icon:"",
                    menuText:"Full Width",
                    template:"fullWidth"
                },
                {
                    icon:"",
                    menuText:"Wide Left Narrow Right",
                    template:"WLNR"
                },
                {
                    icon:"",
                    menuText:"Narrow Left Wide Right",
                    template:"NLWR"
                }
            ]

        }
    },

    created(){
       
         
        },
    methods:{

        headingClicked(){
            this.styleSelector = !this.styleSelector
            instance.$slots.default = ['Look at me!']
            instance.$mount()
         //   this.$refs.thisCard.appendChild(instance.$el)


           
         
            inst.$mount()
            this.$refs.thisCard.appendChild(inst.$el)
        },

        loadPic(){
                //load a pic and insert it into the dom
              imageInst.$mount()
              this.$refs.thisCard.appendChild(imageInst.$el)

        },

        addFlexComponent(template){
            console.log("Child =",this.$refs.flextest)
             let node = this.$refs.flextest
             console.log("node = ",node)
           /// clean(node)
            

            var flexComponent = null
            var flexInst = null
            // .removeChild()
            switch (template){
                case "fullWidth":
                     flexComponent = Vue.extend(fullWidth)
                     flexInst = new flexComponent({
                             propsData:{   
                        content :'I am a full width row '},
                        id:"flexFullWidth"
                        })
                    break;
                case "WLNR":
                     flexComponent = Vue.extend(WLNR)
                     flexInst = new flexComponent({
                             propsData:{   
                        contentL :'I am the content for the left use me for text ',
                        contentR :'I am the content for the Right  use me for images ',
                        id:"WLNR"
                        }})
                        break;
                case "NLWR":
                    flexComponent = Vue.extend(NLWR)
                     flexInst = new flexComponent({
                             propsData:{   
                        contentL :'I am the content for the left use me for text ',
                        contentR :'I am the content for the Right  use me for images ',
                        id:"NRWL"
                        }})

                    break;

            }
            
              
                    
            flexInst.$mount()
            this.$refs.flextest.appendChild(flexInst.$el)
        }
    },
   
}
</script>




<style scoped>

.borderStyle{
    border: 2px solid blue;

}
.redborderStyle2{
    border: 2px dashed  red;
    
}
.borderStyle3{
    border: 2px solid  gray;
    
}
</style>
