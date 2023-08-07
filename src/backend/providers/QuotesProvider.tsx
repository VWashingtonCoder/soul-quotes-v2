import React, { createContext, useEffect, useState } from "react";
import { ChildrenProps, Quote } from "../../types";
import {
  getAllQuotes,
  getQuotesByCategory,
} from "../db-actions";

export type QuotesContextType = {
  homeQuotes: Quote[] | [];
};

export const QuotesContext = createContext({} as QuotesContextType);

export const QuotesProvider = ({ children }: ChildrenProps) => {
  const [allQuotes, setAllQuotes] = useState([] as Quote[]);
  const [homeQuotes, setHomeQuotes] = useState([] as Quote[]);

  const getQuotes = async () => {
    const allQuotes = await getAllQuotes();
    setAllQuotes(allQuotes);
  };

  const getCategoryQuotes = async (category: string) => {
  
  };

  useEffect(() => {
    getQuotes();
  }, []);

  const providerValue = {
    homeQuotes,
  };

  return (
    <QuotesContext.Provider value={providerValue}>
      {children}
    </QuotesContext.Provider>
  );
};
