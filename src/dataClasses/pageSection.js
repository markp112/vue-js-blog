
// data classes for configuring page content

class Layout {
    constructor(template, filename, elements){
        this.template = template //template that this section of the page uses
        this.filename = filename // name of file that holds the text if content is text
        this.elements = elements // list of the elements that make up the template
    }
  
} 

class element  {
    constructor(number,type,content){
        this.number = number // which section does this correspond to based on numberic may need to change
        this.type = type         // what type of content is this one of text, image, video
        this.content = content   // this is either a reference to a file or contains the text
    }
  

}
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


export default{
    Layout,
    element,
    templates,
    types

}

