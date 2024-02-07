const NoteCard = () => {
  return (
    <button
      className="text-sm bg-slate-800 relative rounded-md overflow-hidden p-5 space-y-3 focus-within:ring-1 text-left outline-none focus-within:ring-lime-400
    "
    >
      <span className="font-medium leading-6">há 2 dias</span>
      <p className="text-slate-400 ">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
        velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
        occaecat cupidatat non proident, sunt in culpa qui officia deserunt
        mollit anim id est laborum
      </p>
      <div className="w-full h-1/2 absolute left-0 bottom-0 right-0 bg-gradient-to-t from-black/60 to-black/0 pointer-events-none" />
    </button>
  );
};

export default NoteCard;
