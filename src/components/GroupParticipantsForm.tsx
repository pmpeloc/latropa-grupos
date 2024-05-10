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

  return (
    <form>
      <div style={{ display: 'flex', justifyContent: 'center', gap: 20 }}>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <label htmlFor='participant'>Participante:</label>
          <input
            style={{ height: 30, width: 250, marginTop: 10 }}
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
            style={{ height: 36, width: 150, marginTop: 10 }}
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
      <button type='submit' style={{ marginTop: 40 }}>
        Agregar participante
      </button>
    </form>
  );
}
