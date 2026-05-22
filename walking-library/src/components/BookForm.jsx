export default function BookForm({ 
  title, 
  setTitle, 
  author,
  setAuthor,
  content, 
  setContent, 
  isEditing, 
  onSave, 
  onCancel 
}) {
  return (
    <section style={{ marginBottom: "30px", background: "#f9f9f9", padding: "15px", borderRadius: "8px", border: "1px solid #eee" }}>
      <h3 style={{ marginTop: 0 }}>{isEditing ? " 도서 수정하기" : "🆕 새 도서 등록하기"}</h3>
      <form onSubmit={onSave}>
        <div style={{ marginBottom: "10px", display: "flex", gap: "10px" }}>
          <input
            type="text"
            placeholder="도서 제목"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            style={{ flex: 2, padding: "8px", boxSizing: "border-box", borderRadius: "4px", border: "1px solid #ccc" }}
          />
          <input
            type="text"
            placeholder="작가지망생 이름"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            style={{ flex: 1, padding: "8px", boxSizing: "border-box", borderRadius: "4px", border: "1px solid #ccc" }}
          />
        </div>
        <div style={{ marginBottom: "10px" }}>
          <textarea
            placeholder="본문 내용을 입력하세요 (AI 표지 생성의 기반이 됩니다)"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows="4"
            style={{ width: "100%", padding: "8px", boxSizing: "border-box", borderRadius: "4px", border: "1px solid #ccc" }}
          />
        </div>
        <button type="submit" style={{ padding: "8px 15px", background: "#007bff", color: "#fff", border: "none", borderRadius: "4px", cursor: "pointer" }}>
          {isEditing ? "수정 완료" : "책 등록하기"}
        </button>
        {isEditing && (
          <button type="button" onClick={onCancel} style={{ marginLeft: "10px", padding: "8px 15px", background: "#6c757d", color: "#fff", border: "none", borderRadius: "4px", cursor: "pointer" }}>
            취소
          </button>
        )}
      </form>
    </section>
  );
}