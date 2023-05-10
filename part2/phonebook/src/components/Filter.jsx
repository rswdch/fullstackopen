function Filter({ filterText, objArr, onChange }) {
  return (
    <form action="">
      <div>
        filter phonebook entries containing:{" "}
        <input type="text" value={filterText} onChange={onChange} />
      </div>
    </form>
  );
}

export default Filter;
