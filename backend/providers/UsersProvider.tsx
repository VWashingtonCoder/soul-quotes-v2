import React, { createContext, useEffect, useState } from "react";
import { ChildrenProps, User } from "../../types";
import { getAllUsers, getUserById, addUser } from "../db-actions";

type UsersContextType = {
    activeUser: User | null;
    getUser: (id: string) => void;
    addNewUser: (user: User) => void;
};

export const UsersContext = createContext({} as UsersContextType);

export const UsersProvider = ({ children }: ChildrenProps) => {
    const [activeUser, setActiveUser] = useState(null as User | null);

    const getUser = async (id: string) => {
        const user = await getUserById(id);
        if (!user) {
            alert("User not found!");
            return;
        } else setActiveUser(user);
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