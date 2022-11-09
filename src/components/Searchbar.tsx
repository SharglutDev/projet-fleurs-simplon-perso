interface SearchBarProps {
  onChangeSearch: { (input: string): void };
}

const Searchbar = ({ onChangeSearch }: SearchBarProps) => {
  return (
    <div>
      <input
        className="w-100 py-1 px-2"
        type="search"
        placeholder="Recherche ta belle plante"
        onChange={(e) => onChangeSearch(e.target.value)}
      />
    </div>
  );
};

export default Searchbar;
