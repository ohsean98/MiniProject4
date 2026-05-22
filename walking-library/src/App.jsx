import { useState, useEffect } from "react";
import Header from "./components/Header";
import BookForm from "./components/BookForm";
import BookList from "./components/BookList";
import BookDetail from "./components/BookDetail";

export default function App() {
  const dbAddress = "http://localhost:3000/books";

  const [books, setBooks] = useState([]);
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [content, setContent] = useState("");
  const [selectedBook, setSelectedBook] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  const fetchBooks = async () => {
    const res = await fetch(dbAddress);
    const data = await res.json();
    setBooks(data);
  };

 useEffect(() => {
  const loadInitialData = async () => {
    try {
      const res = await fetch(dbAddress);
      const data = await res.json();
      setBooks(data);
    } catch (err) {
      console.error("데이터 로딩 실패:", err);
    }
  };

  loadInitialData();
}, []);

  const handleSave = async (e) => {
    e.preventDefault();

    if (!title.trim() || !author.trim() || !content.trim()) {
      alert("모든 필드를 입력해주세요! (공백 금지)");
      return;
    }

    // 현재 시각을 ISO 형식으로 저장
    const nowISO = new Date().toISOString();

    if (isEditing) {
      await fetch(`${dbAddress}/${selectedBook.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...selectedBook,
          title,
          author,
          content,
          updatedAt: nowISO, // 수정 시각 업데이트
        }),
      });
      setIsEditing(false);
    } else {
      await fetch(dbAddress, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          author,
          content,
          coverImageUrl: "",
          createdAt: nowISO, // 최초 생성 시각
          updatedAt: nowISO,
        }),
      });
    }

    setTitle("");
    setAuthor("");
    setContent("");
    setSelectedBook(null);
    fetchBooks();
  };

  const handleDelete = async (id) => {
    if (window.confirm("정말 삭제하시겠습니까?")) {
      await fetch(`${dbAddress}/${id}`, { method: "DELETE" });
      setSelectedBook(null);
      fetchBooks();
    }
  };

  const startEdit = () => {
    setTitle(selectedBook.title);
    setAuthor(selectedBook.author);
    setContent(selectedBook.content);
    setIsEditing(true);
  };

  const cancelEdit = () => {
    setIsEditing(false);
    setTitle("");
    setAuthor("");
    setContent("");
  };

  const handleSelectBook = (book) => {
    setSelectedBook(book);
    setIsEditing(false);
  };

  return (
    <div style={{ padding: "20px", maxWidth: "900px", margin: "0 auto", fontFamily: "sans-serif" }}>
      <Header />
      
      <BookForm 
        title={title}
        setTitle={setTitle}
        author={author}
        setAuthor={setAuthor}
        content={content}
        setContent={setContent}
        isEditing={isEditing}
        onSave={handleSave}
        onCancel={cancelEdit}
      />

      <div style={{ display: "flex", gap: "20px", alignItems: "flex-start" }}>
        <BookList 
          books={books} 
          selectedBook={selectedBook} 
          onSelectBook={handleSelectBook} 
        />
        
        <BookDetail 
          selectedBook={selectedBook} 
          onStartEdit={startEdit} 
          onDelete={handleDelete} 
        />
      </div>
    </div>
  );
}