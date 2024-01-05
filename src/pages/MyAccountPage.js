import HeroProfile from "../components/HeroProfile";
import TabsProfile from "../components/TabsProfile";

function MyAccountPage({ setAuthenticated }) {
  return (
    <div>
      <HeroProfile />
      <TabsProfile setAuthenticated={setAuthenticated}/>
    </div>
  );
}

export default MyAccountPage;
