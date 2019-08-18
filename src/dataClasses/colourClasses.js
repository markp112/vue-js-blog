class colourElement {

    constructor (colourName, value, lightness,isSelected){
        this._colourName = colourName
        this._value = value
        this._lightness =lightness
        this._isSelected = isSelected
    }


    getRGB(){
        let hex=this._value

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
}

export default {colourElement}