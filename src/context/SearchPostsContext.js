
import React, { useState, useEffect, useContext, createContext } from 'react'

const SearchPostsContext = createContext()

export const useSearchPostsContext = () => useContext(SearchPostsContext)

export const SearchPostsProvider = ({children}) => {

    const [searchValue, setSearchValue] = useState('')


    return(
        <SearchPostsContext.Provider value={[searchValue, setSearchValue]}>
            {children}
        </SearchPostsContext.Provider>
    )
}