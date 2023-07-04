import { useState, useRef } from 'react';
import { useRecoilState, useSetRecoilState } from 'recoil';
import styled from '@emotion/styled';
import { Container, GNB } from '@styles';
import { requestSetPersona } from '@apis/ChatApi';
import { personaAtom } from '../../../atoms';
import { useNavigate } from 'react-router-dom';

const PersonaSetting = () => {
  const setPersonaData = useSetRecoilState(personaAtom);
  const [, setPersonaInfo] = useRecoilState(personaAtom);
  const [personaGender, setPersonaGender] = useState(null);
  const nameInput = useRef('');
  const ageInput = useRef('');
  const departmentInput = useRef('');
  const positionInput = useRef('');
  const stateInput = useRef('');

  const navigate = useNavigate('/');

  const onButtonClickHandler = (e) => {
    e.preventDefault();
    setPersonaGender(e.target.value);
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    const personaSetup = {
      persona_name: nameInput.current.value,
      age: parseInt(ageInput.current.value),
      gender: personaGender,
      position: positionInput.current.value,
      department: departmentInput.current.value,
      state: stateInput.current.value,
    };

    requestSetPersona(personaSetup)
      .then((res) => console.log(res))
      .then(() => setPersonaInfo(personaSetup))
      .then(navigate('/chatting'))
      .catch((err) => console.log(err));
  };

  return (
    <>
      <PersonaSettingContainer>
        <PersonaSettingHeader />
        <PersonaSettingForm>
          <div className='p-4 px-4 md:p-8 mb-6'>
            <div className='grid gap-4 gap-y-2 text-sm grid-cols-1 lg:grid-cols-3'>
              <div className='text-gray-600'>
                <p className='font-bold text-lg'>페르소나 설정</p>
                <p>코칭 상담을 진행할 페르소나를 설정해주세요.</p>
              </div>

              <div className='lg:col-span-2'>
                <div className='grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-5'>
                  <div className='md:col-span-3'>
                    <label htmlFor='name'>이름</label>
                    <input
                      type='text'
                      name='name'
                      id='name'
                      className='h-10 border mt-1 rounded px-4 w-full bg-gray-50'
                      defaultValue=''
                      placeholder='이름'
                      ref={nameInput}
                    />
                  </div>
                  <div className='md:col-span-2'>
                    <label htmlFor='age'>나이</label>
                    <div className='h-10 bg-gray-50 flex border border-gray-200 rounded items-center mt-1'>
                      <input
                        name='age'
                        id='age'
                        type='number'
                        placeholder='나이를 입력하세요.'
                        className='px-4 appearance-none outline-none text-gray-800 w-full bg-transparent'
                        defaultValue='0'
                        min='0'
                        ref={ageInput}
                      />
                    </div>
                  </div>

                  <div className='md:col-span-5 md-4'>
                    <div>성별</div>
                    <div className='w-[40%] flex justify-between my-1'>
                      <GenderButton
                        className={`h-8 w-24 bg-blue-500 rounded-[10px] ${
                          personaGender === '남성' && 'text-white'
                        }`}
                        value='남성'
                        onClick={onButtonClickHandler}
                      >
                        남성
                      </GenderButton>
                      <GenderButton
                        className={`h-8 w-24 bg-red-500 rounded-[10px] ${
                          personaGender === '여성' && 'text-white'
                        }`}
                        value='여성'
                        onClick={onButtonClickHandler}
                      >
                        여성
                      </GenderButton>
                    </div>
                  </div>

                  <div className='md:col-span-5'>
                    <label htmlFor='department'>부서</label>
                    <input
                      type='text'
                      name='department'
                      id='department'
                      className='h-10 border mt-1 rounded px-4 w-full bg-gray-50'
                      defaultValue=''
                      placeholder='부서를 입력해주세요.'
                      ref={departmentInput}
                    />
                  </div>

                  <div className='md:col-span-5'>
                    <label htmlFor='position'>직책</label>
                    <input
                      type='text'
                      name='position'
                      id='position'
                      className='h-10 border mt-1 rounded px-4 w-full bg-gray-50'
                      defaultValue=''
                      placeholder='직책을 입력해주세요.'
                      ref={positionInput}
                    />
                  </div>

                  <div className='md:col-span-5'>
                    <label htmlFor='state'>고민, 상태</label>
                    <input
                      type='text'
                      name='state'
                      id='state'
                      className='h-10 border mt-1 rounded px-4 w-full bg-gray-50'
                      defaultValue=''
                      placeholder='현재의 고민을 적어주세요.'
                      ref={stateInput}
                    />
                  </div>

                  <div className='md:col-span-5 text-right'>
                    <div className='inline-flex items-end'>
                      <SubmitBtn onClick={onSubmitHandler}>Submit</SubmitBtn>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </PersonaSettingForm>
      </PersonaSettingContainer>
    </>
  );
};

const PersonaSettingContainer = styled(Container)`
  width: calc(100% - 2rem);
  height: calc(100vh - 112px);
  margin: 0 1rem;
  padding: 0;
  border: 1px solid;
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: center;
`;

const PersonaSettingHeader = styled(GNB)`
  margin-bottom: 1rem;
`;

const PersonaSettingForm = styled.form`
  width: 100%;
  background-color: #fff;
  height: 100%;
`;
const GenderButton = styled.button`
  rounded-lg px-4 py-2 text-lg font-medium focus:outline-none
  transition-colors duration-200 ease-in-out hover:bg-blue-500 hover:text-white
`;

const SubmitBtn = styled.button`
  maring-top: 20px;
  width: 120px;
  height: 40px;
  font-family: 'Roboto', sans-serif;
  font-size: 14px;
  font-weight: bold;
  color: #000;
  background-color: #fff;
  border: none;
  border-radius: 45px;
  box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.2);
  transition: all 0.3s ease 0s;
  cursor: pointer;
  outline: none;
  &:hover {
    background-color: #2ee59d;
    box-shadow: 0px 15px 20px rgba(46, 229, 157, 0.4);
    color: #fff;
    transform: translateY(-4px);
  }
`;

export default PersonaSetting;
