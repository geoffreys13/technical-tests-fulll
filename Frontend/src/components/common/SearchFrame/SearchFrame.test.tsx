import { fireEvent, render, screen } from "@testing-library/react";
import SearchFrame from "./SearchFrame";
import DeleteIcon from "../../../assets/delete-icon.svg";
import DuplicateIcon from "../../../assets/duplicate-icon.svg";
import UserBody from "../../users/UserBody/userBody";
import { User } from "../../../models/searchUsersResponse.interface";
import { mockEmptyUserData, mockUsersData } from "../../../mocks/users.mock";

const mockDuplication = jest.fn();
const mockDelete = jest.fn();

describe("Tests suites of SearchFrame component", () => {
  test("Should display empty banner when user array is empty", () => {
    render(
      <SearchFrame loading={false} itemsCount={mockEmptyUserData.length}>
        {mockEmptyUserData.map((user) => (
          <UserBody
            key={`user-${user.id}`}
            avatarUrl={user.avatar_url}
            id={user.id}
            login={user.login}
          />
        ))}
      </SearchFrame>
    );

    const emptyBanner = screen.queryByTestId("empty-banner");

    expect(emptyBanner).toBeInTheDocument();
  });

  test("Should display loading banner when loading prop is true", () => {
    render(
      <SearchFrame loading={true} itemsCount={mockEmptyUserData.length}>
        {mockEmptyUserData.map((user) => (
          <UserBody
            key={`user-${user.id}`}
            avatarUrl={user.avatar_url}
            id={user.id}
            login={user.login}
          />
        ))}
      </SearchFrame>
    );

    const loadingBanner = screen.queryByTestId("loading-banner");

    expect(loadingBanner).toBeInTheDocument();
  });

  test("Should allow to switch from read to edit and edit to read mode", () => {
    render(
      <SearchFrame
        loading={false}
        itemsCount={mockUsersData.length}
        actions={[
          {
            icon: (
              <img
                className="icon"
                src={DuplicateIcon}
                alt="Duplicate action"
              />
            ),
            onAction: mockDuplication,
          },
          {
            icon: <img className="icon" src={DeleteIcon} alt="Delete action" />,
            onAction: mockDelete,
          },
        ]}
      >
        {mockUsersData.map((user) => (
          <UserBody
            key={`user-${user.id}`}
            avatarUrl={user.avatar_url}
            id={user.id}
            login={user.login}
          />
        ))}
      </SearchFrame>
    );
    let globalCheckbox = screen.queryByTestId("global-checkbox");
    let duplicationButton = screen.queryByTestId(`action-button-0`);
    let deleteButton = screen.queryByTestId(`action-button-1`);
    const editButton = screen.getByTestId("edit-button");
    expect(globalCheckbox).not.toBeInTheDocument();
    expect(duplicationButton).not.toBeInTheDocument();
    expect(deleteButton).not.toBeInTheDocument();
    expect(editButton).toBeInTheDocument();

    fireEvent.click(editButton);
    globalCheckbox = screen.queryByTestId("global-checkbox");
    duplicationButton = screen.queryByTestId(`action-button-0`);
    deleteButton = screen.queryByTestId(`action-button-1`);

    expect(globalCheckbox).toBeInTheDocument();
    expect(duplicationButton).toBeInTheDocument();
    expect(deleteButton).toBeInTheDocument();
    expect(editButton).toBeInTheDocument();

    fireEvent.click(editButton);

    globalCheckbox = screen.queryByTestId("global-checkbox");
    duplicationButton = screen.queryByTestId(`action-button-0`);
    deleteButton = screen.queryByTestId(`action-button-1`);

    expect(globalCheckbox).not.toBeInTheDocument();
    expect(duplicationButton).not.toBeInTheDocument();
    expect(deleteButton).not.toBeInTheDocument();
    expect(editButton).toBeInTheDocument();
  });

  test("Should select/unselect all SelectableCard on globalCheckbox click", () => {
    render(
      <SearchFrame
        loading={false}
        itemsCount={mockUsersData.length}
        actions={[
          {
            icon: (
              <img
                className="icon"
                src={DuplicateIcon}
                alt="Duplicate action"
              />
            ),
            onAction: mockDuplication,
          },
          {
            icon: <img className="icon" src={DeleteIcon} alt="Delete action" />,
            onAction: mockDelete,
          },
        ]}
      >
        {mockUsersData.map((user) => (
          <UserBody
            key={`user-${user.id}`}
            avatarUrl={user.avatar_url}
            id={user.id}
            login={user.login}
          />
        ))}
      </SearchFrame>
    );

    const editButton = screen.getByTestId("edit-button");
    fireEvent.click(editButton);

    const globalCheckbox = screen.getByTestId("global-checkbox");
    fireEvent.click(globalCheckbox);

    const list = screen.getByTestId("list");

    let firstSelectableCardCheckbox = list.children[0].querySelector(
      'input[type="checkbox"]'
    );
    let secondSelectableCardCheckbox = list.children[1].querySelector(
      'input[type="checkbox"]'
    );

    expect(firstSelectableCardCheckbox).toBeChecked();
    expect(secondSelectableCardCheckbox).toBeChecked();

    fireEvent.click(globalCheckbox);

    firstSelectableCardCheckbox = list.children[0].querySelector(
      'input[type="checkbox"]'
    );
    secondSelectableCardCheckbox = list.children[1].querySelector(
      'input[type="checkbox"]'
    );

    expect(firstSelectableCardCheckbox).not.toBeChecked();
    expect(secondSelectableCardCheckbox).not.toBeChecked();
  });

  test("Should emit event on actions click", () => {
    render(
      <SearchFrame
        loading={false}
        itemsCount={mockUsersData.length}
        actions={[
          {
            icon: (
              <img
                className="icon"
                src={DuplicateIcon}
                alt="Duplicate action"
              />
            ),
            onAction: mockDuplication,
          },
          {
            icon: <img className="icon" src={DeleteIcon} alt="Delete action" />,
            onAction: mockDelete,
          },
        ]}
      >
        {mockUsersData.map((user) => (
          <UserBody
            key={`user-${user.id}`}
            avatarUrl={user.avatar_url}
            id={user.id}
            login={user.login}
          />
        ))}
      </SearchFrame>
    );

    const editButton = screen.getByTestId("edit-button");
    fireEvent.click(editButton);

    const duplicationButton = screen.getByTestId("action-button-0");
    const deleteButton = screen.getByTestId("action-button-1");

    fireEvent.click(duplicationButton);
    fireEvent.click(deleteButton);

    expect(mockDuplication).toBeCalledTimes(1);
    expect(mockDelete).toBeCalledTimes(1);
  });
});
