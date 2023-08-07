import React, { useState } from "react";
import { useQuotes } from "../../../backend/context-hooks";
import "./HomePage.css";
import CategorySelect from "../../components/CategorySelect";

function HomePage() {
    const { homeQuotes, getCategoryQuotes } = useQuotes();
    const [searchCategory, setSearchCategory] = useState("all");

    const searchQuotes = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault(); 
        getCategoryQuotes(searchCategory);
    };

    console.log(homeQuotes);
  return (
    <section className="page home">
      <div className="home-header">
          Welcome to Soul Quotes! This is a place to find inspiration and share your own quotes.
      </div>

    <CategorySelect 
        label="Search By Category: "
        btnClick={searchQuotes}
        value={searchCategory}
        onChange={(e) => setSearchCategory(e.target.value)}
    />

    </section>
  );
}

export default HomePage;
