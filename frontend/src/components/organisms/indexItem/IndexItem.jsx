import styled from "@emotion/styled";
import { CiStar } from 'react-icons/ci'
import { useMediaQuery } from "react-responsive";
import { Desktop, Mobile, Tablet } from "@hooks";
import { BsTrash3, BsStar} from "react-icons/bs";

const IndexItem = ({ isHeader, id, date, persona, isBooked }) => {

  const isMobile = useMediaQuery({ query: "(max-width: 425px)" })
  const newDate = date ? date.split("T")[0] : "날짜";

  const newPersona = (device) => {
    if(device === "desktop") {
      return `${persona[0]}과(와)의 대화 - ${persona[5]}`
    } else {
    return `${persona[0]}과(와)의 대화`
  }
}

  const renderPersona = (device) => {
    return persona ? newPersona(device) : "페르소나"
  }


  


  return (
    <HeaderContainer style={{ backgroundColor: isHeader ? "#fff" : "" }}>
      <BookMarkCol>
        {isBooked && !isHeader ? <CiStar /> : isHeader ? "북마크" : "" }
        </BookMarkCol>
      <IdCol isMobile={isMobile}>{id ? id : "아이디"}</IdCol>
      {isMobile ? null : <DateCol>{date ? newDate : "날짜"}</DateCol>}
      <Mobile>{renderPersona("mobile")}</Mobile>
      <Tablet>{renderPersona("tablet")}</Tablet>
      <Desktop>{renderPersona("desktop")}</Desktop>  
      <div className='flex w-12'>
        <BsTrash3/>
        <BsStar/>
      </div>

    </HeaderContainer>
  );
}

export default IndexItem;


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

const BookMarkCol = styled(Col)`
  margin-left: 1rem;
  font-size: 16px;
  width: 48px;

  > svg {
    font-size: 24px;
  }
`

const IdCol = styled(Col)`
  width: ${props => props.id ? "100%" : "80px"};
  display:flex;
  justify-content: center;
  align-items: center;
  `

const DateCol = styled(Col)`
  width: 120px;
`

// grid-column: ${props => (props.isMobile ? '1 / span 2' : '3')};
// display: ${props => (props.isMobile ? 'none' : 'block')};


const PersonaCol = styled(Col)`
  display:flex;
  flex: 1;
`