import axios from '../../axios/colorApi'

//from library https://www.npmjs.com/package/shade-blend-color
import pSBC from 'shade-blend-color'

//coloring-palette see npm works but limited palette
//import colourGen from 'coloring-palette'

//https://www.npmjs.com/package/@ky-is/tailwind-color-palette
// tailwind Paletter generator
import tailwindColours from '@ky-is/tailwind-color-palette'

//https://www.npmjs.com/package/pigmentjs

import Pigment from  'pigmentjs'


//TinyColor https://github.com/bgrins/TinyColor
import tinyColor from 'tinycolor2'



// retrieve the list of menu items for the settings page
export const retrieveSettingsList =  ({dispatch},subItemKey)=>{
        
    const dataItems = {
            
            item : "settings",
            subItem : subItemKey
        }

   
        return new Promise(function(resolve,reject){

    
       dispatch("LambdaGetData",dataItems,{root: true})
       .then(settingsMenu =>{
        console.log("settingsMenu =", settingsMenu)
       resolve( settingsMenu)
       })
      
    
    .catch(err=>{
        
            console.log("### retreive settings Error", err)
           reject(err)
        }
    )
    }
    )
}
//call the mutation to store the siteId of the site the user is editing settings for
export const setSettingsSiteId = ({commit},siteId)=>{

    commit("updateSettingsSiteId",siteId)

}

//The colorApi
export const zz_settings_getNewPalette = ({state},inputColour) =>{
    
    console.log("--> settings_getNewPalette",inputColour.substr(1))

  let apiParameters = "/scheme?hex=" + inputColour.substr(1) +"&mode=triad&format=json&count=9"
   return new Promise(function(resolve, reject){

    try{
        
        axios.get(apiParameters)
        .then(data=>{
            console.log("data = ", data)

            resolve(data)
        })
        .catch(err =>{
            console.log("### settings_GetNewPallette ",err)
            reject(err)
        })
    }
    catch(err){
        console.log("### settings_GetNewPallette ",err)
            reject(err)
    }
}
   )
}

// make the API call to retrieve a new theme based on the provided colour
// this make use of the pigment linrary see npm

export const settings_getNewPalette = ({state},inputColour) =>{
    
    console.log("--> settings_getNewPalette",inputColour.substr(1))

  
   return new Promise(function(resolve, reject){

    try{
        
       // const newPalette = colourGen(inputColour,'hex')
       //const newPalette = tailwindColours(inputColour,{grayscale: false, ui:true})
       const pigment = Pigment(inputColour)
       const complimentary = pigment.complementary() 
       const triad = pigment.triad()
       const complimentaryPigment = Pigment(complimentary.hex)
       const shades = pigment.shades(3)
        const monochrome = pigment.monochrome(4)
 
       console.log("newPalette = ", pigment, complimentary, triad)

       const data=[
            {color:pigment.hex,lightness:pigment.relativeLuminance,isSelected:false},
            {color:complimentary.hex , lightness: complimentary.relativeLuminance,isSelected:false},
            
            {color:triad[1].hex , lightness: triad[1].relativeLuminance,isSelected:false},
            {color:triad[2].hex , lightness: triad[2].relativeLuminance,isSelected:false},
            
            {color:shades[1].hex , lightness: shades[1].relativeLuminance,isSelected:false},
            {color:shades[2].hex , lightness: shades[2].relativeLuminance,isSelected:false},

            {color:monochrome[0].hex , lightness:monochrome[0].relativeLuminance,isSelected:false },
           
            {color:monochrome[2].hex , lightness: monochrome[1].relativeLuminance,isSelected:false},
            {color:monochrome[3].hex , lightness: monochrome[2].relativeLuminance,isSelected:false},
          

       ]
       
        data.sort((a,b)=> (a.lightness) - (b.lightness))

      
        resolve(data)
    }
    catch(err){
        console.log("### settings_GetNewPallette ",err)
            reject(err)
    }
}
   )
}

//take an array of colours and lighten / darken it by value as a % passed in
// as a fraction of 1 - negative numbers darken positive lighten
// uses pSBC
export const settings_LightenDarken = ({state},colourData)=>{
    
    console.log("colorARray=",colourData)    

    let data=[]
    
    return new Promise(function(resolve,reject){

    for(let index=0; index < colourData.colorArray.length; index++){

        let currentElement = colourData.colorArray[index]
        
        let newElement = {color:0, lightness:colourData.colorArray[index].lightness,isSelected:colourData.colorArray[index].isSelected}

        if (colourData.value <0 ){
            newElement.color = tinyColor(colourData.colorArray[index].color).darken((colourData.value * -1)).toString();
        }else{

            newElement.color = tinyColor(colourData.colorArray[index].color).brighten(colourData.value).toString();
        }
        //pSBC(colourData.value, colourData.colorArray[index].color)
        
        console.log("newElement",newElement.color)
        data.push(newElement)


     }
            
     console.log("data=",data)
     resolve(data)


})
    
}


//source data for the subcomponent
export const settings_getComponentData = ({dispatch,rootState},data)=>{

    console.log("-->settings_getComponentData called",data,rootState.moduleUsers)
    const siteId = rootState.moduleSites.siteId
    const userId = rootState.moduleUsers.user.idToken

    const dataItems ={
        item : userId + siteId,
        subItem: data.subKey
   }
    //check if we need a userID and SiteID
  console.log("dataItems",dataItems)

    return new Promise(function (resolve, reject){
        dispatch("LambdaGetData",dataItems,{root:true})
        .then(items=>{
            resolve(items)
        })
        .catch(err=>{
            reject(err)
        })
    })
  

}