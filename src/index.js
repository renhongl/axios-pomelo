
import axios from './axios';


console.log(axios);

axios.get('https://api.imjad.cn/cloudmusic/?type=song&id=28012031').then(res => {
    console.log(res);
});