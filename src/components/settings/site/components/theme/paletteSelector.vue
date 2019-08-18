<template>
    <v-container grid-list-xs grey darken-4>
        
        <v-layout row wrap>
            <close-Button backColour=" grey darken-4" @click="onCloseClick"></close-Button>
         
        </v-layout>
        <v-divider></v-divider>

        <!-- Show the new palette -->
        <v-layout row wrap ml-4 mt-4 mb-3>
            <div  v-for="(color,index) in getColourPalette" :key="index">
            
        
            <div    class = "circle" 
                    :class = "{ circleSelected: color.isSelected}"
                    :style="getColour(color.color)"  
                    @click = "circleClick(index)">
                   

            </div>
        </div>
        </v-layout>
        <v-divider mt-3></v-divider>
        <v-layout row mt-4>
            
            <v-flex xs6>
                <v-btn  outline 
                        color="primary" 
                        dark
                        @click="onGenerateClick"
                        >
                    Generate New
                </v-btn>
            </v-flex>
            <v-flex xs6>
                <v-btn outline color="primary" dark>Ok</v-btn>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>

import closeButton from '../../../../base/baseCloseButton'

export default {
    name:"paletteSelector",

    props:{
        palette:{
            type:Array,
            default:function(){
                 return [

                    ]
            }
        }
    },

    components:{
        'close-Button' : closeButton
    },

    data(){
        return{
            localPalette: this.palette,
            sliderValue:50,
            selectedIndex:-1,
        }
    },
   

created(){
    this.localPalette = this.palette
},

 watch:{
        palette: function(){
            console.log("watch called",this.localPalette)
            this.localPalette = this.palette
        }
    },

computed:{

    getColourPalette(){
        console.log("computed called",this.localPalette)
        return this.localPalette
    },


    

},

methods:{

       getColour(value){
           console.log("getColour called",value)
            return "backgroundColor:" + value
        },

           circleClick(index){
               console.log(index)
               if(this.selectedIndex !== -1){
                   this.localPalette[this.selectedIndex].isSelected = false
               }

               this.localPalette[index].isSelected = true;

               this.selectedIndex = index;
            /*  this.$store.dispatch("settings_getNewPalette", colour)
             .then(p =>{
                 console.log("returned with new palette",p)
                this.localPalette = p;
             }) */
             
            
        },
          
          onGenerateClick(){

              if(this.selectedIndex !== -1){
                    let colour = this.localPalette[this.selectedIndex].color

                    this.$store.dispatch("settings_getNewPalette", colour)
                    .then(p =>{
                        console.log("returned with new palette",p)
                        this.localPalette = p.splice(0);
                })
              }
          },

        onUpDownArrow(direction){

            console.log("downArrowClicked",direction)

            let increment = (direction == 'up') ? 0.01: -0.01
            let data = {
                    value:increment,
                    colorArray:this.localPalette
            }

          this.$store.dispatch("settings_LightenDarken",data)
          .then(newPalette=>{
      
              this.localPalette = newPalette.splice(0)
              console.log("localPalette= ",this.localPalette )
           
          })

        },

   

        sliderChange(value){
            console.log("Value=",value)
            let increment = (value < this.sliderValue)?-value:value

            this.sliderValue = value
             let data = {
                    value:increment,
                    colorArray:this.localPalette
            }
       
            this.$store.dispatch("settings_LightenDarken",data)
              .then(newPalette=>{
      
             this.localPalette = newPalette.splice(0)
           
          })
         

        },

    //Child Component Events

        onCloseClick(){
            this.$emit("closeClick")
        },
},
}
</script>

<style>
    .circle, .circleSelected{
        width:50px;
        height:50px;
        font-size:12px;
        border-radius: 50%;
        margin-left: 2px;
    
    }
    .circleSelected{
        border-color:firebrick;
        border-style: inset;
        border-width: 2px;

    }
</style>
