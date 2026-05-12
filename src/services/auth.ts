import { httpService } from "@/config/httpservice";

type AuthProps = {
  username: string;
  password: string;
};

class AuthSerivceClass {
  register = async (props: AuthProps) => {
    return httpService
      .post("/user/register", { ...props })
      .then((res) => res.data.data)
      .catch((err: Error) => {
        console.log("Failed to register ", err);
      });
  };

  login = async (props: AuthProps) => {
    httpService
      .post("/user/login", { ...props })
      .then((res) => res.data)
      .then((data) => {
        if (data.message !== "User logged in") return;
        localStorage.setItem("token", data.data.token);
        window.location.href = "/";
      });
  };

  me = async () => {
    return await httpService
      .get("/user/me", {
        headers: {
          "Cache-control": "no-cache",
        },
      })
      .then((res) => res.data)
      .catch((err: Error) => console.log("Failed authentication", err));
  };
}

export const AuthSerivce = new AuthSerivceClass();
