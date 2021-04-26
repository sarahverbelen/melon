import './App.css';

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
    <div className="App">
      <Header />
      <Landing />
      <About />
      <Why />
      <Tips />
      <Reviews />
      <Help />
      <Footer />
    </div>
  );
}

export default App;
