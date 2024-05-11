import { Participant } from '../components/GroupParticipantsForm';
import { ParticipantGenre } from '../constants/participants';

export function filterGroupGenerator(participantsList: Participant[]) {
  const shuffledParticipants = participantsList.sort(() => Math.random() - 0.5);

  const maleParticipants: Participant[] = [];
  const femaleParticipants: Participant[] = [];

  shuffledParticipants.forEach((sp) => {
    if (sp.genre === ParticipantGenre.MALE) {
      maleParticipants.push(sp);
    } else {
      femaleParticipants.push(sp);
    }
  });

  return [maleParticipants, femaleParticipants];
}
