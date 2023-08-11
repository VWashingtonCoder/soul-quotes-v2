import React, { useState } from "react";
import { useQuotes, useUsers } from "../../../backend/context-hooks";
import "./HomePage.css";
import CategorySelect from "../../components/CategorySelect";
import QuoteCard from "../../components/QuoteCard";

function HomePage() {
  const { homeQuotes, getCategoryQuotes, changeOneHomeQuote } = useQuotes();
  const { activeUser, userFavorites, addToFavorites, removeFromFavorites } =
    useUsers();
  const { username } = activeUser;
  const [searchCategory, setSearchCategory] = useState("all");

  const searchQuotes = () => {
    getCategoryQuotes(searchCategory);
  };

  const changeOneQuote = (idx: number) => {
    changeOneHomeQuote(idx);
  };

  const toggleFavorite = (favoriteStatus: boolean, idx: number) => {
    if (!favoriteStatus) addToFavorites(homeQuotes[idx].quoteId);
    else removeFromFavorites(homeQuotes[idx].quoteId);
  };

  return (
    <section className="page home">
      <div className="home-header">
        Welcome to Soul Quotes! This is a place to find inspiration and share
        your own quotes.
      </div>

      <CategorySelect
        label="Search By Category: "
        btnClick={searchQuotes}
        value={searchCategory}
        onChange={(e) => setSearchCategory(e.target.value)}
      />

      <div className="quotes-box flex-between-center">
        {homeQuotes.map((quote, idx) => {
          const isFavorite = userFavorites.includes(quote.quoteId);
          const isUser = username !== undefined;

          return (
            <QuoteCard
              key={`card-${idx}`}
              cardData={quote}
              idx={idx}
              isFavorite={isFavorite}
              isUser={isUser}
              changeOne={changeOneQuote}
              toggleFavorite={toggleFavorite}
            />
          );
        })}
      </div>
    </section>
  );
}

export default HomePage;
