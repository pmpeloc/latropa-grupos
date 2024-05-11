import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import {
  ParticipantGenre,
  UUID,
  participants,
} from '../constants/participants';
import { mixedGroupGenerator } from '../helpers/mixedGroupGenerator';
import { filterGroupGenerator } from '../helpers/filterGroupGenerator';

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

  const navigation = useNavigate();

  useEffect(() => {
    const participantsFromStorage = localStorage.getItem('participants');

    if (
      participantsFromStorage &&
      JSON.parse(participantsFromStorage).length > 0
    ) {
      setParticipantsList(JSON.parse(participantsFromStorage));
    } else {
      setParticipantsList(participants);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('participants', JSON.stringify(participantsList));
  }, [participantsList]);

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
    const leaderAlreadyExist = leadersList.some((p) => p.id === id);

    if (leaderAlreadyExist) {
      const newLeadersList = leadersList.filter((p) => p.id !== id);
      setLeadersList(newLeadersList);
      return;
    }

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

  function handleGenerateRandomGroups() {
    const gruopsQuantity = prompt('Ingrese la cantidad de grupos:');

    if (!gruopsQuantity) {
      alert('La cantidad de grupos es requerida');
      return;
    }

    if (isNaN(Number(gruopsQuantity))) {
      alert('La cantidad de grupos debe ser un número');
      return;
    }

    navigation('/results', {
      state: {
        groups: mixedGroupGenerator(participantsList, gruopsQuantity),
        groupsQuantity: Number(gruopsQuantity),
      },
    });
  }

  function handleGenerateRandomGroupsWithLeaders() {
    if (leadersList.length === 0) {
      alert('Debe seleccionar al menos un líder');
      return;
    }

    const gruopsQuantity = prompt('Ingrese la cantidad de grupos:');

    if (!gruopsQuantity) {
      alert('La cantidad de grupos es requerida');
      return;
    }

    if (isNaN(Number(gruopsQuantity))) {
      alert('La cantidad de grupos debe ser un número');
      return;
    }

    if (Number(gruopsQuantity) > leadersList.length) {
      alert(
        'La cantidad de grupos no puede ser mayor a la cantidad de líderes'
      );
      return;
    }

    const isMixed = confirm('¿Desea que los grupos sean mixtos?');

    const shuffledLeaders = leadersList.sort(() => Math.random() - 0.5);

    const participantsListWithoutLeaders = participantsList.filter(
      (p) => !shuffledLeaders.map((l) => l.id).includes(p.id)
    );

    if (isMixed) {
      const participantsByGroup = mixedGroupGenerator(
        participantsListWithoutLeaders,
        gruopsQuantity
      ).reverse();

      participantsByGroup.forEach((group, index) => {
        group.push(shuffledLeaders[index]);
      });

      if (shuffledLeaders.length > participantsByGroup.length) {
        const remainingLeaders = shuffledLeaders.slice(
          participantsByGroup.length
        );

        participantsByGroup.reverse().forEach((group, index) => {
          if (remainingLeaders[index]) {
            group.push(remainingLeaders[index]);
          }
        });
      }

      navigation('/results', {
        state: {
          groups: participantsByGroup,
          groupsQuantity: Number(gruopsQuantity),
        },
      });
    } else {
      const participantsByGroup = filterGroupGenerator(
        participantsListWithoutLeaders
      );

      const firstLeaders = shuffledLeaders.slice(0, shuffledLeaders.length / 2);
      const secondLeaders = shuffledLeaders.slice(shuffledLeaders.length / 2);

      const firstGroup = participantsByGroup[0].concat(firstLeaders);
      const secondGroup = participantsByGroup[1].concat(secondLeaders);

      navigation('/results', {
        state: {
          groups: [firstGroup, secondGroup],
          groupsQuantity: 2,
        },
      });
    }
  }

  function handleGenerateRandomGroupsByGenre() {
    const groups = filterGroupGenerator(participantsList);

    navigation('/results', {
      state: {
        groups,
        groupsQuantity: 2,
      },
    });
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
      <div className='participants-list'>
        <table>
          <thead>
            <tr>
              <th style={{ width: '30%' }}>Participante</th>
              <th style={{ width: '20%' }}>Género</th>
              <th style={{ width: '20%' }}>Acciones</th>
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
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '1em',
          flex: 1,
          marginTop: '1em',
        }}>
        <button
          onClick={handleGenerateRandomGroups}
          style={{ borderColor: 'yellow', width: '90%' }}>
          Generar Grupos Aleatorios Mixtos
        </button>
        <button
          onClick={handleGenerateRandomGroupsWithLeaders}
          style={{ borderColor: 'yellow', width: '90%' }}>
          Generar Grupos Aleatorios con Líderes
        </button>
        <button
          onClick={handleGenerateRandomGroupsByGenre}
          style={{ borderColor: 'yellow', width: '90%' }}>
          Generar Grupos Aleatorios por Género
        </button>
      </div>
    </>
  );
}
