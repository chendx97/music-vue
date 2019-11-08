import axios from 'axios'

export default {
    getRecommendSongList: () => {
        axios.get('http://127.0.0.1:3000/personalized').then(res => {
            console.log(res)
        })
    }
};
