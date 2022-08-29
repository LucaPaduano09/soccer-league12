import React, { useEffect } from 'react'
import Cards from '../cards/Cards';
import TableRank from '../tableRank/TableRank.tsx';
import { useSelector } from 'react-redux';
import"./Home.scss";
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { bake_cookie, read_cookie, delete_cookie } from 'sfcookies';

const HomeAdmin = () => {
  const logged = useSelector(state => state.adminLogged.logged);
  let history = useHistory();

  useEffect(()=>{
    const checkLogged = () => {
      console.log(read_cookie("adminLogged"));
      if(read_cookie("adminLogged").length === 0){
        history.push('/admin/login')
      }
    }
    checkLogged()
  })
  return (
    <div className="Home__container">
        <Cards />
        <TableRank />
    </div>
  )
}

export default HomeAdmin