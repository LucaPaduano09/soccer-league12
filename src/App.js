import "./App.css";
import Header from "./components/header/Header";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Sidebar from "./components/admin/sidebar/Sidebar";
import HomeAdmin from "./components/admin/home/HomeAdmin";
import CompetitionSummary from "./components/admin/competitionSummary/CompetitionSummary.tsx";
import Competition from "./components/admin/competition/Competition.tsx";
import TopBar from "./components/admin/TopBar/TopBar";
import AdminLogin from "./components/admin/Login/AdminLogin.tsx";
import Teams from "./components/admin/Teams/Teams.tsx";
import SingleTeam from "./components/admin/singleTeam/SingleTeam.tsx";
import PublicHome from "./components/home/PublicHome";
import Calendar from "./components/admin/Calendar/Calendar.tsx";
import AddPartita from "./components/admin/Calendar/AddPartita.tsx";
import UpdateGiornata from "./components/admin/Calendar/UpdateGiornata.tsx";
import SingleMatch from "./components/admin/Calendar/SingleMatch.tsx";
import Footer from "./components/footer/Footer";
import Classifica from "./components/classifica/Classifica.tsx";
import Players from "./components/admin/players/Players.tsx";
import SinglePlayer from "./components/admin/players/SinglePlayer.tsx";
import Games from "./components/admin/games/Games.tsx";
import PublicCalendar from "./components/publicCalendar/PublicCalendar.tsx";
import Foto from "./components/admin/foto/Foto.tsx";
import PublicFoto from "./components/foto/PublicFoto.tsx";
import ClassificaMarcatori from "./components/classifica/ClassificaMarcatori.tsx";
import Live from "./components/live/Live.tsx";
import PublicSquadre from "./components/publicSquadre/PublicSquadre.tsx";
import SinglePublicSquadra from "./components/publicSquadre/SinglePublicSquadra.tsx";
import CalendarioScelta from "./components/admin/Calendar/CalendarioScelta.tsx";
import CalendarFinal from "./components/admin/Calendar/CalendarFinal.tsx";
import SingleMatchFinal from "./components/admin/Calendar/SingleMatchFinal.tsx"
import PublicFinalCalendar from "./components/publicCalendar/publicFinalCalendar.tsx";
import PublicSingleMatchFinal from "./components/PublicSingleMatchFinal/PublicSingleMatchFinal.tsx"
import ClassificaMarcatoriFinal from "./components/classifica/ClassificaMarcatoriFinal.tsx";

function App() {
  return (
    <Router>
      <div className="app">
        <Switch>
          <Route path={"/admin/games"}>
            <Games />
          </Route>
          <Route path="/admin/calendario/partita/:id">
            <SingleMatch />
          </Route>
          <Route path="/admin/calendario/partita-final/:id">
            <SingleMatchFinal />
          </Route>
          <Route path={"/admin/calendario/update-gioranata/:id"}>
            <Sidebar />
            <UpdateGiornata />
          </Route>
          <Route path="/admin/calendario/add-partita">
            <Sidebar />

            <AddPartita />
          </Route>
          <Route path="/admin/calendario">
            <Calendar />
          </Route>
          <Route path="/admin/calendario-scelta">
              <Sidebar />
              <CalendarioScelta />
          </Route>
          <Route path="/admin/calendario-finale">
              <CalendarFinal />
          </Route>
          <Route path={"/admin/giocatori"}>
            <Sidebar />
            <Players />
          </Route>
          <Route path={"/admin/giocatore/:id"}>
            <SinglePlayer />
          </Route>
          <Route path="/admin/teams">
            <Sidebar />
            <Teams />
          </Route>
          <Route path="/admin/team/:id">
            <SingleTeam />
          </Route>
          <Route path="/admin/tournaments">
            <Sidebar />
            <CompetitionSummary />
          </Route>
          <Route path="/admin/login">
            <AdminLogin />
          </Route>
          <Route path="/admin/leghe/:id">
            <Competition />
          </Route>
          <Route path="/admin/dashboard">
            <Sidebar />
            <HomeAdmin />
          </Route>
          <Route path="/admin/foto">
            <Foto />
          </Route>
          <Route path="/classifica-torneo/:id">
            <Header />
            <Classifica />
            <Footer />
          </Route>
          <Route path="/classifica-marcatori">
            <Header />
            <ClassificaMarcatori />
            <Footer />
          </Route>
          <Route path="/classifica-marcatori-finale">
            <Header />
            <ClassificaMarcatoriFinal />
            <Footer />
          </Route>
          <Route path="/calendario">
            <Header />
            <PublicCalendar />
          </Route>
          <Route path="/calendario-final">
            <Header />
            <PublicFinalCalendar />
          </Route>
          <Route path="/partita-final/:id">
            <Header />
            <PublicSingleMatchFinal />
          </Route>
          <Route path="/fotogallery">
            <Header />
            <PublicFoto />
            <Footer />
          </Route>
          <Route path="/live">
            <Header />
            <Live />
            <Footer />
          </Route>
          <Route path="/squadre">
            <Header />
            <PublicSquadre />
            <Footer />
          </Route>
          <Route path="/squadra/:id">
            <Header />
            <SinglePublicSquadra />
            <Footer />
          </Route>
          <Route path="/">
            <Header />
            <PublicHome />
            <Footer />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
