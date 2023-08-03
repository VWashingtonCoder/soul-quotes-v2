import { useContext } from "react";
import { QuotesContext, QuotesContextType } from "./providers/QuotesProvider";
import { UsersContext, UsersContextType } from "./providers/UsersProvider";

export const useQuotes = (): QuotesContextType => {
  return useContext(QuotesContext);
};

export const useUser = (): UsersContextType => {
  return useContext(UsersContext);
};
