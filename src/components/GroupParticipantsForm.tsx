import { useEffect, useState } from 'react';
import {
  ParticipantGenre,
  UUID,
  participants,
} from '../constants/participants';

export interface Participant {
  id: UUID;
  name: string;
  genre: ParticipantGenre;
}

export function GroupParticipantsForm() {
  const [participant, setParticipant] = useState<Participant>({
    id: '' as UUID,
    name: '',
    genre: ParticipantGenre.MALE,
  });
  const [participantsList, setParticipantsList] = useState<Participant[]>([]);
  const [leadersList, setLeadersList] = useState<Participant[]>([]);

  useEffect(() => {
    const participantsFromStorage = localStorage.getItem('participants');
    const leadersFromStorage = localStorage.getItem('leaders');

    if (
      participantsFromStorage &&
      JSON.parse(participantsFromStorage).length > 0
    ) {
      setParticipantsList(JSON.parse(participantsFromStorage));
    } else {
      setParticipantsList(participants);
    }

    if (leadersFromStorage && JSON.parse(leadersFromStorage).length > 0) {
      setLeadersList(JSON.parse(leadersFromStorage));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('participants', JSON.stringify(participantsList));
  }, [participantsList]);

  useEffect(() => {
    localStorage.setItem('leaders', JSON.stringify(leadersList));
  }, [leadersList]);

  function handleSubmit(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    e.preventDefault();

    if (!participant.name) {
      alert('El nombre del participante es requerido');
      return;
    }

    const participantExists = participantsList.find(
      (p) =>
        p.name.localeCompare(participant.name, 'es', {
          sensitivity: 'base',
        }) === 0
    );

    if (participantExists) {
      alert('El participante ya existe');
      return;
    }

    participant.id = crypto.randomUUID();
    const nameCapitalized =
      participant.name.charAt(0).toUpperCase() + participant.name.slice(1);
    participant.name = nameCapitalized.trim();

    setParticipantsList([participant, ...participantsList]);
    setParticipant({ ...participant, name: '', id: '' as UUID });
  }

  function handleDeleteParticipant(id: UUID) {
    const newParticipantsList = participantsList.filter((p) => p.id !== id);

    setParticipantsList(newParticipantsList);
  }

  function handleSelectLeader(id: UUID) {
    const leader = participantsList.find((p) => p.id === id);

    if (!leader) {
      return;
    }

    const newLeadersList = [...leadersList, leader];

    setLeadersList(newLeadersList);
  }

  function participantIsLeader(id: UUID) {
    return leadersList.some((p) => p.id === id);
  }

  return (
    <>
      <form>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '1em' }}>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <label htmlFor='participant'>Participante:</label>
            <input
              style={{ height: '1.5em', width: '10em', marginTop: '0.5em' }}
              type='text'
              id='participant'
              name='participant'
              value={participant.name}
              onChange={(e) =>
                setParticipant({ ...participant, name: e.target.value })
              }
            />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <label htmlFor='genre'>Género:</label>
            <select
              style={{ height: '1.75em', width: '6em', marginTop: '0.5em' }}
              id='genre'
              name='genre'
              value={participant.genre}
              onChange={(e) =>
                setParticipant({
                  ...participant,
                  genre: e.target.value as ParticipantGenre,
                })
              }>
              <option value={ParticipantGenre.MALE}>Masculino</option>
              <option value={ParticipantGenre.FEMALE}>Femenino</option>
            </select>
          </div>
        </div>
        <div
          style={{
            display: 'flex',
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            gap: '1em',
            marginTop: '1em',
          }}>
          <button onClick={handleSubmit}>Agregar participante</button>
          <button
            onClick={() => localStorage.clear()}
            style={{ borderColor: 'red' }}>
            Reset
          </button>
        </div>
      </form>
      <div
        style={{
          display: 'flex',
          flex: 1,
          justifyContent: 'center',
          marginTop: '1.5em',
        }}>
        <table style={{ width: '90%' }}>
          <thead>
            <tr>
              <th>Participante</th>
              <th>Género</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {participantsList.map((p, index) => (
              <tr key={index}>
                <td>{p.name}</td>
                <td>{p.genre}</td>
                <td
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'center',
                    gap: '1em',
                  }}>
                  <div onClick={() => handleDeleteParticipant(p.id)}>❌</div>
                  <div onClick={() => handleSelectLeader(p.id)}>
                    {participantIsLeader(p.id) ? '🦸‍♂️' : '👤'}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
