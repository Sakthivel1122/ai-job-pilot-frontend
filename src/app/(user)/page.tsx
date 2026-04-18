import LandingPage from "@/pages/landingPage/landingPage";
import { AuthWrapper } from "@/wrappers/authWrapper";

const Home = async () => {
  return (
    <>
    <AuthWrapper pathname="home_page">
      <LandingPage />
    </AuthWrapper>
    </>
  );
}

export default Home;
