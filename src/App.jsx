import { Route, Routes } from "react-router-dom";
import Main from "./pages/Main";
import SignUp1 from "./pages/SignUp/SignUP1";
import SignUp2 from "./pages/SignUp/SignUp2";
import Login from "./pages/Login/Login";
import FindId from "./pages/Login/FindId";
import FindPassword from "./pages/Login/FindPassword";
import CatsMap from "./pages/CatsMap";
import EditProfile from "./pages/Profile/EditProfile";
import EditProfile2 from "./pages/Profile/EditProfile2";
import MyProfile from "./pages/Profile/MyProfile";
import MyCat from "./pages/Profile/MyCats";
import SavedPosts from "./pages/Profile/SavedPosts";
import WritePost from "./pages/Post/WritePost";
import "./index.css";
import NotFound from "./pages/NotFound";
import DetailPost from "./pages/Post/DetailPost";
import React from "react";
import Friend from "./pages/Friend";
import PrivateRoutes from "./utils/PrivateRoutes";
import { AuthProvider } from "./store/AuthProvider";
import Scrap from "./pages/Scrap";
import EditPost from "./pages/Post/EditPost";
import FriendSendAndReceive from "./pages/FriendSent.jsx";
import FriendSent from "./pages/FriendSent.jsx";
import FriendReceive from "./pages/FriendReceive.jsx";
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    // 다음 렌더링에서 fallback UI를 표시합니다.
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    // 오류 리포팅 서비스에 오류를 기록할 수 있습니다.
    console.error("Error occurred:", error, info);
  }

  render() {
    if (this.state.hasError) {
      // 대체 UI를 표시합니다.
      return <h1>Something went wrong.</h1>;
    }

    return this.props.children;
  }
}
function App() {
  return (
    <AuthProvider>
      <ErrorBoundary>
        <div className="max-w-[768px] min-h-screen mx-auto my-0  bg-yellow shadow-global ">
          <Routes>
            <Route path="/signup1" element={<SignUp1 />}></Route>
            <Route path="/signup2" element={<SignUp2 />}></Route>
            <Route path="/" element={<Login />}></Route>
            <Route path="/login/findid" element={<FindId />}></Route>
            <Route path="/login/findpwd" element={<FindPassword />}></Route>
            <Route element={<PrivateRoutes />}>
              <Route path="/main" element={<Main />}></Route>
              <Route path="/catmap" element={<CatsMap />}></Route>
              <Route path="/profile" element={<MyProfile />}></Route>
              <Route path="/profile/edit" element={<EditProfile />}></Route>
              <Route path="/profile/edit2" element={<EditProfile2 />}></Route>
              <Route path="/profile/mycat" element={<MyCat />}></Route>
              <Route path="/profile/posts" element={<SavedPosts />}></Route>
              <Route path="/post/write" element={<WritePost />}></Route>
              <Route path="/post/:id" element={<DetailPost />}></Route>
              <Route path="/friend" element={<Friend />}></Route>
              <Route path="/*" element={<NotFound />}></Route>
              <Route path="/scrap" element={<Scrap />} />
              <Route path="/post/edit/:id" element={<EditPost />} />
              <Route path="/friend/send" element={<FriendSent/>}/>
              <Route path="/friend/receive" element={<FriendReceive/>}/>
            </Route>
          </Routes>
        </div>
      </ErrorBoundary>
    </AuthProvider>
  );
}

export default App;
