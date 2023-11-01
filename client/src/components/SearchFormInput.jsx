export const SearchFormInput = ({ searchInputChangeHandler, searchValue }) => {
  return (
    <input
      type="text"
      placeholder="Please, select the search criteria"
      name="search"
      value={searchValue}
      onInput={searchInputChangeHandler}
    />
  );
};
