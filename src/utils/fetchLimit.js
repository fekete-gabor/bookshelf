const array = [10, 15, 20, 25, 30, 35, 40];

export const fetchLimit = array.map((value) => {
  return (
    <option value={value} key={value}>
      {value}
    </option>
  );
});
