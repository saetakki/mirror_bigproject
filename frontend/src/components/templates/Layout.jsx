import styled from '@emotion/styled';
import { Header, SideNav } from '@organisms';import { Container } from "@styles"
import { useMediaQuery } from 'react-responsive';

const Layout = ({ children }) => {
  const isMobile = useMediaQuery({query: "(max-width: 767px)"}); 

  return (
    <Main>
      <Header />
      <BodyContainer>
        {!isMobile &&
        <SideNavContainer>
          <SideNav />
        </SideNavContainer>
        }
        <ContentContainer>
          {children}
        </ContentContainer>
      </BodyContainer>
    </Main>
  );
};

const Main = styled.main`
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  background-color: #f1f1f1;
  box-sizing: border-box;
  margin: 0 auto;
  max-width: 1980px;
  height: 100vh;
  overflow: hidden;
`;

const BodyContainer = styled(Container)`
  padding: 0;
  display: flex;
  height: 100%;
`;

const SideNavContainer = styled.div`
  flex: 0 0 auto;
`;

const ContentContainer = styled.div`
  flex: 1;
  overflow: auto;
  margin-bottom: 90px;
`;

export default Layout;
