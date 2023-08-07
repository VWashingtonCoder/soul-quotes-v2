import { useContext } from "react";
import { QuotesContext, QuotesContextType } from "./providers/QuotesProvider";
import { UsersContext, UsersContextType } from "./providers/UsersProvider";

export const useQuotes = (): QuotesContextType => {
    return useContext(QuotesContext);
}

export const useUsers = (): UsersContextType => {
    return useContext(UsersContext);
}