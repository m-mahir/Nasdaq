import styled from "styled-components/native";
import { theme } from "../../constants";

const Container = styled.View`
  margin: 5px;
  width: 96%;
  align-self: center;
  height: 1px;
  background-color: ${theme.colors.secondary};
`;

export default function Separator() {
  return <Container />;
}
