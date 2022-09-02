import React,{useState,useEffect} from 'react'
import { useHistory } from 'react-router-dom/cjs/react-router-dom';
import "./AddPartita.scss";

const AddPartita = () => {
    const [teams, setTeams] = useState([{}]);
    const [team1, setTeam1] = useState();
    const [team2, setTeam2] = useState();
    const [gameDate, setGameDate] = useState();
    const [gameTime, setGameTime] = useState();
    const [gameDay, setGameDay] = useState();
    const urlQueryString = window.location.pathname;
    const id = urlQueryString.replace("/admin/calendario/add-partita/" , "");
    const history = useHistory();

    const handleSubmitCreateGame = async () => {
        const response = await fetch('https://soccer-league12.herokuapp.com/games/add',{
            method: "POST",
            body: JSON.stringify({team1: team1, team2: team2, status: "da giocare", date: gameDate, time: gameTime }),
            mode: "cors",
            cache: "no-cache",
            headers: {
                "Content-Type" : "application/json"
            }
        }).then(() => history.push("/admin/calendario/update-giornata/"+id))
        if(!response.ok){
            window.alert("Something went wrong creating match...")
        }
    }

    useEffect(()=>{
        const getTeams = async () => {
            const response = await fetch('https://soccer-league12.herokuapp.com/teams',{
                method: "GET",
                mode: "cors",
                cache: "no-cache",
                headers:{
                    "Content-Type" : "application/json"
                }
            })
            if(!response.ok){
                window.alert('Something went wrong fetching teams...')
            }
            const result = await response.json();
            setTeams(result);
        }
        getTeams()
    },[teams.length])

    useEffect(()=>{
        const getGameDay = async () => {
            const response = await fetch('https://soccer-league12.herokuapp.com/calendar/' + id,{
                method: "GET",
                mode: "cors",
                cache: "no-cache",
                headers: {
                    "Content-Type" : "application/json"
                }
            })
            if(!response.ok){
                window.alert("something went wrong fetching gameDay")
            }
            const result = await response.json();
            setGameDay(result);
        }
        getGameDay()
    },[gameDay])

  return (
    <div className="AddPartita__container">
        <p>Crea una nuova Partita</p>
        <form onSubmit={() => handleSubmitCreateGame()}>
            <div>
            <label>Inserisci la prima squadra</label>
            <select onChange={(e) => setTeam1(e.target.value)}>
                <option selected="selected"> - </option>
                {
                    teams.map((team) => (
                        <option value={team._id}> {team.name}</option>
                    ))
                }
            </select>
            </div>
            <div>
            <label>Inserisci la seconda squadra</label>
            <select onChange={(e) => setTeam2(e.target.value)}>
                <option selected="selected"> - </option>
                {
                    teams.map((team) => (
                        <option value={team._id}> {team.name}</option>
                    ))
                }
            </select>
            </div>
            <div>
            <label>Inserisci la data</label>
            <input type="date" onChange={(e) => setGameDate(e.target.value)}/>
            </div>
            <div>
            <label>Inserisci l'orario'</label>
            <input type="time" onChange={(e) => setGameTime(e.target.value)}/>
            </div>
            <div style={{width:"300px", marginLeft: "170px"}}>
            <input type="submit" />
            </div>
        </form>
    </div>
  )
}

export default AddPartita