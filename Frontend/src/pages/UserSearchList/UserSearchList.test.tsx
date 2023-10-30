import { fireEvent, render, screen } from "@testing-library/react";
import UserSearchList from "./UserSearchList";
import useSearch from "../../hooks/useSearch/useSearch.hook"; // Assurez-vous d'importer correctement votre hook
import { mockUsersData } from "../../mocks/users.mock";

jest.mock("../../hooks/useSearch/useSearch.hook");

describe("tests suites of UserSearchlist component", () => {
  test("Should return error banner if useSearch hook return an error", () => {
    (useSearch as jest.Mock).mockReturnValue({
      data: null,
      error: new Error("GitHub api rate limit is reached"),
      loading: false,
    });

    render(<UserSearchList />);

    const errorBanner = screen.getByTestId("error-banner");

    expect(errorBanner).toBeInTheDocument();
  });

  test("Should return search frame if useSearch hook return data", () => {
    (useSearch as jest.Mock).mockReturnValue({
      data: [],
      error: null,
      loading: false,
    });

    render(<UserSearchList />);

    const searchFrame = screen.getByTestId("search-list");

    expect(searchFrame).toBeInTheDocument();
  });

  test("Should duplicate user(s) on duplicate action click", () => {
    (useSearch as jest.Mock).mockReturnValue({
      data: { items: mockUsersData },
      error: null,
      loading: false,
    });

    render(<UserSearchList />);

    const editButton = screen.getByTestId("edit-button");
    expect(editButton).toBeInTheDocument();

    fireEvent.click(editButton);

    let list = screen.getByTestId("list");

    // user -> login: "geohot", id: 72895,
    const secondSelectableCardCheckbox = list.children[1].querySelector(
      'input[type="checkbox"]'
    );

    if (secondSelectableCardCheckbox) {
      // select the user to be duplicated
      fireEvent.click(secondSelectableCardCheckbox);
    } else {
      throw new Error("There is an error in the displaying of users card");
    }

    const duplicateButton = screen.getByTestId("action-button-0");

    // emit the action to duplicate the selected user
    fireEvent.click(duplicateButton);

    list = screen.getByTestId("list");

    // According that we had 2 users, and now we could have 3, we take the last user
    const thirdSelectableCard = list.children[2];

    const id = thirdSelectableCard.querySelector('[data-testid="user-id"]');
    const login = thirdSelectableCard.querySelector(
      '[data-testid="user-login"]'
    );

    expect(id?.textContent).toBe("72895");
    expect(login?.textContent).toBe("geohot");
  });

  test("Should delete user(s) on delete action click", () => {
    (useSearch as jest.Mock).mockReturnValue({
      data: { items: mockUsersData },
      error: null,
      loading: false,
    });

    render(<UserSearchList />);

    const editButton = screen.getByTestId("edit-button");
    expect(editButton).toBeInTheDocument();

    fireEvent.click(editButton);

    let list = screen.getByTestId("list");

    // user -> login: "geohot", id: 72895,
    const secondSelectableCardCheckbox = list.children[1].querySelector(
      'input[type="checkbox"]'
    );

    if (secondSelectableCardCheckbox) {
      // select the user to be deleted
      fireEvent.click(secondSelectableCardCheckbox);
    } else {
      throw new Error("There is an error in the displaying of users card");
    }

    const deleteButton = screen.getByTestId("action-button-1");

    // emit the action to duplicate the selected user
    fireEvent.click(deleteButton);

    list = screen.getByTestId("list");

    // we assert that we only have 1 user now
    expect(list.children.length).toBe(1);

    const firstSelectableCard = list.children[0];
    const id = firstSelectableCard.querySelector('[data-testid="user-id"]');
    const login = firstSelectableCard.querySelector(
      '[data-testid="user-login"]'
    );

    // the user that has not been deleted -> login: "ge", id: 4415,
    expect(id?.textContent).toBe("4415");
    expect(login?.textContent).toBe("ge");
  });
});
