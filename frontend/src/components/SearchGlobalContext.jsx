import React, { createContext, useState, useEffect } from 'react';

export const SearchGlobalContext = createContext();

export const SearchGlobalProvider = ({ children }) => {
  const [searchData, setSearchData] = useState(() => {
    const savedData = localStorage.getItem('searchData');
    return savedData ? JSON.parse(savedData) : null;
  });

  useEffect(() => {
    if (searchData) {
      localStorage.setItem('searchData', JSON.stringify(searchData));
    } else {
      localStorage.removeItem('searchData');
    }
  }, [searchData]);

  return (
    <SearchGlobalContext.Provider value={{ searchData, setSearchData }}>
      {children}
    </SearchGlobalContext.Provider>
  );
};
