import { useMemo } from 'react'
import { Navigate } from 'react-router';

import FriendsList from './FriendsLits';
import SearchInput from './UI/SearchInput';

import cl from '../styles/components/ProfileSidebar.module.css'

import avatar from '../styles/images/avatar.png'

const ProfileSidebar = ({ isAuth, activeUser, users, start, interlocutor, search, setSearch, setAuth, setModal }) => {
    const logOut = () => {
        setModal(true)
        setAuth(false)
    }
    const friendSearcher = useMemo(() => {
        //console.log(users.filter(user => user.name))
        if (users && users !== '') {
            return users.filter((user) => user.name.includes(search));
        }
    }, [search, users]);

    return isAuth ? (
        <div className={cl.profile}>
            <div className={cl.profile_info}>
                <img src={avatar} className={cl.avatar} alt="" />
                <div className={cl.user_box}>
                    <h1 className={cl.username}>{isAuth ? activeUser.name : 'Anonimous'}</h1>
                    <button onClick={logOut} className={cl.logout}>Log out</button>
                </div>
                <SearchInput value={search} onChange={e => setSearch(e.target.value)} />
                <div>
                    <FriendsList interlocutor={interlocutor} users={friendSearcher} start={start} activeUser={activeUser} />
                </div>
            </div>
        </div>
    )
        :
        (
            <Navigate to={'/'} />
        )
}

export default ProfileSidebar