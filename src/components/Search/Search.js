import { useDispatch } from "react-redux";
import { changeSearch } from "../../Redux/reducers/rootReducer";
import "./Search.css";

const Search = ({ searchValue, handleSearch }) => {
  const dispatch = useDispatch();
  const handleChange = (e) => {
    handleSearch(e.target.value);
    dispatch(changeSearch(e.target.value));
  };

  return (
    <div className="search">
      <p>Search by folders and files</p>
      <input
        className="search__input"
        type="text"
        placeholder="Search..."
        onChange={handleChange}
        value={searchValue}
      />
    </div>
  );
};

export default Search;
