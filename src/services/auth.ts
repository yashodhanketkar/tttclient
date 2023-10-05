import { httpService } from "@/config/httpservice";

type AuthProps = {
  username: string;
  password: string;
};

class AuthSerivceClass {
  register = async (props: AuthProps) => {
		return httpService.post("/user/register", { ...props }).then((res) => res.data).catch((err: Error) => {
			console.log("Failed to register ", err)
		});
  };

  login = async (props: AuthProps) => {
    httpService.post("/user/login", { ...props }).then((res) => {
      const data = res.data;
      if ((data.message as string).includes("Welcome")) {
        localStorage.setItem("token", data.token[0]);
        location.href = "/";
      }
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
