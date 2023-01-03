import React, { useContext, useState } from 'react'
import AuthContext from '../context'
import { Navigate } from 'react-router'
import { useAuthState } from "react-firebase-hooks/auth";
import { signInWithPopup, signOut, signInWithEmailAndPassword } from "firebase/auth";
import { auth, provider } from '../firebase/firebaseConfig';
import { doc, setDoc } from 'firebase/firestore'
import AuthInput from './UI/AuthInput'
import PasswordInput from './UI/PasswordInput'
import SubmitButton from './UI/SubmitButton'
import useFirestoreDocumentId from '../hooks/useFirestoreDocumentId'

import cl from '../styles/components/LoginForm.module.css'
import { EmailInput } from './UI/EmailInput';

export const LoginForm = ({ users, setModal, setActiveUser, form, createReport, setReport }) => {
    const { isAuth, setAuth,firestore } = useContext(AuthContext);
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [user, loading, error] = useAuthState(auth);
    const documentID = useFirestoreDocumentId();
    const googleSignIn = () => {
        signInWithPopup(auth, provider).then((res) => {
            //userListに登録されていない場合は登録する
            const user = res.user
            
            if (users && users !== '') {
                let findUser = users.filter((user) => user.name.includes(user.displayName));
                if (findUser.length) {
                    setActiveUser({ id: user.uid, name: user.displayName });
                } else {
                    //ユーザー名とuidを保存
                    const newMessage = {
                        id: Math.floor(Math.random() * (10000 - 1) + 1), uid: user.uid, name: user.displayName, date: Date.now()
                    };
                    setDoc(doc(firestore, 'userList', documentID), newMessage)

                }
            }
            setAuth(true);
            setModal(false);
            setReport(false)
        })
            .catch((err) => {
                createReport('エラーが発生しました')
                console.log(err)
            });
    };
    const emailPasswordSignIn = (e) => {
        e.preventDefault();
        if (email !== '' && password !== '') {
            signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in 
                console.log(userCredential)
                const user = userCredential.user;
                setActiveUser({ id: user.uid, name: user.displayName });
                setAuth(true);
                setModal(false);
                setReport(false)
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                if (errorCode === 'auth/user-not-found') {
                    createReport('ユーザー登録がされていません')
                } else if (errorCode === 'auth/wrong-password') {
                    createReport('パスワードが間違っています')
                } else {
                    createReport('エラーが発生しました')
                    console.log(errorCode)
                    console.log(errorMessage)
                }
                //alert(errorCode + ':' + errorMessage)
            });
        } else {
            if (email !== '') {
                createReport('メールアドレスが未入力です。')
            } else if (password !== '') {
                createReport('パスワードが未入力です')
            }
        }
        
    }

    return (
        <div className="app">
            {isAuth ? (
                <button onClick={() => signOut(auth)}>Sign Out</button>,
                <Navigate to={'/main'} />
            ) : (
                <>
                    <form onSubmit={emailPasswordSignIn} className={form ? cl.active : cl.nonActive}>
                        <EmailInput value={email} onChange={(e) => setEmail(e.target.value)} placeholder={'メールアドレス'} />
                        <PasswordInput value={password} onChange={(e) => setPassword(e.target.value)} placeholder={'パスワード'} />
                        <SubmitButton>ログイン</SubmitButton>
                    </form>
                    <div style={{ margin: '1rem 0' }} className={form ? cl.active : cl.nonActive}>
                        <SubmitButton onClick={googleSignIn}>Googleアカウントでログイン</SubmitButton>
                    </div>

                </>
            )}
        </div>
    );
}
