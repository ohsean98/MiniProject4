export default function BookRecommend({ latestBook }) {
    if (!latestBook) return null;

    return (
        <div style={{ display: "flex", gap: "20px", marginBottom: "20px" }}>

            <div style={{ 
                width: "100px", 
                height: "150px", 
                background: "#ccc", 
                display: "flex", 
                alignItems: "center", 
                justifyContent: "center" }}>

                {latestBook.coverImageUrl ? (
                    <img src={latestBook.coverImageUrl} alt="표지" style={{ width: "100%", height: "100%" }} />
                ) : (
                  <span>표지없음</span>
                )}
            </div>

            <div>
                <h3>🔥새로운 도서🔥</h3>
                <h4>{latestBook.title}</h4>
                <p>{latestBook.author}</p>
                <p>{latestBook.content}</p>
            </div>
        </div>
    );
}