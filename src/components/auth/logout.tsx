export const Logout = () => {
  localStorage.removeItem("token");
  location.href = "/";
};
