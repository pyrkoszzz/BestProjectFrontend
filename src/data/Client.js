import axios from "axios";

export const client = axios.create({
  baseURL: "http://192.168.100.24:5000/" 
});