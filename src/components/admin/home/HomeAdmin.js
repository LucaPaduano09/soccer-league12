import React from 'react'
import Cards from '../cards/Cards';
import TableRank from '../tableRank/TableRank.tsx';
import"./Home.scss";

const HomeAdmin = () => {
  return (
    <div className="Home__container">
        <Cards />
        <TableRank />
    </div>
  )
}

export default HomeAdmin