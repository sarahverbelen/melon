import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

import Header from './modules/header/Header';
import Landing from './modules/landing/Landing';
import About from './modules/about/About';
import Why from './modules/why/Why';
import Tips from './modules/tips/Tips';
import Reviews from './modules/reviews/Reviews';
import Help from './modules/help/Help';
import Footer from './modules/footer/Footer';

function App() {
  return (
    <Router>
    <div className="App">
      <Switch>
        <Route path="/" exact>
        <Header />
          <Landing />
          <About />
          <Why />
          <Tips />
          <Reviews />
          <Help />
          <Footer />
       </Route>
       <Route path="/dashboard" exact>
         <h1>Dashboard</h1>
       </Route>
      </Switch>
    </div>
    </Router>
  );
}

export default App;
