import React, {useState} from 'react'

import {LoginForm} from './LoginForm'
import RegistrationForm from './RegistrationForm'
import ReportComponent from './ReportComponent'

import cl from '../styles/components/ModalWindow.module.css'

const ModalWindow = ({vision, users, setModal, setActiveUser}) => {
    const [form, setForm] = useState(true)
    const [report, setReport] = useState(false)
    const [reportMessage, setReportMessage] = useState('')

    const createReport = (newReport) => {
        setReport(true)
        setReportMessage(newReport)
    }

    const redirectToRegistration = () => {
        setForm(false)
        setReport(false)
    }
    const loginForm = () => {
        setForm(true)
        setReport(false)
    }
    return (
        <div className={vision ? cl.modal : cl.nonActive}>
            <div className={cl.modalBox}>
                <h1 className={cl.modalTitle}>{form ? 'ログインをしてください' : '新しくアカウントを作成'}</h1>
            </div>
            <div className={cl.formBox}>
                <LoginForm form={form} users={users} setModal={setModal} setActiveUser={setActiveUser} createReport={createReport} setReport={setReport} />
                <RegistrationForm form={form} setModal={setModal} setActiveUser={setActiveUser} createReport={createReport} setReport={setReport} />
            </div>
            <ReportComponent report={reportMessage} vision={report} />
            <div className={cl.modalBox}>
                <h1 className={form ? cl.modalSubTitle : cl.nonActive}>アカウントがない場合は <span onClick={redirectToRegistration} className={cl.modalLink}>こちら</span></h1>
            </div>
            <div className={cl.modalBox}>
                <h1 className={!form ? cl.modalSubTitle : cl.nonActive}>ログインは<span onClick={loginForm} className={cl.modalLink}>こちら</span></h1>
            </div>
        </div>
    )
}

export default ModalWindow