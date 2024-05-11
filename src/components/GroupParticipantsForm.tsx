import { useState } from 'react';

enum ParticipantGenre {
  MALE = 'M',
  FEMALE = 'F',
}

interface Participant {
  name: string;
  genre: ParticipantGenre;
}

export function GroupParticipantsForm() {
  const [participant, setParticipant] = useState<Participant>({
    name: '',
    genre: ParticipantGenre.MALE,
  });

  function handleSubmit(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    e.preventDefault();

    console.log({ participant });
  }

  return (
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
      <button onClick={handleSubmit} style={{ marginTop: '2em' }}>
        Agregar participante
      </button>
    </form>
  );
}
