import axios from "axios";

const apiClient = axios.create(
    {
        baseURL: 'http://localhost:8080'
    }
);

export const retrieveAllDogsForUsernameApi 
    = (username) => apiClient.get(`/users/${username}/dogs`)


export const deleteDogApi =
    (username, id) => apiClient.delete(`/users/${username}/dogs/${id}`)

export const retrieveDogApi =
    (username, id) => apiClient.get(`/users/${username}/dogs/${id}`)

export const updateDogApi = 
    (username, id, dog) => apiClient.put(`/users/${username}/dogs/${id}`, dog) // dog is needed since its part of the bodyrequest

export const createDogApi = 
    (username, dog) => apiClient.post(`/users/${username}/dog`, dog)