import React, { useState, useEffect } from "react";

const SearchBar = ({ setApprovedArtwork, backupData, setShowIntro, showIntro }) => {
  const [searchInput, setSearchInput] = useState('');

  useEffect(() => {
    const filteredArtWork = backupData.filter((artWork) => {
      if (artWork.country && artWork.city) {
        return (artWork.title.toLowerCase().includes(searchInput.toLowerCase())) ||
          (artWork.artist_name.toLowerCase().includes(searchInput.toLowerCase())) ||
          (artWork.country.toLowerCase().includes(searchInput.toLowerCase())) ||
          (artWork.city.toLowerCase().includes(searchInput.toLowerCase())) ||
          (artWork.content_text.toLowerCase().includes(searchInput.toLowerCase()));
      } else return (artWork.title.toLowerCase().includes(searchInput.toLowerCase())) ||
        (artWork.artist_name.toLowerCase().includes(searchInput.toLowerCase())) ||
        (artWork.content_text.toLowerCase().includes(searchInput.toLowerCase()));
    });
    setApprovedArtwork(filteredArtWork);
    if (searchInput === '') setApprovedArtwork(backupData);

  }, [searchInput]);

  return (
    <div key="searchbar" className="search-input-wrapper">
      <i className="fas fa-search"></i>
      <input
        type="text"
        className="search-bar"
        placeholder="Search by title, name, country, city or text ..."
        value={searchInput}
        onChange={(e) => {
          setSearchInput(e.target.value);
          if (showIntro) setShowIntro(false);
        }}
      />
    </div>
  );
}

export default SearchBar;