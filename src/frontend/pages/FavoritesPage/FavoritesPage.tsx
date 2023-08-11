import { useEffect, useState } from "react";
import { Quote } from "../../../types";
import { useQuotes, useUsers } from "../../../backend/context-hooks";
import { MdFavorite } from "react-icons/md";
import "./FavoritesPage.css";
import CategorySelect from "../../components/CategorySelect";

function FavoritesPage() {
  const { allQuotes } = useQuotes();
  const { userFavorites, removeFromFavorites } = useUsers();
  const [filteredQuotes, setFilteredQuotes] = useState([] as Quote[]);
  const [filterCategory, setFilterCategory] = useState("all");

  const filterQuotesByCategory = (category: string) => {
    let favoriteQuotes = allQuotes.filter((quote) =>
      userFavorites.includes(quote.quoteId)
    );

    if (category !== "all") {
      const favoriteCategoryQuotes = favoriteQuotes.filter(
        (quote) => quote.category === filterCategory
      );
      favoriteQuotes = favoriteCategoryQuotes;
    }

    setFilteredQuotes(favoriteQuotes);
  };

  useEffect(() => {
    filterQuotesByCategory(filterCategory);
  }, [allQuotes, userFavorites]);

  return (
    <section className="page favorites">
      <header className="favorites-header">
        <h2 className="head-title">Favorites</h2>
        <p className="head-subtitle">Here are all your favorite quotes!</p>
      </header>

      <CategorySelect
        label="Filter by category"
        btnClick={() => filterQuotesByCategory(filterCategory)}
        value={filterCategory}
        onChange={(e) => setFilterCategory(e.target.value)}
      />

      <table className="favorites-table">
        <thead>
          <tr>
            <th className="head quote-col">Quote</th>
            <th className="head author-col">Author</th>
            <th className="head category-col">Category</th>
            <th className="head icons-col"></th>
          </tr>
        </thead>
        <tbody>
          {filteredQuotes.map((quote) => (
            <tr key={quote.quoteId}>
              <td className="quote-col cell">{quote.quote}</td>
              <td className="author-col cell">{quote.author}</td>
              <td className="category-col cell">{quote.category}</td>
              <td className="icons-col cell">
                <button
                  className="favorite-btn"
                  onClick={() => removeFromFavorites(quote.quoteId)}
                >
                  {/*add clear-btn class*/}
                  <MdFavorite className="icon favorite" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}

export default FavoritesPage;
