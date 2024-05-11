import { Location, useLocation } from 'react-router-dom';
import { Participant } from '../components/GroupParticipantsForm';

export function ResultsRandomGroups() {
  const location: Location<{
    groups: Participant[][];
    groupsQuantity: number;
  }> = useLocation();

  return (
    <div>
      <h1>Resultados de los grupos</h1>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'start',
          columnGap: '5em',
          flexWrap: 'wrap',
          marginTop: '4em',
        }}>
        {location.state.groups.map((group, index) => (
          <div
            key={index}
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              flexDirection: 'column',
            }}>
            <h2>Grupo {index + 1}</h2>
            <ul
              style={{
                display: 'flex',
                flexDirection: 'column',
                width: '70%',
                listStyle: 'none',
                padding: 0,
              }}>
              {group.map((participant) => (
                <li key={participant.id} style={{ fontSize: '1.3em' }}>
                  {participant.name}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
