import { Participant } from '../components/GroupParticipantsForm';

export enum ParticipantGenre {
  MALE = 'M',
  FEMALE = 'F',
}

export const participants: Participant[] = [
  // Hombres
  { name: 'Juancito', genre: ParticipantGenre.MALE },
  { name: 'Josue', genre: ParticipantGenre.MALE },
  { name: 'Santi', genre: ParticipantGenre.MALE },
  { name: 'Alan', genre: ParticipantGenre.MALE },
  { name: 'Benja', genre: ParticipantGenre.MALE },
  { name: 'Marcos', genre: ParticipantGenre.MALE },
  { name: 'Pablito', genre: ParticipantGenre.MALE },
  { name: 'Fabio', genre: ParticipantGenre.MALE },
  { name: 'Misa', genre: ParticipantGenre.MALE },
  { name: 'Dani', genre: ParticipantGenre.MALE },
  { name: 'Victor', genre: ParticipantGenre.MALE },
  { name: 'Roda', genre: ParticipantGenre.MALE },
  // Mujeres
  { name: 'Flor', genre: ParticipantGenre.FEMALE },
  { name: 'Miriam', genre: ParticipantGenre.FEMALE },
  { name: 'Day', genre: ParticipantGenre.FEMALE },
  { name: 'Sabri', genre: ParticipantGenre.FEMALE },
  { name: 'Aylen', genre: ParticipantGenre.FEMALE },
  { name: 'Selene', genre: ParticipantGenre.FEMALE },
  { name: 'Maru', genre: ParticipantGenre.FEMALE },
  { name: 'Vani', genre: ParticipantGenre.FEMALE },
  { name: 'Vale', genre: ParticipantGenre.FEMALE },
  { name: 'Sami', genre: ParticipantGenre.FEMALE },
  { name: 'Sol', genre: ParticipantGenre.FEMALE },
  { name: 'Emi', genre: ParticipantGenre.FEMALE },
];
