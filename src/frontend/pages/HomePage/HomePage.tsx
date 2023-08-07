import React, { useState } from "react";
import { useQuotes, useUsers } from "../../../backend/context-hooks";
import "./HomePage.css";
import CategorySelect from "../../components/CategorySelect";
import QuoteCard from "../../components/QuoteCard";

function HomePage() {
  const { homeQuotes, getCategoryQuotes, changeOneHomeQuote } = useQuotes();
  const { username, favorites } = useUsers().activeUser;
  const [searchCategory, setSearchCategory] = useState("all");

  const searchQuotes = () => {
    getCategoryQuotes(searchCategory);
  };

  const changeOneQuote = (idx: number) => {
    changeOneHomeQuote(idx);
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
          const isFavorite = favorites.includes(quote.quoteId);
          const isUser = username !== "";

          return (
            <QuoteCard
              key={`card-${idx}`}
              cardData={quote}
              idx={idx}
              isFavorite={isFavorite}
              isUser={isUser}
              changeOne={changeOneQuote}
            />
          );
        })}
      </div>
    </section>
  );
}

export default HomePage;
