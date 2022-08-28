import React, {useState} from 'react'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import "./AdminLogin.scss"


const AdminLogin = () => {
    const [adminUser, setAdminUser] = useState("");
    const [adminPwd, setAdminPwd] = useState("");
    const history = useHistory()

    const checkForLogin = (name:string,pwd:string) => {
        console.log(process.env.REACT_APP_ADMIN_USERNAME)
        if(name === process.env.REACT_APP_ADMIN_USERNAME){
            if(pwd === process.env.REACT_APP_ADMIN_PWD){
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
            <form className="AdminLogin__container__wrapper__form" onSubmit={()=>checkForLogin(adminUser,adminPwd)}>
                <input type="text" className="AdminLogin__container__wrapper__form__input"placeholder='inserisci nome admin' onChange={(e)=>setAdminUser(e.target.value)}/>
                <input type="text" className="AdminLogin__container__wrapper__form__input"placeholder='inserisci password admin'onChange={(e)=>setAdminPwd(e.target.value)} />
                <input type="submit" className="AdminLogin__container__wrapper__form__inputSubmit" />
            </form>
        </div>
    </div>
  )
}

export default AdminLogin