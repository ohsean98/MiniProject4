# 걷기가 서재 : 작가의 산책

React + json-server + OpenAI API를 사용한 도서 관리 미니프로젝트입니다.

## 주요 기능

- 도서 목록 조회, 등록, 수정, 삭제
- 도서 상세 화면에서 OpenAI API Key 입력
- 도서 제목, 저자, 내용을 조합한 프롬프트로 AI 표지 생성
- OpenAI 이미지 응답의 `b64_json`을 Data URL로 변환
- 생성된 표지를 `PATCH /books/:id`로 `coverImageUrl`에 저장
- 생성 중 버튼 비활성화, API Key/요청 한도 등 에러 안내

## 실행 방법

DB 서버를 먼저 실행합니다.

```powershell
cd C:\avile\Frontend\library-project
npx json-server --watch db.json --port 3000
```

프론트엔드를 실행합니다.

```powershell
cd C:\avile\Frontend\library-project\walking-library
npm run dev
```

브라우저에서 Vite가 안내하는 주소로 접속합니다.

## OpenAI 표지 생성 사용 방법

1. 도서 목록에서 도서를 선택합니다.
2. 상세 페이지의 `OpenAI API Key` 입력창에 조별 API Key를 입력합니다.
3. 모델, 이미지 크기, 품질, 파일 형식을 선택합니다.
4. `AI 표지 생성` 버튼을 누릅니다.
5. 생성된 표지는 자동으로 `db.json`의 `coverImageUrl`에 저장되고 화면에 바로 반영됩니다.

API Key는 코드에 하드코딩하지 않고 화면 입력값으로만 사용합니다. 생성 요청 시 OpenAI API 비용이 발생할 수 있습니다.
