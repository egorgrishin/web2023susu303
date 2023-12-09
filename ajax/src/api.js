import axios from "axios";

const getUsers = async () => {
    return await axios
        .get('https://jsonplaceholder.typicode.com/users')
        .then(response => response.data);
};

const getTodos = async () => {
    return await axios
        .get('https://jsonplaceholder.typicode.com/todos')
        .then(response => response.data);
};

export {
    getUsers,
    getTodos,
};