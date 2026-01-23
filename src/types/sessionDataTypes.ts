export type TSessionUserData = {
  id?: string;
  name?: string | null;
  email?: string | null;
  role?: string | null;
};

export interface SessionData {
  accessToken?: string;
  refreshToken?: string;
  isLoggedIn?: boolean;
  user: TSessionUserData;
}
