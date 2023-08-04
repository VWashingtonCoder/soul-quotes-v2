import { useContext } from "react";
import { QuotesContext, QuotesContextType } from "./providers/QuotesProvider";
import { UsersContext, UsersContextType } from "./providers/UsersProvider";

export const useQuotesContext = (): QuotesContextType => {
  return useContext(QuotesContext);
};

export const useUsersContext = (): UsersContextType => {
  return useContext(UsersContext);
};
