import { ChangeEvent, ReactNode } from "react";
import Card from "../Card/Card";
import "./SelectableCard.css";

interface SelectableCardProps {
  allowEdit: boolean;
  children: ReactNode;
  id: number;
  selected: boolean;
  emitCheckChange: (id: number) => void;
}

function SelectableCard({
  id,
  children,
  selected,
  allowEdit,
  emitCheckChange,
}: SelectableCardProps) {
  const handleCheckChange = (e: ChangeEvent<HTMLInputElement>) => {
    emitCheckChange(id);
  };

  return (
    <Card minHeight={150} maxHeight={200}>
      <div className="selectable-card">
        {allowEdit && (
          <input
            className="checkbox"
            type="checkbox"
            checked={selected}
            onChange={handleCheckChange}
          />
        )}
        {children}
      </div>
    </Card>
  );
}

export default SelectableCard;
