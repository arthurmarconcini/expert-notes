import { useState } from "react";
import Logo from "./assets/Logo.svg";
import NewNoteCard from "./components/new-note-card";
import NoteCard from "./components/note-card";

interface Note {
  id: string;
  date: Date;
  content: string;
}

export function App() {
  const [search, setSearch] = useState("");
  const [notes, setNotes] = useState<Note[]>(() => {
    const storageNotes = localStorage.getItem("notes");

    if (storageNotes) {
      console.log(storageNotes);

      return JSON.parse(storageNotes);
    }

    return [];
  });

  const filteredNotes = notes.filter((note) =>
    note.content.toLocaleLowerCase().includes(search.toLocaleLowerCase())
  );

  function onNoteCreated(content: string) {
    const newNote = {
      id: crypto.randomUUID(),
      date: new Date(),
      content,
    };

    const notesUpdated = [newNote, ...notes];

    setNotes(notesUpdated);

    localStorage.setItem("notes", JSON.stringify(notesUpdated));
  }

  return (
    <div className="max-w-6xl mx-auto my-14 space-y-6 px-4 xl:px-0">
      <img src={Logo} className="w-[124px]" />
      <input
        onChange={(e) => setSearch(e.target.value)}
        className="leading-9 tracking-tight text-slate-200 font-bold text-3xl w-full outline-none bg-transparent placeholder:text-slate-500 "
        type="text"
        placeholder="Busque em suas notas..."
        value={search}
      />
      <div className="h-px bg-slate-700" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 auto-rows-[250px]">
        <NewNoteCard onNoteCreated={onNoteCreated} />

        {filteredNotes.map((note) => (
          <NoteCard key={note.id} note={note} />
        ))}
      </div>
    </div>
  );
}
