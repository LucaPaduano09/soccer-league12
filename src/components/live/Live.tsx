import React, { useState, useEffect } from "react";
import { Image } from "cloudinary-react";
import "./Live.scss";

const Live = () => {
  const [liveMatch, setLiveMatch] = useState([{}]);
  const [games, setGames] = useState([{}]);
  const [teams, setTeams] = useState([{}]);
  const [players, setPlayers] = useState([{}]);
  const [marcatoriTeam1, setMarcatoriTeam1] = useState([]);
  const [marcatoriTeam2, setMarcatoriTeam2] = useState([{}]);

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
      }
      const result = await response.json();
      setPlayers(result);
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
        window.alert("something went wrong fetching teams");
      }
      const result = await response.json();
      setTeams(result);
    };
    getTeams();
  }, [teams.length]);

  useEffect(() => {
    const getGames = async () => {
      const response = await fetch(
        "https://soccer-league12.herokuapp.com/games",
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
        window.alert("Something went wrong fetching games...");
      }
      const result = await response.json();
      setGames(result);
      console.log(games)
    };
    getGames();
  }, [games?.length]);

  useEffect(() => {
    const getLiveMatch = () => {
      if (games?.length > 0) {
        let liveMatch = games.filter((game: any) => game.status === "live");
        setLiveMatch(liveMatch);
      }
    };
    getLiveMatch();
  }, [games.length, liveMatch.length]);

  useEffect(() => {
    if((liveMatch[0] as any)?.marcatori?.length > 0){
        (liveMatch[0] as any)?.marcatori.map((marcatore: any) => {
            let teamId = getPlayerTeamId(marcatore);
            if(teamId === (liveMatch[0] as any)?.team1){
                let pushedMarcatori: any =  marcatoriTeam1;
                pushedMarcatori.push(marcatore);
                setMarcatoriTeam1(pushedMarcatori)
            } else if(teamId === (liveMatch[0] as any)?.team2){
                let pushedMarcatori: any = marcatoriTeam2;
                pushedMarcatori.push(marcatore);
                setMarcatoriTeam2(pushedMarcatori);
            }
        })
    }
  }, [liveMatch.length, (liveMatch[0] as any)?.marcatori?.length])

  const getTeamName = (teamId) => {
    let filteredTeam = teams.filter((team: any) => team._id === teamId);
    if (filteredTeam?.length > 0) {
      return (filteredTeam[0] as any).name;
    }
  };

  const getTeamLogo = (teamId) => {
    let filteredTeam = teams.filter((team: any) => team._id === teamId);
    if (filteredTeam?.length > 0) {
      return (filteredTeam[0] as any).logo;
    }
  };

  const getPlayerTeamId = (marcatore) => {
    let searchedPlayer = players.filter((player: any) => player._id === marcatore);
    if(searchedPlayer?.length > 0) {
        return (searchedPlayer[0] as any).teamId
    }
  };

  const getPlayerName = (marcatore) => {
    let filteredPlayer = players.filter((player: any) => player._id === marcatore);
    if(filteredPlayer?.length > 0){
        console.log(filteredPlayer[0])
        return (
            <p>{(filteredPlayer[0] as any).first_name + " " + (filteredPlayer[0] as any).last_name}</p>
        )
    }
  }

  return (
    <div className="Live__container">
      {liveMatch?.length > 0 && (
        <>
        <div className="Live__container__topBanner">
          <div className="Live__container__topBanner__firstTeam">
            <Image
              public_id={getTeamLogo((liveMatch[0] as any).team1)}
              cloudName="dhadbk8ko"
            />
            <p>{getTeamName((liveMatch[0] as any).team1)}</p>
          </div>
          <div className="Live__container__topBanner__result">
            <div className="Live__container__topBanner__result__date">
              {liveMatch?.length > 0 && (
                <>
                  <p>{(liveMatch[0] as any).date}</p>
                  <p>{(liveMatch[0] as any).time}</p>
                </>
              )}
            </div>
            {liveMatch?.length > 0 && <p>{(liveMatch[0] as any).result}</p>}
          </div>
          <div className="Live__container__topBanner__secondTeam">
            {liveMatch?.length > 0 && (
              <Image
                public_id={getTeamLogo((liveMatch[0] as any).team2)}
                cloudName="dhadbk8ko"
              />
            )}
            <p>{getTeamName((liveMatch[0] as any).team2)}</p>
          </div>
        </div>
        <div className="Live__container__middleBanner">
            <div className="Live__container__middleBanner__left">
                {
                    marcatoriTeam1?.length > 0 && 
                    marcatoriTeam1?.map((marcatore) => (
                        <div>
                            <img src="./images/ball.png" alt="" />
                            {getPlayerName(marcatore)}
                        </div>
                    ))
                }
            </div>
            <div className="Live__container__middleBanner__separator"></div>
            <div className="Live__container__middleBanner__right">
                {
                    marcatoriTeam2?.length > 0 &&
                    marcatoriTeam2?.map((marcatore) => (
                        <div>
                            <img src="./images/ball.png" alt="" />
                            {getPlayerName(marcatore)}
                        </div>
                    ))
                }
            </div>
        </div>
        </>
      )}
      {liveMatch[0] === null ||
        (liveMatch[0] === undefined && (
          <p>Non ci sono partite in corso al momento</p>
        ))}
    </div>
  );
};

export default Live;
