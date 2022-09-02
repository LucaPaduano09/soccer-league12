import React, {useState, useEffect} from 'react'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import "./AdminLogin.scss"
import { useSelector, useDispatch} from "react-redux";
import { login } from '../../../redux/adminLogged';
import { bake_cookie, read_cookie, delete_cookie } from 'sfcookies';

const AdminLogin = () => {
    const [adminUser, setAdminUser] = useState("");
    const [adminPwd, setAdminPwd] = useState("");
    const history = useHistory()
    const dispatch = useDispatch();
    const cookie_key = 'adminLogged';

    const checkForLogin = (e,name:string,pwd:string) => {
        e.preventDefault();
        if(name === process.env.REACT_APP_ADMIN_USERNAME){
            console.log("username valido: " + process.env.REACT_APP_ADMIN_USERNAME)
            if(pwd === process.env.REACT_APP_ADMIN_PWD){
                console.log("password valida: " + process.env.REACT_APP_ADMIN_PWD)
                dispatch(login());
                bake_cookie(cookie_key, true);
                history.push("/admin/dashboard")
            } else {
                window.alert("la password inserita non e' corretta")
            }
        } else {
            window.alert('username inserito non corretto')
        }
    }

    useEffect(()=>{
        console.log(read_cookie("adminLogged"));
        if(read_cookie("adminLogged")?.length > 0){
            history.push("/admin/dashboard")
        }
    },[])

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