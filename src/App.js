import './App.css';

import Header from './modules/header/Header';
import Landing from './modules/landing/Landing';
import About from './modules/about/About';
import Why from './modules/why/Why';
import Footer from './modules/footer/Footer';

function App() {
  return (
    <div className="App">
      <Header />
      <Landing />
      <About />
      <Why />
      <Footer />
    </div>
  );
}

export default App;
