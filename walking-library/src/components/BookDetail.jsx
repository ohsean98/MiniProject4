export default function BookDetail({ selectedBook, onStartEdit, onDelete, onClose }) {
  
  // 표지 이미지가 없거나 플레이스홀더(더미) 주소인 경우를 체크하는 기준
  const hasNoImage = 
    !selectedBook?.coverImageUrl || 
    selectedBook?.coverImageUrl.includes("via.placeholder.com") || 
    selectedBook?.coverImageUrl === "";

  return (
    <section style={{ flex: 1, border: "1px solid #ccc", padding: "15px", borderRadius: "8px", background: "#fff", position: "relative" }}>
      
      {/* 우측 상단 닫기 버튼 */}
      {selectedBook && (
        <button 
          onClick={onClose}
          style={{
            position: "absolute",
            top: "15px",
            right: "15px",
            background: "none",
            border: "none",
            fontSize: "20px",
            cursor: "pointer",
            color: "#999"
          }}
          title="상세 정보 닫기"
        >
          ✖
        </button>
      )}

      <h3 style={{ marginTop: 0 }}>🔍 도서 상세 정보</h3>
      
      {selectedBook ? (
        <div>
          {/* 표지 영역 레이아웃 */}
          <div style={{ marginBottom: "15px", textAlign: "center", background: "#f5f5f5", padding: "15px", borderRadius: "6px" }}>
            
            {hasNoImage ? (
              /* 💡 이미지가 없을 때 노출되는 회색 안내 박스 (요청하신 스타일) */
              <div style={{ 
                width: "150px", 
                height: "220px", 
                backgroundColor: "#ccc", 
                color: "#666", 
                display: "inline-flex", 
                alignItems: "center", 
                justifyContent: "center", 
                fontSize: "13px", 
                fontWeight: "bold",
                borderRadius: "4px",
                border: "1px solid #aaa",
                boxShadow: "0 4px 6px rgba(0,0,0,0.05)",
                padding: "10px",
                boxSizing: "border-box",
                textAlign: "center"
              }}>
                생성된 이미지가 없습니다!
              </div>
            ) : (
              /* 이미지가 있을 때 노출되는 태그 */
              <img 
                src={selectedBook.coverImageUrl} 
                alt="표지 이미지" 
                style={{ width: "150px", height: "220px", objectFit: "cover", border: "1px solid #aaa", boxShadow: "0 4px 6px rgba(0,0,0,0.1)", borderRadius: "4px" }} 
              />
            )}

            <div style={{ marginTop: "12px" }}>
              <button 
                onClick={() => alert("2일차 OpenAI API 연동 대상 기능입니다.")} 
                style={{ background: "#28a745", color: "#fff", border: "none", padding: "8px 12px", borderRadius: "4px", cursor: "pointer", fontWeight: "bold" }}
              >
                🪄 AI 표지 생성 (2일차 미션)
              </button>
            </div>
          </div>

          <h4 style={{ fontSize: "18px", margin: "10px 0 5px 0" }}>{selectedBook.title}</h4>
          <p style={{ fontSize: "14px", color: "#555", margin: "0 0 10px 0" }}>저자: {selectedBook.author}</p>
          <p style={{ fontSize: "12px", color: "#888", marginBottom: "15px" }}>
            작성일: {selectedBook.createdAt} | 수정일: {selectedBook.updatedAt}
          </p>
          <p style={{ whiteSpace: "pre-wrap", background: "#f8f9fa", padding: "12px", borderRadius: "4px", border: "1px solid #edf2f7", lineHeight: "1.5" }}>
            {selectedBook.content}
          </p>
          
          <hr style={{ border: "0", borderTop: "1px solid #eee", margin: "15px 0" }} />
          
          <button onClick={onStartEdit} style={{ marginRight: "10px", padding: "6px 12px", cursor: "pointer" }}>
            수정하기
          </button>
          <button 
            onClick={() => onDelete(selectedBook.id)} 
            style={{ background: "#dc3545", color: "#fff", border: "none", padding: "6px 12px", borderRadius: "4px", cursor: "pointer" }}
          >
            삭제하기
          </button>
        </div>
      ) : (
        <p style={{ color: "#999", textAlign: "center", marginTop: "40px" }}>목록에서 책을 선택하면 상세 내용이 표시됩니다.</p>
      )}
    </section>
  );
}