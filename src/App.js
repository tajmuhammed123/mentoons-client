import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import { RecoilRoot } from "recoil";
import ChatList from "./Components/Chat/ChatList";
import ChatUserProvider from "./Components/Chat/Components/Context/ChatProvider";
import AllUsers from "./Components/AllUsers";
import SignUp from "./Components/SignUp";
import Login from "./Components/Login";
import LayOut from "./Components/Layout";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/login"
          element={
            <RecoilRoot>
              <Login />
            </RecoilRoot>
          }
        />
        <Route
          path="/signup"
          element={
            <RecoilRoot>
              <SignUp />
            </RecoilRoot>
          }
        />
        <Route path="/" element={<LayOut />}>
          <Route
            path="/allChats"
            element={
              <ChatUserProvider>
                <ChatList />
              </ChatUserProvider>
            }
          />
          <Route
            path="/allUsers"
            element={
              <ChatUserProvider>
                <AllUsers />
              </ChatUserProvider>
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
