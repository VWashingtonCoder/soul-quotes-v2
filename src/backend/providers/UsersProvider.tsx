import React, { createContext, useEffect, useState } from "react";
import { ChildrenProps, FormErrors, User } from "../../types";
import { addUser, getAllUsers, updateFavorites } from "../db-actions";

export type UsersContextType = {
  allUsers: User[];
  activeUser: User;
  userFavorites: string[];
  checkActiveUser: (username: string) => boolean;
  logoutUser: () => void;
  addNewUser: (userInfo: UserInformation) => void;
  addToFavorites: (quoteId: string) => void;
  removeFromFavorites: (quoteId: string) => void;
};

type UserInformation = {
  username: string;
  email: string;
  password: string;
};

export const UsersContext = createContext({} as UsersContextType);

const defaultUser = {
  id: 0,
  username: "",
  email: "",
  password: "",
  favorites: [],
};

export const UsersProvider = ({ children }: ChildrenProps) => {
  const [allUsers, setAllUsers] = useState([] as User[]);
  const [activeUser, setActiveUser] = useState(defaultUser as User);
  const userFavorites = activeUser.favorites;

  const checkForLocalUser = () => {
    const localUser = localStorage.getItem("activeUser");
    if (localUser) setActiveUser(JSON.parse(localUser));
  };

  const getUsers = async () => {
    const users = await getAllUsers();
    setAllUsers(users);
  };

  const loginUser = (user: User) => {
    setActiveUser(user);
    localStorage.setItem("activeUser", JSON.stringify(user));
  };

  const logoutUser = () => {
    setActiveUser(defaultUser);
    localStorage.removeItem("activeUser");
  };

  const addNewUser = async (userInfo: UserInformation) => {
    const { username, email, password } = userInfo;
    const lastId = allUsers[allUsers.length - 1]?.id;

    const newUser: User = {
      id: lastId + 1,
      username,
      email,
      password,
      favorites: [],
    };

    const user = await addUser(newUser);

    if (user) {
      loginUser(user);
      getUsers();
    }
  };

  const addToFavorites = (quoteId: string) => {
    console.log(quoteId);
    const newFavorites = [...userFavorites, quoteId];
    updateFavorites(newFavorites, activeUser.id).then((user: User) => {
      setActiveUser(user);
    });
  };

  const removeFromFavorites = (quoteId: string) => {
    const newFavorites = userFavorites.filter(
      (favorite) => favorite !== quoteId
    );
    updateFavorites(newFavorites, activeUser.id).then((user: User) => {
      setActiveUser(user);
    });
  };

  useEffect(() => {
    getUsers();
    checkForLocalUser();
  }, []);

  const providerValue = {
    allUsers,
    activeUser,
    userFavorites,
    logoutUser,
    addNewUser,
    addToFavorites,
    removeFromFavorites,
  };

  return (
    <UsersContext.Provider value={providerValue}>
      {children}
    </UsersContext.Provider>
  );
};
