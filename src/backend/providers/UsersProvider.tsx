import React, { createContext, useEffect, useState } from "react";
import { ChildrenProps, User } from "../../../types";
import { getAllUsers, getUserByEmail, addUser } from "../db-actions";
import { checkForLocalUser } from "../../helpers";


export type UsersContextType = {
    activeUser: User;
    getUser: (id: string) => void;
    addNewUser: (user: User) => void;
    removeActiveUser: () => void;
};

export const UsersContext = createContext({} as UsersContextType);

const testUser: User = {
    userId: "testUser3",
    username: "testUser3",
    email: "tu3@ex.com",
    password: "Password3",
}

const noUser: User = {
    userId: "",
    username: "",
    email: "",
    password: ""
}


export const UsersProvider = ({ children }: ChildrenProps) => {
    const [activeUser, setActiveUser] = useState(testUser as User);

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
        setActiveUser(noUser);
    };

    useEffect(() => {
        const localUser = checkForLocalUser();
    }, [])

    return (
        <UsersContext.Provider value={{ activeUser, getUser, addNewUser, removeActiveUser }}>
            {children}
        </UsersContext.Provider>
    );
};