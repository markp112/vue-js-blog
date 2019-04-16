<template>
      <v-navigation-drawer
            persistent
            :mini-variant = "miniVariant"
            :clipped="clipped"
            v-model = "drawerLocal"
            enable-resize-disable-resize-watcher
            fixed
            app
            dark
        >
        <v-flex pa-2>
            <v-list class="pa-1">
                <v-list-tile v-if="miniVariant" @click.stop="miniVariant = !miniVariant">
            <v-list-tile-action>
              <v-icon>chevron_right</v-icon>
            </v-list-tile-action>
          </v-list-tile>
            

         <v-list-tile avatar tag="div">
            <v-list-tile-avatar>
              <img :src="avatar">
            </v-list-tile-avatar>

            <v-list-tile-content>
              <v-list-tile-title>{{siteOwnerName}}</v-list-tile-title>
            </v-list-tile-content>

             <v-list-tile-action>
              <v-btn icon @click.stop="miniVariant = !miniVariant">
                <v-icon>chevron_left</v-icon>
              </v-btn>
            </v-list-tile-action>

         </v-list-tile>
        
        </v-list>

        <v-list class="pt-0" dense>
          <v-divider light></v-divider>

           <v-list-tile
                v-for  = "item in items"
                :key   = "item.component"
                @click ="onMenuItemClick(item)"
          >
            <v-list-tile-action>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-tile-action>
  
            <v-list-tile-content>
              <v-list-tile-title>{{ item.menuItem }}</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>


        </v-list>
    
        </v-flex>
        </v-navigation-drawer>
</template>
<script>

//import {mapState, mapGetters} from 'vuex'

export default {
    data(){
        return {

              clipped:true,
                miniVariant: false,
                drawerLocal:true,
                avatar: "../../assets/avatar.jpg",
                siteOwnerName:'Mark Phillips',
               

        }
    },
   

    methods:{
          onMenuItemClick(menuItem){
           console.log('onMenuItemClick called',menuItem)

            const item ={page:menuItem.component}
           this.$store.dispatch("retrievePageItems",item)


        },

    },

    computed:{
        items(){
            console.log('watch Items called',this.$store.getters.getMenuItems)
            return this.$store.getters.getMenuItems
        }

    },
}
</script>
