export const Logout = () => {
  localStorage.removeItem("ttt_access_token");
  location.href = "/";
};
