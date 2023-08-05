type SelectProps = {
  value: string;
  //   change?: (e: {
  //     target: {
  //       name: string,
  //       value: string
  //     };
  //   }) => void;
  update?: (e: {
    target: {
      value: string;
    };
  }) => void;
};

const categories = [
  { key: "all", label: "All Categories" },
  { key: "inspirational", label: "Inspirational" },
  { key: "love", label: "Love/Relationships" },
  { key: "philosophy", label: "Philosophy" },
  { key: "success", label: "Career/Success" },
  { key: "funny", label: "Funny" },
];

export function CategorySelect({
  // change,
  update,
  value,
}: SelectProps) {
  return (
    <select
      className="search-select"
      onChange={update}
    //   onChange={update ? update : change}
      name="category"
      value={value}
    >
      {categories.map((category) => (
        <option key={category.key} value={category.key}>
          {category.label}
        </option>
      ))}
    </select>
  );
}
