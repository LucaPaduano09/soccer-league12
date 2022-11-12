import React, { useState, useEffect } from "react";
import "./SingleMatch.scss";
import { Image } from "cloudinary-react";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import { useDispatch, useSelector } from "react-redux";
import {
  openUpdateResultModal,
  closeUpdateResultModal,
  openUpdateDateModal,
  closeUpdateDateModal,
  openUpdateTimeModal,
  closeUpdateTimeModal,
  openUpdateScorerModal,
  closeUpdateScorerModal,
  openUpdateGameStatusModal,
  closeUpdateGameStatusModal,
  openAddAmmonizioneModal,
  closeAddAmmonizioneModal,
  openAddEspulsioneModal,
  closeAddEspulsioneModal
} from "../../../redux/modals";


const SingleMatchFinal = () => {
  const urlQueryString = window.location.pathname;
  const id = urlQueryString.replace("/admin/calendario/partita-final/", "");
  const [partita, setPartita] = useState();
  const [teams, setTeams] = useState([{}]);
  const [team1, setTeam1] = useState();
  const [team2, setTeam2] = useState();
  const [players, setPlayers] = useState([{}]);
  const [filteredPlayers, setFilteredPlayers] = useState([{}]);
  const dispatch = useDispatch();
  const updateResultModal = useSelector(
    (state: any) => state.addModal.updateResultModal
  );
  const updateDateModal = useSelector(
    (state: any) => state.addModal.updateDateModal
  );
  const updateTimeModal = useSelector(
    (state: any) => state.addModal.updateTimeModal
  );
  const updateScorerModal = useSelector(
    (state: any) => state.addModal.updateScorerModal
  );
  const updateGameStatusModal = useSelector(
    (state: any) => state.addModal.updateGameStatusModal
  );
  const addAmmonizioneModal = useSelector(
    (state: any) => state.addModal.addAmmonizioneModal
  );
  const addEspulsioneModal = useSelector(
    (state: any) => state.addModal.addEspulsioneModal
  );
  const [resultTeam1, setResultTeam1] = useState("");
  const [resultTeam2, setResultTeam2] = useState("");
  const [newDate, setNewDate] = useState("");
  const [newTime, setNewTime] = useState("");
  const [marcatore, setMarcatore] = useState("");
  const [newStatus, setNewStatus] = useState("");
  const [ammonito, setAmmonito] = useState("");
  const [espulsione, setEspulsione] = useState("");

  useEffect(() => {
    const getPartita = async () => {
      const response = await fetch(
        "https://soccer-league12.herokuapp.com/games/" + id,
        {
          method: "GET",
          mode: "cors",
          cache: "no-cache",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (!response.ok) {
        window.alert("something went wrong fetching specific game");
      }
      const result = await response.json();
      setPartita(result);
    };
    getPartita();
  }, []);

  useEffect(() => {
    const getPlayers = async () => {
      const response = await fetch(
        "https://soccer-league12.herokuapp.com/players",
        {
          method: "GET",
          mode: "cors",
          cache: "no-cache",
          credentials: "same-origin",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (!response.ok) {
        window.alert("Something went wrong fetching players...");
      } else {
        const result = await response.json();
        setPlayers(result);
      }
    };
    getPlayers();
  }, [players.length]);

  useEffect(() => {
    const getTeams = async () => {
      const response = await fetch(
        "https://soccer-league12.herokuapp.com/teams",
        {
          method: "GET",
          mode: "cors",
          cache: "no-cache",
          credentials: "same-origin",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (!response.ok) {
        window.alert("Something went wrong fetching teams...");
      } else {
        const result = await response.json();
        setTeams(result);
      }
    };
    getTeams();
  }, [teams.length]);

  useEffect(() => {
    const filterPlayersForTeams = (players: any, team1: any, team2: any) => {
      let filteredPlayers = players.filter(
        (player: any) =>
          player.teamId === team1._id || player.teamId === team2._id
      );
      setFilteredPlayers(filteredPlayers);
    };
    if (
      players !== null &&
      players !== undefined &&
      players.length > 0 &&
      team1 !== null &&
      team1 !== undefined &&
      team2 !== null &&
      team2 !== undefined
    ) {
      filterPlayersForTeams(players, team1, team2);
    }
  }, [players, team1, team2]);
 
  useEffect(() => {
    if (partita !== null && partita !== undefined) {
      const getTeam1 = async () => {
        const response = await fetch(
          "https://soccer-league12.herokuapp.com/teams/" + partita.team1,
          {
            method: "GET",
            mode: "cors",
            cache: "no-cache",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        if (!response.ok) {
          window.alert("Something went wrong fetching team1");
        }
        const result = await response.json();
        setTeam1(result);
      };
      getTeam1();
    }
  }, [partita]);

  useEffect(() => {
    if (partita !== null && partita !== undefined) {
      const getTeam2 = async () => {
        const response = await fetch(
          "https://soccer-league12.herokuapp.com/teams/" + partita.team2,
          {
            method: "GET",
            mode: "cors",
            cache: "no-cache",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        if (!response.ok) {
          window.alert("Something went wrong fetching team1");
        }
        const result = await response.json();
        setTeam2(result);
      };
      getTeam2();
    }
  }, [partita]);

  const handleUpdateResult = async (e) => {
    e.preventDefault();
    const response = await fetch(
      "https://soccer-league12.herokuapp.com/games-update-result/" + id,
      {
        method: "POST",
        body: JSON.stringify({ result: resultTeam1 + " - " + resultTeam2 }),
        mode: "cors",
        cache: "no-cache",
        credentials: "same-origin",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (!response.ok) {
      window.alert("Something went wrong updating result . . .");
    } else {
      window.location.reload();
    }
  };
  const handleUpdateDate = async (e) => {
    e.preventDefault();
    const response = await fetch(
      "https://soccer-league12.herokuapp.com/games-update-date/" + id,
      {
        method: "POST",
        body: JSON.stringify({ date: newDate }),
        mode: "cors",
        cache: "no-cache",
        credentials: "same-origin",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (!response.ok) {
      window.alert("Something went wrong updating date...");
    } else {
      dispatch(closeUpdateDateModal());
      window.location.reload();
    }
  };
  const handleUpdateTime = async (e) => {
    e.preventDefault();
    const response = await fetch(
      "https://soccer-league12.herokuapp.com/games-update-time/" + id,
      {
        method: "POST",
        body: JSON.stringify({ time: newTime }),
        mode: "cors",
        cache: "no-cache",
        credentials: "same-origin",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (!response.ok) {
      window.alert("Something went wrong updating time...");
    } else {
      dispatch(closeUpdateTimeModal());
      window.location.reload();
    }
  };
  const handleUpdatePlayerScorer = async () => {
    let id = marcatore
    const response2 = await fetch(
      "https://soccer-league12.herokuapp.com/players-goal-final/" + id,
      {
        method: "POST",
        body: JSON.stringify({scores: 1}),
        mode: "cors",
        cache: "no-cache",
        credentials: "same-origin",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if(!response2.ok){
      window.alert("Something went wrong updating player...");
    } else {
      dispatch(closeUpdateScorerModal());
      window.location.reload()
    }
  }
  const handleUpdateScorer = async (e) => {
    e.preventDefault();
    const response = await fetch(
      "https://soccer-league12.herokuapp.com/games-update-marcatori/" + id,
      {
        method: "POST",
        body: JSON.stringify({ marcatori: marcatore }),
        mode: "cors",
        cache: "no-cache",
        credentials: "same-origin",
        headers: {
          "Content-Type": "application/json",
        },
      }
    ).then(()=> handleUpdatePlayerScorer())
  };
  const handleUpdateGameStatus = async (e) => {
    e.preventDefault();
    const response = await fetch('https://soccer-league12.herokuapp.com/games-update-status/' + id,{
      method: "POST",
      body: JSON.stringify({status: newStatus}),
      mode: "cors",
      cache: "no-cache",
      credentials: "same-origin",
      headers:{
        "Content-Type" : "application/json"
      }
    });
    if(!response.ok){
      window.alert("something went wrong updating game status")
    } else {
      window.alert("Stato partita cambiato")
      dispatch(closeUpdateGameStatusModal());
      window.location.reload()
    }
  }
  const handleAddAmmonito = async (e) => {
    e.preventDefault();
    console.log(ammonito)
    const response = await fetch("https://soccer-league12.herokuapp.com/players-ammonito/" + ammonito, {
      method: "POST",
      mode: "cors",
      cache: "no-cache",
      credentials: "same-origin",
      headers: {
        "Content-Type" : "application/json"
      }
    })
    if(!response.ok) {
      window.alert("Something went wrong updating ammonito");
    } else {
      let fp = filteredPlayers.filter((player: any) => player._id === ammonito)
      window.alert(`ammonizione aggiunta al giocatore ${fp[0].first_name + " " + fp[0].last_name}`)
      dispatch(closeAddAmmonizioneModal())
      window.location.reload()
    }
  }
  const handleAddEspulso = async (e) => {
    e.preventDefault();
    const response = await fetch("https://soccer-league12.herokuapp.com/players-espulso/" + espulsione,{
      method: "POST",
      mode: "cors",
      cache: "no-cache",
      credentials: "same-origin",
      headers: {
        "Content-Type" : "application/json"
      }
    })
    if(!response.ok){
      window.alert("something went wrong updating espulsione")
    } else {
      window.alert("espulsione aggiunta");
      dispatch(closeAddEspulsioneModal());
      window.location.reload();
    }
  }
  const getMarcatore = (marcatore) => {
    if(players?.length > 0){
      let fp = players?.filter((player: any) => player?._id === marcatore);
      if(fp.length > 0){
        console.log('trovato')
        return (
          fp[0]
          )
      }
    }
  }
  const getCorrectTeam = (giocatore) => {
    if(giocatore?.teamId === team1?._id){
      return(
        <p>{giocatore?.first_name + " " + giocatore?.last_name}</p>
      )
    }
    else {
      return null
    }
  }

  return (
    <div className="SingleMatch__container">
      {updateResultModal && (
        <>
          <div className="SingleMatch__container__overlay" />
          <div className="SingleMatch__container__modal">
            <button
              className="SingleMatch__container__modal__close"
              onClick={() => dispatch(closeUpdateResultModal())}
            >
              {" "}
              X{" "}
            </button>
            <h2>Aggiorna Risultato</h2>
            <div>
              <input
                type="text"
                onChange={(e) => setResultTeam1(e.target.value)}
              />
              <p> - </p>
              <input
                type="text"
                onChange={(e) => setResultTeam2(e.target.value)}
              />
            </div>
            <button onClick={(e) => handleUpdateResult(e)}>Aggiorna</button>
          </div>
        </>
      )}
      {updateDateModal && (
        <>
          <div className="SingleMatch__container__overlay" />
          <div className="SingleMatch__container__modal">
            <button
              className="SingleMatch__container__modal__close"
              onClick={() => dispatch(closeUpdateDateModal())}
            >
              {" "}
              X{" "}
            </button>
            <h2>Aggiorna Data</h2>
            <div>
              <input type="date" onChange={(e) => setNewDate(e.target.value)} />
            </div>
            <button onClick={(e) => handleUpdateDate(e)}>Aggiorna</button>
          </div>
        </>
      )}
      {updateTimeModal && (
        <>
          <div className="SingleMatch__container__overlay" />
          <div className="SingleMatch__container__modal">
            <button
              className="SingleMatch__container__modal__close"
              onClick={() => dispatch(closeUpdateTimeModal())}
            >
              {" "}
              X{" "}
            </button>
            <h2>Aggiorna Ora</h2>
            <div>
              <input type="time" onChange={(e) => setNewTime(e.target.value)} />
            </div>
            <button onClick={(e) => handleUpdateTime(e)}>Aggiorna</button>
          </div>
        </>
      )}
      {updateScorerModal && (
        <>
          <div className="SingleMatch__container__overlay" />
          <div className="SingleMatch__container__modal">
            <button
              className="SingleMatch__container__modal__close"
              onClick={() => dispatch(closeUpdateScorerModal())}
            >
              {" "}
              X{" "}
            </button>
            <h2>Aggiorna Marcatori</h2>
            <div>
              <select onChange={(e) => setMarcatore(e.target.value)}>
                <option disabled selected> - </option>
                {filteredPlayers !== null &&
                  filteredPlayers !== undefined &&
                  filteredPlayers.length > 0 &&
                  filteredPlayers.map((fp: any) => (
                    <option value={fp._id}>
                      {fp.first_name + " " + fp.last_name}
                    </option>
                  ))}
              </select>
            </div>
            <button onClick={(e) => handleUpdateScorer(e)}>Aggiorna</button>
          </div>
        </>
      )}
      {updateGameStatusModal && (
        <>
          <div className="SingleMatch__container__overlay" />
          <div className="SingleMatch__container__modal">
            <button
              className="SingleMatch__container__modal__close"
              onClick={() => dispatch(closeUpdateGameStatusModal())}
            >
              {" "}
              X{" "}
            </button>
            <h2>Aggiorna Stato</h2>
            <div>
              <select onChange={(e) => setNewStatus(e.target.value)}>
                <option disabled selected> - </option>
                <option value="da giocare">da giocare</option>
                <option value="live">live</option>
                <option value="conclusa">conclusa</option>
              </select>
            </div>
            <button onClick={(e) => handleUpdateGameStatus(e)}>Aggiorna</button>
          </div>
        </>
      )}
      {addAmmonizioneModal && (
        <>
          <div className="SingleMatch__container__overlay" />
          <div className="SingleMatch__container__modal">
            <button
              className="SingleMatch__container__modal__close"
              onClick={() => dispatch(closeAddAmmonizioneModal())}
            >
              {" "}
              X{" "}
            </button>
            <h2>Aggiungi ammonito</h2>
            <div>
              <select onChange={(e) => setAmmonito(e.target.value)}>
                <option disabled selected> - </option>
                {
                  filteredPlayers?.length > 0 && 
                  filteredPlayers.map((player:any) => (
                    <option value={player._id}> {player.first_name + " " + player.last_name}</option>
                  ))
                }
              </select>
            </div>
            <button onClick={(e) => handleAddAmmonito(e)}>Aggiorna</button>
          </div>
        </>
      )}
      {addEspulsioneModal && (
        <>
          <div className="SingleMatch__container__overlay" />
          <div className="SingleMatch__container__modal">
            <button
              className="SingleMatch__container__modal__close"
              onClick={() => dispatch(closeAddEspulsioneModal())}
            >
              {" "}
              X{" "}
            </button>
            <h2>Aggiungi espulso</h2>
            <div>
              <select onChange={(e) => setEspulsione(e.target.value)}>
                <option disabled selected> - </option>
                {
                  filteredPlayers?.length > 0 && 
                  filteredPlayers.map((player:any) => (
                    <option value={player._id}> {player.first_name + " " + player.last_name}</option>
                  ))
                }
              </select>
            </div>
            <button onClick={(e) => handleAddEspulso(e)}>Aggiorna</button>
          </div>
        </>
      )}
      <div className="SingleMatch__container__topBanner">
        <Link to="/admin/dashboard">indietro</Link>
        <h3>Partita</h3>
      </div>
      <div className="SingleMatch__container__middleBanner">
        <div className="SingleMatch__container__middleBanner__team1">
          <Image
            public_id={team1 !== null && team1 !== undefined && team1.logo}
            cloudName="dhadbk8ko"
          />
          <p>{team1 !== null && team1 !== undefined && team1.name}</p>
        </div>
        <p className="SingleMatch__container__middleBanner__separator">
          {partita !== null && partita !== undefined && <p>{partita.date}</p>}
          {partita !== null && partita !== undefined && <p>{partita.time}</p>}
          {partita !== null && partita !== undefined && (
            <div className="SingleMatch__container__middleBanner__separator__result">
              {partita.result}
            </div>
          )}
        </p>
        <div className="SingleMatch__container__middleBanner__team2">
          <Image
            public_id={team2 !== null && team2 !== undefined && team2.logo}
            cloudName="dhadbk8ko"
          />
          <p>{team2 !== null && team2 !== undefined && team2.name}</p>
        </div>
      </div>
      <div className="SingleMatch__container__midlowerBanner">
        <div className="SingleMatch__container__midlowerBanner__team1">
          {
            partita !== null &&
            partita !== undefined && 
            partita.marcatori !== null &&
            partita.marcatori !== undefined &&
            partita.marcatori.map((marc: any) => {
              getCorrectTeam(getMarcatore(marc))
            })
          }
        </div>
        <div className="SingleMatch__container__midlowerBanner__separator" />
        <div className="SingleMatch__container__midlowerBanner__team2"></div>
      </div>
      <div className="SingleMatch__container__lowerBanner">
        <div>
          <button onClick={() => dispatch(openUpdateGameStatusModal())}>
            Aggiorna Stato
          </button>
          <button onClick={() => dispatch(openUpdateResultModal())}>
            Aggiorna Risultato
          </button>
        </div>
        <div>
          <button onClick={() => dispatch(openUpdateDateModal())}>
            Aggiorna Data
          </button>
          <button onClick={() => dispatch(openUpdateTimeModal())}>
            Aggiorna Ora
          </button>
        </div>
        <div>
          <button onClick={() => dispatch(openAddAmmonizioneModal())}>
            Aggiungi ammonito
          </button>
          <button onClick={() => dispatch(openAddEspulsioneModal())}>
            Aggiungi espulso
          </button>
        </div>
        <div>
        <button onClick={() => dispatch(openUpdateScorerModal())}>
            Aggiorna Marcatori
          </button>
        </div>
      </div>
    </div>
  );
};

export default SingleMatchFinal;
