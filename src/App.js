import React, { useState, useMemo } from "react";
import { BrowserRouter } from "react-router-dom";
import AuthContext from "./context/index";
import { firestore } from "./firebase/firebaseConfig";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { collection } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";
/* Router */
import AppRouter from "./router/AppRouter";
/* Styles */
import "./styles/App.css";

function App() {
  const [isAuth, setAuth] = useState(false);
  const [users] = useCollectionData(collection(firestore, "userList"));
  const [activeUser, setActiveUser] = useState({});
  const [chat, setChat] = useState([activeUser]);
  const [modal, setModal] = useState(isAuth ? false : true);
  const [placeholder, setPlaceholder] =
    useState("メッセージを入力してください");
  const [search, setSearch] = useState("");

  const auth = getAuth();
  onAuthStateChanged(auth, (user) => {
    if (user) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/firebase.User
      //console.log(user)
      const uid = user.uid;
      // ...
    } else {
      // User is signed out
      // ...
    }
  });



  const startChatting = (receiver) => {
    if (chat.length > 1) {
      chat.splice(chat.length - 1, 1);
    }
    setChat([...chat, receiver]);
  };

  //console.log(chat)

  //console.log(`${activeUser.name} chats with ${chat.length === 2 ? chat[1].name : 'nobody :('}`)

  return (
    <AuthContext.Provider
      value={{
        isAuth,
        setAuth,
        firestore,
      }}
    >
      <BrowserRouter>
        <div className="App">
          <AppRouter
            isAuth={isAuth}
            setAuth={setAuth}
            modal={modal}
            activeUser={activeUser}
            setActiveUser={setActiveUser}
            setModal={setModal}
            users={users}
            placeholder={placeholder}
            setPlaceholder={setPlaceholder}
            start={startChatting}
            chat={chat}
            search={search}
            setSearch={setSearch}
          />
        </div>
      </BrowserRouter>
    </AuthContext.Provider>
  );
}

export default App;
