import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import Configurator from './pages/Configurator';

function App() {
  return (
    <Router>
      <div className="min-h-screen">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Configurator />} />
        </Routes>
        <elevenlabs-convai agent-id="agent_6701k7v7hw5hebfsyk6nm81nnh0g"></elevenlabs-convai>
      </div>
    </Router>
  );
}

export default App;
