import SetProfile from "../components/SetProfile";
import { useAuthContext } from "../context/AuthContext";

const Home = () => {
  const { state } = useAuthContext();
  const imagePath = state.profileImg ? state.profileImg : "";
  return (
    <div>
      {state.isFirstLogin && (
        <SetProfile
          text="You don't have a profile image yet, do you want to upload one now?"
          imageSrc={imagePath}
        />
      )}
    </div>
  );
};

export default Home;
