import React, {useState, useEffect} from 'react'

const UpdateGiornata = () => {
    const urlQueryString = window.location.pathname;
    const string = urlQueryString.replace("/admin/calendario/update-giornata/" , "");
    const arrayString = string.split("/");
    console.log(arrayString)
  return (
    <p>Stai per essere reindirizzato...</p>
  )
}

export default UpdateGiornata