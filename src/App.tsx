import laTropaLogo from './assets/La_Tropa.png';
import './App.css';
import { GroupParticipantsForm } from './components/GroupParticipantsForm';

function App() {
  return (
    <>
      <img src={laTropaLogo} alt='La Tropa' />
      <h1>Generador de Grupos</h1>
      <GroupParticipantsForm />
    </>
  );
}

export default App;
