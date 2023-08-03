import React, { createContext, useEffect, useState } from "react";
import { ChildrenProps, Quote } from "../../types";
import {
  getAllQuotes,
  getQuotesByCategory,
  getFavoritesByUser,
  getAllFavorites,
  addFavorite,
  deleteFavorite,
} from "../db-actions";

type QuotesContextType = {
  activeQuotes: Quote[] | [];
  favoriteQuotes: Quote[] | [];
  getQuotes: () => void;
  getCategoryQuotes: (category: string) => void;
  getFavoriteQuotes: (userId: string) => void;
  addFavoriteQuote: (userId: string, quoteId: string) => void;
  deleteFavoriteQuote: (id: number) => void;
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

  const getFavoriteQuotes = async (userId: string) => {
    const favorites = await getFavoritesByUser(userId);
    const favoriteQuoteIds = favorites.map((favorite) => favorite.qId);
    const favoriteQuotes = allQuotes.filter((quote) =>
      favoriteQuoteIds.includes(quote.quoteId)
    );
    setFavoriteQuotes(favoriteQuotes);
  };

  const addFavoriteQuote = async (userId: string, quoteId: string) => {
    const allFavorites = await getAllFavorites();
    const { id } = allFavorites[allFavorites.length - 1];
    const newFavorite = {
      id: id + 1,
      uId: userId,
      qId: quoteId,
    };
    addFavorite(newFavorite);
    alert("Quote added to favorites!");
  };

  const deleteFavoriteQuote = async (id: number) => {
    deleteFavorite(id);
    alert("Quote removed from favorites!");
  };

  useEffect(() => {
    getQuotes();
  }, []);

  const providerValue = {
    activeQuotes,
    favoriteQuotes,
    getQuotes,
    getCategoryQuotes,
    getFavoriteQuotes, 
    addFavoriteQuote,
    deleteFavoriteQuote
  };

  return (
    <QuotesContext.Provider value={providerValue}>
      {children}
    </QuotesContext.Provider>
  );
};
