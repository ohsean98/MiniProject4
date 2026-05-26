/* 헤더*/

export default function Header({ currentMenu, onMenuChange, searchQuery, setSearchQuery }) {
  const menuItems = [
    { id: "home", label: "홈" },
    { id: "register", label: "도서 등록하기" },
    { id: "mypage", label: "마이 페이지" },
  ];

  return (
    <header style={{ marginBottom: "30px", width: "100%" }}>
      {/* 1. 최상단 로고 박스 */}
      <div style={{
        border: "1px solid #ccc",
        borderRadius: "6px",
        padding: "20px",
        textAlign: "center",
        marginBottom: "20px",
        background: "#fff"
      }}>
        <h1 style={{ margin: "0 0 5px 0", fontSize: "28px", color: "#333", fontWeight: "bold" }}>Walking Library</h1>
        <p style={{ margin: 0, color: "#666", fontSize: "14px" }}>책과 산책하는 시간</p>
      </div>

      {/* 2. 도서 검색바 */}
      <div style={{ display: "flex", marginBottom: "20px", width: "100%" }}>
        <input 
          type="text" 
          placeholder="도서 검색하기" 
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{
            flex: 1,
            padding: "12px",
            border: "1px solid #ccc",
            borderTopLeftRadius: "6px",
            borderBottomLeftRadius: "6px",
            fontSize: "14px",
            outline: "none"
          }}
        />
        <button style={{
          padding: "0 25px",
          background: "#ffa042",
          border: "none",
          borderTopRightRadius: "6px",
          borderBottomRightRadius: "6px",
          color: "#fff",
          cursor: "pointer",
          fontSize: "16px"
        }}>
          🔍
        </button>
      </div>

      {/* 3. 네비게이션 버튼 (3열 배치) */}
      <nav style={{ display: "flex", gap: "15px", width: "100%" }}>
        {menuItems.map((item) => {
          const isActive = currentMenu === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onMenuChange(item.id)}
              style={{
                flex: 1,
                padding: "25px 10px",
                border: "1px solid #ccc",
                borderRadius: "8px",
                backgroundColor: isActive ? "#ffa042" : "#fff",
                color: isActive ? "#fff" : "#333",
                fontSize: "18px",
                fontWeight: "bold",
                cursor: "pointer",
                boxShadow: isActive ? "0 4px 6px rgba(0,0,0,0.1)" : "none",
                transition: "all 0.2s"
              }}
            >
              {item.label}
            </button>
          );
        })}
      </nav>
    </header>
  );
}