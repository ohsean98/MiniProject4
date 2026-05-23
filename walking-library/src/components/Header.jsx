export default function Header({ searchTerm, setSearchTerm }) {
  return (
    <div>
      {/*홈 화면 제목*/}
      <div style={{ textAlign: "center", padding: "20px 0"}}>
        <h1>📖걷기가 서재🏃‍♂️</h1>
        <p>책과 함께 걸어봐욤^^</p>
      </div>

      {/*검색창*/}
      <div style={{ textAlign: "left", display: "flex", marginBottom: "10px"}}>
        <input
         type="text"
         placeholder="도서 or 작가 검색하기"
         value={searchTerm}
         onChange={(e) => setSearchTerm(e.target.value)}
         style={{ flex: 1, padding: "8px"}}
         />
         <button>🔎</button>
      </div>

      {/*네비게이션*/}
      <div style={{ display:"flex", gap: "10px", marginBottom: "20px"}}>
        <button>홈</button>
        <button>도서 등록하기</button>
        <button>마이 페이지</button>
      </div>
    </div>
  );
}