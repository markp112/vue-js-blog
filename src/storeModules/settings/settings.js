import * as actions from './actions'
import * as mutations from './mutations'

import * as getters from './getters'

const defaultState={

    settingSiteId:-1,

}

export default {
    state: defaultState,
    mutations,
    actions,
    getters
}