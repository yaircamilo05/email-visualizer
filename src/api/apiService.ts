import type { ApiResponse } from '@/models/response.model';
import axios from 'axios';

const API_URL = 'http://localhost:5080/api/default/_search';

const auth = {
  username: 'root@example.com',
  password: 'Complexpass#123'
};

export const fetchData = async (cant:number,parameter?:string): Promise<ApiResponse> => {
  const body = {
    query: {
      sql: 'SELECT * FROM prueba',
      start_time: 1721091909043000,
      end_time: 1736989509043000,
      from: 0,
      size: cant
    },
    search_type: 'ui',
    timeout: 0
  };

  const response = await axios.post(API_URL, body, {
    auth: auth
  });

  return response.data;
};