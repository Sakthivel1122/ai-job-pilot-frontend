"use client";
import React, { useEffect, useRef, useState } from "react";
import styles from "./navBar.module.scss";
import { navBarItemList } from "@/constants/navBarConstants";
import ProfileIcon from "../../components/profileIcon/profileIcon";
import Button from "../../components/button/button";
import AuthPopup from "../../components/authPopup/authPopup";
import { TAuthInputFieldData } from "@/types/authPopupTypes";
import { IoPersonOutline } from "react-icons/io5";
import { IoMailOutline } from "react-icons/io5";
import { IoLockClosedOutline } from "react-icons/io5";
import { loginApi, signUpApi } from "@/app/api/login/login";
import { getSession, signIn } from "next-auth/react";
import { ALERT_TYPE, alertMessage } from "@/utils/tosterAlert";
import { BREAK_POINTS, ROUTES } from "@/constants/app-constants";
import { useRouter } from "next/navigation";
import { handleLogout } from "@/utils/sharedFunctions";
import Link from "next/link";
import { usePathname } from "next/navigation";
import ProfileDropdown from "../profileDropdown/profileDropdown";
import { useOutsideClick } from "@/hooks/useOutsideClick";
import ThemeToggleBtn from "@/components/themeToggleBtn/themeToggleBtn";
import { useWindowWidth } from "@/hooks/useWindowWidth";

interface INavBarProps {
  initialSession: any;
}

const signUpFieldList: TAuthInputFieldData[] = [
  {
    id: 1,
    label: "Full Name",
    name: "full_name",
    placeholder: "Enter your full name",
    Icon: IoPersonOutline,
    required: true,
  },
  {
    id: 2,
    label: "Email",
    name: "email_id",
    placeholder: "Enter your email",
    Icon: IoMailOutline,
    required: true,
  },
  {
    id: 3,
    type: "password",
    label: "Password",
    name: "passowrd",
    placeholder: "Enter Password",
    Icon: IoLockClosedOutline,
    required: true,
  },
  {
    id: 4,
    type: "password",
    label: "Confirm Password",
    name: "confirm_passowrd",
    placeholder: "Confirm Passowrd",
    Icon: IoLockClosedOutline,
    required: true,
  },
];

const loginFieldList: TAuthInputFieldData[] = [
  {
    id: 1,
    label: "Email",
    name: "email_id",
    placeholder: "Enter Email Id",
    Icon: IoPersonOutline,
    required: true,
  },
  {
    id: 2,
    type: "password",
    label: "Password",
    name: "passowrd",
    placeholder: "Enter Password",
    Icon: IoLockClosedOutline,
    required: true,
  },
];

const NavBar: React.FC<INavBarProps> = ({ initialSession }) => {
  const [signUpPopup, setSignUpPopup] = useState(false);
  const [isSignUpLoading, setIsSignUpLoading] = useState(false);
  const [signUpData, setSignUpData] = useState({
    full_name: "",
    email_id: "",
    passowrd: "",
    confirm_passowrd: "",
  });

  const [loginPopup, setLoginPopup] = useState(false);
  const [isLoginLoading, setIsLoginLoading] = useState(false);
  const [loginData, setLoginData] = useState({
    email_id: "",
    passowrd: "",
  });
  const [sessionData, setSessionData] = useState<any>(
    initialSession ? initialSession : {}
  );
  const [clientSideRendering, setClientSideRendering] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);

  const profileDropdownRef = useRef<HTMLDivElement>(null);
  const profileIconRef = useRef<HTMLDivElement>(null);

  const router = useRouter();
  const pathname = usePathname();
  const windowWidth = useWindowWidth();

  // SingUp
  const handeOnGetStartedClick = () => {
    setSignUpPopup(true);
  };

  const handleSignUpFieldOnChange = (
    data: TAuthInputFieldData,
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setSignUpData((prevState) => ({
      ...prevState,
      [data.name]: e.target.value,
    }));
  };

  const handleResetSignUpForm = () => {
    setSignUpData((prevState) => ({
      ...prevState,
      full_name: "",
      email_id: "",
      passowrd: "",
      confirm_passowrd: "",
    }));
  };

  const handleSignUpSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const payload = {
      username: signUpData.full_name,
      email: signUpData.email_id,
      password: signUpData.passowrd,
    };
    setIsSignUpLoading(true);
    try {
      const signUpResponse: any = await signUpApi(payload);
      if (signUpResponse?.response?.status === 200) {
        const userData = signUpResponse.content.user_data;
        const tokenData = signUpResponse.content.token;
        const result = await signIn("credentials", {
          redirect: false,
          accessToken: tokenData?.access_token,
          refreshToken: tokenData?.refresh_token,
          userId: userData?.id,
          userName: userData?.username,
          emailId: userData?.email,
          role: userData?.role,
          isLoggedIn: true,
        });

        if (result?.ok) {
          alertMessage(signUpResponse?.response?.message, ALERT_TYPE.SUCCESS);
          setSignUpPopup(false);
          const session_data = await getSessionData();
          setIsSignUpLoading(false);
          setSessionData(session_data);
          if (userData?.role === "admin") {
            router.push(ROUTES.ADMIN.DASHBOARD);
          } else {
            router.push(ROUTES.HOME);
          }
        } else {
          setIsSignUpLoading(false);
          alertMessage(`${result?.error}`, ALERT_TYPE.ERROR);
        }
      }
    } catch (error : any) {
      const message = error.response.data.response.message;
      setIsSignUpLoading(false);
      alertMessage(message, ALERT_TYPE.ERROR);
    }
  };

  // Login
  const handeOnSignInClick = () => {
    setLoginPopup(true);
  };

  const handleLoginFieldOnChange = (
    data: TAuthInputFieldData,
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setLoginData((prevState) => ({
      ...prevState,
      [data.name]: e.target.value,
    }));
  };

  const handleLoginSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const payload = {
      email: loginData.email_id,
      password: loginData.passowrd,
    };

    setIsLoginLoading(true);

    try {
      const loginRes: any = await loginApi(payload);
      if (loginRes?.response?.status === 200) {
        const userData = loginRes.content.user_data;
        const tokenData = loginRes.content.token;

        const result = await signIn("credentials", {
          redirect: false,
          accessToken: tokenData?.access_token,
          refreshToken: tokenData?.refresh_token,
          userId: userData?.id,
          userName: userData?.username,
          emailId: userData?.email,
          role: userData?.role,
          isLoggedIn: true,
        });

        setIsLoginLoading(false);

        if (result?.ok) {
          alertMessage(loginRes?.response?.message, ALERT_TYPE.SUCCESS);
          setLoginPopup(false);
          const session_data = await getSessionData();
          setSessionData(session_data);
          if (userData?.role === "admin") {
            router.push(ROUTES.ADMIN.DASHBOARD);
          } else {
            router.push(ROUTES.USER.DASHBOARD);
          }
        } else {
          alertMessage(`${result?.error}`, ALERT_TYPE.ERROR);
        }
      }
    } catch (error : any) {
      const message = error.response.data.response.message;
      setIsLoginLoading(false);
      alertMessage(message, ALERT_TYPE.ERROR);
    }
  };

  const handleResetLoginForm = () => {
    setLoginData((prevState) => ({
      ...prevState,
      email_id: "",
      passowrd: "",
    }));
  };

  useOutsideClick(profileDropdownRef, () => {
    setIsProfileDropdownOpen(false);
  }, [profileIconRef]);

  useEffect(() => {
    setClientSideRendering(true);
    const getCall = async () => {
      const session_data = await getSession();
      setSessionData(session_data);
    }
    getCall();
  }, []);

  const getSessionData = async () => {
    const session = await getSession();
    return session;
  };

  return (
    <>
      <nav className={styles.NavBar}>
        <div className={styles.NavBar_content}>
          <div className={styles.NavBar_content_left}>
            <p className={styles.NavBar_logo}>JobPilot</p>
          </div>
          <div className={styles.NavBar_content_right}>
            {sessionData?.isLoggedIn ? (
              <div className={styles.NavBar_loggedin_wrapper}>
                <ul className={styles.NavBar_content_right_item_wrapper}>
                  {navBarItemList.map((data) => (
                    <Link
                      key={data.id}
                      className={`${styles.NavBar_content_right_item} ${
                        pathname === data.link ? styles.active : ""
                      }`}
                      href={data.link}
                    >
                      {data.label}
                    </Link>
                  ))}
                </ul>
                <div className={styles.NavBar_profile_icon_wrapper}>
                  <div ref={profileIconRef}>
                  <ProfileIcon
                    className={`${styles.NavBar_profile_icon} ${isProfileDropdownOpen ? styles.active : ""}`}
                    onClick={() => {
                      setIsProfileDropdownOpen(!isProfileDropdownOpen);
                    }}
                  />
                  </div>
                  {isProfileDropdownOpen &&
                    <ProfileDropdown
                      ref={profileDropdownRef}
                      userData={sessionData.user}
                      onLogoutClick={
                        () => {
                          handleLogout(ROUTES.HOME);
                          setSessionData({});
                        }
                      }
                    />}
                </div>
              </div>
            ) : (
              <div className={styles.NavBar_signin_btn_wrapper}>
                <ThemeToggleBtn />
                <Button
                  variant="transparent"
                  content="Sign In"
                  onClick={handeOnSignInClick}
                />
                <Button
                  variant="primary"
                  content="Get Started"
                  onClick={handeOnGetStartedClick}
                />
              </div>
            )}
          </div>
        </div>
      </nav>

      {clientSideRendering && (
        <>
          <AuthPopup
            title="Create Account"
            dataObj={signUpData}
            isOpen={signUpPopup}
            onClose={() => {
              setSignUpPopup(false);
            }}
            inputFieldList={signUpFieldList}
            isSubmitBtnLoading={isSignUpLoading}
            onInputFieldChange={handleSignUpFieldOnChange}
            onSubmit={handleSignUpSubmit}
            resetForm={handleResetSignUpForm}
            showInFullScreen={!!(windowWidth && windowWidth <= BREAK_POINTS.SMALL)}
            submitBtnText="Create Account"
          />

          <AuthPopup
            title="Welcome Back"
            dataObj={loginData}
            isOpen={loginPopup}
            onClose={() => {
              setLoginPopup(false);
            }}
            inputFieldList={loginFieldList}
            isSubmitBtnLoading={isLoginLoading}
            onInputFieldChange={handleLoginFieldOnChange}
            onSubmit={handleLoginSubmit}
            resetForm={handleResetLoginForm}
            showInFullScreen={!!(windowWidth && windowWidth <= BREAK_POINTS.SMALL)}
            submitBtnText="Sign In"
          />
        </>
      )}
    </>
  );
};

export default NavBar;
