export default function SearchBar({
  value,
  onChange,
  resultCount,
  totalCount,
  placeholder = "제목 또는 작가명으로 검색",
}) {
  const isSearching = value.trim().length > 0;

  return (
    <section
      style={{
        marginBottom: "16px",
        padding: "14px",
        border: "1px solid #e5e5e5",
        borderRadius: "8px",
        background: "#fff",
      }}
    >
      <label
        htmlFor="book-search"
        style={{
          display: "block",
          marginBottom: "6px",
          color: "#555",
          fontSize: "13px",
          fontWeight: "bold",
        }}
      >
        도서 검색
      </label>
      <input
        id="book-search"
        type="search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        style={{
          width: "100%",
          padding: "10px 12px",
          boxSizing: "border-box",
          borderRadius: "6px",
          border: "1px solid #ccc",
          fontSize: "14px",
          outlineColor: "#4f8cff",
        }}
      />
      <p
        style={{
          margin: "8px 0 0 0",
          color: "#777",
          fontSize: "12px",
          textAlign: "left",
        }}
      >
        {isSearching
          ? `${totalCount}권 중 ${resultCount}권이 검색되었습니다.`
          : "검색어를 입력하면 제목 또는 작가명이 해당 글자로 시작하는 책만 표시됩니다."}
      </p>
    </section>
  );
}
