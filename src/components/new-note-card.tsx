import * as Dialog from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import { FormEvent, useState } from "react";
import { toast } from "sonner";

const NewNoteCard = () => {
  const [isNoteOpen, setIsNoteOpen] = useState<Boolean>(false);
  const [noteContent, setNoteContent] = useState("");

  function handleNewNote() {
    setIsNoteOpen(true);
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();

    toast("Enviado com sucesso!");
  }

  return (
    <Dialog.Root>
      <Dialog.Trigger className="text-sm bg-slate-700 flex flex-col gap-2 text-left rounded-md overflow-hidden p-5 focus-within:ring-1 focus-within:ring-lime-400">
        <span className="font-medium leading-6">Adionar nota</span>
        <p className="text-slate-400">Grave uma nota em texto ou em audio.</p>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="inset-0 bg-black/50 fixed" />
        <Dialog.Content className="overflow-hidden fixed flex flex-col justify-between left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2 w-full max-w-[640px] z-10 rounded-md bg-slate-700 min-h-[60vh]">
          <form
            onSubmit={(e) => handleSubmit(e)}
            className="flex flex-col flex-1 text-sm"
          >
            <div className="flex flex-1 flex-col p-5 gap-2">
              <span className="font-medium leading-6 text-slate-200">
                Adicionar nota
              </span>
              {isNoteOpen ? (
                <textarea
                  onChange={(e) => setNoteContent(e.target.value)}
                  value={noteContent}
                  autoFocus
                  className="resize-none bg-transparent outline-none flex-1 text-slate-400"
                />
              ) : (
                <p className="text-slate-400">
                  Comece
                  <button className="mx-1 text-lime-400 hover:underline">
                    gravando uma nota
                  </button>
                  em áudio ou se preferir
                  <button
                    onClick={handleNewNote}
                    className="ml-1 text-lime-400 hover:underline"
                  >
                    utilize apenas texto
                  </button>
                  .
                </p>
              )}
            </div>

            <button
              type="submit"
              className="w-full bg-lime-400 text-sm py-5 font-semibold text-lime-900 hover:opacity-90 transition-all"
            >
              Salvar nota
            </button>
          </form>

          <Dialog.Close>
            <button className="absolute right-0 top-0 p-1 bg-slate-800">
              <X width={20} className="text-slate-500" />
            </button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default NewNoteCard;
