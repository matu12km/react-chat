import React, {useState, useContext} from 'react';
import { doc, setDoc } from 'firebase/firestore'
import AuthContext from '../context';
import useFirestoreDocumentId from '../hooks/useFirestoreDocumentId'
/* Components */
import Messages from './Messages';
import { MessageInput } from './UI/MessageInput';
import { SendButton } from './UI/SendButton';
/* Styles */
import '../styles/components/ChatWindow.css';

const ChatWindow = ({ messages, activeUser, placeholder, interlocutor }) => {
    //console.log(interlocutor)
    const {firestore} = useContext(AuthContext)
    const [message, setMessage] = useState('')

    const documentID = useFirestoreDocumentId();
    const send = async () => {
        //console.log(activeUser.id)
        const newMessage = {
            id: Math.floor(Math.random() * (10000 - 1) + 1), body: message, name: activeUser.name, senderID: activeUser.id, recieverID: interlocutor.uid, styleID: activeUser.id, date: Date.now()
        };
        await setDoc(doc(firestore, 'messages', documentID), newMessage)
        setMessage('')
    }

    return (
        <div className="mainWindow">
            <div className="mainWindow_header">
                {console.log(interlocutor.name)}
                <h1 className="mainWindow_title">{interlocutor.name}</h1>
            </div>
            <div className="chatWindow">
                <Messages messages={messages} activeUser={activeUser} interlocutor={interlocutor} />
            </div>
            <div>
                <MessageInput value={message} onChange={e => setMessage(e.target.value)} placeholder={placeholder} />
                <SendButton onClick={send}>送信</SendButton>
            </div>
        </div>
    );
}

export default ChatWindow;