import React, { createContext, useEffect, useState } from "react";
import { ChildrenProps, FormErrors, User } from "../../types";
import {
  addUser,
  getAllUsers,
  updateFavorites,
  getUserByUsername,
} from "../db-actions";

export type UsersContextType = {
  allUsers: User[];
  activeUser: User;
  userFavorites: string[];
  isUserLoggedIn: boolean;
  loginUserFromDB: (username: string, password: string) => Promise<boolean>;
  logoutUser: () => void;
  addNewUser: (userInfo: UserInformation) => Promise<boolean>;
  addToFavorites: (quoteId: string) => void;
  removeFromFavorites: (quoteId: string) => void;
};

type UserInformation = {
  username: string;
  email: string;
  password: string;
};

export const UsersContext = createContext({} as UsersContextType);

export const UsersProvider = ({ children }: ChildrenProps) => {
  const [allUsers, setAllUsers] = useState([] as User[]);
  const [activeUser, setActiveUser] = useState({} as User);
  const [userFavorites, setUserFavorites] = useState([] as string[]);
  const isUserLoggedIn = activeUser?.username !== undefined;

  const checkForLocalUser = () => {
    const localUser = localStorage.getItem("activeUser");

    if (localUser) {
      const user = JSON.parse(localUser);
      setActiveUser(user);
      setUserFavorites(user.favorites);
    }
  };

  const getUsers = async () => {
    const users = await getAllUsers();
    setAllUsers(users);
  };

  const loginUser = (user: User) => {
    setActiveUser(user);
    setUserFavorites(user.favorites);
    localStorage.setItem("activeUser", JSON.stringify(user));
  };

  const logoutUser = () => {
    setActiveUser({} as User);
    setUserFavorites([]);
    localStorage.removeItem("activeUser");
  };

  const loginUserFromDB = async (username: string, password: string) => {
    const userArray = await getUserByUsername(username);
    const user = userArray[0];

    if (user && user.password === password) {
      loginUser(user);
      return true;
    } else return false;
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
      return true;
    } else return false;
  };

  const addToFavorites = (quoteId: string) => {
    const newFavorites = [...userFavorites, quoteId];
    updateFavorites(newFavorites, activeUser.id).then((user: User) => {
      setActiveUser(user);
      setUserFavorites(user.favorites);
    });
  };

  const removeFromFavorites = (quoteId: string) => {
    const newFavorites = userFavorites.filter(
      (favorite) => favorite !== quoteId
    );
    updateFavorites(newFavorites, activeUser.id).then((user: User) => {
      setActiveUser(user);
      setUserFavorites(user.favorites);
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
    isUserLoggedIn,
    loginUserFromDB,
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
