import React, {useState} from 'react'

import AuthInput from './UI/AuthInput'
import PasswordInput from './UI/PasswordInput'
import SubmitButton from './UI/SubmitButton'

import cl from '../styles/components/LoginForm.module.css'

const RegistrationForm = ({form, setForm, createUser, createReport, setReport}) => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [checkPassword, setCheckPassword] = useState('')

    const register = (e) => {
        e.preventDefault();
        if (password === checkPassword) {
            const newUser = {
                id: Math.floor(Math.random() * (10000 - 1) + 1), name: username, password: password
            }
            setForm(true)
            setReport(false)
            createUser(newUser)
        }
        else {
            createReport(`パスワードが一致しません`)
        }
    }

    return (
        <form onSubmit={register} className={!form ? cl.active : cl.nonActive}>
            <AuthInput value={username} onChange={(e) => setUsername(e.target.value)} placeholder={'ユーザー名'} />
            <PasswordInput value={password} onChange={(e) => setPassword(e.target.value)} placeholder={'パスワード'} />
            <PasswordInput value={checkPassword} onChange={(e) => setCheckPassword(e.target.value)} placeholder={'パスワード確認用'} />
            <SubmitButton>アカウント作成</SubmitButton>
        </form>
    )
}

export default RegistrationForm