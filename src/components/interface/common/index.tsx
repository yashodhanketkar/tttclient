export const ToTop = () => {
  return (
    <button
      onClick={() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }}
    >
      {"^"}
    </button>
  );
};
