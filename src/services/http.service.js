import axios from 'axios';
import authHeader from './header.service';
import url_site from './urlbase.service';
export const http = axios.create({
    baseURL: url_site(),
    headers: authHeader()
})