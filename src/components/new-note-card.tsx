import * as Dialog from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import { MouseEvent, useState } from "react";
import { toast } from "sonner";

let speechRecognition: SpeechRecognition | null = null;

interface NewNoteCardProps {
  onNoteCreated: (content: string) => void;
}

const NewNoteCard = ({ onNoteCreated }: NewNoteCardProps) => {
  const [isNoteOpen, setIsNoteOpen] = useState<Boolean>(false);
  const [isRecording, setIsRecording] = useState<Boolean>(false);
  const [noteContent, setNoteContent] = useState("");

  function handleNewNote() {
    setIsNoteOpen(true);
  }

  function handleSubmit(e: MouseEvent<HTMLButtonElement>) {
    e.preventDefault();

    if (!noteContent) return;

    onNoteCreated(noteContent);

    setNoteContent("");

    toast.success("Enviado com sucesso!");

    setIsNoteOpen(false);
  }

  function handleRecordingOn() {
    setIsRecording(true);

    setIsNoteOpen(true);

    const isSpeechRecognitionIsAvailableOnWindow =
      "SpeechRecognition" in window || "webkitSpeechRecognition" in window;

    if (!isSpeechRecognitionIsAvailableOnWindow) {
      toast.error("Seu navegador não suporta este recurso!");

      return;
    }

    const speechRecognitionAPI =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    speechRecognition = new speechRecognitionAPI();

    speechRecognition.lang = "pt-BR";
    speechRecognition.continuous = true;
    speechRecognition.maxAlternatives = 1;
    speechRecognition.interimResults = true;

    speechRecognition.onresult = (event) => {
      const transcription = Array.from(event.results).reduce((text, result) => {
        return text.concat(result[0].transcript);
      }, "");

      setNoteContent(transcription);
    };

    speechRecognition.onerror = (event) => {
      console.error(event);
    };

    speechRecognition.start();
  }

  function handleRecordingOff() {
    if (speechRecognition != null) {
      speechRecognition.stop();
    }

    setIsRecording(false);

    if (noteContent === "") {
      setIsNoteOpen(false);

      return;
    }
  }

  return (
    <Dialog.Root>
      <Dialog.Trigger className="text-sm bg-slate-700 flex flex-col gap-2 text-left rounded-md overflow-hidden p-5 focus-within:ring-1 focus-within:ring-lime-400">
        <span className="font-medium leading-6">Adionar nota</span>
        <p className="text-slate-400">Grave uma nota em texto ou em audio.</p>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="inset-0 bg-black/50 fixed" />
        <Dialog.Content className="overflow-hidden fixed flex flex-col inset-0 md:inset-auto md:left-1/2 md:top-1/2 md:-translate-y-1/2 w-full md:-translate-x-1/2 md:max-w-[640px] md:min-h-[60vh] z-10 md:rounded-md bg-slate-700">
          <form className="flex flex-col flex-1 text-sm">
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
                  <button
                    type="button"
                    onClick={handleRecordingOn}
                    className="mx-1 text-lime-400 hover:underline"
                  >
                    gravando uma nota
                  </button>
                  em áudio ou se preferir
                  <button
                    type="button"
                    onClick={handleNewNote}
                    className="ml-1 text-lime-400 hover:underline"
                  >
                    utilize apenas texto
                  </button>
                  .
                </p>
              )}
            </div>
            {isRecording ? (
              <button
                onClick={handleRecordingOff}
                className=" flex gap-2 justify-center items-center w-full bg-slate-900 text-sm py-5 font-semibold text-slate-300 hover:opacity-90 transition-all"
              >
                <div className="size-3 rounded-full bg-red-600 animate-pulse" />
                Parar de gravar
              </button>
            ) : (
              <button
                type="button"
                onClick={(e) => handleSubmit(e)}
                className="w-full bg-lime-400 text-sm py-5 font-semibold text-lime-900 hover:opacity-90 transition-all"
              >
                Salvar nota
              </button>
            )}
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
