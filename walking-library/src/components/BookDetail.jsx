/* 1. 홈 로 : 상세 안내 (읽기 전용)
 * 2. 마이페이지
 * - 현재 등록된 전체 도서 세로 스크롤
 * - 선택된 도서의 상세 텍스트 정보 표기 및 정보 수정/삭제 기능
 */

export default function BookDetail({ 
  selectedBook, 
  onStartEdit, 
  onDelete, 
  onClose,
  books = [],            // 마이페이지 연동용 목록 데이터
  onSelectBook = null,   // 마이페이지용 도서 클릭 핸들러
  isMyPage = false       // 마이페이지 모드 활성화 스위치
}) {
  
  if (isMyPage) {
    // [마이 페이지 전용 UI 모드]
    return (
      <div style={{ display: "flex", gap: "30px", width: "100%", marginTop: "10px", alignItems: "flex-start" }}>
        
        {/* 1. 좌측 영역*/}
        <div style={{ flex: "0 0 280px", border: "1px solid #e2e8f0", borderRadius: "12px", background: "#fff", padding: "15px", boxSizing: "border-box", maxHeight: "600px", overflowY: "auto", boxShadow: "0 4px 6px -1px rgba(0,0,0,0.05)" }}>
          <h4 style={{ margin: "0 0 12px 0", color: "#334155", fontSize: "15px", borderBottom: "2px solid #f1f5f9", paddingBottom: "8px" }}>✍️ 작성한 도서 목록 ({books.length})</h4>
          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            {books.map((book) => {
              const isSelected = book.id === selectedBook?.id;
              return (
                <div
                  key={book.id}
                  onClick={() => onSelectBook && onSelectBook(book)}
                  style={{
                    padding: "12px",
                    borderRadius: "8px",
                    cursor: "pointer",
                    background: isSelected ? "#eff6ff" : "#f8fafc",
                    border: isSelected ? "1px solid #3b82f6" : "1px solid #e2e8f0",
                    transition: "all 0.2s"
                  }}
                >
                  <strong style={{ display: "block", fontSize: "13px", color: isSelected ? "#1d4ed8" : "#334155", textOverflow: "ellipsis", overflow: "hidden", whiteSpace: "nowrap" }}>{book.title}</strong>
                  <span style={{ fontSize: "11px", color: "#94a3b8" }}>{book.author}</span>
                </div>
              );
            })}
            {books.length === 0 && <p style={{ fontSize: "12px", color: "#94a3b8", textAlign: "center", margin: "20px 0" }}>등록된 도서가 없습니다.</p>}
          </div>
        </div>

        {/* 2. 우측 영역*/}
        <div style={{ flex: 1, border: "1px solid #e2e8f0", borderRadius: "12px", background: "#fff", padding: "30px", boxSizing: "border-box", boxShadow: "0 4px 6px -1px rgba(0,0,0,0.05)" }}>
          {selectedBook ? (
            <div style={{ display: "flex", gap: "30px", alignItems: "flex-start" }}>
              {/* 이미지 선명화 영역 */}
              <div style={{ flex: "0 0 200px" }}>
                <div style={{ width: "100%", height: "290px", background: "#f8fafc", borderRadius: "8px", overflow: "hidden", border: "1px solid #e2e8f0", display: "flex", alignItems: "center", justifyItems: "center", boxShadow: "0 10px 15px -3px rgba(0,0,0,0.1)" }}>
                  {selectedBook.coverImageUrl ? (
                    <img src={selectedBook.coverImageUrl} alt="표지" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                  ) : (
                    <div style={{ fontSize: "12px", color: "#94a3b8", textAlign: "center", width: "100%" }}>📖 표지 없음</div>
                  )}
                </div>
              </div>

              {/* 우상단 텍스트 정보 및 제어부 */}
              <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "15px" }}>
                <div>
                  <span style={{ display: "inline-block", padding: "2px 8px", background: "#eff6ff", color: "#2563eb", borderRadius: "12px", fontSize: "11px", fontWeight: "bold", marginBottom: "6px" }}>{selectedBook.genre || "일반"}</span>
                  <h3 style={{ margin: "0 0 5px 0", fontSize: "26px", color: "#1e293b" }}>{selectedBook.title}</h3>
                  <p style={{ margin: 0, fontSize: "15px", color: "#475569" }}>{selectedBook.author} 작가</p>
                </div>

                <div style={{ borderTop: "1px solid #f1f5f9", borderBottom: "1px solid #f1f5f9", padding: "8px 0", fontSize: "12px", color: "#64748b" }}>
                  <strong>작성일:</strong> {selectedBook.createdAt ? new Date(selectedBook.createdAt).toLocaleDateString() : "미지정"}
                </div>

                <div>
                  <h4 style={{ margin: "0 0 6px 0", fontSize: "14px", color: "#334155" }}>줄거리 정보</h4>
                  <div style={{ fontSize: "14px", lineHeight: "1.6", color: "#334155", whiteSpace: "pre-wrap", background: "#f8fafc", padding: "15px", borderRadius: "6px", border: "1px solid #f1f5f9", minHeight: "120px" }}>
                    {selectedBook.content}
                  </div>
                </div>

                {/* 기능 버튼 */}
                <div style={{ display: "flex", gap: "8px", marginTop: "5px" }}>
                  <button 
                    onClick={onStartEdit}
                    style={{ flex: 1, padding: "10px", background: "#1e293b", color: "#fff", border: "none", borderRadius: "6px", cursor: "pointer", fontWeight: "bold", fontSize: "13px" }}
                  >
                    ✏️ 정보 수정하기
                  </button>
                  <button 
                    onClick={() => onDelete(selectedBook.id)}
                    style={{ padding: "10px 20px", background: "#fee2e2", color: "#ef4444", border: "none", borderRadius: "6px", cursor: "pointer", fontWeight: "bold", fontSize: "13px" }}
                  >
                    삭제
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "300px", color: "#94a3b8" }}>
              <span style={{ fontSize: "40px", marginBottom: "10px" }}>👈</span>
              <p style={{ fontSize: "14px", margin: 0 }}>좌측 목록에서 확인 혹은 관리할 도서를 선택해 주세요.</p>
            </div>
          )}
        </div>
      </div>
    );
  }

  // [기존 홈 화면 컴포넌트 하단 전용]
  if (!selectedBook) return null;
  const hasNoImage = !selectedBook?.coverImageUrl || selectedBook?.coverImageUrl === "";

  return (
    <section style={{ width: "100%", boxSizing: "border-box", border: "1px solid #e2e8f0", padding: "40px", borderRadius: "15px", background: "#fff", position: "relative", marginTop: "30px", boxShadow: "0 10px 25px rgba(0,0,0,0.05)" }}>
      <button onClick={onClose} style={{ position: "absolute", top: "20px", right: "20px", background: "#f1f5f9", border: "none", width: "35px", height: "35px", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", color: "#64748b", fontSize: "16px" }}>✕</button>
      <div style={{ display: "flex", gap: "50px", alignItems: "flex-start" }}>
        <div style={{ flex: "0 0 350px" }}>
          <div style={{ width: "100%", height: "520px", background: "#f8fafc", borderRadius: "10px", overflow: "hidden", boxShadow: "0 15px 35px rgba(0,0,0,0.15)", border: "1px solid #f1f5f9", display: "flex", alignItems: "center", justifyContent: "center" }}>
            {hasNoImage ? (
              <div style={{ textAlign: "center", padding: "20px" }}>
                <span style={{ fontSize: "50px", display: "block", marginBottom: "10px" }}>📖</span>
                <p style={{ color: "#94a3b8", fontSize: "14px", fontWeight: "500" }}>등록된 표지가 없습니다</p>
              </div>
            ) : (
              <img src={selectedBook.coverImageUrl} alt="도서 표지" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            )}
          </div>
        </div>
        <div style={{ flex: "1", display: "flex", flexDirection: "column", gap: "20px" }}>
          <div>
            <span style={{ display: "inline-block", padding: "4px 12px", background: "#eff6ff", color: "#2563eb", borderRadius: "20px", fontSize: "12px", fontWeight: "bold", marginBottom: "12px" }}>{selectedBook.genre || "일반도서"}</span>
            <h2 style={{ margin: "0 0 10px 0", fontSize: "36px", color: "#1e293b", letterSpacing: "-1px" }}>{selectedBook.title}</h2>
            <p style={{ margin: 0, fontSize: "20px", color: "#475569", fontWeight: "500" }}>{selectedBook.author} <span style={{ fontSize: "14px", color: "#94a3b8", fontWeight: "normal" }}>저자</span></p>
          </div>
          <div style={{ display: "flex", gap: "20px", borderTop: "1px solid #f1f5f9", borderBottom: "1px solid #f1f5f9", padding: "15px 0" }}>
            <div style={{ fontSize: "13px", color: "#64748b" }}><strong>작성일:</strong> {selectedBook.createdAt ? new Date(selectedBook.createdAt).toLocaleDateString() : "미지정"}</div>
          </div>
          <div style={{ minHeight: "200px" }}>
            <h4 style={{ margin: "0 0 10px 0", color: "#334155", fontSize: "16px" }}>줄거리 및 본문</h4>
            <div style={{ fontSize: "16px", lineHeight: "1.8", color: "#334155", whiteSpace: "pre-wrap", background: "#f8fafc", padding: "25px", borderRadius: "8px", border: "1px solid #f1f5f9" }}>{selectedBook.content}</div>
          </div>
        </div>
      </div>
    </section>
  );
}