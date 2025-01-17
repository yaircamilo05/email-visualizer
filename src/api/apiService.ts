import type { ApiResponse } from '@/models/response.model';
import axios from 'axios';

const API_URL = 'http://localhost:5080/api/prueba/_search';

const auth = {
  username: 'root@example.com',
  password: 'Complexpass#123'
};

//problemas con el nombre del schema definitivo
export const fetchData = async (size:number,parameter?:string,from:number=0): Promise<ApiResponse> => {
  const body = {
    query: {
        sql: "SELECT * FROM 'emails'",
        start_time: 1737128270337294,
        end_time: 1737128351027176,
        //el from es el numero del registro de inicio y el size cuantos me va a traer desde ese inicio
        from: from,
        size: size
    },
    search_type: 'ui',
    timeout: 0
  };

  const response = await axios.post(API_URL, body, {
    auth: auth
  });

  return response.data;
};