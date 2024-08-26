# Yeungnam-Nyang-FE
Yeungnam Nyang frontend repository
### 커밋 메시지

| emoji | message | description |
| --- | --- | --- |
| :sparkles: | feat | 새로운 기능 추가, 기존 기능을 요구 사항에 맞추어 수정 |
| :bug: | fix | 기능에 대한 버그 수정 |
| :closed_book: | docs | 문서(주석) 수정 |
| :art: | style | 코드 스타일, 포맷팅에 대한 수정 |
| :recycle: | refact | 기능 변화가 아닌 코드 리팩터링 |
| :white_check_mark: | test | 테스트 코드 추가/수정 |
| :pushpin: | chore | 패키지 매니저 수정, 그 외 기타 수정 ex) .gitignore |

# Architecture
```
├── App.jsx
├── api
│   └── test.txt
├── assets
│   ├── font
│   ├── images
├── components
├── data
├── hooks
├── main.jsx
├── pages
│   ├── CatsMap.jsx
│   ├── Login
│   │   ├── FindId.jsx
│   │   ├── FindPassword.jsx
│   │   └── Login.jsx
│   ├── Main.jsx
│   ├── Profile
│   │   ├── EditProfile.jsx
│   │   ├── MyCats.jsx
│   │   ├── MyProfile.jsx
│   │   └── SavedPosts.jsx
│   ├── SignUp
│   │   ├── SignUP1.jsx
│   │   └── SignUp2.jsx
│   └── TodayCat.jsx
├── store
├── styles
└── utils
```
- components : 재사용 가능한 컴포넌트
- assets : 이미지 혹은 폰트
- data : 로컬상에서 사용되는 데이터
- hooks : 커스텀 훅
- pages : 각 페이지 컴포넌트
- styles : css파일
- api : 서버통신 api
- store : zustand,contextAPI상태관리
- utils : 정규표현식 패턴,공통 함수등
