import React, { createContext, useEffect, useState } from "react";
import { ChildrenProps, Quote } from "../../types";
import {
  getAllQuotes,
  getQuotesByCategory,
} from "../db-actions";

export type QuotesContextType = {
  homeQuotes: Quote[] | [];
  changeOneHomeQuote: (idx: number) => void;
  getCategoryQuotes: (category: string) => void;
};

export const QuotesContext = createContext({} as QuotesContextType);

export const QuotesProvider = ({ children }: ChildrenProps) => {
  const [allQuotes, setAllQuotes] = useState([] as Quote[]);
  const [categoryQuotes, setCategoryQuotes] = useState([] as Quote[]);
  const [homeQuotes, setHomeQuotes] = useState([] as Quote[]);

const changeAllHomeQuotes = (quotes: Quote[]) => {
  const randomIndexes: number[] = [];
  while(randomIndexes.length < 3){
    const randomIndex = Math.floor(Math.random() * quotes.length);
    if(!randomIndexes.includes(randomIndex)){
      randomIndexes.push(randomIndex);
    }
  }
  const randomQuotes = randomIndexes.map((index) => quotes[index]);
  setHomeQuotes(randomQuotes);
};

const changeOneHomeQuote = (idx: number) => {
  const possibleQuotes = categoryQuotes.filter((quote) => !homeQuotes.includes(quote));
  const randomIndex = Math.floor(Math.random() * possibleQuotes.length);
  const newHomeQuotes = homeQuotes.splice(idx, 1, possibleQuotes[randomIndex]);
  console.log(newHomeQuotes);
};

  const getQuotes = async () => {
    const allQuotes = await getAllQuotes();
    setAllQuotes(allQuotes);
    setCategoryQuotes(allQuotes);
    changeAllHomeQuotes(allQuotes);
  };

  const getCategoryQuotes = async (category: string) => {
    const categoryQuotes = await getQuotesByCategory(category);
    setCategoryQuotes(categoryQuotes);
    changeAllHomeQuotes(categoryQuotes);
  };

  useEffect(() => {
    getQuotes();
  }, []);

  const providerValue = {
    homeQuotes,
    changeOneHomeQuote,
    getCategoryQuotes
  };

  return (
    <QuotesContext.Provider value={providerValue}>
      {children}
    </QuotesContext.Provider>
  );
};
