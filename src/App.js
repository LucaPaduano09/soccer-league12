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

function App() {
  return (
    <Router>
      <div className="app">
      <Switch>
      <Route path="/admin/tournaments">
        <Sidebar />
        <CompetitionSummary />
      </Route>
      <Route path="/admin/leghe/:id">
        <Sidebar />
        <Competition />
      </Route>
      <Route path="/admin">
        <Sidebar />
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
