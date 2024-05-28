import axios from 'axios'

const api = axios.create({
   baseURL:'http://localhost:5000'
  //baseURL:'https://viacep.com.br/'
  
})
export default api