import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://react-my-burger-43ca6-default-rtdb.firebaseio.com/'
});

export default instance;