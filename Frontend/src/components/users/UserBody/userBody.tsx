import "./UserBody.css";

interface UserDivProps {
  avatarUrl: string;
  id: number;
  login: string;
}

function hasItems({ avatarUrl, id, login }: UserDivProps) {
  return (
    <div className="column">
      <div>
        <img className="avatar" src={avatarUrl} alt="Avatar" />
      </div>
      <div className="center-text bold margin-y">
        <div data-testid="user-id" className="fs-sm">
          {id}
        </div>
        <div data-testid="user-login" className="fs-sm">
          {login}
        </div>
      </div>
      <button className="button">View profile</button>
    </div>
  );
}

export default hasItems;
