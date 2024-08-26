import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import Main from "./pages/Main";
import SignUp1 from "./pages/SignUp/SignUP1";
import SignUp2 from "./pages/SignUp/SignUp2";
import Login from "./pages/Login/Login";
import FindId from "./pages/Login/FindId";
import FindPassword from "./pages/Login/FindPassword";
import CatsMap from "./pages/CatsMap";
import EditProfile from "./pages/Profile/EditProfile";
import MyProfile from "./pages/Profile/MyProfile";
import MyCat from "./pages/Profile/MyCats";
import SavedPosts from "./pages/Profile/SavedPosts";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Main />}></Route>
        <Route path="/signup1" element={<SignUp1 />}></Route>
        <Route path="/signup2" element={<SignUp2 />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/login/findid" element={<FindId />}></Route>
        <Route path="/login/findpwd" element={<FindPassword />}></Route>
        <Route path="/catmap" element={<CatsMap />}></Route>
        <Route path="/profile" element={<MyProfile />}></Route>
        <Route path="/profile/edit" element={<EditProfile />}></Route>
        <Route path="/profile/mycat" element={<MyCat />}></Route>
        <Route path="/profile/posts" element={<SavedPosts />}></Route>
      </Routes>
    </>
  );
}

export default App;
