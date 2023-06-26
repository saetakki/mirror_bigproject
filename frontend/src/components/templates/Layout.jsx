import styled from '@emotion/styled'
import { Header } from '@organisms'
// import Header from '../organisms/Header/Header'

const Layout = ({ children }) => {
  return(
        <Main>
          <Header/>
          {children}
        </Main>
    )
}


const Main = styled.main`
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
  margin: 0 auto;
  max-width: 1980px;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow: hidden;

`

export default Layout