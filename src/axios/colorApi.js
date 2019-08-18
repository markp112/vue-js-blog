import axios from 'axios';

const instanceColors =axios.create(
    {

  baseURL:"https://thecolorapi.com",
   // baseURL:"https://colormind.io/",
   


}

)
//instanceImages.defaults.headers.get['Accepts']='application/json';
//instance.defaults.headers.common['authorisation1']='auth';

export default instanceColors;