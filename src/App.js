import './App.css';
import Header from './components/header/Header';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Sidebar from './components/admin/sidebar/Sidebar';
import HomeAdmin from './components/admin/home/HomeAdmin';
import CompetitionSummary from './components/admin/competitionSummary/CompetitionSummary.tsx';
import Competition from './components/admin/competition/Competition.tsx';
import TopBar from './components/admin/TopBar/TopBar';
import AdminLogin from './components/admin/Login/AdminLogin.tsx';
import Teams from './components/admin/Teams/Teams.tsx';
import SingleTeam from './components/admin/singleTeam/SingleTeam.tsx';

function App() {
  return (
    <Router>
      <div className="app">
      <Switch>
      <Route path="/admin/teams">
        <Sidebar />
        <TopBar />
        <Teams />
      </Route>

      <Route path="/admin/team/:id">
        <Sidebar /> 
        <TopBar />
        <SingleTeam />
      </Route>

      <Route exact path="/admin/tournaments">
        <Sidebar />
        <TopBar />
        <CompetitionSummary />
      </Route>
      <Route path="/admin/login">
        <AdminLogin />
      </Route>
      <Route path="/admin/leghe/:id">
        <Sidebar />
        <TopBar />
        <Competition />
      </Route>
      <Route exact path="/admin">
        <Sidebar />
        <TopBar />
        <HomeAdmin />
      </Route>
        <Route path="/">
          <Header />
        </Route> 
      </Switch>
      </div>
    </Router>
  );
}

export default App;
