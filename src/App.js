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
       </Route>
      </Switch>
      <Footer />
    </div>
    </Router>
  );
}

export default App;
