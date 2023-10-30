import { ReactNode, useCallback, useMemo, useState } from "react";
import "./SearchFrame.css";
import SelectableCard from "../SelectableCard/SelectableCard";

interface Action {
  icon?: ReactNode;
  label?: string;
  onAction: (selectedElement: number[]) => void;
}

interface SearchFrameProps {
  loading: boolean;
  itemsCount: number;
  actions?: Action[];
  children: any[];
}

function SearchFrame({
  actions,
  loading,
  itemsCount,
  children,
}: SearchFrameProps) {
  const [allowEdit, setAllowEdit] = useState<boolean>(false);
  const [selectedElements, setSelectedElements] = useState<number[]>([]);

  const hasItems = useMemo(
    () => !loading && itemsCount > 0,
    [loading, itemsCount]
  );

  const globalCheckbox = useMemo(() => {
    return {
      checked: selectedElements.length === itemsCount,
      indeterminate:
        selectedElements.length > 0 && selectedElements.length < itemsCount,
    };
  }, [selectedElements, itemsCount]);

  const resetSelection = useCallback(() => setSelectedElements([]), []);

  const handleToggleAllowEdit = useCallback(() => {
    resetSelection();
    setAllowEdit(!allowEdit);
  }, [allowEdit, resetSelection]);

  const handleGlobalCheckboxChange = useCallback(() => {
    if (globalCheckbox.checked) {
      setSelectedElements([]);
      return;
    }

    setSelectedElements(
      Array.from({ length: itemsCount }, (_, index) => index)
    );
  }, [globalCheckbox, itemsCount]);

  const handleSelectionChange = useCallback(
    (i: number) => {
      if (selectedElements.includes(i)) {
        setSelectedElements(selectedElements.filter((index) => index !== i));
        return;
      }

      setSelectedElements(selectedElements.concat(i));
    },
    [selectedElements]
  );

  const loadingListMarkup = (
    <div data-testid="loading-banner">Chargement de la recherche...</div>
  );

  const emptyListMarkup = <div data-testid="empty-banner">Aucun résultat</div>;

  const listMarkup = (
    <div className="list" data-testid="list">
      {children.map((c, i) => (
        <SelectableCard
          key={`selectable-card-${i}`}
          allowEdit={allowEdit}
          id={i}
          selected={selectedElements.includes(i)}
          emitCheckChange={handleSelectionChange}
        >
          {c}
        </SelectableCard>
      ))}
    </div>
  );

  const actionBarMarkup = (
    <div
      className="action-bar"
      style={{ visibility: !hasItems ? "hidden" : "initial" }}
    >
      {allowEdit && (
        <div className="actions">
          <label className="fs-md row">
            <input
              type="checkbox"
              data-testid="global-checkbox"
              checked={globalCheckbox.checked}
              onChange={handleGlobalCheckboxChange}
              ref={(input) => {
                if (input) {
                  input.indeterminate = globalCheckbox.indeterminate;
                }
              }}
            />
            {`${selectedElements.length} elements selected`}
          </label>
          <div>
            {actions?.map((a, i) => (
              <button
                className="icon-button mx-1"
                data-testid={`action-button-${i}`}
                key={`action-${i}`}
                onClick={() => {
                  a.onAction(selectedElements);
                  resetSelection();
                }}
              >
                {a.icon}
              </button>
            ))}
          </div>
        </div>
      )}
      <button
        className="edit-button mx-1"
        data-testid="edit-button"
        style={{
          backgroundColor: allowEdit ? "#FF6666" : "#99FF99",
        }}
        onClick={handleToggleAllowEdit}
      >
        {allowEdit ? "Annuler" : "Éditer"}
      </button>
    </div>
  );

  return (
    <div className="p-1">
      {actionBarMarkup}
      <div className="search-frame" data-testid="search-frame">
        {loading && loadingListMarkup}
        {!loading && itemsCount === 0 && emptyListMarkup}
        {hasItems && listMarkup}
      </div>
    </div>
  );
}

export default SearchFrame;
