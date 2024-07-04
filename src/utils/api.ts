'use server'
import axios from "axios";

const API = axios.create({
  baseURL: process.env.API_URL,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

export default API