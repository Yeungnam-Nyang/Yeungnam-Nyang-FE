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
## 폴더 구조
<details>
  <summary>Yeungnam-Nyang-FE</summary>

  ```
  ├── App.jsx
├── api
│   └── api.jsx
├── components
│   ├── common
│   │   ├── Button.jsx
│   │   ├── ButtonNopic.jsx
│   │   ├── DropMenu.jsx
│   │   ├── Error.jsx
│   │   ├── Header.jsx
│   │   ├── Loading.jsx
│   │   ├── Logo.jsx
│   │   ├── Modal.jsx
│   │   ├── NavBar.jsx
│   │   ├── Title.jsx
│   │   └── Wrapper.jsx
│   ├── friend
│   │   ├── FriendList.jsx
│   │   └── FriendRequest.jsx
│   ├── main
│   │   └── PostPreview.jsx
│   ├── nyangmap
│   │   ├── CatMarker.jsx
│   │   ├── KakaoMap.jsx
│   │   └── NyangBox.jsx
│   └── post
│       ├── DetailPostComment.jsx
│       ├── DetailPostCommentInput.jsx
│       ├── DetailPostContent.jsx
│       ├── DetailPostHeader.jsx
│       ├── DetailPostImage.jsx
│       ├── StopWatch.css
│       └── StopWatch.jsx
├── data
│   └── test.txt
├── hooks
│   ├── useFetch.jsx
│   ├── useFileUpload.jsx
│   ├── useGeoLocation.jsx
│   ├── useLocationPermission.jsx
│   └── useOutsideClick.jsx
├── index.css
├── main.jsx
├── pages
│   ├── CatsMap.jsx
│   ├── Friend.jsx
│   ├── FriendProfile.jsx
│   ├── FriendReceive.jsx
│   ├── FriendSent.jsx
│   ├── Login
│   │   ├── FindId.css
│   │   ├── FindId.jsx
│   │   ├── FindPassword.css
│   │   ├── FindPassword.jsx
│   │   ├── Login.css
│   │   └── Login.jsx
│   ├── Main.jsx
│   ├── NotFound.jsx
│   ├── Post
│   │   ├── DetailPost.jsx
│   │   ├── EditPost.jsx
│   │   └── WritePost.jsx
│   ├── Profile
│   │   ├── EditProfile.css
│   │   ├── EditProfile.jsx
│   │   ├── EditProfile2.jsx
│   │   ├── MyProfile.css
│   │   └── MyProfile.jsx
│   ├── Scrap.jsx
│   └── SignUp
│       ├── SignUP1.jsx
│       ├── SignUp1.css
│       └── SignUp2.jsx
├── setupProxy.js
├── store
│   ├── AuthProvider.jsx
│   ├── commentInputStore.jsx
│   └── useCatMapPosts.jsx
├── styles
│   ├── animation.js
│   └── test.txt
└── utils
    ├── PrivateRoutes.jsx
    ├── dateCalculator.js
    └── getAddressApi.js
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
</details>


## 서비스 흐름도

![제목 없는 다이어그램 drawio](https://github.com/user-attachments/assets/64c58c07-4701-41a0-993e-807f700ca593)

## system architecture


