import { useCallback, useEffect, useState } from "react";
import "./UserSearchList.css";
import {
  SearchUsersResponse,
  User,
} from "../../models/searchUsersResponse.interface";
import useSearch from "../../hooks/useSearch/useSearch.hook";
import SearchFrame from "../../components/common/SearchFrame/SearchFrame";
import DeleteIcon from "../../assets/delete-icon.svg";
import DuplicateIcon from "../../assets/duplicate-icon.svg";
import SearchInput from "../../components/common/SearchInput/SearchInput";
import ApplicationFrame from "../../components/frame/ApplicationFrame/ApplicationFrame";
import UserBody from "../../components/users/UserBody/userBody";

const URL_PREFIX = "https://api.github.com/search/users?q=";

function UserSearchList() {
  const [searchQuery, setSearchQuery] = useState("");
  const [usersData, setUsersData] = useState<User[]>([]);

  const { data, loading, error } = useSearch<SearchUsersResponse>(
    URL_PREFIX,
    searchQuery.trim()
  );

  useEffect(() => setUsersData(data?.items || []), [data]);

  const handleDuplicate = useCallback(
    (selectedElement: number[]) => {
      setUsersData([
        ...usersData,
        ...usersData.filter((_, i) => selectedElement.includes(i)),
      ]);
    },
    [usersData]
  );

  const handleDelete = useCallback(
    (selectedElement: number[]) => {
      setUsersData(usersData?.filter((_, i) => !selectedElement.includes(i)));
    },
    [usersData]
  );

  const searchInputMarkup = <SearchInput onSearchChange={setSearchQuery} />;

  const errorMarkup = (
    <div data-testid="error-banner" className="error mt-2 mx-1">
      <h3>Une erreur est survenue lors de votre recherche</h3>
      {error?.message}
    </div>
  );

  const searchListMarkup = (
    <div data-testid="search-list" className="w-100">
      <SearchFrame
        actions={[
          {
            icon: (
              <img
                className="icon"
                src={DuplicateIcon}
                alt="Duplicate action"
              />
            ),
            onAction: (selectedElements) => handleDuplicate(selectedElements),
          },
          {
            icon: <img className="icon" src={DeleteIcon} alt="Delete action" />,
            onAction: (selectedElements) => handleDelete(selectedElements),
          },
        ]}
        loading={loading}
        itemsCount={usersData?.length}
      >
        {usersData.map((user) => (
          <UserBody
            key={`user-${user.id}`}
            avatarUrl={user.avatar_url}
            id={user.id}
            login={user.login}
          />
        ))}
      </SearchFrame>
    </div>
  );

  return (
    <ApplicationFrame>
      <div className="user-search-page">
        {searchInputMarkup}
        {error && errorMarkup}
        {!error && searchListMarkup}
      </div>
    </ApplicationFrame>
  );
}

export default UserSearchList;
