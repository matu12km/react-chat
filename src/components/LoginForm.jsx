import React, { useContext, useState } from 'react'
import AuthContext from '../context'
import { Navigate } from 'react-router'
import { useAuthState } from "react-firebase-hooks/auth";
import { signInWithPopup, signOut, signInWithEmailAndPassword } from "firebase/auth";
import { auth, provider } from '../firebase/firebaseConfig';

import AuthInput from './UI/AuthInput'
import PasswordInput from './UI/PasswordInput'
import SubmitButton from './UI/SubmitButton'

import cl from '../styles/components/LoginForm.module.css'
import { EmailInput } from './UI/EmailInput';

export const LoginForm = ({ users, setModal, setActiveUser, form, createReport, setReport }) => {
    const { isAuth, setAuth } = useContext(AuthContext);
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [user, loading, error] = useAuthState(auth);
    const googleSignIn = () => {
        console.log(auth);
        signInWithPopup(auth, provider).then((res) => {
            console.log(res)
            console.log({ id: res.user.uid, name: res.user.displayName });
            const user = res.user
            setActiveUser({ id: user.uid, name: user.displayName });
            setAuth(true);
            setModal(false);
            setReport(false)
        })
            .catch((err) => alert(err.message));
    };
    const emailPasswordSignIn = (e) => {
        e.preventDefault();
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
                alert(errorCode + ':' + errorMessage)
            });
    }

    return (
        <div className="app">
            {isAuth ? (
                console.log('login'),
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
