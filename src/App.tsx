import laTropaLogo from './assets/La_Tropa.png';
import './App.css';

function App() {
  return (
    <>
      <img
        src={laTropaLogo}
        alt='La Tropa'
        style={{ marginLeft: 50, width: '50%' }}
      />
      <h1>La Tropa</h1>
    </>
  );
}

export default App;
