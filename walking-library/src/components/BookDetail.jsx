export default function BookDetail({
  selectedBook,
  onStartEdit,
  onDelete,
  onClose,
  apiKey,
  setApiKey,
  imageModel,
  setImageModel,
  imageSize,
  setImageSize,
  imageQuality,
  setImageQuality,
  outputFormat,
  setOutputFormat,
  bookGenre,
  setBookGenre,
  coverStyle,
  setCoverStyle,
  isGeneratingCover,
  coverError,
  onGenerateCover,
}) {
  const hasNoImage =
    !selectedBook?.coverImageUrl ||
    selectedBook?.coverImageUrl.includes("via.placeholder.com") ||
    selectedBook?.coverImageUrl === "";

  const inputStyle = {
    width: "100%",
    padding: "8px",
    boxSizing: "border-box",
    borderRadius: "4px",
    border: "1px solid #ccc",
    background: "#fff",
  };

  const labelStyle = {
    display: "block",
    marginBottom: "4px",
    color: "#555",
    fontSize: "12px",
    fontWeight: "bold",
    textAlign: "left",
  };

  return (
    <section style={{ flex: 1, border: "1px solid #ccc", padding: "15px", borderRadius: "8px", background: "#fff", position: "relative" }}>
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
            color: "#999",
          }}
          title="상세 정보 닫기"
        >
          ✖
        </button>
      )}

      <h3 style={{ marginTop: 0 }}>🔍 도서 상세 정보</h3>

      {selectedBook ? (
        <div>
          <div style={{ marginBottom: "15px", textAlign: "center", background: "#f5f5f5", padding: "15px", borderRadius: "6px" }}>
            {hasNoImage ? (
              <div
                style={{
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
                  textAlign: "center",
                }}
              >
                생성된 이미지가 없습니다!
              </div>
            ) : (
              <img
                src={selectedBook.coverImageUrl}
                alt="표지 이미지"
                style={{ width: "150px", height: "220px", objectFit: "cover", border: "1px solid #aaa", boxShadow: "0 4px 6px rgba(0,0,0,0.1)", borderRadius: "4px" }}
              />
            )}

            <div style={{ marginTop: "14px", padding: "12px", background: "#fff", border: "1px solid #e5e5e5", borderRadius: "6px" }}>
              <div style={{ marginBottom: "10px" }}>
                <label style={labelStyle} htmlFor="openai-api-key">
                  OpenAI API Key
                </label>
                <input
                  id="openai-api-key"
                  type="password"
                  placeholder="sk-..."
                  value={apiKey}
                  onChange={(e) => setApiKey(e.target.value)}
                  style={inputStyle}
                  autoComplete="off"
                />
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px", marginBottom: "10px" }}>
                <div>
                  <label style={labelStyle} htmlFor="book-genre">
                    장르
                  </label>
                  <select
                    id="book-genre"
                    value={bookGenre}
                    onChange={(e) => setBookGenre(e.target.value)}
                    style={inputStyle}
                  >
                    <option value="실용서적">실용서적</option>
                    <option value="판타지">판타지</option>
                    <option value="고전문학">고전문학</option>
                  </select>
                </div>

                <div>
                  <label style={labelStyle} htmlFor="cover-style">
                    표지 스타일
                  </label>
                  <select
                    id="cover-style"
                    value={coverStyle}
                    onChange={(e) => setCoverStyle(e.target.value)}
                    style={inputStyle}
                  >
                    <option value="미니멀">미니멀</option>
                    <option value="일러스트">일러스트</option>
                    <option value="빈티지">빈티지</option>
                    <option value="현대적">현대적</option>
                    <option value="동화풍">동화풍</option>
                  </select>
                </div>

                <div>
                  <label style={labelStyle} htmlFor="image-model">
                    모델
                  </label>
                  <select
                    id="image-model"
                    value={imageModel}
                    onChange={(e) => setImageModel(e.target.value)}
                    style={inputStyle}
                  >
                    <option value="gpt-image-2">gpt-image-2</option>
                    <option value="gpt-image-1.5">gpt-image-1.5</option>
                    <option value="gpt-image-1">gpt-image-1</option>
                    <option value="gpt-image-1-mini">gpt-image-1-mini</option>
                  </select>
                </div>

                <div>
                  <label style={labelStyle} htmlFor="image-size">
                    이미지 크기
                  </label>
                  <select
                    id="image-size"
                    value={imageSize}
                    onChange={(e) => setImageSize(e.target.value)}
                    style={inputStyle}
                  >
                    <option value="1024x1536">1024x1536</option>
                    <option value="1024x1024">1024x1024</option>
                    <option value="1536x1024">1536x1024</option>
                  </select>
                </div>

                <div>
                  <label style={labelStyle} htmlFor="image-quality">
                    품질
                  </label>
                  <select
                    id="image-quality"
                    value={imageQuality}
                    onChange={(e) => setImageQuality(e.target.value)}
                    style={inputStyle}
                  >
                    <option value="low">low</option>
                    <option value="medium">medium</option>
                    <option value="high">high</option>
                  </select>
                </div>

                <div>
                  <label style={labelStyle} htmlFor="output-format">
                    파일 형식
                  </label>
                  <select
                    id="output-format"
                    value={outputFormat}
                    onChange={(e) => setOutputFormat(e.target.value)}
                    style={inputStyle}
                  >
                    <option value="png">png</option>
                    <option value="jpeg">jpeg</option>
                    <option value="webp">webp</option>
                  </select>
                </div>
              </div>

              <p style={{ margin: "0 0 10px 0", color: "#777", fontSize: "12px", lineHeight: "1.4", textAlign: "left" }}>
                생성 버튼을 누르면 OpenAI API 비용이 발생할 수 있습니다. API Key는 화면에서만 입력받고 코드에는 저장하지 않습니다.
              </p>

              {coverError && (
                <p style={{ margin: "0 0 10px 0", color: "#b00020", fontSize: "13px", lineHeight: "1.4", textAlign: "left" }}>
                  {coverError}
                </p>
              )}

              <button
                onClick={() => onGenerateCover(selectedBook)}
                disabled={isGeneratingCover}
                style={{
                  width: "100%",
                  background: isGeneratingCover ? "#8bbf98" : "#28a745",
                  color: "#fff",
                  border: "none",
                  padding: "9px 12px",
                  borderRadius: "4px",
                  cursor: isGeneratingCover ? "not-allowed" : "pointer",
                  fontWeight: "bold",
                }}
              >
                {isGeneratingCover ? "생성 중..." : "AI 표지 생성"}
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
