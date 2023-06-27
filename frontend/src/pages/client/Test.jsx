import styled from "@emotion/styled";
import { Container } from "@styles"
import { PageHeader } from "@organisms"
import { useRef } from "react"
import { useRecoilState, useRecoilValue } from "recoil";
import { 
  requestSignUp, 
  requestLogIn, 
  requestLogOut,
  requestFindId,
  requestFindPassword,
  requestPages,
  requestDeleteHistory,
  requestHistoryLog,
  requestBookmark
} from "@apis"
import { 
  historyPaginationItemsAtom,
  bookmarkPaginationItemsAtom, 
  historySelector} from "../../atoms";


const Test = () => {
  const idRef = useRef(null)
  const passwordRef = useRef(null)
  const emailRef = useRef(null)
  const real_nameRef = useRef(null)
  const pageRef = useRef(1)

  const defaultId = "test"
  const defaultPw = "tjwnsgh000"

  const [paginationItems,setPaginationItems] = useRecoilState(historyPaginationItemsAtom)
  const [bookmarkPaginationItems ,setBookmarkPaginationItems] = useRecoilState(bookmarkPaginationItemsAtom)

  const name = useRef(null)
  const age = useRef(null)
  const gender = useRef(null)
  const position = useRef(null)
  const department = useRef(null)
  const state = useRef(null)




  const handleSignUp = () => {
    const username = idRef.current.value
    const password = passwordRef.current.value
    const email = emailRef.current.value
    const real_name = real_nameRef.current.value
    requestSignUp({username: username, password: password, email: email, real_name: real_name})
    .then((res) => console.log('success', res))
    .catch((err) => console.log(err))
  }

  const handleLogIn = ({id,pw}) => {
    const username = id || idRef.current.value
    const password = pw || passwordRef.current.value
    requestLogIn({username: username, password: password})
    .then(res => console.log('success',res))
    .catch(err => console.log(err))
  }

  const handleLogOut = () => {
    requestLogOut({username: idRef.current.value, password: passwordRef.current.value})
    .then((res) => console.log('success', res))
    .catch((err) => console.log(err))
  }

  const handleFindId = () => {
    const email = emailRef.current.value
    const password = passwordRef.current.value
    requestFindId({ email: email, password: password})
    .then((res) => console.log('success', res))
    .catch((err) => console.log(err))
  }

  const handleFindPassword = () => {
    const username = idRef.current.value
    const email = emailRef.current.value
    requestFindPassword({ username: username, email: email})
    .then((res) => console.log('success', res))
    .catch((err) => console.log(err))
  }


  const handleGetHistory = () => {
    const page = pageRef.current.value
    const isHistory = true
    requestPages(isHistory, page)
    .then((res) => console.log('히스토리 목록 success', setPaginationItems(res.results)))
    .catch((err) => console.log(err))
  }

  const handleGetBookmark = () => {
    const page = pageRef.current.value
    const isHistory = false
    requestPages(isHistory, page)
    .then((res) => console.log('북마크 목록 success', setBookmarkPaginationItems(res.results)))
    .catch((err) => console.log(err))
  }

  const loginDefault = () => {
    requestLogIn({username: defaultId, password: defaultPw})
    .then((res) => console.log('success', res))
    .catch((err) => console.log(err))
  }

  const handleRemove = () => {
    const target = paginationItems[1].id 
    const target2 = bookmarkPaginationItems[1].id

    requestDeleteHistory(target)
    .then((res) => console.log(`${target} 삭제 success`, res))
    .catch((err) => console.log(err))

    requestDeleteHistory(target2)
    .then((res) => console.log(`${target2} 삭제 success`, res))
    .catch((err) => console.log(err))

    console.log(target,target2)
  }

  const handleDetail = () => {
    const target = paginationItems[4].id
    const target2 = bookmarkPaginationItems[2].id


    requestHistoryLog(target)
    .then((res) => console.log(`${target} 자세히 보기 success`, res))
    .catch((err) => console.log(err))

    requestHistoryLog(target2)
    .then((res) => console.log(`${target2} 자세히 보기 success`, res))
    .catch((err) => console.log(err))
  }

  const handleBookmarking = () => {
    const target = paginationItems[1].id
    const target2 = bookmarkPaginationItems[1].id
    console.log("기본값", target, paginationItems[1].bookmark)
    console.log("기본값", target2, bookmarkPaginationItems[1].bookmark)

    requestBookmark(target)
    .then((res) => console.log(`${target} 북마크 설정/해제 success`, res))
    .catch((err) => console.log(err))

    requestBookmark(target2)
    .then((res) => console.log(`${target2} 북마크 설정/해제 success`, res))
    .catch((err) => console.log(err))
  }


  const personaHandler = () => {
    const name = name.current.value
    const age = age.current.value
    const position = position.current.value
    const department = department.current.value
    const state = state.current.value


    console.log(name,age,gender,position,department,state)
  }

  const handleGenderSelect = () => {
    const selected = gender.current.value
    console.log(selected)
  }








  return (
    <Container>
        <PageHeader page='Test'/>
          <h1>Auth Test</h1>
          <form>
            <Wrapper>
            <input type="text" placeholder="아이디" ref={idRef} />
            <input type="password" placeholder="비밀번호" ref={passwordRef} />
            <input type='text' placeholder='이메일' ref={emailRef}/>
            <input type='text' placeholder='이름' ref={real_nameRef}/>

            {/* 회원가입 테스트 버튼 */}
              <button type="button" onClick={handleSignUp}>회원가입 테스트</button>
              {/* 로그인 테스트 버튼 */}
              <button type="button" onClick={handleLogIn}>로그인 테스트</button>
              {/* 로그아웃 테스트 버튼 */}
              <button type="button" onClick={handleLogOut}>로그아웃 테스트</button>
              {/* 아이디 찾기 테스트 버튼 */}
              <button type="button" onClick={handleFindId}>아이디 찾기 테스트</button>
              {/* 비밀번호 찾기 테스트 버튼 */}
              <button type="button" onClick={handleFindPassword}>비밀번호 찾기 테스트</button>
            </Wrapper>
          </form>
        <h1>History Test</h1>
          <form>
            <Wrapper>
              <h3>테스트 전 쿠키를 삭제한 후 아래 로그인 버튼 누르고 시작</h3>
              <button type="button" onClick={loginDefault}>로그인</button>
              {/* 히스토리 불러오기 테스트 버튼 */}
              <input type="text" placeholder="페이지 번호" ref={pageRef} />
              <button type="button" onClick={handleGetHistory}>히스토리 불러오기 테스트</button>
              {}
              {/* 북마크 불러오기 버튼 */}
              <button type="button" onClick={handleGetBookmark}>북마크 불러오기 테스트</button>
              {/* 히스토리 삭제 버튼 */}
              <button type="button" onClick={()=>handleRemove(true)}>삭제 테스트</button>
               {/* 히스토리 삭제 버튼 */}
              {/* 히스토리 자세히 보기 버튼 */}
              <button type="button" onClick={handleDetail}>자세히 보기 테스트</button>
              {/* 북마크 설정/해제 테스트 버튼 */}
              <button type="button" onClick={handleBookmarking}>북마크 설정/해제 테스트</button>
            </Wrapper>
          </form>
          <h1>Chat Test</h1>
          <form>
            <Wrapper>
              <h3>테스트 전 쿠키를 삭제한 후 아래 로그인 버튼 누르고 시작</h3>
              <button type="button" onClick={loginDefault}>로그인</button>
              {/* 페르소나 설정 */}




              <input type="text" placeholder="이름" ref={name} />
              <input type="number" placeholder="나이" ref={age} />
              <label>
                <input type="radio" name="gender" value="man" ref={gender}/>man
              </label>
              <label>
                <input type="radio" name="fruit" value="woman" ref={gender}/>woman
              </label>
              <input type='text' placeholder='직책' ref={position}/>
              <input type='text' placeholder='부서' ref={department}/>
              <input type='text' placeholder='고민' ref={state}/>
              
              <button onClick={personaHandler} type='button'>페르소나 설정</button>


            </Wrapper>
          </form>
    </Container>
    )
}

export default Test


const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`