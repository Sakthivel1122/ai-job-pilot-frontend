import styles from "./page.module.scss";
import LandingPage from "@/pages/landingPage/landingPage";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { ROUTES } from "@/constants/app-constants";

const Home = async () => {
  const session = await getServerSession(authOptions);

  if (session?.isLoggedIn) {
    redirect(ROUTES.DASHBOARD);
  }

  return (
    <>
      <LandingPage />
    </>
  );
}

export default Home;
