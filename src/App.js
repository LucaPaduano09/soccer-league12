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

function App() {
  return (
    <Router>
      <div className="app">
      <Switch>
      <Route exact path="/admin/tournaments">
        <Sidebar />
        <TopBar />
        <CompetitionSummary />
      </Route>
      <Route path="/admin/leghe/:id">
        <Sidebar />
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
