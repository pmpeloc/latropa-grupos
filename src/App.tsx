import laTropaLogo from './assets/La_Tropa.png';
import './App.css';
import { GroupParticipantsForm } from './components/GroupParticipantsForm';

function App() {
  return (
    <>
      <img
        src={laTropaLogo}
        alt='La Tropa'
        style={{ marginLeft: 30, width: '50%' }}
      />
      <h1>Generador de Grupos</h1>
      <GroupParticipantsForm />
    </>
  );
}

export default App;
