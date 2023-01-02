import React, { useState, useContext } from 'react'
import AuthContext from '../context'
import { auth, provider } from '../firebase/firebaseConfig';
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { doc, setDoc } from 'firebase/firestore'

import AuthInput from './UI/AuthInput'
import PasswordInput from './UI/PasswordInput'
import SubmitButton from './UI/SubmitButton'
import useFirestoreDocumentId from '../hooks/useFirestoreDocumentId'

import cl from '../styles/components/LoginForm.module.css'
import { EmailInput } from './UI/EmailInput';

const RegistrationForm = ({ form, setModal, setActiveUser, setForm, createReport, setReport }) => {
    const { isAuth, setAuth,firestore } = useContext(AuthContext);
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [checkPassword, setCheckPassword] = useState('')

    const documentID = useFirestoreDocumentId();
    const register = (e) => {
        e.preventDefault();
        if (password === checkPassword) {
            createUserWithEmailAndPassword(auth, email, password)
                .then((userCredential) => {
                    // Signed in 
                    console.log(userCredential)
                    const user = userCredential.user;
                    updateProfile(auth.currentUser, {
                        displayName:username
                    }).then((response) => {
                        //ユーザー名とuidを保存
                        const newMessage = {
                            id: Math.floor(Math.random() * (10000 - 1) + 1), uid: user.uid, name: username, date: Date.now()
                        };
                        setDoc(doc(firestore, 'userList', documentID), newMessage)
                    }).catch((error) => {
                        console.log(error)
                    })
                    console.log({ id: user.uid, name: username })
                    setActiveUser({ id: user.uid, name: username });
                    setAuth(true);
                    setModal(false);
                    setReport(false)
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    // ..
                });


        }
        else {
            createReport(`パスワードが一致しません`)
        }
    }
    // register.addEventListener('click', function(e) {
    //     var mailAddress = document.getElementById('mailAddress').value;
    //     var password = document.getElementById('password').value;

    //     auth().createUserWithEmailAndPassword(mailAddress, password)
    //     .catch(function(error) {
    //       alert('登録できません（' + error.message + '）');
    //     });
    //   });

    return (
        <form onSubmit={register} className={!form ? cl.active : cl.nonActive}>
            <AuthInput value={username} onChange={(e) => setUsername(e.target.value)} placeholder={'ユーザー名'} />
            <EmailInput value={email} onChange={(e) => setEmail(e.target.value)} placeholder={'メールアドレス'} />
            <PasswordInput value={password} onChange={(e) => setPassword(e.target.value)} placeholder={'パスワード'} />
            <PasswordInput value={checkPassword} onChange={(e) => setCheckPassword(e.target.value)} placeholder={'パスワード確認用'} />
            <SubmitButton>アカウント作成</SubmitButton>
        </form>
    )
}

export default RegistrationForm