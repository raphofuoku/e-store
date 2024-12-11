import HomePage from './components/HomePage';
import './App.css';
import {Routes, Route} from 'react-router';

function App() {
  return (
    <div className="App">
      <Routes>
      <Route path="/" element={<HomePage />}></Route>
    </Routes>
    </div>
  );
}

export default App;
