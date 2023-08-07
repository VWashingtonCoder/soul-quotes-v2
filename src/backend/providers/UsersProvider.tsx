import React, { createContext, useEffect, useState } from "react";
import { ChildrenProps, User } from "../../types";
import { getAllUsers, getUserByEmail, addUser } from "../db-actions";

export type UsersContextType = {
  activeUser: User;
  userFavorites: string[];
  getUser: (id: string) => void;
  addNewUser: (user: User) => void;
};

export const UsersContext = createContext({} as UsersContextType);

const defaultUser = {
  userId: "",
  username: "",
  email: "",
  password: "",
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
  const [userFavorites, setUserFavorites] = useState([] as string[]);

  const getUser = async (id: string) => {};

  const addNewUser = async (user: User) => {
    await addUser(user);
    alert("User added!");
  };

  return (
    <UsersContext.Provider value={{ activeUser, getUser, addNewUser }}>
      {children}
    </UsersContext.Provider>
  );
};
