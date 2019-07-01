//
//create a custom instance of axios
// we can use as many of these as we need
//

import axios from 'axios';

const instance = axios.create(
    {

    baseURL:'http://localhost:3000/'
    }
)

//instance.defaults.headers.common['authorisation1']='auth';

export default instance;