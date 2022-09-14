import styled from "styled-components";
import { Copy } from "@styled-icons/boxicons-regular/Copy";

interface Props {
  size: string;
}

const CopySvg = styled(Copy)`
  color: #f18b5f;
`;

const CopyIcon = ({ size }: Props) => <CopySvg size={size} aria-label="copy-icon" />;

CopyIcon.defaultProps = {
  size: "20",
};

export default CopyIcon;
