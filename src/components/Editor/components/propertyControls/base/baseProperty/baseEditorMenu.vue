<template>
      <v-menu open-on-hover bottom ripple offset-y>
            <v-btn :color="titleColour" flat dark slot="activator">{{title}}</v-btn>
            
            <v-list>
                <v-list-tile v-for="item in menuItems" :key="item.template" @click="menuClicked(item)">
                
                    <v-list-tile-title class="caption" 
                                     v-if="item.menuText !== 'divider'">
                                     {{ item.menuText }}
                    </v-list-tile-title>
                    
                    <v-divider v-else></v-divider>
                
                </v-list-tile>
                
                
                        </v-list>
        </v-menu>
</template>

<script>
export default {
    name : "editorMenu",

    props:{
            title:{
                type:String,
                default:"",
                required:true
            },
            
            menuItems:{
                type:Array,
                default:function(){
                    return []
                    },
                required:true,
            },

            titleColour:{
                type:String,
                default:"tertiary"   
            }
    },

    methods:{

        menuClicked(menuItem){
            this.$emit("onMenuClicked",menuItem)
        }

    },

}
</script>