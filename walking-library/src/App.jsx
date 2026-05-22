import { useState, useEffect } from "react";
import Header from "./components/Header";
import BookForm from "./components/BookForm";
import BookList from "./components/BookList";
import BookDetail from "./components/BookDetail";

const OPENAI_IMAGE_API_URL = "https://api.openai.com/v1/images/generations";

function buildBookCoverPrompt(book) {
  return [
    "Create a polished vertical book cover illustration.",
    "Use an artistic, publication-ready style suitable for a Korean creative writing app.",
    `Title: ${book.title}`,
    `Author: ${book.author}`,
    `Book content: ${book.content}`,
    "The cover should visually reflect the mood and core theme of the book.",
    "If text is included, keep it minimal and legible.",
    "Do not include mockup borders, UI elements, watermarks, or extra explanation.",
  ].join("\n");
}

function getOpenAiErrorMessage(status, payload) {
  const apiMessage = payload?.error?.message;

  if (status === 401) {
    return "API Key가 올바르지 않습니다. 키를 다시 확인해주세요.";
  }

  if (status === 429) {
    return "요청 한도에 도달했습니다. 잠시 후 다시 시도해주세요.";
  }

  return apiMessage || `OpenAI 요청에 실패했습니다. (status: ${status})`;
}

export default function App() {
  const dbAddress = "http://localhost:3000/books";

  const [books, setBooks] = useState([]);
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [content, setContent] = useState("");
  const [selectedBook, setSelectedBook] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [apiKey, setApiKey] = useState("");
  const [imageModel, setImageModel] = useState("gpt-image-2");
  const [imageSize, setImageSize] = useState("1024x1536");
  const [imageQuality, setImageQuality] = useState("low");
  const [outputFormat, setOutputFormat] = useState("png");
  const [isGeneratingCover, setIsGeneratingCover] = useState(false);
  const [coverError, setCoverError] = useState("");

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

  const handleGenerateCover = async (book) => {
    if (!book) {
      setCoverError("표지를 생성할 도서를 먼저 선택해주세요.");
      return;
    }

    if (!apiKey.trim()) {
      setCoverError("OpenAI API Key를 입력해주세요.");
      return;
    }

    setIsGeneratingCover(true);
    setCoverError("");

    try {
      const prompt = buildBookCoverPrompt(book);

      const openAiRes = await fetch(OPENAI_IMAGE_API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey.trim()}`,
        },
        body: JSON.stringify({
          model: imageModel,
          prompt,
          n: 1,
          size: imageSize,
          quality: imageQuality,
          output_format: outputFormat,
        }),
      });

      if (!openAiRes.ok) {
        const errorPayload = await openAiRes.json().catch(() => null);
        throw new Error(getOpenAiErrorMessage(openAiRes.status, errorPayload));
      }

      const data = await openAiRes.json();
      const b64Json = data.data?.[0]?.b64_json;

      if (!b64Json) {
        throw new Error("OpenAI 응답에서 이미지 데이터를 찾을 수 없습니다.");
      }

      const imageSrc = `data:image/${outputFormat};base64,${b64Json}`;

      const patchRes = await fetch(`${dbAddress}/${book.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ coverImageUrl: imageSrc }),
      });

      if (!patchRes.ok) {
        throw new Error("생성된 표지를 json-server에 저장하지 못했습니다.");
      }

      setBooks((prevBooks) =>
        prevBooks.map((item) =>
          item.id === book.id ? { ...item, coverImageUrl: imageSrc } : item
        )
      );
      setSelectedBook((currentBook) =>
        currentBook?.id === book.id
          ? { ...currentBook, coverImageUrl: imageSrc }
          : currentBook
      );
    } catch (err) {
      setCoverError(err.message || "표지 생성 중 오류가 발생했습니다.");
    } finally {
      setIsGeneratingCover(false);
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();

    if (!title.trim() || !author.trim() || !content.trim()) {
      alert("모든 필드를 입력해주세요! (공백 금지)");
      return;
    }

    // 지정하신 포맷(예: 2026-04-24T09:00:00.000Z)을 완벽히 충족하는 표준 표기법
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
    if (window.confirm("정말 이 책을 삭제하시겠습니까?")) {
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
    setCoverError("");
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
          onClose={() => setSelectedBook(null)}
          apiKey={apiKey}
          setApiKey={setApiKey}
          imageModel={imageModel}
          setImageModel={setImageModel}
          imageSize={imageSize}
          setImageSize={setImageSize}
          imageQuality={imageQuality}
          setImageQuality={setImageQuality}
          outputFormat={outputFormat}
          setOutputFormat={setOutputFormat}
          isGeneratingCover={isGeneratingCover}
          coverError={coverError}
          onGenerateCover={handleGenerateCover}
        />
      </div>
    </div>
  );
}
