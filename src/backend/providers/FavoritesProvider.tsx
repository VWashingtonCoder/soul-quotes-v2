import React, { createContext, useEffect, useState } from "react";
import { ChildrenProps, Quote, Favorite } from "../../types";
import {
  getFavoritesByUser,
  getAllFavorites,
  addFavorite,
  deleteFavorite,
} from "../db-actions";

export type FavoritesContextType = {
  favoriteQuoteIds: string[] | [];
};

export const FavoritesContext = createContext({} as FavoritesContextType);

export const FavoritesProvider = ({ children }: ChildrenProps) => {
  const [favoriteQuoteIds, setFavoriteQuoteIds] = useState([] as string[]);

  const getFavoriteQuotes = async (userId: string) => {};

  const addFavoriteQuote = async (userId: string, quoteId: string) => {};

  const deleteFavoriteQuote = async (id: number) => {};

  const providerValue = {
    favoriteQuoteIds,
  };

  return (
    <FavoritesContext.Provider value={providerValue}>
      {children}
    </FavoritesContext.Provider>
  );
};
