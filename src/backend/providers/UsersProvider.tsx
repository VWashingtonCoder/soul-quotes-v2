import React, { createContext, useEffect, useState } from "react";
import { ChildrenProps, User } from "../../types";
import { getAllUsers, getUserByEmail, addUser } from "../db-actions";

export type UsersContextType = {
    activeUser: User | null;
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

export const UsersProvider = ({ children }: ChildrenProps) => {
    const [activeUser, setActiveUser] = useState(defaultUser as User);

    const getUser = async (id: string) => {
        
    };

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