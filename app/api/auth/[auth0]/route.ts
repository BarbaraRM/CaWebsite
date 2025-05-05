import { handleAuth, handleLogin } from "@auth0/nextjs-auth0";

export const GET = handleAuth({
  login: handleLogin({
    authorizationParams: {
      audience: "https://cgcworkinglive.us.auth0.com/api/v2/",
      scope: "openid profile email",
      screen_hint: "login",  
    },
    returnTo: "https://commission-system.vercel.app/dashboard/",
  })
});
