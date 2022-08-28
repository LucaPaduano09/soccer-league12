import React, { useEffect } from 'react'
import Cards from '../cards/Cards';
import TableRank from '../tableRank/TableRank.tsx';
import { useSelector } from 'react-redux';
import"./Home.scss";
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

const HomeAdmin = () => {
  const logged = useSelector(state => state.adminLogged.logged);
  let history = useHistory();

  useEffect(()=>{
    const checkLogged = () => {
      console.log(logged)
      if(logged === false){
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