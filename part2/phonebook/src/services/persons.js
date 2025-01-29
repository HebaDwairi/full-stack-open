import axios from "axios";
const baseUrl = 'http://localhost:3001/persons';

const getAll = () => {
    const request = axios.get(baseUrl);
    return request.then(res => res.data);
}

const create = (person) => {
    const request = axios.post(baseUrl, person);
    return request.then(res => res.data);
}

export default {getAll, create};