import type { ApiResponse } from '@/models/response.model';
import axios from 'axios';

const API_URL = 'http://localhost:3000';

export const fetchData = async (size: number, parameter?: string, from: number = 0): Promise<ApiResponse> => {
  const schema = "emails";
  let sql = `SELECT * FROM ${schema}`;
  
  if (parameter) {
    sql += ` WHERE body LIKE '%${parameter}%' OR "from" LIKE '%${parameter}%' OR "to" LIKE '%${parameter}%'`;
  }

  const body = {
    schema: schema,
    sql: sql,
    from: from,
    size: size
  };

  const response = await axios.post(`${API_URL}/get_emails`, body);

  return response.data;
};