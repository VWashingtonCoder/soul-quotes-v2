import React, { createContext, useEffect, useState } from "react";
import { ChildrenProps, Favorite, Quote } from "../../../types";
import {
  getAllQuotes,
  getFavoritesByUser,
  // getAllFavorites,
  // addFavorite,
  // deleteFavorite,
} from "../db-actions";
import { checkForLocalUser } from "../../helpers";

export type QuotesContextType = {
  allQuotes: Quote[] | [];
  favoriteQuoteIds: string[] | [];
  getUserFavorites: (userId: string) => void;
  getCategoryQuotes: (category: string) => Quote[];
  // getQuotes: () => void;
  // getCategoryQuotes: (category: string) => void;
  // getFavoriteQuotes: (userId: string) => void;
  // addFavoriteQuote: (userId: string, quoteId: string) => void;
  // deleteFavoriteQuote: (id: number) => void;
};

export const QuotesContext = createContext({} as QuotesContextType);

export const QuotesProvider = ({ children }: ChildrenProps) => {
  const [allQuotes, setAllQuotes] = useState([] as Quote[]);
  const [favoriteQuoteIds, setFavoriteQuoteIds] = useState([] as string[]);
  const errorMessage = 'Oh No😦! We hit an error. Please try again later.';
  
  const getQuotes = () => {
    getAllQuotes()
      .then(quotes => {
        setAllQuotes(quotes);
      })
      .catch(err => {
        console.log(err);
        alert(errorMessage);
      })
  };

  const getUserFavorites = (userId: string) => {
    getFavoritesByUser(userId)
      .then(favorites => {
        const quoteIds = favorites.map((fav: Favorite) => fav.qId);
        setFavoriteQuoteIds(quoteIds);
      })
      .catch(err => {
        console.log(err);
        alert(errorMessage);
      })
  }

  useEffect(() => {
    getQuotes();
    const localUser = checkForLocalUser();
    if (localUser) 
      getFavoritesByUser(localUser.userId);
  }, []);

  useEffect(() => {
    
  }, [])

  const providerValue = {
    allQuotes,
    favoriteQuoteIds,
    getUserFavorites,
    // getQuotes,
    // getCategoryQuotes,
    // getFavoriteQuotes, 
    // addFavoriteQuote,
    // deleteFavoriteQuote
  };

  return (
    <QuotesContext.Provider value={providerValue}>
      {children}
    </QuotesContext.Provider>
  );
};
