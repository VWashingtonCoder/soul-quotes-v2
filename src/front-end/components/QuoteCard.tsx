import { Quote } from "../../../types";
import { useUsersContext, useQuotesContext } from "../../backend/custom-hooks";
import { TfiReload } from "react-icons/tfi";
import { BsFillTrashFill } from "react-icons/bs";
import { MdFavorite, MdFavoriteBorder } from "react-icons/md";

type QuoteCardProps = {
  quoteData: Quote;
  idx: number;
  changeOne: (idx: number) => void;
};

export default function QuoteCard({
  quoteData,
  idx,
  changeOne,
}: QuoteCardProps) {
  const { quoteId, quote, category, author } = quoteData;
  const { activeUser } = useUsersContext();
  // const { favoriteQuotes, addToFavorites, removeFromFavorites } = useQuotesContext;();

  return (
    <div className="quote-card" key={quoteId}>
      <div className="card-bar flex-align-center">
        <div className="card-bar-left">
          <TfiReload className="icon reload" onClick={() => changeOne(idx)} />
        </div>
        <h2 className="card-bar-center">{category.toUpperCase()}</h2>
        <div className="card-bar-right">
          {/* {userId ? (
            <button 
              className="icon-btn" 
              onClick={(e) => {
                e.preventDefault();
                // removeFromFavorites(quoteId)
              }}
            >
              <MdFavorite className="icon favorite" />
            </button>
            
          ) : (
            <button 
              className="icon-btn" 
              onClick={(e) => {
                e.preventDefault();
                addToFavorites(quoteId)
              }}
            >
              <MdFavoriteBorder className="icon unfavorite" />
            </button>
            
          )} */}
        </div>
      </div>
      <div className="card-body">
        <p className="quote">{quote}</p>
        <p className="author">{author}</p>
      </div>
      {/* {userId === creatorId && <BsFillTrashFill className="icon trash" />} */}
    </div>
  );
}