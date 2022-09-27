import React, { useState, useMemo } from 'react';
import { BrowserRouter } from 'react-router-dom';
import AuthContext from './context/index';
import { firestore } from './firebase/firebaseConfig';
/* Router */
import AppRouter from './router/AppRouter';
/* Styles */
import './styles/App.css'

function App() {
    const [isAuth, setAuth]= useState(false);
    const [users, setUsers] = useState([
        {id: 1, name: 'Admin', password: '1234'},
        {id: 2, name: 'kkkk', password: '1'},
        {id: 3, name: 'kirill', password: '1'},
        {id: 4, name: 'test_user', password: '1'},
        {id: 5, name: 'whereareyo', password: '1'},
        {id: 6, name: 'internal_dragon_', password: '1'},
    ]);
    const [activeUser, setActiveUser] = useState({})
    const [chat, setChat] = useState([
        activeUser,
    ])
    const [modal, setModal] = useState(isAuth ? false : true);
    const [placeholder, setPlaceholder] = useState('メッセージを入力してください')
    const [search, setSearch] = useState('')

    const friendSearcher = useMemo(() => {
        return users.filter(user => user.name.includes(search))
    }, [search, users])

    const createUser = (newUser) => {
        setUsers([...users, newUser])
    }

    const startChatting = (receiver) => {
        if (chat.length > 1) {
            chat.splice(chat.length - 1, 1)
        }
        setChat([...chat, receiver])
    }

    //console.log(chat)
    


    //console.log(`${activeUser.name} chats with ${chat.length === 2 ? chat[1].name : 'nobody :('}`)

    return (
        <AuthContext.Provider value={{
            isAuth,
            setAuth,
            firestore
        }}>
            <BrowserRouter>
                <div className='App'>
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
    )
}

export default App;