import React from 'react'
import { Provider, History, Trigger } from 'react-history-search'

const Search = () => {
  const handleSearch = (value) => {}
  return (
    <div>
      <Provider
        value={{
          handleSearch,
          isEnterDown: true
        }}
      >
        <History isHint isRemoveHistory isEnterDown isTabFill>
          <input className="w-full rounded px-4 py-2 outline-none border " />
        </History>
      </Provider>
    </div>
  )
}

export default Search
