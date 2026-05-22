export default function BookList({ books, selectedBook, onSelectBook }) {
  return (
    <section style={{ flex: 1 }}>
      <h3 style={{ marginTop: 0 }}>📖 나의 도서 목록 ({books.length}권)</h3>
      {books.map((book) => {
        const isCurrent = selectedBook?.id === book.id;
        
        return (
          <div
            key={book.id}
            onClick={() => onSelectBook(isCurrent ? null : book)}
            style={{
              padding: "12px",
              border: "1px solid #ddd",
              marginBottom: "10px",
              cursor: "pointer",
              borderRadius: "6px",
              transition: "background 0.2s",
              background: isCurrent ? "#e6f7ff" : "#fff",
              boxShadow: isCurrent ? "0 2px 4px rgba(0,0,0,0.05)" : "none"
            }}
          >
            <strong style={{ display: "block", marginBottom: "5px" }}>{book.title}</strong>
            <div style={{ fontSize: "12px", color: "#666" }}>등록일: {book.createdAt}</div>
          </div>
        );
      })}
    </section>
  );
}