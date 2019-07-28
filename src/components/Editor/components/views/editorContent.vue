<template>
    <div v-html= "localContent">
      
      
        
    </div>
</template>
<script>

export default {
   props: {
        content : {
            type: String,
            default: ''
        },
         id: {
            type: String,
            default: 'tinyeditor'
        },
    },
    data(){
        return {
            localContent:this.content
        }
    }
}
</script>
