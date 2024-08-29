import { ReactNode } from "react";
import { Alert } from "react-bootstrap";

type Props = {
  variant?: string;
  children: ReactNode;
};

const MessageBox = ({ variant, children }: Props) => {
  return <Alert variant={variant || "info"}> {children} </Alert>;
};

export default MessageBox;
