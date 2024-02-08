import Logo from "./assets/Logo.svg";
import NewNoteCard from "./components/new-note-card";
import NoteCard from "./components/note-card";

const note = {
  date: new Date(),
  content: "Novo Card",
};

export function App() {
  return (
    <div className="max-w-6xl mx-auto my-14 space-y-6">
      <img src={Logo} className="w-[124px]" />
      <input
        className="leading-9 tracking-tight text-slate-200 font-bold text-3xl w-full outline-none bg-transparent placeholder:text-slate-500 "
        type="text"
        placeholder="Busque em suas notas..."
      />
      <div className="h-px bg-slate-700" />
      <div className="grid grid-cols-3 gap-4 auto-rows-[250px]">
        <NewNoteCard />
        <NoteCard note={note} />
      </div>
    </div>
  );
}
