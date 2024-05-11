import { Location, useLocation } from 'react-router-dom';
import { Participant } from '../components/GroupParticipantsForm';
import { ParticipantGenre } from '../constants/participants';

export function ResultsRandomGroups() {
  const location: Location<{
    groups: Participant[][];
    groupsQuantity: number;
    leaders?: Participant[];
  }> = useLocation();

  return (
    <div>
      <h1>Resultados de los grupos</h1>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'start',
          columnGap: '3em',
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
              {group.map((participant) => {
                const isLeader = location.state.leaders?.find(
                  (leader) => leader.id === participant.id
                );

                const emoji = isLeader
                  ? participant.genre === ParticipantGenre.MALE
                    ? '🦸‍♂️'
                    : '🦸‍♀️'
                  : '';
                return (
                  <li
                    key={participant.id}
                    style={{
                      fontSize: '1.4em',
                      width: '4em',
                      display: 'flex',
                      textWrap: 'nowrap',
                    }}>
                    {`${participant.name} ${emoji}`}
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
