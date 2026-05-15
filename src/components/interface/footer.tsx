export const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-card text-card-foreground border-t border-border p-2 z-50">
      <div className="flex flex-col items-center justify-between gap-4 text-center sm:flex-row sm:text-left">
        <p>TicTacToe</p>
        <p className="text-xs">&copy; 2023-{year} Yashodhan Ketkar.</p>
      </div>
    </footer>
  );
};
