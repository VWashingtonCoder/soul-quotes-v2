import { useState } from "react";
import { useQuotes, useUsers } from "../../../backend/context-hooks";
import "./FavoritesPage.css";
import CategorySelect from "../../components/CategorySelect";

function FavoritesPage() {
    const { allQuotes } = useQuotes();
    const { userFavorites } = useUsers();
    const initFilteredQuotes = allQuotes.filter((quote) => userFavorites.includes(quote.quoteId));
    const [filteredQuotes, setFilteredQuotes] = useState(initFilteredQuotes);
    const [filterCategory, setFilterCategory] = useState("all");

    const filterQuotesByCategory = (category: string) => {
        if (category !== "all") {
            const filteredCategoryQuotes = initFilteredQuotes.filter((quote) => quote.category === category);
            const filteredFavoriteQuotes = filteredCategoryQuotes.filter((quote) => userFavorites.includes(quote.quoteId));
            setFilteredQuotes(filteredFavoriteQuotes);
        } else setFilteredQuotes(initFilteredQuotes);
    };

  return (
    <section className="favorites-page">
        <header className="favorites-header">
            <h2 className="head-title">Favorites</h2>
            <p className="head-subtitle">Here are all your favorite quotes!</p>
        </header>
        
        <div className="favorites-filter">
            <CategorySelect 
                label="Filter by category" 
                btnClick={() => filterQuotesByCategory(filterCategory)} 
                value={filterCategory} 
                onChange={(e) => setFilterCategory(e.target.value)} 
            />
        </div>



    </section>
  );
}

export default FavoritesPage;
