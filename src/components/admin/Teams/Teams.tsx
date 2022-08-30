import React, {useState, useEffect} from 'react'
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import { Image } from 'cloudinary-react';

import "./Teams.scss"
const Teams = () => {
    const [teams,setTeams] = useState([{}]);

    useEffect(()=>{

        const getTeams = async () => {
            const response = await fetch('https://soccer-league12.herokuapp.com/teams',{
                method: "GET",
                mode: "cors",
                cache: "no-cache",
                headers:{
                    "Content-Type": "application/json"
                }
            })
            if(!response.ok){
                window.alert("something went wrong fetching teams...")
            }
            const result = await response.json()
            setTeams(result);
        }
        getTeams()

    },[teams.length])

  return (
    <div className="Teams__container">
        <h1>Tutte le squadre presenti in database</h1>
        <div className="Teams__container__addTeam">
            add
        </div>
        <div className="Teams__container__tableWrapper">
            <table>
                <thead>
                    <th>
                        <td>Logo</td>
                        <td>Nome</td>
                        <td>Id Torneo</td>
                    </th>
                </thead>
                <tbody>
                    {
                        teams.map((team:any)=>(
                            <tr>
                                <td>
                                    <Image public_id={team.logo + ".png"} cloud_name="dhadbk8ko"/>
                                </td>
                                <td>
                                    <Link to={"/admin/team/" + team._id}>
                                        {team.name}
                                    </Link>
                                </td>
                                <td>{team.tournamentId}</td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    </div>
  )
}

export default Teams