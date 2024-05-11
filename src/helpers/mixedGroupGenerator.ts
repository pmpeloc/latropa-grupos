import { Participant } from '../components/GroupParticipantsForm';
import { ParticipantGenre } from '../constants/participants';

export function mixedGroupGenerator(
  participantsList: Participant[],
  gruopsQuantity: string
) {
  const participantsPerGroupList: Participant[][] = [];

  const participantsPerGroupQuantity = Math.ceil(
    participantsList.length / Number(gruopsQuantity)
  );

  const participantsByGenreQuantity = Math.floor(
    participantsPerGroupQuantity / 2
  );

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

  for (let i = 0; i < Number(gruopsQuantity); i++) {
    const male = maleParticipants.splice(0, participantsByGenreQuantity);
    const female = femaleParticipants.splice(0, participantsByGenreQuantity);

    const total = male.concat(female);

    participantsPerGroupList.push(total);
  }

  if (maleParticipants.length > 0) {
    for (let i = 0; i < maleParticipants.length; i++) {
      participantsPerGroupList[participantsPerGroupList.length - 1 - i].push(
        maleParticipants[i]
      );
    }
  }

  if (femaleParticipants.length > 0) {
    for (let i = 0; i < femaleParticipants.length; i++) {
      participantsPerGroupList[i].push(femaleParticipants[i]);
    }
  }

  return participantsPerGroupList;
}
