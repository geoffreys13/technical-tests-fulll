import { ReactNode } from "react";
import "./Card.css";

interface CardProps {
  children: ReactNode;
  minHeight?: number;
  maxHeight?: number;
}

function Card({ children, minHeight, maxHeight }: CardProps) {
  const containerStyle = {
    minHeight: minHeight || "initial",
    maxHeight: maxHeight || "initial",
  };

  return (
    <div className="card" style={containerStyle}>
      {children}
    </div>
  );
}

export default Card;
