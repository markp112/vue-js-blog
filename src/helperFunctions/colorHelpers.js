export const  hexToRgb=(hex)=> {
     

    if(hex.substr(0,1)=='#'){
        hex = hex.substr(1)
    }
    console.log("hexToRgb Called",hex)
    var bigint = parseInt(hex, 16);
    var r = (bigint >> 16) & 255;
    var g = (bigint >> 8) & 255;
    var b = bigint & 255;

    
    return [r,  g , b];
}

export const hexToRgbObject=(hex)=> {
    
    if(hex.substr(0,1)=='#'){
        hex = hex.substr(1)
    }
    console.log("hexToRgb Called",hex)
    var bigint = parseInt(hex, 16);
    var r = (bigint >> 16) & 255;
    var g = (bigint >> 8) & 255;
    var b = bigint & 255;

    
    return {red:r,green:g, blue:b}

}

 function componentToHex(c) {
    var hex = c.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
  }
  
 export const rgbToHex=(r, g, b) =>{
    return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
  }