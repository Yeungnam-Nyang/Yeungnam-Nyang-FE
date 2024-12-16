
<div align="center">
  <image src="https://github.com/user-attachments/assets/bf72d344-d32c-4505-9ac8-5a24a35e1d93" width="70%"></image>
</div>

# Yeungnam-Nyang
영남대 고양이와 함께 고양이의 사소한 일상을 공유해주세요.

## 🚀 사이트 접속 : https://yeungnam-nyang.site

## 릴리즈
| version | description | date | author |
| -- | -- | -- | -- |
| V0.0.1 | 찻 데모 버젼 | 2024.12.15 | [#74](https://github.com/Yeungnam-Nyang/Yeungnam-Nyang-FE/releases/tag/v0.0.1) |

## 📖목차

1. [개요](#개요)
2. [팀원](#팀원)
3. [Architecture](#architecture)
   1. [폴더 구조](#폴더-구조)
   2. [서비스 흐름도](#서비스-흐름도)
   3. [System Architecture](#systemarchitecture)


      
## 📄개요
`Yeungnam-Nyang(영남냥)`은 영남대학교 길고양이들의 모습을 주변 친구들과 공유하며 자신의 고양이에 이름을 붙여줄 수 있습니다. <br>
사용자의 현재위치를 기반으로 200m근방의 고양이 게시물을 마커형태로 확인할 수 있습니다.


## 🧑‍🤝‍🧑팀원
|<img src="https://avatars.githubusercontent.com/u/144890194?s=400&u=89b20ce0f01d59364fe15b04bd5a7b2cdb5045a1&v=4" width="150" height="150"/>|<img src="https://avatars.githubusercontent.com/u/144890194?s=400&u=89b20ce0f01d59364fe15b04bd5a7b2cdb5045a1&v=4" width="150" height="150"/> | <img src="https://avatars.githubusercontent.com/u/152388943?v=4" width="150" height="150"/>  |
|:-:|:-:|:-:|
|BackEnd,FrontEnd|BackEnd|FrontEnd|
|김도연<br/>[@tkv00](https://github.com/tkv00)|박재성<br/>[@pjs1710](https://github.com/pjs1710)|백진욱<br/>[@Znaoznao](https://github.com/Znaoznao)


## 🔨Architecture

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

### 📂폴더 구조
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


### 🚚서비스 흐름도

![제목 없는 다이어그램 drawio](https://github.com/user-attachments/assets/64c58c07-4701-41a0-993e-807f700ca593)

### ⚙️system architecture

![영남냥-아키텍쳐1 drawio](https://github.com/user-attachments/assets/cb7d33a9-f236-4748-8dd1-572aecdfabbc)

<br/>
<hr/>
<br/>

## 💻UI/UX

| 메인페이지 | 로그인                                   | 
|------------|------------------------------------------|
| ![스크린샷](https://github.com/user-attachments/assets/1bc95b89-5763-4d58-912b-31936f942a3a) | ![스크린샷 2024-12-16 02 33 17](https://github.com/user-attachments/assets/07c65957-3614-4068-ae37-2da9ed5b14fa) |

|회원가입 1                                  | 회원가입2                     |
|-------------------------------------------|-------------------------------------------|
|![스크린샷 2024-12-16 02 35 57](https://github.com/user-attachments/assets/0d68a3a5-1672-4a61-8ac5-81ccbdc0890e) | ![스크린샷 2024-12-16 02 35 50](https://github.com/user-attachments/assets/9c537127-8989-4af9-b813-47ee6f5038fd) | 

|친구추가                               | 게시물 작성                    |
|-------------------------------------------|-------------------------------------------|
|  ![스크린샷 2024-12-16 01 54 40](https://github.com/user-attachments/assets/0f4a5661-fa0d-40f6-a72c-8876ac2b852f) | ![스크린샷 2024-12-16 01 53 28](https://github.com/user-attachments/assets/da4934ae-48af-4cab-8b60-98a3982d5489) |
