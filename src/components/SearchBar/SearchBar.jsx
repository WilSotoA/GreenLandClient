/* eslint-disable react/prop-types */
import { useState } from "react";
import { BsSearch } from "react-icons/bs";
import styles from "./SearchBar.module.css";

export const SearchBar = ({
  onSearch,
  searchTerm,
  setSearchTerm,
  clearSearchTerm,
}) => {
  const [errorMessage, setErrorMessage] = useState("");

  const handleSearch = () => {
    if (searchTerm.trim() !== "") {
      onSearch(searchTerm);
    } else {
      setSearchTerm("");
      setErrorMessage("Please enter a valid search term!");
    }
  };

  const handleClearSearch = () => {
    clearSearchTerm();
    setErrorMessage("");
  };

  const handleInputChange = (event) => {
    const { value } = event.target;
    setSearchTerm(value);
    setErrorMessage("");
    onSearch(value);
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Find your product..."
        value={searchTerm}
        onChange={handleInputChange}
        className={styles.seachInput}
      ></input>
      <button onClick={handleSearch} className={styles.button}>
        <BsSearch className={styles.search} />
      </button>
      <div className={styles.error}>{errorMessage}</div>
    </div>
  );
};
