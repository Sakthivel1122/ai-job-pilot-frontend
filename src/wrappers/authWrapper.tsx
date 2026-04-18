import { ROUTES } from "@/constants/app-constants";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

interface IAuthWrapperProps {
  pathname?: string;
  children: React.ReactNode;
}
export const AuthWrapper: React.FC<IAuthWrapperProps> = async ({
  pathname = "",
  children,
}) => {
  const session = await getServerSession(authOptions);

  if (pathname === "admin_pages") {
    if (!session?.isLoggedIn) {
      redirect(ROUTES.HOME);
    } else {
      if (session.user.role === "user") {
        redirect(ROUTES.USER.DASHBOARD);
      }
    }
  } else if (pathname === "user_pages") {
    if (!session?.isLoggedIn) {
      redirect(ROUTES.HOME);
    } else {
      if (session.user.role === "admin") {
        redirect(ROUTES.ADMIN.DASHBOARD);
      }
    }
  } else if (pathname === "home_page") {
    if (session?.isLoggedIn) {
      if (session.user.role === "user") {
        redirect(ROUTES.USER.DASHBOARD);
      } else if (session.user.role === "admin") {
        redirect(ROUTES.ADMIN.DASHBOARD);
      }
    }
  }
  return <>{children}</>;
};
