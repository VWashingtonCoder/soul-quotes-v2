import { Favorite, User } from '../../types';
const BASE_URL = 'http://localhost:3000';

// Quotes
export const getAllQuotes = async () => {
    const response = await fetch(`${BASE_URL}/quotes`);
    return await response.json();
}

export const getQuotesByCategory = async (category: string) => {
    const response = await fetch(`${BASE_URL}/quotes?category=${category}`);
    return await response.json();
}

export const getAllUsers = async () => {
    const response = await fetch(`${BASE_URL}/users`);
    return await response.json();
}

// Users
export const getUserByEmail = async (email: string) => {
    const response = await fetch(`${BASE_URL}/users?email=${email}`);
    return await response.json();
}

export const addUser = async (user: User) => {
    const response = await fetch(`${BASE_URL}/users`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    });
    return await response.json();
}

// Favorites
export const getAllFavorites = async () => {
    const response = await fetch(`${BASE_URL}/favorites`);
    return await response.json();
}

export const getFavoritesByUser = async (userId: string) => {
    const response = await fetch(`${BASE_URL}/favorites?userId=${userId}`);
    return await response.json();
}

export const addFavorite = async (favorite: Favorite) => {
    const response = await fetch(`${BASE_URL}/favorites`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(favorite)
    });
    return await response.json();
}

export const deleteFavorite = async (id: number) => {
    const response = await fetch(`${BASE_URL}/favorites/${id}`, {
        method: 'DELETE'
    });
    return await response.json();
}
