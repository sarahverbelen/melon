import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

import Header from './modules/header/Header';
import Footer from './modules/footer/Footer';

import Landing from './modules/landing/Landing';
import About from './modules/about/About';
import Why from './modules/why/Why';
import Tips from './modules/tips/Tips';
import Reviews from './modules/reviews/Reviews';
import Help from './modules/help/Help';

import Graphs from './modules/graphs/Graphs';


function App() {
  return (
    <Router>
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
          <Footer />
       </Route>
       <Route path="/dashboard" exact>
          <Header dashboard={true}/>
          <Graphs />
          <Footer />
       </Route>
      </Switch>
    </div>
    </Router>
  );
}

export default App;
