<template>



    <v-layout row ma-2>
 
        <v-flex xs8>
            <masterContainer flexElement='xs12'
                                :element = "contentLeft" 
                                :index = "index"
                                @onTemplateChange = "onTemplateChanged(template,0)" />
      </v-flex>
      <v-flex xs4>
            <masterContainer flexElement='xs12'
                                :element = "contentRight" 
                                :index = "index"
                                @onTemplateChange = "onTemplateChanged(template,1)"/>
      </v-flex>
 
    </v-layout>

</template>

<script>


import masterContainer from './masterContainer'

export default {
   props:{
        //this controls sequence on the page
        index:{
            type:Number,
            default:0
        },
        // contains the content for this section
        elements:{  
                    type:Array
                    
                    }
    },

     components:{
        
        masterContainer,
    },
    data(){

        return{
               contentLeft: this.elements[0],
               contentRight: this.elements[1]
            }


    },
      methods:{
        
           onTemplateChanged(template,elementIndex){
            
            switch (template){

                case "textComponent":
                    this.elements[elementIndex] = dataClass.types.text
                   // this.localContentType = dataClass.types.text
                   // console.log("layout is now",this.localContentType, this.layout)
                    break;

                case "imageComponent":
                    element.type = dataClass.types.text
                  //  this.localContentType = dataClass.types.image
                    break;
            }

            const elementComponent = {
                element : element,
                index: this.index,
                
            }

            this.$store.dispatch("updateElement", elementComponent)
        }
    }
  
}
</script>
