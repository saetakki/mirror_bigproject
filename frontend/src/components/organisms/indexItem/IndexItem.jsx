import styled from "@emotion/styled";
import { CiStar } from 'react-icons/ci'
import { useMediaQuery } from "react-responsive";
import { Desktop, Mobile, Tablet } from "@hooks";

const IndexItem = ({ isHeader, id, date, persona, isBooked }) => {

  const isMobile = useMediaQuery({ query: "(max-width: 425px)" })
  console.log(persona)

  const newDate = date ? date.split("T")[0] : "날짜";

  const newPersona = (device) => {

    if(device === "desktop") {
      return `${persona[0]}과(와)의 대화 - ${persona[5]}`
    } else if (device === "tablet") {
      return `${persona[0]}과(와)의 대화 - ${persona[5]}`
    }
    return `${persona[0]}과(와)의 대화`
  }


  


  return (
    <HeaderContainer style={{ backgroundColor: isHeader ? "#fff" : "" }}>
      <BookMarkCol>
        {isBooked && !isHeader ? <CiStar /> : isHeader ? "북마크" : "" }
        </BookMarkCol>
      <IdCol isMobile={isMobile}>{id ? id : "아이디"}</IdCol>
      {isMobile ? null : <DateCol>{date ? newDate : "날짜"}</DateCol>}
      <Mobile>
        <PersonaCol>{persona ? newPersona("mobile") : "페르소나"}</PersonaCol>
      </Mobile>
      <Tablet>
        <PersonaCol>{persona ? newPersona("tablet") : "페르소나"}</PersonaCol>
      </Tablet>
      <Desktop>
        <PersonaCol>{persona ? newPersona('desktop') : "페르소나"}</PersonaCol>
      </Desktop>
    </HeaderContainer>
  );
}

export default IndexItem;

// 아무런 props도 받지 못했을 경우 e9e9e9 색깔로 칠함
// props가 들어오면 배경색깔을 흰색으로 칠함


// display: grid;
// grid-template-columns: ${props => (props.isMobile ? '1fr 1fr' : '1fr 1fr 1fr 1fr')};
// gap: 10px;


const HeaderContainer = styled.div`
  margin : 10px 0;
  background-color: ${props => props.isHeader ? "#fff" : "#e9e9e9"};
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  width: 100%;
  background-color: #e9e9e9;
  border-radius: 10px
`

const Col = styled.div`
  width:100%;
  height: 60px;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
`
// grid-column: 1;
// background-color: ${props => props.isMobile ? "yellow" : "#fff"};

const BookMarkCol = styled(Col)`
  margin-left: 1rem;
  font-size: 16px;
  width: 100px;

  > svg {
    font-size: 24px;
  }
`

const IdCol = styled(Col)`
  width: ${props => props.id ? "100%" : "240px"};
  display:flex;
  justify-content: center;
  align-items: center;
  `
  // grid-column: 2;
  // grid-template-columns: ${props => props.isMobile ? "3em" : "8em"};

const DateCol = styled(Col)`
  width: 240px;
`

// width: ${props => props.isMobile ? "0" : "8em"};
// grid-column: ${props => (props.isMobile ? '1 / span 2' : '3')};
// display: ${props => (props.isMobile ? 'none' : 'block')};


const PersonaCol = styled(Col)`
  margin-right: 1rem;
`
// grid-column: ${props => (props.isMobile ? '1 / span 2' : '3 / span 2')};
// grid-template-columns : ${props => (props.isMobile ? '100%' : 'auto')};