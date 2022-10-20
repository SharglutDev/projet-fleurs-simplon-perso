interface SearchBarProps {
  onChangeSearch: { (input: string): void };
}

const Searchbar = ({ onChangeSearch }: SearchBarProps) => {
  return (
    <div>
      <input type="search" onChange={(e) => onChangeSearch(e.target.value)} />
    </div>
  );
};

export default Searchbar;
