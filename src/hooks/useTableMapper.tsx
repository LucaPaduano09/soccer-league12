import React, { useState, useEffect } from "react";

export default async function useTableMapper(typology: string) {
  const [fill, setFill] = useState([{}]);
  // useEffect(()=>{
  //   const getFiller = async (typology: string) => {
  //       const response = await fetch("https://soccer-league12.herokuapp.com/" + typology, {
  //         method: "GET",
  //         mode: "cors",
  //         cache: "no-cache",
  //         credentials: "same-origin",
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //       });
  //       if (!response.ok) {
  //         console.error("Error fetching data in useTableMapper...");
  //       }
  //       const result = await response.json();
  //       setFill(result);
  //     };
  //   getFiller(typology)
  // },[])

// console.log(fill)
  return {fill};
}
