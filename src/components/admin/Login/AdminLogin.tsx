import React, {useState} from 'react'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import "./AdminLogin.scss"
import { useSelector, useDispatch} from "react-redux";
import { login } from '../../../redux/adminLogged';

const AdminLogin = () => {
    const [adminUser, setAdminUser] = useState("");
    const [adminPwd, setAdminPwd] = useState("");
    const history = useHistory()
    const dispatch = useDispatch();

    const checkForLogin = (e,name:string,pwd:string) => {
        e.preventDefault();
        if(name === process.env.REACT_APP_ADMIN_USERNAME){
            console.log("username valido: " + process.env.REACT_APP_ADMIN_USERNAME)
            if(pwd === process.env.REACT_APP_ADMIN_PWD){
                console.log("password valida: " + process.env.REACT_APP_ADMIN_PWD)
                dispatch(login());
                history.push("/admin")
            } else {
                window.alert("la password inserita non e' corretta")
            }
        } else {
            window.alert('username inserito non corretto')
        }
    }

  return (
    <div className="AdminLogin__container">
        <h1>Inserisci le tue credenziali admin</h1>
        <div className="AdminLogin__container__wrapper">
            <form className="AdminLogin__container__wrapper__form" onSubmit={(e)=>checkForLogin(e,adminUser,adminPwd)}>
                <input type="text" className="AdminLogin__container__wrapper__form__input"placeholder='inserisci nome admin' onChange={(e)=>setAdminUser(e.target.value)}/>
                <input type="text" className="AdminLogin__container__wrapper__form__input"placeholder='inserisci password admin'onChange={(e)=>setAdminPwd(e.target.value)} />
                <input type="submit" className="AdminLogin__container__wrapper__form__inputSubmit" />
            </form>
        </div>
    </div>
  )
}

export default AdminLogin