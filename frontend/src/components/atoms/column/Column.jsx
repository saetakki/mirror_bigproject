import styled from "@emotion/styled";

const Column = (props) => {
  const { width, height, flex, color, children } = props;
  return <Col width={width} height={height} flex={flex} color={color}>
      {children}
    </Col> 
}

const Col = styled.div`
  display: flex;
  height: ${props => props.height};
  width: ${props => props.width};
  flex: ${props => props.flex};
  background-color : ${props => props.color};
  justify-content: center;
  align-items: center;
  font-size: 12px;
`;

export default Column;