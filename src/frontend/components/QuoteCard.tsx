import { Quote } from "../../types";
import { TfiReload } from "react-icons/tfi";
import { MdFavorite, MdFavoriteBorder } from "react-icons/md";

type QuoteCardProps = {
  cardData: Quote;
  idx: number;
  isFavorite: boolean;
  isUser: boolean;
  changeOne: (idx: number) => void;
  toggleFavorite: (favoriteStatus: boolean, idx: number) => void;
};

const QuoteCard = (props: QuoteCardProps) => {
  const { cardData, idx, isFavorite, isUser, changeOne, toggleFavorite } =
    props;
  const { quote, author, category } = cardData;

  return (
    <div className="quote-card">
      <h2 className="card-category">{category}</h2>
      
      <div className="card-content">
        <p className="quote">{quote}</p>
        <p className="author">- {author}</p>
      </div>
      <div className="card-btns">
      <button
          className="card-btn"
          onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
            e.preventDefault();
            changeOne(idx);
          }}
        >
          <TfiReload className="icon reload" />
        </button>
        
        {isUser && (
          <button
            className="card-btn"
            onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
              e.preventDefault();
              toggleFavorite(isFavorite, idx);
            }}
          >
            {isFavorite ? (
              <MdFavorite className="icon favorite" />
            ) : (
              <MdFavoriteBorder className="icon favorite" />
            )}
          </button>
        )}
      </div>
    </div>
  );
};

export default QuoteCard;
