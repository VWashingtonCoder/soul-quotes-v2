import { Favorite, User } from "../types";
const BASE_URL = "http://localhost:3000";

// Quotes
export const getAllQuotes = async () => {
  const response = await fetch(`${BASE_URL}/quotes`);
  return await response.json();
};

export const getQuotesByCategory = async (category: string) => {
  const response = await fetch(`${BASE_URL}/quotes?category=${category}`);
  return await response.json();
};

// Users
export const getUserById = async (id: number) => {
  const response = await fetch(`${BASE_URL}/users/${id}`);
  return await response.json();
};

export const getUserByEmail = async (email: string) => {
  const response = await fetch(`${BASE_URL}/users?email=${email}`);
  return await response.json();
};

export const addUser = (user: User) => {
  fetch(`${BASE_URL}/users`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  });
  // return await response.json();
};

// Favorites
export const updateFavorites = async (favorites: string[], id: number) => {
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  const response = await fetch(`${BASE_URL}/users/${id}`, {
    method: "PATCH",
    headers: myHeaders,
    body: JSON.stringify({ favorites: favorites }),
    redirect: "follow",
  });
  return await response.json();
};
