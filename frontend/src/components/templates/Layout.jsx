import styled from '@emotion/styled'
import { Header } from '@organisms'
// import Header from '../organisms/Header/Header'

const Layout = ({ children }) => {
  return <Main>
    <Header/>
    {children}
    </Main>
}

const Main = styled.main`
  width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: center;
`

export default Layout