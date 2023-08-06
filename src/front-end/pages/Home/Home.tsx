import { useEffect, useState } from "react";
import "./Home.css";
import { Quote } from "../../../../types";
import { useQuotesContext } from "../../../backend/custom-hooks";
import { getRandomIndexes } from "../../../helpers";
import { getQuotesByCategory } from "../../../backend/db-actions";
import QuoteCard from "../../components/QuoteCard";

type HomeQuotesType = {
  ["quoteOne"]: Quote;
  quoteTwo: Quote;
  quoteThree: Quote;
};

const initHomeQuotes: HomeQuotesType = {
  quoteOne: {} as Quote,
  quoteTwo: {} as Quote,
  quoteThree: {} as Quote,
};

export default function Home() {
  const { allQuotes } = useQuotesContext();
  const [homeQuotes, setHomeQuotes] = useState(initHomeQuotes);
  const [searchCategory, setSearchCategory] = useState("all");
  const activeQuotes = Object.values(homeQuotes);

  console.log(activeQuotes);

  const getThreeRandomQuotes = (quoteArray: Quote[]) => {
    const [idxOne, idxTwo, idxThree] = getRandomIndexes(quoteArray.length);
    return {
      quoteOne: quoteArray[idxOne],
      quoteTwo: quoteArray[idxTwo],
      quoteThree: quoteArray[idxThree]
    };
  };

  const changeAllHomeQuotes = () => {
    if (searchCategory !== "all") {
      getQuotesByCategory(searchCategory)
        .then(quotes => {
          setHomeQuotes(getThreeRandomQuotes(quotes));
        })
        .catch(err => {
          console.log(err);
          alert("We hit an error. Please try again later.")
        })
    } else setHomeQuotes(getThreeRandomQuotes(allQuotes));
  }

  useEffect(() => {
    changeAllHomeQuotes()
  }, [])

  console.log(homeQuotes)

  return (
    <section className="home page">
      <header className="home-header">
          Welcome to Soul Quotes! This is a place to find inspiration and share
          your own quotes.
      </header>

      <section className="quote-cards">
        {activeQuotes.map((quoteData, idx) => (
          <QuoteCard quoteData={quoteData} idx={idx}/>
        ))}
        
      </section>


     
    </section> 
  );
}
