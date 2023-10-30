import { ReactNode } from "react";
import "./ApplicationFrame.css";
import Header from "../Header/Header";

interface ApplicationFrameProps {
  children: ReactNode;
}

function ApplicationFrame({ children }: ApplicationFrameProps) {
  return (
    <div>
      <Header />
      <div className="body">{children}</div>
    </div>
  );
}

export default ApplicationFrame;
