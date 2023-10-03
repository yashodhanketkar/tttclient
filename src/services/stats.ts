import { httpService } from "@/config/httpservice";

class StatServiceClass {
  getAll = async () => {
    return httpService
      .get("/user/stats")
      .then((res) => res.data)
      .catch((err: Error) => {
        console.log("Failed to fetch, " + err.message);
        return [];
      });
  };

  getByID = async (id: string) => {
    return httpService
      .get("/user/stats/" + id)
      .then((res) => res.data)
      .catch((err: Error) => {
        console.log("Failed to fetch, " + err.message);
      });
  };
}

export const StatService = new StatServiceClass();
