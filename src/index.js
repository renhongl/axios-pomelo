
const axios = require('./axios');


// axios.get('https://api.imjad.cn/cloudmusic/?type=song&id=28012031').then(res => {
//     console.log(res);
// });

axios({
    url: 'https://api.imjad.cn/cloudmusic/?type=song&id=28012031',
    method: 'POST'
}).then(res => {
    console.log(res);
});