import axios from "axios";

const api = axios.create({
    baseURL: "http://172.19.0.49/pizzariateste/api/v1",
    timeout: 100000, // tempo máximo de reposta (10 segundos)
})

export default api 

// Utilize em baseURL

// http://172.19.0.49/pizzariateste/api/v1   -> api do professor "só funciona na escola"

// http://localhost:8080/endereco_da_sua_api -> sua api respondendo na porta 8080 "rodar seu back-end local"