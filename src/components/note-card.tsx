import * as Dialog from "@radix-ui/react-dialog";
import { formatDistanceToNow } from "date-fns";
import { ptBR } from "date-fns/locale";
import { X } from "lucide-react";

interface NoteCardProps {
  note: {
    date: Date;
    content: string;
    id: string;
  };
}

const NoteCard = ({ note }: NoteCardProps) => {
  return (
    <Dialog.Root>
      <Dialog.Trigger className="text-sm bg-slate-800 flex flex-col gap-2 relative rounded-md overflow-hidden p-5 hover:ring-1 ring-slate-600 text-left outline-none focus-within:ring-1 focus-within:ring-lime-400">
        <span className="font-medium leading-6">
          {formatDistanceToNow(note.date, {
            locale: ptBR,
            addSuffix: true,
          })}
        </span>
        <p className="text-slate-400 ">{note.content}</p>
        <div className="w-full h-1/2 absolute left-0 bottom-0 right-0 bg-gradient-to-t from-black/60 to-black/0 pointer-events-none" />
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Overlay className="inset-0 bg-black/50 fixed" />
        <Dialog.Content className="overflow-hidden fixed flex flex-col inset-0 md:inset-auto md:left-1/2 md:top-1/2 md:-translate-y-1/2 w-full md:-translate-x-1/2  md:max-w-[640px] md:min-h-[60vh] z-10 md:rounded-md bg-slate-700  ">
          <div className="flex flex-1 flex-col gap-2 p-5 text-sm ">
            <span className="font-medium leading-6 text-slate-200">
              {formatDistanceToNow(note.date, {
                locale: ptBR,
                addSuffix: true,
              })}
            </span>
            <p className="text-slate-300">{note.content}</p>
          </div>
          <button className="bg-slate-800 text-sm py-5 text-slate-300 group">
            deseja{" "}
            <span className="text-red-400 group-hover:underline">
              apagar essa nota
            </span>
            ?
          </button>
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

export default NoteCard;
