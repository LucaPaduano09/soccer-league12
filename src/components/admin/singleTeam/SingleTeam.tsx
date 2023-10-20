import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom/cjs/react-router-dom";
import {
  openDeleteTeamModal,
  closeDeleteTeamModal,
  openUpdateTeamNameModal,
  closeUpdateTeamNameModal,
  closeUpdateTeamPointsModal,
  openUpdateTeamPointsModal,
  openUpdateTeamLogoModal,
  closeUpdateTeamLogoModal,
  openUpdateTeamGoalSubitiModal,
  closeUpdateTeamGoalSubitiModal,
  openChangeGironeModal,
  closeChangeGironeModal,
  openUpdateTeamVittorieModal,
  closeUpdateTeamVittorieModal,
  openUpdateTeamSconfitteModal,
  closeUpdateTeamSconfitteModal,
  openUpdateTeamPareggiModal,
  closeUpdateTeamPareggiModal,
  closeAddTeamGoal,
  openAddTeamGoal,
  openAddVittorieFinalModal,
  closeAddVittorieFinalModal,
  openAddPareggiFinalModal,
  closeAddPareggiFinalModal,
  openAddSconfitteFinalModal,
  closeAddSconfitteFinalModal,
  openAddGoalFattiFinal,
  closeAddGoalFattiFinal,
  openAddGoalSubitiFinal,
  closeAddGoalSubitiFinal,
  openUpdateTeamPointsFinalModal,
  closeUpdateTeamPointsFinalModal,
} from "../../../redux/modals";
import "./SingleTeam.scss";
import { Image } from "cloudinary-react";
import { Link } from "react-router-dom";

const SingleTeam = () => {
  const [team, setTeam] = useState([{}]);
  const [players, setPlayers] = useState([{}]);
  const [correctPlayers, setCorrectPlayers] = useState([{}]);
  const [loadingPlayers, setLoadingPlayers] = useState(true);
  const [allTeams, setAllTeams] = useState([{}]);
  const [newTeamName, setNewTeamName] = useState("");
  const [teamPointsToAdd, setTeamPointsToAdd] = useState(0);
  const [goalSubiti, setGoalSubiti] = useState<number>(0);
  const [goalSubitiFinal, setGoalSubitiFinal] = useState<number>(0);
  const [goalFatti, setGoalFatti] = useState<number>(0);
  const [goalFattiFinal, setGoalFattiFinal] = useState<number>(0);
  const [publicIds, setPublicIds] = useState([]);
  const [specificPublicId, setSpecificPublicId] = useState("c");
  const [girone, setGirone] = useState("");
  const [vittorie, setVittorie] = useState(0);
  const [vittorieFinal, setVittorieFinal] = useState(0);
  const [pareggi, setPareggi] = useState(0);
  const [sconfitte, setSconfitte] = useState(0);
  const [pareggiFinal, setPareggiFinal] = useState(0);
  const [sconfitteFinal, setSconfitteFinal] = useState(0);
  const sortedTeams = allTeams
    .sort((a, b) => (a.points > b.points ? 1 : b.points > a.points ? -1 : 0))
    .reverse();

  const urlQueryString = window.location.pathname;
  const id = urlQueryString.replace("/admin/team/", "");
  const deleteTeamModal = useSelector(
    (state: any) => state.addModal.deleteTeamModal
  );
  const updateTeamNameModal = useSelector(
    (state: any) => state.addModal.updateTeamNameModal
  );
  const updateTeamPointsModal = useSelector(
    (state: any) => state.addModal.updateTeamPointsModal
  );
  const updateTeamPointsFinalModal = useSelector(
    (state: any) => state.addModal.updateTeamPointsFinalModal
  );
  const updateTeamGoalSubitiModal = useSelector(
    (state: any) => state.addModal.updateTeamGoalSubitiModal
  );
  const changeGironeModal = useSelector(
    (state: any) => state.addModal.changeGironeModal
  );
  const updateTeamVittorieModal = useSelector(
    (state: any) => state.addModal.updateTeamVittorieModal
  );
  const updateTeamPareggiModal = useSelector(
    (state: any) => state.addModal.updateTeamPareggiModal
  );
  const updateTeamSconfitteModal = useSelector(
    (state: any) => state.addModal.updateTeamSconfitteModal
  );
  const addTeamGoal = useSelector((state: any) => state.addModal.addTeamGoal);
  const updateTeamVittorieFinalModal = useSelector(
    (state: any) => state.addModal.addVittorieFinalModal
  );
  const updateTeamPareggiFinalModal = useSelector(
    (state: any) => state.addModal.addPareggiFinalModal
  );
  const updateTeamSconfitteFinalModal = useSelector(
    (state: any) => state.addModal.addSconfitteFinalModal
  );
  const addGoalFattiFinal = useSelector(
    (state: any) => state.addModal.addGoalFattiFinal
  );
  const addGoalSubitiFinal = useSelector(
    (state: any) => state.addModal.addGoalSubitiFinal
  );
  const dispatch = useDispatch();
  const history = useHistory();

  const handleDeleteTeam = async () => {
    const response = await fetch(
      "https://soccer-league12-42ba9ac5d9ae.herokuapp.com/teams/" + id,
      {
        method: "DELETE",
        mode: "cors",
        cache: "no-cache",
        credentials: "same-origin",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (!response.ok) {
      window.alert("Something went wrong deleting team...");
    } else {
      window.alert("Team deleted successfully");
      history.push("/admin/teams");
    }
  };
  const handleUpdateTeamName = async (e) => {
    e.preventDefault();
    const response = await fetch(
      "https://soccer-league12-42ba9ac5d9ae.herokuapp.com/teams-name/" + id,
      {
        method: "POST",
        body: JSON.stringify({ name: newTeamName }),
        mode: "cors",
        cache: "no-cache",
        credentials: "same-origin",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (!response.ok) {
      window.alert("something went wrong updating team name...");
    } else {
      window.alert("team name updated successfully");
      window.location.reload();
    }
  };
  const handleUpdateTeamPoints = async (e) => {
    e.preventDefault();
    const response = await fetch(
      "https://soccer-league12-42ba9ac5d9ae.herokuapp.com/teams-points/" + id,
      {
        method: "POST",
        mode: "cors",
        body: JSON.stringify({ points: teamPointsToAdd }),
        cache: "no-cache",
        credentials: "same-origin",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (!response.ok) {
      window.alert("Something went wrong updating team points...");
    } else {
      window.alert("Team points updated successfully");
      window.location.reload();
    }
  };
  const handleUpdateGoalSubiti = async (e) => {
    e.preventDefault();
    if (goalSubiti !== null) {
      const response = await fetch(
        "https://soccer-league12-42ba9ac5d9ae.herokuapp.com/teams-goal-subiti/" +
          id,
        {
          method: "POST",
          body: JSON.stringify({ goal_subiti: goalSubiti }),
          mode: "cors",
          cache: "no-cache",
          credentials: "same-origin",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (!response.ok) {
        window.alert("Something went wrong updating goal subiti...");
      } else {
        dispatch(closeUpdateTeamGoalSubitiModal());
        window.location.reload();
      }
    } else {
      window.alert("not a number");
    }
  };
  const handleUpdateGoalSubitiFinal = async (e) => {
    e.preventDefault();
    if (goalSubiti !== null) {
      const response = await fetch(
        "https://soccer-league12-42ba9ac5d9ae.herokuapp.com/teams-goal-subiti-final/" +
          id,
        {
          method: "POST",
          body: JSON.stringify({ goal_subiti: goalSubitiFinal }),
          mode: "cors",
          cache: "no-cache",
          credentials: "same-origin",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (!response.ok) {
        window.alert("Something went wrong updating goal subiti...");
      } else {
        window.location.reload();
      }
    } else {
      window.alert("not a number");
    }
  };
  const handleChangeGirone = async (e) => {
    e.preventDefault();
    const response = await fetch(
      "https://soccer-league12-42ba9ac5d9ae.herokuapp.com/teams-girone/" + id,
      {
        method: "POST",
        mode: "cors",
        body: JSON.stringify({ girone: girone }),
        cache: "no-cache",
        credentials: "same-origin",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (!response.ok) {
      window.alert("Something went wrong updating girone...");
    } else {
      window.alert("Girone cambiato");
      dispatch(closeChangeGironeModal());
      window.location.reload();
    }
  };
  const handleUpdateTeamVittorie = async (e) => {
    e.preventDefault();
    const response = await fetch(
      "https://soccer-league12-42ba9ac5d9ae.herokuapp.com/teams-vittorie/" + id,
      {
        method: "POST",
        mode: "cors",
        body: JSON.stringify({ vittorie: vittorie }),
        cache: "no-cache",
        credentials: "same-origin",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (!response.ok) {
      window.alert("something went wrong updating vittorie");
    } else {
      dispatch(closeUpdateTeamVittorieModal());
      window.location.reload();
    }
  };
  const handleUpdateTeamVittorieFinal = async (e) => {
    e.preventDefault();
    console.log(vittorieFinal);
    try {
      await fetch(
        "https://soccer-league12-42ba9ac5d9ae.herokuapp.com/teams-vittorie-final/" +
          id,
        {
          method: "POST",
          mode: "cors",
          body: JSON.stringify({ vittorie: vittorieFinal }),
          cache: "no-cache",
          credentials: "same-origin",
          headers: {
            "Content-Type": "application/json",
          },
        }
      ).then(() => handleUpdatePuntiFinal(vittorieFinal, 3));
    } catch (error) {
      console.log(error);
    }
  };
  const handleUpdatePuntiFinal = async (vittorie, punti) => {
    if (vittorie > 0) {
      const response1 = await fetch(
        "https://soccer-league12-42ba9ac5d9ae.herokuapp.com/teams-points-final/" +
          id,
        {
          method: "POST",
          mode: "cors",
          body: JSON.stringify({ points: punti }),
          cache: "no-cache",
          credentials: "same-origin",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (!response1.ok) {
        window.alert("something went wrong updating points final");
      } else {
        dispatch(closeAddVittorieFinalModal());
        window.location.reload();
      }
    }
  };
  const handleUpdateTeamPareggi = async (e) => {
    e.preventDefault();
    const response = await fetch(
      "https://soccer-league12-42ba9ac5d9ae.herokuapp.com/teams-pareggi/" + id,
      {
        method: "POST",
        mode: "cors",
        body: JSON.stringify({ pareggi: pareggi }),
        cache: "no-cache",
        credentials: "same-origin",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (!response.ok) {
      window.alert("something went wrong updating vittorie");
    } else {
      dispatch(closeUpdateTeamPareggiModal());
      window.location.reload();
    }
  };
  const handleUpdateTeamPareggiFinal = async (e) => {
    e.preventDefault();
    try {
      await fetch(
        "https://soccer-league12-42ba9ac5d9ae.herokuapp.com/teams-pareggi-final/" +
          id,
        {
          method: "POST",
          mode: "cors",
          body: JSON.stringify({ pareggi: pareggiFinal }),
          cache: "no-cache",
          credentials: "same-origin",
          headers: {
            "Content-Type": "application/json",
          },
        }
      ).then(() => handleUpdatePuntiFinal(pareggiFinal, 1));
    } catch (error) {
      console.log(error);
    }
  };
  const handleUpdateTeamSconfitte = async (e) => {
    e.preventDefault();
    const response = await fetch(
      "https://soccer-league12-42ba9ac5d9ae.herokuapp.com/teams-sconfitte-final/" +
        id,
      {
        method: "POST",
        mode: "cors",
        body: JSON.stringify({ sconfitte: sconfitte }),
        cache: "no-cache",
        credentials: "same-origin",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (!response.ok) {
      window.alert("something went wrong updating vittorie");
    } else {
      dispatch(closeUpdateTeamPareggiModal());
      window.location.reload();
    }
  };
  const handleUpdateTeamSconfitteFinal = async (e) => {
    e.preventDefault();
    const response = await fetch(
      "https://soccer-league12-42ba9ac5d9ae.herokuapp.com/teams-sconfitte-final/" +
        id,
      {
        method: "POST",
        mode: "cors",
        body: JSON.stringify({ sconfitte: sconfitteFinal }),
        cache: "no-cache",
        credentials: "same-origin",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (!response.ok) {
      window.alert("something went wrong updating vittorie");
    } else {
      dispatch(closeUpdateTeamPareggiModal());
      window.location.reload();
    }
  };
  const handleUpdateTeamGoalFatti = async (e) => {
    e.preventDefault();
    const response = await fetch(
      "https://soccer-league12-42ba9ac5d9ae.herokuapp.com/teams-goal-fatti/" +
        id,
      {
        method: "POST",
        mode: "cors",
        body: JSON.stringify({ goal_fatti: goalFatti }),
        cache: "no-cache",
        credentials: "same-origin",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (!response.ok) {
      window.alert("something went wrong updating vittorie");
    } else {
      dispatch(closeAddTeamGoal());
      window.location.reload();
    }
  };
  const handleUpdateTeamGoalFattiFinal = async (e) => {
    e.preventDefault();
    const response = await fetch(
      "https://soccer-league12-42ba9ac5d9ae.herokuapp.com/teams-goal-fatti-final/" +
        id,
      {
        method: "POST",
        mode: "cors",
        body: JSON.stringify({ goal_fatti: goalFattiFinal }),
        cache: "no-cache",
        credentials: "same-origin",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (!response.ok) {
      window.alert("something went wrong updating vittorie");
    } else {
      dispatch(closeAddGoalFattiFinal());
      window.location.reload();
    }
  };
  const handleToggleFinal = async () => {
    if (
      team !== null &&
      team !== undefined &&
      (team.final === false || team.final === null || team.final === undefined)
    ) {
      const response = await fetch(
        "https://soccer-league12-42ba9ac5d9ae.herokuapp.com/teams-final-yes/" +
          id,
        {
          method: "POST",
          cache: "no-cache",
          mode: "cors",
          credentials: "same-origin",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (!response.ok) {
        window.alert("something went wrong updating team to final stage");
      }
      window.alert(`Hai abilitato la squadra ${team.name} alla fase finale`);
    } else if (team !== null && team !== undefined && team.final === true) {
      const response = await fetch(
        "https://soccer-league12-42ba9ac5d9ae.herokuapp.com/teams-final-no/" +
          id,
        {
          method: "POST",
          cache: "no-cache",
          mode: "cors",
          credentials: "same-origin",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (!response.ok) {
        window.alert("something went wrong updating team to final stage");
      }
      window.alert(`Hai disabilitato la squadra ${team.name} alla fase finale`);
    }
  };
  useEffect(() => {
    const getTeams = async () => {
      const response = await fetch(
        "https://soccer-league12-42ba9ac5d9ae.herokuapp.com/teams",
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
        window.alert("Something went wrong fetching specific team");
      }
      const result = await response.json();
      setAllTeams(result);
    };
    getTeams();
  }, [allTeams.length]);

  useEffect(() => {
    const getCorrectTeam = async () => {
      const response = await fetch(
        "https://soccer-league12-42ba9ac5d9ae.herokuapp.com/teams/" + id,
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
        window.alert("Something went wrong fetching specific team");
      }
      const result = await response.json();
      setTeam(result);
    };

    getCorrectTeam();
  }, [team.length]);

  useEffect(() => {
    const getPublicIds = async () => {
      const response = await fetch(
        "https://soccer-league12-42ba9ac5d9ae.herokuapp.com/api/images",
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
        window.alert("Something went wrong fetching all public_ids");
      }
      const result = await response.json();
      setPublicIds(result);
    };
    const getSpecificPublicId = async (publicIds) => {
      let filtered = publicIds.filter((public_id) => public_id === team.logo);
      setSpecificPublicId(filtered);
    };
    getSpecificPublicId(publicIds);
    getPublicIds();
    console.log(
      publicIds,
      "specificId: " + specificPublicId,
      "team logo:" + team.logo
    );
  }, [publicIds.length]);

  useEffect(() => {
    const getPlayers = async () => {
      const response = await fetch(
        "https://soccer-league12-42ba9ac5d9ae.herokuapp.com/players",
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
        window.alert("Something went wrong fetching all players...");
      }
      const result = await response.json();
      setPlayers(result);
    };
    getPlayers();
  }, [players.length]);

  useEffect(() => {
    let correctP = players.filter((p: any) => p.teamId === id);
    setCorrectPlayers(correctP);
    setLoadingPlayers(false);
  }, [correctPlayers.length, players]);

  return (
    <div className="SingleTeam__container">
      {deleteTeamModal && (
        <>
          <div className="SingleTeam__container__modal__overlay" />
          <div className="SingleTeam__container__modal__container">
            <button
              className="SingleTeam__container__modal__container__close"
              onClick={() => dispatch(closeDeleteTeamModal())}
            >
              X
            </button>
            <h2>Cancella la squadra</h2>
            <p>Sicuro di voler cancellare la squadra ? </p>
            <button
              className="SingleTeam__container__modal__container__submit"
              onClick={() => handleDeleteTeam()}
            >
              Cancella
            </button>
          </div>
        </>
      )}
      {updateTeamNameModal && (
        <>
          <div className="SingleTeam__container__modal__overlay" />
          <div className="SingleTeam__container__modal__container">
            <button
              className="SingleTeam__container__modal__container__close"
              onClick={() => dispatch(closeUpdateTeamNameModal())}
            >
              X
            </button>
            <h2>Modifica Nome Squadra</h2>
            <input
              type="text"
              onChange={(e) => setNewTeamName(e.target.value)}
              placeholder="Nome Squadra"
            />
            <button
              className="SingleTeam__container__modal__container__submit"
              onClick={(e) => handleUpdateTeamName(e)}
            >
              Modifica
            </button>
          </div>
        </>
      )}
      {updateTeamPointsModal && (
        <>
          <div className="SingleTeam__container__modal__overlay" />
          <div className="SingleTeam__container__modal__container">
            <button
              className="SingleTeam__container__modal__container__close"
              onClick={() => dispatch(closeUpdateTeamPointsModal())}
            >
              X
            </button>
            <h2>Modifica Punti Squadra</h2>
            <input
              type="number"
              onChange={(e) => setTeamPointsToAdd(e.target.valueAsNumber)}
              placeholder="Punti da aggiungere"
            />
            <button
              className="SingleTeam__container__modal__container__submit"
              onClick={(e) => handleUpdateTeamPoints(e)}
            >
              Modifica
            </button>
          </div>
        </>
      )}
      {updateTeamPointsFinalModal && (
        <>
          <div className="SingleTeam__container__modal__overlay" />
          <div className="SingleTeam__container__modal__container">
            <button
              className="SingleTeam__container__modal__container__close"
              onClick={() => dispatch(closeUpdateTeamPointsFinalModal())}
            >
              X
            </button>
            <h2>Modifica Punti Squadra Final</h2>
            <input
              type="number"
              onChange={(e) => setTeamPointsToAdd(e.target.valueAsNumber)}
              placeholder="Punti da aggiungere"
            />
            <button
              className="SingleTeam__container__modal__container__submit"
              onClick={(e) => handleUpdatePuntiFinal(1, teamPointsToAdd)}
            >
              Modifica
            </button>
          </div>
        </>
      )}
      {updateTeamGoalSubitiModal && (
        <>
          <div className="SingleTeam__container__modal__overlay" />
          <div className="SingleTeam__container__modal__container">
            <button
              className="SingleTeam__container__modal__container__close"
              onClick={() => dispatch(closeUpdateTeamGoalSubitiModal())}
            >
              X
            </button>
            <h2>Modifica Goal Subiti</h2>
            <input
              type="number"
              onChange={(e) => setGoalSubiti(e.target.valueAsNumber)}
              placeholder="Goal subiti"
            />
            <button
              className="SingleTeam__container__modal__container__submit"
              onClick={(e) => handleUpdateGoalSubiti(e)}
            >
              Modifica
            </button>
          </div>
        </>
      )}
      {addGoalSubitiFinal && (
        <>
          <div className="SingleTeam__container__modal__overlay" />
          <div className="SingleTeam__container__modal__container">
            <button
              className="SingleTeam__container__modal__container__close"
              onClick={() => dispatch(closeAddGoalSubitiFinal())}
            >
              X
            </button>
            <h2>Modifica Goal Subiti Final</h2>
            <input
              type="number"
              onChange={(e) => setGoalSubitiFinal(e.target.valueAsNumber)}
              placeholder="Goal subiti"
            />
            <button
              className="SingleTeam__container__modal__container__submit"
              onClick={(e) => handleUpdateGoalSubitiFinal(e)}
            >
              Modifica
            </button>
          </div>
        </>
      )}
      {addTeamGoal && (
        <>
          <div className="SingleTeam__container__modal__overlay" />
          <div className="SingleTeam__container__modal__container">
            <button
              className="SingleTeam__container__modal__container__close"
              onClick={() => dispatch(closeAddTeamGoal())}
            >
              X
            </button>
            <h2>Modifica Goal Fatti</h2>
            <input
              type="number"
              onChange={(e) => setGoalFatti(e.target.valueAsNumber)}
              placeholder="Goal fatti"
            />
            <button
              className="SingleTeam__container__modal__container__submit"
              onClick={(e) => handleUpdateTeamGoalFatti(e)}
            >
              Modifica
            </button>
          </div>
        </>
      )}
      {addGoalFattiFinal && (
        <>
          <div className="SingleTeam__container__modal__overlay" />
          <div className="SingleTeam__container__modal__container">
            <button
              className="SingleTeam__container__modal__container__close"
              onClick={() => dispatch(closeAddGoalFattiFinal())}
            >
              X
            </button>
            <h2>Modifica Goal Fatti Finale</h2>
            <input
              type="number"
              onChange={(e) => setGoalFattiFinal(e.target.valueAsNumber)}
              placeholder="Goal fatti"
            />
            <button
              className="SingleTeam__container__modal__container__submit"
              onClick={(e) => handleUpdateTeamGoalFattiFinal(e)}
            >
              Modifica
            </button>
          </div>
        </>
      )}
      {changeGironeModal && (
        <>
          <div className="SingleTeam__container__modal__overlay" />
          <div className="SingleTeam__container__modal__container">
            <button
              className="SingleTeam__container__modal__container__close"
              onClick={() => dispatch(closeChangeGironeModal())}
            >
              {" "}
              X{" "}
            </button>
            <h2>Modifica Girone</h2>
            <select onChange={(e) => setGirone(e.target.value)}>
              <option disabled selected>
                {" "}
                -{" "}
              </option>
              <option value="A">A</option>
              <option value="B">B</option>
              <option value="C">C</option>
            </select>
            <input type="submit" onClick={(e) => handleChangeGirone(e)} />
          </div>
        </>
      )}
      {updateTeamVittorieModal && (
        <>
          <div className="SingleTeam__container__modal__overlay" />
          <div className="SingleTeam__container__modal__container">
            <button
              className="SingleTeam__container__modal__container__close"
              onClick={() => dispatch(closeUpdateTeamVittorieModal())}
            >
              X
            </button>
            <h2>Modifica Vittorie</h2>
            <input
              type="number"
              onChange={(e) => setVittorie(e.target.valueAsNumber)}
              placeholder="vittorie da aggiungere"
            />
            <button
              className="SingleTeam__container__modal__container__submit"
              onClick={(e) => handleUpdateTeamVittorie(e)}
            >
              Modifica
            </button>
          </div>
        </>
      )}
      {updateTeamVittorieFinalModal && (
        <>
          <div className="SingleTeam__container__modal__overlay" />
          <div className="SingleTeam__container__modal__container">
            <button
              className="SingleTeam__container__modal__container__close"
              onClick={() => dispatch(closeAddVittorieFinalModal())}
            >
              X
            </button>
            <h2>Modifica Vittorie Final</h2>
            <input
              type="number"
              onChange={(e) => setVittorieFinal(e.target.valueAsNumber)}
              placeholder="vittorie da aggiungere"
            />
            <button
              className="SingleTeam__container__modal__container__submit"
              onClick={(e) => handleUpdateTeamVittorieFinal(e)}
            >
              Modifica
            </button>
          </div>
        </>
      )}
      {updateTeamPareggiModal && (
        <>
          <div className="SingleTeam__container__modal__overlay" />
          <div className="SingleTeam__container__modal__container">
            <button
              className="SingleTeam__container__modal__container__close"
              onClick={() => dispatch(closeUpdateTeamPareggiModal())}
            >
              X
            </button>
            <h2>Modifica Pareggi</h2>
            <input
              type="number"
              onChange={(e) => setPareggi(e.target.valueAsNumber)}
              placeholder="pareggi da aggiungere"
            />
            <button
              className="SingleTeam__container__modal__container__submit"
              onClick={(e) => handleUpdateTeamPareggi(e)}
            >
              Modifica
            </button>
          </div>
        </>
      )}
      {updateTeamPareggiFinalModal && (
        <>
          <div className="SingleTeam__container__modal__overlay" />
          <div className="SingleTeam__container__modal__container">
            <button
              className="SingleTeam__container__modal__container__close"
              onClick={() => dispatch(closeAddPareggiFinalModal())}
            >
              X
            </button>
            <h2>Modifica Pareggi Final</h2>
            <input
              type="number"
              onChange={(e) => setPareggiFinal(e.target.valueAsNumber)}
              placeholder="pareggi da aggiungere"
            />
            <button
              className="SingleTeam__container__modal__container__submit"
              onClick={(e) => handleUpdateTeamPareggiFinal(e)}
            >
              Modifica
            </button>
          </div>
        </>
      )}
      {updateTeamSconfitteModal && (
        <>
          <div className="SingleTeam__container__modal__overlay" />
          <div className="SingleTeam__container__modal__container">
            <button
              className="SingleTeam__container__modal__container__close"
              onClick={() => dispatch(closeAddSconfitteFinalModal())}
            >
              X
            </button>
            <h2>Modifica Sconfitte</h2>
            <input
              type="number"
              onChange={(e) => setSconfitte(e.target.valueAsNumber)}
              placeholder="Sconfitte da aggiungere"
            />
            <button
              className="SingleTeam__container__modal__container__submit"
              onClick={(e) => handleUpdateTeamSconfitte(e)}
            >
              Modifica
            </button>
          </div>
        </>
      )}
      {updateTeamSconfitteFinalModal && (
        <>
          <div className="SingleTeam__container__modal__overlay" />
          <div className="SingleTeam__container__modal__container">
            <button
              className="SingleTeam__container__modal__container__close"
              onClick={() => dispatch(closeUpdateTeamSconfitteModal())}
            >
              X
            </button>
            <h2>Modifica Sconfitte Final</h2>
            <input
              type="number"
              onChange={(e) => setSconfitteFinal(e.target.valueAsNumber)}
              placeholder="Sconfitte da aggiungere"
            />
            <button
              className="SingleTeam__container__modal__container__submit"
              onClick={(e) => handleUpdateTeamSconfitteFinal(e)}
            >
              Modifica
            </button>
          </div>
        </>
      )}
      <div className="Foto__container__topBanner">
        <Link to="/admin/teams">indietro</Link>
        <h3>Squadra</h3>
      </div>
      <div className="SingleTeam__container__topBanner">
        <div className="SingleTeam__container__topBanner__image">
          {team !== null && team !== undefined && (
            <Image publicId={team.logo} cloudName="dhadbk8ko"></Image>
          )}
        </div>
        <div className="SingleTeam__container__topBanner__desc">
          <table>
            <tr>
              <th>Nome</th>
              <td>{team.name}</td>
            </tr>
            <tr>
              <th>Punti</th>
              <td>{team.points}</td>
            </tr>
            <tr>
              <th>Punti Final</th>
              <td>{team.points_final}</td>
            </tr>
            <tr>
              <th>Id Squadra</th>
              <td>{team._id}</td>
            </tr>
            <tr>
              <th>Girone</th>
              <td>{team.girone}</td>
            </tr>
          </table>
        </div>
      </div>
      <div className="SingleTeam__container__middleBanner">
        <h2>Squadra</h2>
        <table>
          <thead>
            <th>
              <td>Nome</td>
              <td>Cognome</td>
              <td>Goal</td>
              <td>Goal Final</td>
            </th>
          </thead>
          <tbody>
            {correctPlayers.length === 0 && (
              <p>Stiamo caricando i giocatori presenti . . .</p>
            )}
            {correctPlayers !== null &&
              correctPlayers !== undefined &&
              correctPlayers.length > 0 &&
              correctPlayers.map((cp: any) => (
                <Link
                  to={"/admin/giocatore/" + cp._id}
                  style={{
                    color: "#000",
                    cursor: "pointer",
                    textDecoration: "none",
                  }}
                >
                  <tr>
                    <td>{cp.first_name}</td>
                    <td>{cp.last_name}</td>
                    <td>{cp.scores ? cp.scores : "0"}</td>
                    <td>{cp?.scores_final}</td>
                  </tr>
                </Link>
              ))}
          </tbody>
        </table>
      </div>
      <div className="SingleTeam__container__bottomBanner">
        <div>
          <button onClick={() => dispatch(openUpdateTeamNameModal())}>
            Modifica Nome
          </button>
        </div>
        <div>
          <button onClick={() => dispatch(openUpdateTeamPointsModal())}>
            Modifica Punti
          </button>
          <button onClick={() => dispatch(openUpdateTeamPointsFinalModal())}>
            Modifica PuntiFin
          </button>
        </div>
        <div>
          <button onClick={() => dispatch(openUpdateTeamGoalSubitiModal())}>
            Goal Subiti
          </button>
          <button onClick={() => dispatch(openAddGoalSubitiFinal())}>
            Goal Subiti Fin
          </button>
        </div>
        <div>
          <button onClick={() => dispatch(openAddVittorieFinalModal())}>
            Vittorie Final
          </button>
          <button onClick={() => dispatch(openUpdateTeamVittorieModal())}>
            Aggiungi Vittoria
          </button>
        </div>
        <div>
          <button onClick={() => dispatch(openUpdateTeamSconfitteModal())}>
            Aggiungi Sconfitta
          </button>
          <button onClick={() => dispatch(openAddSconfitteFinalModal())}>
            Sconfitte Final
          </button>
        </div>
        <div>
          <button onClick={() => dispatch(openAddPareggiFinalModal())}>
            Pareggi Final
          </button>
          <button onClick={() => dispatch(openUpdateTeamPareggiModal())}>
            Aggiungi Pareggio
          </button>
        </div>
        <div>
          <button onClick={() => dispatch(openAddTeamGoal())}>
            Aggiungi Goal
          </button>
          <button onClick={() => dispatch(openAddGoalFattiFinal())}>
            Aggiungi Goal Fin
          </button>
        </div>
        <div>
          <button onClick={() => dispatch(openChangeGironeModal())}>
            Modifica Girone
          </button>
          <button onClick={() => handleToggleFinal()}>Fase finale si/no</button>
        </div>
        <div>
          <button onClick={() => dispatch(openDeleteTeamModal())}>
            Elimina
          </button>
        </div>
      </div>
    </div>
  );
};

export default SingleTeam;
