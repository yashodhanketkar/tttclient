export const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-0 border-t border-border px-4 pb-5 pt-3 bg-card text-card-foreground">
      <div className="flex flex-col items-center justify-between gap-4 text-center sm:flex-row sm:text-left">
        <p className="m-0 text-sm">TicTacToe</p>
        <p className="m-0 text-sm">&copy; 2023-{year} Yashodhan Ketkar.</p>
      </div>
    </footer>
  );
};
