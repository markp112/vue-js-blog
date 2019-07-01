
//define the template for the tiny editor used throughout the app to support rich text editing 

export default {
    render: function(createElement){
      
      return createElement( 'v-textarea', {
        attrs:{
          id: 'editor',
          value: this.value
        }
      }
      )},
    props : {
      value: {type: String, default: 'some text'},
      id: {type: String, default: 'editor'},
    }, 
    
    mounted () {
      tinymce.init({
        selector: '#' + this.id,
        content_css : '',
        content_style: 
        `
        body {background-color: white; color: black;}      
        div {margin: 10px; padding: 10px; }
        blockquote {margin-left:10px; padding:10px; border-left: 2px solid grey;}
        `,  
  
        plugins: [
        'advlist',
              'autolink', 
              'link',
              'image',
              'lists', 
              'charmap', 
              'print', 
              'preview', 
              'hr', 
              'anchor', 
              'pagebreak', 
              'spellchecker',
        'searchreplace',
              'wordcount', 
              'visualblocks', 
              'visualchars', 
              'help',
              'code', 
              'fullscreen',
              'insertdatetime', 
              'media', 
              'nonbreaking',
        'save', 
              'table',
              'contextmenu',
              'directionality',
              'emoticons',
              'template',
              'paste',
              'textcolor'
        ],      
        toolbar: 'insert | undo redo | formatselect | styleselect fontselect fontsizeselect |'+
                 ' bold italic underline forecolor backcolor | link image media |'+
                 ' alignleft aligncenter alignright alignjustify |'+
                 ' bullist numlist outdent indent | removeformat | help | code | save'
        ,
        
        font_formats: 'Andale Mono=andale mono,times;Arial=arial,helvetica,sans-serif;Arial Black=arial black,avant garde;Book Antiqua=book antiqua,palatino;Comic Sans MS=comic sans ms,sans-serif;Courier New=courier new,courier;Georgia=georgia,palatino;Helvetica=helvetica;Impact=impact,chicago;Lato=Lato;Lobster=lobster;Raleway=raleway;Roboto=roboto;Symbol=symbol;Tahoma=tahoma,arial,helvetica,sans-serif;Terminal=terminal,monaco;Times New Roman=times new roman,times;Trebuchet MS=trebuchet ms,geneva;Verdana=verdana,geneva;Webdings=webdings;Wingdings=wingdings,zapf dingbats',
              
        
        // menu: {
        //   tools: {title: 'Tools', items: 'help code'}
        // },     
        menubar : true,
        resize : true,
        statusbar : true,
        branding : false,
        min_height: 100,
        height:500,
        code_dialog_height: 200,
        
        // START: ???????????
        init_instance_callback: (editor) => {
          editor.on('KeyUp', (e) => {
            this.$emit('input', editor.getContent());
          });
          editor.on('Change', (e) => {
            this.$emit('input', editor.getContent());
          });
        },
        // END: ???????????
        
        // START: Save button call back function
        save_onsavecallback: function () {  
          this.content = tinymce.activeEditor.getContent();
          alert(this.content);
        },
        // END: Save button call back function
        
      })
    }
  };
  
  