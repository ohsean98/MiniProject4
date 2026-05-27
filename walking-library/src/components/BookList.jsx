import { BookOpen, Heart } from "lucide-react";

export default function BookList({ books, selectedBook, onSelectBook, horizontal, emptyMessage = "등록된 도서가 없습니다." }) {
  return (
    <section style={{ flex: horizontal ? "none" : 1 }}>
      <h3 style={{ marginTop: 0, display: "inline-flex", alignItems: "center", justifyContent: "center", gap: "6px" }}>
        {horizontal ? (
          <>
            <Heart size={18} fill="currentColor" aria-hidden="true" />
            인기 도서
            <Heart size={18} fill="currentColor" aria-hidden="true" />
          </>
        ) : (
          <>
            <BookOpen size={18} aria-hidden="true" />
            나의 도서 목록 ({books.length}권)
          </>
        )}
      </h3>
      {books.length === 0 && (
        <p style={{ margin: 0, padding: "18px", border: "1px dashed #ccc", borderRadius: "6px", color: "#777", textAlign: "center", background: "#fafafa" }}>
          {emptyMessage}
        </p>
      )}
      <div style={{
        display: "flex",
        flexDirection: horizontal ? "row" : "column",
        overflow: horizontal ? "auto" : "visible",
        gap: "10px"
      }}>
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
                minWidth: horizontal ? "150px" : "auto",
                cursor: "pointer",
                borderRadius: "6px",
                transition: "background 0.2s",
                background: isCurrent ? "#e6f7ff" : "#fff",
                boxShadow: isCurrent ? "0 2px 4px rgba(0,0,0,0.05)" : "none"
              }}
            >
              <strong style={{ display: "block", marginBottom: "5px" }}>{book.title}</strong>
              <div style={{ fontSize: "12px", color: "#666" }}>등록일: {new Date(book.createdAt).toLocaleDateString("ko-KR")}</div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
