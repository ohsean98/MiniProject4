/* - 좌측: AI 표지 생성 이미지 실시간 미리보기 피드백 및 로컬 이미지 파일 업로드 연동
 * - 우측: 도서 메타데이터(제목, 작가, 줄거리) 및 OpenAI API (모델, 해상도, 장르 등) 설정 폼
 * - 이미지 생성 중 가림막 활성화 및 생성 취소 기능 매칭
 * - 생성 완료 시 '최종 등록 / 다시 생성 / 취소' 3버튼 노출
 */

import { useState } from "react";

export default function BookForm({
  title, setTitle,
  author, setAuthor,
  content, setContent,
  apiKey, setApiKey,
  imageModel, setImageModel,
  imageSize, setImageSize,
  imageQuality, setImageQuality,
  outputFormat, setOutputFormat,
  bookGenre, setBookGenre,
  coverStyle, setCoverStyle,
  isEditing, onSave, onFinalSave, onCancel,
  isGenerating, onCancelGeneration, 
  tempPreviewImage, setTempPreviewImage,
  localImageBase64, setLocalImageBase64
}) {
  const [localPreview, setLocalPreview] = useState(null);

  const handleLocalImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setLocalPreview(URL.createObjectURL(file));
      const reader = new FileReader();
      reader.onloadend = () => setLocalImageBase64(reader.result);
      reader.readAsDataURL(file);
    }
  };

  return (
    <section style={{
      width: "100%",
      boxSizing: "border-box",
      marginBottom: "30px",
      background: "#fff",
      padding: "25px",
      borderRadius: "12px",
      border: "1px solid #ddd",
      boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
      position: "relative"
    }}>
      
      {/* 이미지 생성 중 반투명 필터,취소 버튼 */}
      {isGenerating && (
        <div style={{
          position: "absolute",
          top: 0, left: 0, right: 0, bottom: 0,
          background: "rgba(0, 0, 0, 0.65)",
          borderRadius: "12px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 999,
          color: "#fff",
          textAlign: "center"
        }}>
          <div style={{ fontSize: "40px", marginBottom: "15px" }}>⏳</div>
          <p style={{ fontSize: "18px", fontWeight: "bold", margin: "0 0 10px 0" }}>이미지 생성 후 등록됩니다.</p>
          <p style={{ fontSize: "13px", color: "#ccc", margin: "0 0 20px 0" }}>잠시만 기다려주세요...</p>
          <button 
            type="button"
            onClick={onCancelGeneration}
            style={{ padding: "10px 24px", background: "#dc3545", color: "#fff", border: "none", borderRadius: "6px", cursor: "pointer", fontWeight: "bold" }}
          >
            🛑 생성 취소하기
          </button>
        </div>
      )}

      <h3 style={{ marginTop: 0, textAlign: "center", marginBottom: "25px", color: "#333", fontSize: "22px", fontWeight: "bold" }}>
        {isEditing ? "📝 도서 수정하기" : "✍️ 도서 등록하기"}
      </h3>

      <form onSubmit={(e) => { e.preventDefault(); onSave(); }} style={{ display: "flex", gap: "25px", width: "100%", alignItems: "flex-start" }}>
        
        {/* ◀ 좌측 영역: 이미지 가이드 박스 (생성 완료 시 미리보기 및 제어 버튼으로 가변 변경) */}
        <div style={{ flex: "1", display: "flex", flexDirection: "column", gap: "15px", minWidth: "320px" }}>
          
          <div style={{
            width: "100%",
            height: "440px",
            border: tempPreviewImage ? "1px solid #ddd" : "2px dashed #ccc",
            borderRadius: "8px",
            background: "#fafafa",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: tempPreviewImage ? "0" : "20px",
            boxSizing: "border-box",
            textAlign: "center",
            overflow: "hidden"
          }}>
            {/* AI 이미지 생성 완료 혹은 로컬 파일이 있을 때 검토*/}
            {tempPreviewImage ? (
              <img src={tempPreviewImage} alt="표지 미리보기" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            ) : localPreview ? (
              <img src={localPreview} alt="로컬 파일 미리보기" style={{ width: "100%", height: "100%", objectFit: "contain" }} />
            ) : (
              <>
                <span style={{ fontSize: "40px", marginBottom: "10px" }}>🖼️</span>
                <strong style={{ fontSize: "16px", color: "#333", marginBottom: "5px" }}>생성 이미지 표시</strong>
                <p style={{ fontSize: "12px", color: "#777", margin: 0, lineHeight: "1.5" }}>
                  오른쪽에서 설정을 마친 후 [미리보기]를 누르면<br />
                  여기에 AI 표지 혹은 업로드 파일이 표기됩니다.
                </p>
              </>
            )}
          </div>

          {/*미리보기 이미지가 없을 때만 일반 파일 선택 창 노출 */}
          {!tempPreviewImage && (
            <div style={{ width: "100%", border: "1px solid #ddd", borderRadius: "8px", padding: "15px", background: "#fdfdfd", boxSizing: "border-box" }}>
              <label style={{ display: "block", fontSize: "13px", fontWeight: "bold", color: "#555", marginBottom: "8px" }}>
                🖼️ 원하는 도서 이미지 업로드 (API Key 없을 때 적용)
              </label>
              <input type="file" accept="image/*" onChange={handleLocalImageChange} style={{ fontSize: "13px", width: "100%" }} />
            </div>
          )}

          
          {tempPreviewImage && (
            <div style={{ display: "flex", flexDirection: "column", gap: "10px", background: "#f4f9ff", padding: "15px", borderRadius: "8px", border: "1px solid #bae1ff" }}>
              <p style={{ margin: "0 0 5px 0", fontSize: "13px", color: "#0056b3", fontWeight: "bold", textAlign: "center" }}>🎉 표지 매칭 완료! 등록하시겠습니까?</p>
              <div style={{ display: "flex", gap: "8px" }}>
                
                {/* 1. 최종 등록 버튼 (비율을 1로 맞춰 균등 분할했습니다) */}
                <button 
                  type="button" 
                  onClick={onFinalSave} 
                  style={{ 
                    flex: 1, 
                    padding: "10px 0", 
                    background: "#28a745", 
                    color: "#fff", 
                    border: "none", 
                    borderRadius: "4px", 
                    cursor: "pointer", 
                    fontWeight: "bold", 
                    fontSize: "12px", 
                    whiteSpace: "nowrap"
                  }}
                >
                  ✅ 최종 등록
                </button>

                {apiKey.trim() && (
                  <button 
                    type="button" 
                    onClick={onSave} 
                    style={{ 
                      flex: 1, 
                      padding: "10px 0", 
                      background: "#ffa042", 
                      color: "#fff", 
                      border: "none", 
                      borderRadius: "4px", 
                      cursor: "pointer", 
                      fontWeight: "bold", 
                      fontSize: "12px",
                      whiteSpace: "nowrap"
                    }}
                  >
                    🔄 다시 생성
                  </button>
                )}

                <button 
                  type="button" 
                  onClick={() => setTempPreviewImage("")} 
                  style={{ 
                    flex: 1, 
                    padding: "10px 0", 
                    background: "#6c757d", 
                    color: "#fff", 
                    border: "none", 
                    borderRadius: "4px", 
                    cursor: "pointer", 
                    fontWeight: "bold", 
                    fontSize: "12px",
                    whiteSpace: "nowrap"
                  }}
                >
                  ❌ 취소
                </button>

              </div>
            </div>
          )} 
        </div>

        
        <div style={{ flex: "1.5", display: "flex", flexDirection: "column", gap: "15px", width: "100%" }}>
          
          {/* 제목 & 저자 */}
          <div style={{ display: "flex", gap: "12px" }}>
            <div style={{ flex: 2, display: "flex", flexDirection: "column", gap: "5px" }}>
              <label style={{ fontSize: "12px", color: "#666", fontWeight: "bold" }}>도서 제목</label>
              <input
                type="text"
                placeholder="책 제목을 입력하세요"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                disabled={!!tempPreviewImage}
                style={{ width: "100%", padding: "10px", boxSizing: "border-box", borderRadius: "6px", border: "1px solid #ccc", fontSize: "14px", background: tempPreviewImage ? "#f5f5f5" : "#fff" }}
              />
            </div>
            <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "5px" }}>
              <label style={{ fontSize: "12px", color: "#666", fontWeight: "bold" }}>작가지망생 이름</label>
              <input
                type="text"
                placeholder="이름"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                disabled={!!tempPreviewImage}
                style={{ width: "100%", padding: "10px", boxSizing: "border-box", borderRadius: "6px", border: "1px solid #ccc", fontSize: "14px", background: tempPreviewImage ? "#f5f5f5" : "#fff" }}
              />
            </div>
          </div>

          {/* OpenAI 상세 설정*/}
          <fieldset style={{ border: "1px solid #007bff", borderRadius: "8px", padding: "15px", background: "#f7faff", margin: 0 }}>
            <legend style={{ color: "#007bff", fontWeight: "bold", fontSize: "13px", padding: "0 6px" }}>⚙️ OpenAI API & 표지 상세 설정</legend>
            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              
              <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                <label style={{ fontSize: "12px", color: "#444", fontWeight: "bold" }}>OpenAI API Key</label>
                <input
                  type="password"
                  placeholder="sk-... (비워둘 시 좌측 업로드 파일이 표지로 등록됩니다)"
                  value={apiKey}
                  onChange={(e) => setApiKey(e.target.value)}
                  disabled={!!tempPreviewImage}
                  style={{ width: "100%", padding: "8px 10px", boxSizing: "border-box", borderRadius: "4px", border: "1px solid #b3d7ff", fontSize: "13px", background: tempPreviewImage ? "#f5f5f5" : "#fff" }}
                />
              </div>

              <div style={{ display: "flex", gap: "10px" }}>
                <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "4px" }}>
                  <label style={{ fontSize: "12px", color: "#444" }}>이미지 모델</label>
                  <select value={imageModel} onChange={(e) => setImageModel(e.target.value)} disabled={!!tempPreviewImage} style={{ padding: "8px", borderRadius: "4px", border: "1px solid #ccc", background: "#fff", fontSize: "13px" }}>
                    <option value="gpt-image-2">gpt-image-2</option>
                    <option value="dall-e-3">dall-e-3</option>
                    <option value="dall-e-2">dall-e-2</option>
                  </select>
                </div>
                <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "4px" }}>
                  <label style={{ fontSize: "12px", color: "#444" }}>이미지 크기</label>
                  <select value={imageSize} onChange={(e) => setImageSize(e.target.value)} disabled={!!tempPreviewImage} style={{ padding: "8px", borderRadius: "4px", border: "1px solid #ccc", background: "#fff", fontSize: "13px" }}>
                    <option value="1024x1536">1024x1536 (세로형)</option>
                    <option value="1024x1024">1024x1024 (정사각형)</option>
                    <option value="1792x1024">1792x1024 (가로형)</option>
                  </select>
                </div>
              </div>

              <div style={{ display: "flex", gap: "10px" }}>
                <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "4px" }}>
                  <label style={{ fontSize: "12px", color: "#444" }}>이미지 품질</label>
                  <select value={imageQuality} onChange={(e) => setImageQuality(e.target.value)} disabled={!!tempPreviewImage} style={{ padding: "8px", borderRadius: "4px", border: "1px solid #ccc", background: "#fff", fontSize: "13px" }}>
                    <option value="low">low (빠른 생성)</option>
                    <option value="hd">hd (고화질)</option>
                    <option value="standard">standard (일반)</option>
                  </select>
                </div>
                <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "4px" }}>
                  <label style={{ fontSize: "12px", color: "#444" }}>파일 확장자</label>
                  <select value={outputFormat} onChange={(e) => setOutputFormat(e.target.value)} disabled={!!tempPreviewImage} style={{ padding: "8px", borderRadius: "4px", border: "1px solid #ccc", background: "#fff", fontSize: "13px" }}>
                    <option value="png">png</option>
                    <option value="jpg">jpg</option>
                    <option value="webp">webp</option>
                  </select>
                </div>
              </div>

              <div style={{ display: "flex", gap: "10px" }}>
                <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "4px" }}>
                  <label style={{ fontSize: "12px", color: "#444" }}>도서 장르</label>
                  <select value={bookGenre} onChange={(e) => setBookGenre(e.target.value)} disabled={!!tempPreviewImage} style={{ padding: "8px", borderRadius: "4px", border: "1px solid #ccc", background: "#fff", fontSize: "13px" }}>
                    <option value="실용서적">실용서적</option>
                    <option value="소설">소설</option>
                    <option value="시/에세이">시/에세이</option>
                    <option value="인문학">인문학</option>
                    <option value="판타지/SF">판타지/SF</option>
                  </select>
                </div>
                <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "4px" }}>
                  <label style={{ fontSize: "12px", color: "#444" }}>표지 무드/스타일</label>
                  <select value={coverStyle} onChange={(e) => setCoverStyle(e.target.value)} disabled={!!tempPreviewImage} style={{ padding: "8px", borderRadius: "4px", border: "1px solid #ccc", background: "#fff", fontSize: "13px" }}>
                    <option value="미니멀">미니멀</option>
                    <option value="일러스트">일러스트</option>
                    <option value="수채화">수채화</option>
                    <option value="사이버펑크">사이버펑크</option>
                    <option value="클래식">클래식</option>
                  </select>
                </div>
              </div>
            </div>
          </fieldset>

          {/* 줄거리 요약 */}
          <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
            <label style={{ fontSize: "12px", color: "#666", fontWeight: "bold" }}>📖 줄거리 요약 (본문 내용)</label>
            <textarea
              placeholder="책의 줄거리를 입력하세요. 표지 생성의 근간 정보가 됩니다."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              disabled={!!tempPreviewImage}
              rows="5"
              style={{ width: "100%", padding: "10px", boxSizing: "border-box", borderRadius: "6px", border: "1px solid #ccc", resize: "none", fontSize: "13px", lineHeight: "1.5", background: tempPreviewImage ? "#f5f5f5" : "#fff" }}
            />
          </div>

          {/* 이미지 미확정 상태일 때 하단 액션 버튼 */}
          {!tempPreviewImage && (
            <div style={{ display: "flex", gap: "10px", marginTop: "5px" }}>
              <button type="submit" style={{ flex: 2, padding: "12px", background: "#007bff", color: "#fff", border: "none", borderRadius: "6px", cursor: "pointer", fontWeight: "bold", fontSize: "15px" }}>
                {apiKey.trim() ? "🪄 표지 이미지 미리보기 생성" : "🚀 도서 바로 등록하기"}
              </button>
              <button type="button" onClick={onCancel} style={{ flex: 1, padding: "12px", background: "#6c757d", color: "#fff", border: "none", borderRadius: "6px", cursor: "pointer", fontSize: "15px" }}>
                취소
              </button>
            </div>
          )}

        </div>
      </form>
    </section>
  );
}