import { useSetRecoilState } from 'recoil';
import { personaAtom } from '../../atoms';
import { PersonaSetting } from '@organisms';

const Tts = () => {
  const setPersonaData = useSetRecoilState(personaAtom);

  return <PersonaSetting setPersonaData={setPersonaData} />;
};

export default Tts;
