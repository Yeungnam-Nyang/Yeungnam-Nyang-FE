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
import WritePost from "./pages/Post/WritePost";
import "./index.css";
import NotFound from "./pages/NotFound";
import DetailPost from "./pages/Post/DetailPost";
import React from "react";
import Friend from "./pages/Friend";
import FriendProfile from "./pages/FriendProfile";
import PrivateRoutes from "./utils/PrivateRoutes";
import { AuthProvider } from "./store/AuthProvider";
import Scrap from "./pages/Scrap";
import EditPost from "./pages/Post/EditPost";
import FriendSent from "./pages/FriendSent.jsx";
import FriendReceive from "./pages/FriendReceive.jsx";
import { AnimatePresence } from "framer-motion";
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    // 다음 렌더링에서 fallback UI를 표시합니다.
    return { hasError: true };
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
          <AnimatePresence>
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
                <Route path="/profile/mycat" element={<Scrap />}></Route>
                <Route path="/post/write" element={<WritePost />}></Route>
                <Route path="/post/:id" element={<DetailPost />}></Route>
                <Route path="/friend" element={<Friend />}></Route>
                <Route
                  path="/friend/profile"
                  element={<FriendProfile />}
                ></Route>
                <Route path="/*" element={<NotFound />}></Route>
                <Route path="/post/edit/:id" element={<EditPost />} />
                <Route path="/friend/send" element={<FriendSent />} />
                <Route path="/friend/receive" element={<FriendReceive />} />
              </Route>
            </Routes>
          </AnimatePresence>
        </div>
      </ErrorBoundary>
    </AuthProvider>
  );
}

export default App;
