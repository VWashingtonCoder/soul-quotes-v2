import React, { useState } from "react";
import "./HomePage.css";
import CategorySelect from "../../components/CategorySelect";

function HomePage() {
    const [searchCategory, setSearchCategory] = useState("all");

  return (
    <section className="page home">
      <div className="home-header">
          Welcome to Soul Quotes! This is a place to find inspiration and share your own quotes.
      </div>

    <CategorySelect 
        label="Search By Category: "
        btnClick={() => console.log(searchCategory)}
        value={searchCategory}
        onChange={(e) => setSearchCategory(e.target.value)}
    />

    </section>
  );
}

export default HomePage;
