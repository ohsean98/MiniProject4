# 📚 Walking Library

> 책과 산책하는 시간 — AI 표지 생성 기능을 갖춘 도서 관리 웹 서비스

## 프로젝트 소개

Walking Library는 도서를 등록·조회·수정·삭제하고, OpenAI 이미지 API를 활용해 AI 표지를 자동 생성할 수 있는 웹 애플리케이션입니다.

---

## 기술 스택

| 분류 | 기술 |
|------|------|
| Frontend | React 19, React Router DOM 7, React Toastify |
| Build | Vite 8 |
| Backend | json-server 0.17 |
| AI | OpenAI Images API (gpt-image-1 등) |
| Lint | ESLint 10 |

---

## 주요 기능

- **도서 목록 조회** — 홈 화면에서 4열 그리드로 등록된 도서를 한눈에 확인
- **이달의 추천 도서** — 무작위로 선정된 도서를 홈 상단에 강조 표시
- **실시간 검색** — 제목·저자로 400ms 디바운싱 검색
- **도서 등록** — 제목, 저자, 줄거리 입력 및 AI 표지 또는 직접 이미지 업로드
- **AI 표지 생성** — 장르·스타일을 선택하면 OpenAI API로 맞춤 표지 자동 생성
- **마이 페이지** — 내 도서 목록 관리, 수정·삭제 기능
- **토스트 알림** — 주요 액션(등록, 수정, 삭제 등)에 대한 피드백 알림

---

## 폴더 구조

```
mini-project4-library/
├── db.json                  # json-server 데이터베이스
├── package.json
└── walking-library/         # React 앱
    ├── index.html
    └── src/
        ├── main.jsx
        ├── App.jsx          # 전역 상태 및 라우팅 관리
        ├── index.css
        ├── components/
        │   ├── Header.jsx        # 내비게이션 헤더 + 검색바
        │   ├── BookForm.jsx      # 도서 등록/수정 폼 + AI 표지 생성
        │   ├── BookDetail.jsx    # 도서 상세 조회 / 마이페이지 편집 뷰
        │   ├── BookList.jsx      # 도서 목록 (세로/가로 레이아웃)
        │   ├── SearchBar.jsx     # 검색 입력 컴포넌트
        │   └── BookRecommend.jsx # 추천 도서 컴포넌트
        └── pages/
            ├── MyPage.jsx        # 마이 페이지
            └── RegisterPage.jsx  # 도서 등록 페이지
```

---

## 시작하기

### 사전 요구사항

- Node.js 18+
- OpenAI API Key (AI 표지 생성 기능 사용 시)

### 설치 및 실행

```bash
# 의존성 설치
cd walking-library
npm install
```

이후 **터미널 2개**를 열어 각각 실행합니다.

```bash
# 터미널 1 — JSON Server (포트 3000)
npx json-server --watch ../db.json

# 터미널 2 — Vite 개발 서버 (포트 5173)
npm run dev
```

| 서비스 | 주소 |
|--------|------|
| 프론트엔드 | http://localhost:5173 |
| JSON Server API | http://localhost:3000/books |

---

## AI 표지 생성 사용법

1. 도서 등록 화면에서 제목·저자·줄거리를 입력합니다.
2. 장르와 표지 스타일을 선택합니다.
3. OpenAI API 설정에서 발급받은 **API Key**를 입력합니다.
4. **AI 표지 생성** 버튼을 클릭하면 자동으로 표지 이미지가 생성됩니다.
5. 마음에 들지 않으면 **재생성** 버튼으로 다시 생성할 수 있습니다.

> API Key는 브라우저 메모리에만 저장되며 서버로 전송되지 않습니다.

---

## API 엔드포인트 (json-server)

| Method | URL | 설명 |
|--------|-----|------|
| GET | `/books` | 전체 도서 조회 |
| GET | `/books/:id` | 단일 도서 조회 |
| POST | `/books` | 도서 등록 |
| PUT | `/books/:id` | 도서 전체 수정 |
| DELETE | `/books/:id` | 도서 삭제 |

---

## 도서 데이터 스키마

```json
{
  "id": "string",
  "title": "string",
  "author": "string",
  "content": "string",
  "genre": "string",
  "style": "string",
  "coverImageUrl": "string (base64 or URL)",
  "imageModel": "string",
  "imageSize": "string",
  "imageQuality": "string",
  "outputFormat": "string",
  "createdAt": "ISO 8601",
  "updatedAt": "ISO 8601"
}
```
