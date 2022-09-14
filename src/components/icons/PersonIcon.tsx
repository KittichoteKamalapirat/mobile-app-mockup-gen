import styled from "styled-components";
import { Person } from "@styled-icons/bootstrap/Person";

interface Props {
  size: string;
}

const PersonSvg = styled(Person)`
  color: #56b9d9;
`;

const PersonIcon = ({ size }: Props) => <PersonSvg size={size} aria-label="person-icon" />;

PersonIcon.defaultProps = {
  size: "20",
};

export default PersonIcon;
