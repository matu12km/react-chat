import React, { useState, useMemo } from "react";
import { BrowserRouter } from "react-router-dom";
import AuthContext from "./context/index";
import { firestore } from "./firebase/firebaseConfig";
import { getAuth, onAuthStateChanged } from "firebase/auth";
/* Router */
import AppRouter from "./router/AppRouter";
/* Styles */
import "./styles/App.css";

function App() {
  const [isAuth, setAuth] = useState(false);
  const [users, setUsers] = useState([]);
  const [activeUser, setActiveUser] = useState({});
  const [chat, setChat] = useState([activeUser]);
  const [modal, setModal] = useState(isAuth ? false : true);
  const [placeholder, setPlaceholder] =
    useState("メッセージを入力してください");
  const [search, setSearch] = useState("");

    const auth = getAuth();
    console.log(auth)
    onAuthStateChanged(auth, (user) => {
      
    if (user) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/firebase.User
        console.log(user)
      const uid = user.uid;
      // ...
    } else {
      // User is signed out
      // ...
    }
  });

  const friendSearcher = useMemo(() => {
    return users.filter((user) => user.name.includes(search));
  }, [search, users]);

  const createUser = (newUser) => {
    setUsers([...users, newUser]);
  };

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
            users={friendSearcher}
            placeholder={placeholder}
            setPlaceholder={setPlaceholder}
            createUser={createUser}
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
