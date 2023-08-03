import React, { createContext, useEffect, useState } from "react";
import { ChildrenProps, Quote } from "../../types";
import { getAllQuotes, getQuotesByCategory, getFavoritesByUser } from "../db-actions";

type QuotesContextType = {
  activeQuotes: Quote[] | [];
  favoriteQuotes: Quote[] | [];
  getQuotes: () => void;
  getCategoryQuotes: (category: string) => void;
};

export const QuotesContext = createContext({} as QuotesContextType);

export const QuotesProvider = ({ children }: ChildrenProps) => {
  const [allQuotes, setAllQuotes] = useState([] as Quote[]);
  const [activeQuotes, setActiveQuotes] = useState([] as Quote[]);
  const [favoriteQuotes, setFavoriteQuotes] = useState([] as Quote[]);

  const getQuotes = async () => {
    const allQuotes = await getAllQuotes();
    setAllQuotes(allQuotes);
    setActiveQuotes(allQuotes);
  };

  const getCategoryQuotes = async (category: string) => {
    const categoryQuotes = await getQuotesByCategory(category);
    setActiveQuotes(categoryQuotes);
  };

  const getFavorites = async (userId: string) => {
    const favorites = await getFavoritesByUser(userId);
    const favoriteQuoteIds = favorites.map((favorite) => favorite.qId);
    const favoriteQuotes = allQuotes.filter((quote) =>
        favoriteQuoteIds.includes(quote.quoteId)
    );
    setFavoriteQuotes(favoriteQuotes);
  };

  useEffect(() => {
    getQuotes();
  }, []);

  const providerValue = {
    activeQuotes,
    favoriteQuotes,
    getQuotes,
    getCategoryQuotes,
    getFavorites,
  };

  return (
    <QuotesContext.Provider value={providerValue}>
      {children}
    </QuotesContext.Provider>
  );
};
