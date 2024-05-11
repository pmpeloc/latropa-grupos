import { Participant } from '../components/GroupParticipantsForm';

export enum ParticipantGenre {
  MALE = 'M',
  FEMALE = 'F',
}

export type UUID = `${string}-${string}-${string}-${string}-${string}`;

export const participants: Participant[] = [
  // Hombres
  { id: crypto.randomUUID(), name: 'Juancito', genre: ParticipantGenre.MALE },
  { id: crypto.randomUUID(), name: 'Josue', genre: ParticipantGenre.MALE },
  { id: crypto.randomUUID(), name: 'Santi', genre: ParticipantGenre.MALE },
  { id: crypto.randomUUID(), name: 'Alan', genre: ParticipantGenre.MALE },
  { id: crypto.randomUUID(), name: 'Benja', genre: ParticipantGenre.MALE },
  { id: crypto.randomUUID(), name: 'Marcos', genre: ParticipantGenre.MALE },
  { id: crypto.randomUUID(), name: 'Pablito', genre: ParticipantGenre.MALE },
  { id: crypto.randomUUID(), name: 'Fabio', genre: ParticipantGenre.MALE },
  { id: crypto.randomUUID(), name: 'Misa', genre: ParticipantGenre.MALE },
  { id: crypto.randomUUID(), name: 'Dani', genre: ParticipantGenre.MALE },
  { id: crypto.randomUUID(), name: 'Victor', genre: ParticipantGenre.MALE },
  { id: crypto.randomUUID(), name: 'Roda', genre: ParticipantGenre.MALE },
  // Mujeres
  { id: crypto.randomUUID(), name: 'Flor', genre: ParticipantGenre.FEMALE },
  { id: crypto.randomUUID(), name: 'Miriam', genre: ParticipantGenre.FEMALE },
  { id: crypto.randomUUID(), name: 'Day', genre: ParticipantGenre.FEMALE },
  { id: crypto.randomUUID(), name: 'Sabri', genre: ParticipantGenre.FEMALE },
  { id: crypto.randomUUID(), name: 'Aylen', genre: ParticipantGenre.FEMALE },
  { id: crypto.randomUUID(), name: 'Selena', genre: ParticipantGenre.FEMALE },
  { id: crypto.randomUUID(), name: 'Maru', genre: ParticipantGenre.FEMALE },
  { id: crypto.randomUUID(), name: 'Vani', genre: ParticipantGenre.FEMALE },
  { id: crypto.randomUUID(), name: 'Vale', genre: ParticipantGenre.FEMALE },
  { id: crypto.randomUUID(), name: 'Sami', genre: ParticipantGenre.FEMALE },
  { id: crypto.randomUUID(), name: 'Sol', genre: ParticipantGenre.FEMALE },
  { id: crypto.randomUUID(), name: 'Emi', genre: ParticipantGenre.FEMALE },
  { id: crypto.randomUUID(), name: 'Lizzy', genre: ParticipantGenre.FEMALE },
];
