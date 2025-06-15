import axios from "axios";

const client = axios.create({
    baseURL: 'https://movie.pequla.com/api',
    headers: {
        'Accept': 'application/json',
        'X-Client-Name': 'KVA/2025'
    },
    validateStatus: status => status === 200
});

export class MovieService {
    
    async getMovies(page = 0, size = 10) {
        const response = await client.get('/movie', { params: { page, size } });
        return response.data; 
    }

    
    async getMovieById(id: number) {
        const response = await client.get(`/movie/${id}`);
        return response.data; 
    }
}