import { useContext } from "react";
import { FavoritesContext, FavoritesContextType } from "./providers/FavoritesProvider";
import { QuotesContext, QuotesContextType } from "./providers/QuotesProvider";
import { UsersContext, UsersContextType } from "./providers/UsersProvider";


export const useFavorites = (): FavoritesContextType => {
    return useContext(FavoritesContext);
}

export const useQuotes = (): QuotesContextType => {
    return useContext(QuotesContext);
}

export const useUsers = (): UsersContextType => {
    return useContext(UsersContext);
}