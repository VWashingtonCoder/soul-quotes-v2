import React, { createContext, useEffect, useState } from "react";
import { ChildrenProps, FormValues, User } from "../../types";
import { getAllUsers, getUserByEmail, updateFavorites } from "../db-actions";

export type UsersContextType = {
  allUsers: User[];
  activeUser: User;
  userFavorites: string[];
  addUser: (userInfo: UserInformation) => void;
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
  const { favorites } = activeUser;

  const checkForLocalUser = () => {
    const localUser = localStorage.getItem("activeUser");
    if (localUser) 
      setActiveUser(JSON.parse(localUser));
  };

  const getUsers = async () => {
    const users = await getAllUsers();
    setAllUsers(users);
  };

  const loginUser = (user: User) => {
    setActiveUser(user);
    localStorage.setItem("activeUser", JSON.stringify(user));
  };

  const addUser = async (userInfo: UserInformation) => {
    const { username, email, password } = userInfo;
    const newUser: User = {
      id: allUsers.length + 1,
      username,
      email,
      password,
      favorites: [],
    };

    addNewUser(newUser)
      .then(() => {
        getUsers();
        loginUser(newUser);
        return true;
      })
      .catch((err) => {
        console.log(err);
        return false;
      })
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

  useEffect(() => {
    getUsers();
    checkForLocalUser();
  }, []);

  const providerValue = {
    allUsers,
    activeUser,
    addUser,
    addToFavorites,
    removeFromFavorites,
  };

  return (
    <UsersContext.Provider value={providerValue}>
      {children}
    </UsersContext.Provider>
  );
};
