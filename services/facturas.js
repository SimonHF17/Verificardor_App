import axios from  'axios'
const baseUrl = 'http://172.16.32.5:3000/facturas'

const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}


export default {
    getAll,
}