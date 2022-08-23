import React, {useState, useEffect} from 'react'
import"./Competition.scss"

const Competition = () => {
    const [competition, setCompetition] = useState({})
    const urlQueryString = window.location.pathname;
    const id = urlQueryString.replace("/competizione/", "");
    console.log(id)
  return (
    <></>
  )
}

export default Competition