import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

import ScrollToTop from './modules/scrolltotop/ScrollToTop';

import Header from './modules/header/Header';
import Footer from './modules/footer/Footer';

import Landing from './modules/landing/Landing';
import About from './modules/about/About';
import Why from './modules/why/Why';
import Tips from './modules/tips/Tips';
import Reviews from './modules/reviews/Reviews';
import Help from './modules/help/Help';

import Graphs from './modules/graphs/Graphs';
import Insights from './modules/insights/Insights';
import DashboardHelp from './modules/dashboardhelp/DashboardHelp';
import Button from './modules/button/Button';

import Privacy from './modules/privacy/Privacy';

import LoginRegister from './modules/loginRegister/LoginRegister';

import Download from './modules/download/Download';

import Test from './modules/test/Test';

function App() {
  return (
    <Router>
      <ScrollToTop />
    <div className="App">
      <Switch>
        <Route path="/" exact>
          <Header dashboard={false}/>
          <Landing />
          <About />
          <Why />
          <Tips />
          <Reviews />
          <Help />
       </Route>
       <Route path="/dashboard" exact>
          <Header dashboard={true}/>
          <Graphs />
          <Insights />
          <DashboardHelp />
          <Button label="Installeer de plugin" url="/download" position="center"  newTab={false}/>
       </Route>
       <Route path="/login" exact>
        <Header dashboard={false}/>
        <LoginRegister />
       </Route>
       <Route path="/privacy" exact>
          <Header dashboard={false}/>
          <Privacy />
       </Route>
       <Route path="/download" exact>
       <Header dashboard={false}/>
         <Download />
       </Route>
       <Route path="/test" exact>
         <Test />
       </Route>
      </Switch>
      <Footer />
    </div>
    </Router>
  );
}

export default App;
