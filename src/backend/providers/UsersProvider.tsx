import React, { createContext, useEffect, useState } from "react";
import { ChildrenProps, User } from "../../types";
import { getUserById, getUserByEmail, updateFavorites } from "../db-actions";

export type UsersContextType = {
  activeUser: User;
  userFavorites: string[];
  getUser: (id: string) => void;
  addNewUser: (user: User) => void;
  addToFavorites: (quoteId: string) => void;
  removeFromFavorites: (quoteId: string) => void;
};

export const UsersContext = createContext({} as UsersContextType);

const defaultUser = {
  id: 0,
  username: "",
  email: "",
  password: "",
  favorites: [],
};

const testUser = {
  id: 2,
  username: "testUser3",
  email: "tu3@ex.co",
  password: "Password3",
  favorites: ["funny-10", "philosophy-10", "funny-1", "funny-4", "funny-16"],
};

export const UsersProvider = ({ children }: ChildrenProps) => {
  const [activeUser, setActiveUser] = useState(defaultUser as User);
  const { favorites } = activeUser;

  const refreshUser = () => {};

  const getUser = async (email: string) => {
    const user = await getUserByEmail(email);
    console.log(user);
    setActiveUser(user);
  };

  const addToFavorites = (quoteId: string) => {
    console.log(quoteId);
    const newFavorites = [...favorites, quoteId];
    updateFavorites(newFavorites, activeUser.id).then((user: User) => {
      setActiveUser(user);
    });
  };

  const removeFromFavorites = (quoteId: string) => {
    const newFavorites = favorites.filter((favorite) => favorite !== quoteId);
    updateFavorites(newFavorites, activeUser.id).then((user: User) => {
      setActiveUser(user);
    });
  };

  const providerValue = {
    activeUser,
    getUser,
    addToFavorites,
    removeFromFavorites,
  };

  return (
    <UsersContext.Provider value={providerValue}>
      {children}
    </UsersContext.Provider>
  );
};
