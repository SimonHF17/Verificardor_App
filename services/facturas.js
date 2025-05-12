import axios from  'axios'
const baseUrl = 'http://l27.0.0.1:3000/facturas'

const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}


export default {
    getAll,
}