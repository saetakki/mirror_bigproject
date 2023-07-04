import PersonaSetting from './PersonaSetting';
import { useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { personaAtom } from '../../../atoms';
import { Chatting } from '@organisms';

const Controller = () => {
  const [personaSetup, setPersonaSetup] = useRecoilState(personaAtom);

  console.log(personaSetup);

  return personaSetup ? <Chatting /> : <PersonaSetting />;
};

export default Controller;
