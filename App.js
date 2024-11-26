import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './Home';
import Navbar from './Navbar';
import Countries from './Countries';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <div className="routes-container">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/countries" element={<Countries />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
