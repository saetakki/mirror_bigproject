import PersonaSetting from './PersonaSetting';
import { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { personaAtom } from '../../../atoms';
import { Chatting } from '@organisms';

const Controller = () => {
  const [practicePersona, setPracticePersona] = useState(null);
  const StagingValue = useRecoilValue(personaAtom);

  useEffect(() => {
    if (StagingValue && practicePersona === null) {
      setPracticePersona(StagingValue);
    }
  }, [StagingValue, practicePersona]);

  return practicePersona === null ? (
    <PersonaSetting setPracticePersona={setPracticePersona} />
  ) : (
    <Chatting />
  );
};

export default Controller;
