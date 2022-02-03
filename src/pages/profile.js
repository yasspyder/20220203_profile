import { useSelector, useDispatch } from "react-redux";
import { toggleVisibleProfile } from "../store/profile";
import { ProfileForm } from "../components";

export const ProfilePage = () => {
  const { isVisibleProfile, firstName, lastName, ...profile } = useSelector(
    (state) => {
      return state.profile;
    }
  );

  const dispatch = useDispatch();

  return (
    <div>
      <h1>Profile</h1>

      {isVisibleProfile && (
        <div>
          <h2>firstName: {firstName}</h2>
          <h2>lastName: {lastName}</h2>
          <h2>phone: {profile.phone}</h2>
        </div>
      )}

      <button onClick={() => dispatch(toggleVisibleProfile())}>
        toggleVisibleProfile
      </button>

      <ProfileForm firstName={firstName} lastName={lastName} {...profile} />
    </div>
  );
};
