
// data classes for configuring page content

class Layout {
    constructor(template, filename, elements,index){
        this.template = template //template that this section of the page uses
        this.filename = filename // name of file that holds the text if content is text
        this.elements = elements // list of the elements that make up the template
        this.index = index // what sequence do I appear on the page
    }
  
} 

class element  {
    constructor(number,type,content){
        this.number = number    // which section does this correspond to based on numberic may need to change
        this.type = type         // what type of content is this one of text, image, video
        this.content = content   // this is either a reference to a file or contains the text
        this.isDirty = false
    }
  

}



//layoutElement has the format of ###LnEn### which acts a key to the content
/* class contents {
    constructor(layoutElement, content){
        this.layoutElement = layoutElement
        this.content = content
    }
} */
// maintains the list of templates for page layouts
const templates = {
    fullWidth : "fullWidth",
    WLNR : "WLNR",
    NLWR : "NLWR",
    L4C4R4: "3 Equal panels"
}

// list of media types that make up the content within a layout
const types = {
    undefined:0,
     text: 1,
     image: 2,
     video: 3
 }
//return the key for a given element
// the key is used to identify content in the linked to a layout in the elementd
  export function getElementKey (layoutIndex,elementNumber) {

    
   return   "###L" + layoutIndex + "E"+ elementNumber +"###"
 }

export default{
    Layout,
    element,
    templates,
    types

}

