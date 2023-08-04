import React, { createContext, useEffect, useState } from "react";
import { ChildrenProps, User } from "../../../types";
import { getAllUsers, getUserByEmail, addUser } from "../db-actions";

export type UsersContextType = {
    activeUser: User | null;
    getUser: (id: string) => void;
    addNewUser: (user: User) => void;
    removeActiveUser: () => void;
};

export const UsersContext = createContext({} as UsersContextType);

const testUser: User = {
    userId: "testUser1",
    username: "testUser1",
    email: "tu1@ex.com",
    password: "Password1",
}

export const UsersProvider = ({ children }: ChildrenProps) => {
    const [activeUser, setActiveUser] = useState(testUser as User | null);

    const getUser = async (email: string) => {
        const user = await getUserByEmail(email);
        if (!user) {
            alert("User not found!");
            return;
        } else setActiveUser(user);
    };

    const addNewUser = async (user: User) => {
        await addUser(user);
        alert("User added!");
    };

    const removeActiveUser = () => {
        setActiveUser(null);
    };

    return (
        <UsersContext.Provider value={{ activeUser, getUser, addNewUser, removeActiveUser }}>
            {children}
        </UsersContext.Provider>
    );
};