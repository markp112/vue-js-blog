// helpCards.js
// provides store functions for cards used in the lets get stated page
//

const defaultState = {
    //holds the current set of cards as retreived from dynamoDb
    cardItems:[],
}

const mutations = {

    clearCards: state =>{

        state.cardItems = [];
    },

    setCards: (state,cardData) =>{

        if(cardData){

            state.cardItems = [...cardData]
        }

    }

}

const actions = {

    retrieveCardItems:({commit,dispatch}, data) => {

        console.log("retrieveCardItems",data)

        if (data){
            
            dispatch("LambdaGetData",data,{root:true})
            .then(cardItems => {

                commit("setCards",cardItems)
                return
            })
            .catch (err => {

                console.log("error retrieving card items",err)
                return
            })

        }

    }
}

const getters = {

    cardItems: (state) => {

        return state.cardItems
        
    }

}

export default {
    state:defaultState,
    mutations,
    actions,
    getters

}