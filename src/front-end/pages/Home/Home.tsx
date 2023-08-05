import { useEffect, useState } from "react";
import "./Home.css";
import { Quote } from "../../../../types";
import { getQuotesByCategory } from "../../../backend/db-actions";
import { useQuotesContext } from "../../../backend/custom-hooks";
import { CategorySelect } from "../../components/CategorySelect";

type HomeQuotesType = {
  ["quoteOne"]: Quote;
  quoteTwo: Quote;
  quoteThree: Quote;
};

const initHomeQuotes = {
  quoteOne: {} as Quote,
  quoteTwo: {} as Quote,
  quoteThree: {} as Quote,
};

export default function Home() {
  const { allQuotes } = useQuotesContext();
  const [categoryQuotes, setCategoryQuotes] = useState([] as Quote[]);
  const [homeQuotes, setHomeQuotes] = useState(initHomeQuotes as HomeQuotesType);
  const [searchCategory, setSearchCategory] = useState("all");
  const activeArray = homeQuotes ? Object.values(homeQuotes) : [];

  function getRandomIndexes(quantity: number) {
    const randomIndexes: number[] = [];
    while (randomIndexes.length < 3) {
      const randomIdx = Math.floor(Math.random() * quantity);
      if (!randomIndexes.includes(randomIdx)) randomIndexes.push(randomIdx);
    }
    return randomIndexes;
  }

  const changeAllActiveQuotes = (quoteArray: Quote[]) => {
    const [idxOne, idxTwo, idxThree] = getRandomIndexes(quoteArray.length);
    setHomeQuotes({
      quoteOne: quoteArray[idxOne],
      quoteTwo: quoteArray[idxTwo],
      quoteThree: quoteArray[idxThree]
    });
  };

  const updateSearchCategory = (e: { target: { value: string } }) => {
    setSearchCategory(e.target.value);
  };

  const searchByCategory = async () => {
    const searchQuotes = await getQuotesByCategory(searchCategory);
    changeAllActiveQuotes(searchQuotes);
    setCategoryQuotes(searchQuotes);
  };

  useEffect(() => {
    changeAllActiveQuotes(allQuotes);
  }, []);

  console.log(allQuotes);
  console.log(homeQuotes);
  console.log(activeArray);


  //   const changeOneActiveQuote = (idx: number) => {

  //   };

  //   const updateSearchCategory = (e: { target: { value: string } }) => {
  //     setSearchCategory(e.target.value);
  //   };

    // useEffect(() => {
    //   changeAllActiveQuotes(allQuotes);
    // }, []);

  return (
    <section className="home page">
      <div className="home-header">
        <p>
          Welcome to Soul Quotes! This is a place to find inspiration and share
          your own quotes.
        </p>
      </div>

      <div className="category-search">
        <span className="label-select">Search By Category: </span>
        <CategorySelect value={searchCategory} update={updateSearchCategory} />
        <button className="search-btn" onClick={searchByCategory}>
          Search
        </button>
      </div>

      <div className="active-quotes flex-align-center">
        {/* {Object.values(activeQuotes).map((data, idx) => {
          const quote = data as Quote;
          return (
            <QuoteCard
              key={quote.id}
              quoteData={quote}
              idx={idx}
              changeOne={changeOneActiveQuote}
            />
          );
        })} */}
      </div>
    </section>
  );
}
