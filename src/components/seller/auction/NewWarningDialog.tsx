import {
  useState,
  useMemo,
  useEffect,
  forwardRef,
  Ref,
  useCallback,
  useImperativeHandle,
} from 'react';
import { Button } from '@/components/ui/button';
import { CirclePlus, X } from 'lucide-react';
import { DateSelector } from '@/components/ui/dateSelector';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import type { ScheduledMessageId } from '@/types/newAuction';

interface DialogProps {
  CreateNewScheduledMessage: (item: ScheduledMessageId) => void;
  EditMessage: (item: ScheduledMessageId) => void;
}
export interface DialogRef {
  openEditDialog: (item: ScheduledMessageId) => void;
}

export const NewWarningDialog = forwardRef<DialogRef, DialogProps>(
  (
    { CreateNewScheduledMessage, EditMessage }: DialogProps,
    ref: Ref<DialogRef>
  ) => {
    const [dialogOpen, setDialogOpen] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [form, setForm] = useState<ScheduledMessageId>({
      message: '',
      startDate: null,
      id: '',
    });

    const openEditDialog = useCallback((item) => {
      setIsEditing(true);
      setForm({ ...item });
      setDialogOpen(true);
    }, []);

    useImperativeHandle(ref, () => ({
      openEditDialog,
    }));

    function generateId(length = 10): string {
      return Math.random().toString(36).substr(2, length);
    }

    const handleClick = () => {
      if (isEditing) {
        EditMessage(form);
        setDialogOpen(false);
        return;
      }
      form.id = generateId();
      CreateNewScheduledMessage(form);
      setDialogOpen(false);
    };

    const requiredFiled = useMemo(() => {
      return !!form.message && !!form.startDate;
    }, [form.message, form.startDate]);

    useEffect(() => {
      if (!dialogOpen) {
        setForm({
          message: '',
          startDate: null,
          id: '',
        });
        setIsEditing(false);
      }
    }, [dialogOpen]);

    return (
      <div className="">
        <Button
          onClick={() => setDialogOpen(!dialogOpen)}
          className="bg-[#E4E7EAFF] hover:bg-[#d8dfe7] text-[#57576CFF] w-min mb-1"
        >
          <CirclePlus fill="#374357FF" color="#E4E7EAFF" /> Adicionar aviso
        </Button>

        {dialogOpen && (
          <div className="fixed inset top-0 right-0 w-full h-full z-50 flex items-center justify-center bg-black/20 ">
            <div className="relative w-[500px]  rounded-xl bg-white p-6 shadow-lg animate-fade-in">
              {/* Fechar botão */}
              <button
                className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"
                onClick={() => setDialogOpen(false)}
              >
                <X size={20} />
              </button>
              <h2 className="text-2xl font-bold text-[#171A1FFF]">
                {isEditing ? 'Editar Mensagem' : 'Agendar Nova Mensagem'}
              </h2>
              <div className="flex items-center my-3">
                <p className="text-xs text-[#323842FF] font-bold mr-10">
                  Tipo de envio
                </p>
                <RadioGroup
                  // onValueChange={field.onChange}
                  // defaultValue={field.value}
                  className="flex text-[#171A1FFF] text-xs"
                >
                  <div className="items-center flex gap-1 cursor-pointer mr-5">
                    <RadioGroupItem id="oneTime" value="oneTime" />
                    <label htmlFor="oneTime" className="cursor-pointer">
                      Único
                    </label>
                  </div>
                  <div className="items-center flex gap-1 cursor-pointer ">
                    <RadioGroupItem id="repeat" value="repeat" />
                    <label htmlFor="repeat" className="cursor-pointer">
                      Repetir
                    </label>
                  </div>
                </RadioGroup>
              </div>
              <DateSelector
                className="my-3 w-4/5"
                value={form.startDate}
                onChange={(date) =>
                  setForm((prev) => ({ ...prev, startDate: date }))
                }
              />
              <Textarea
                label=" Mensagem"
                placeholder="🚨 O leitão começará em 5 minutos"
                value={form.message}
                onChange={(e) =>
                  setForm((prev) => ({ ...prev, message: e.target.value }))
                }
              />
              <div className="flex items-center my-3">
                <p className="text-xs text-[#323842FF] font-bold mr-10">
                  repetir a cada
                </p>
                <div className="w-16 mr-5">
                  <Input type="number" className=" text-xs" />
                </div>
                <RadioGroup
                  // onValueChange={field.onChange}
                  // defaultValue={field.value}
                  className="flex text-[#171A1FFF] text-xs"
                >
                  <div className="items-center flex gap-1 cursor-pointer mr-5">
                    <RadioGroupItem id="hours" value="oneTime" />
                    <label htmlFor="hours" className="cursor-pointer">
                      Horas
                    </label>
                  </div>
                  <div className="items-center flex gap-1 cursor-pointer ">
                    <RadioGroupItem id="minutes" value="repeat" /> Minutos
                    <label htmlFor="minutes" className="cursor-pointer">
                      Minutos
                    </label>
                  </div>
                </RadioGroup>
              </div>
              <div className="flex items-center mt-3 mb-5">
                <p className="text-xs text-[#323842FF] font-bold mr-[98px]">
                  Até
                </p>
                <DateSelector
                  className="w-[121px]"
                  onlyDay
                  value={null}
                  onChange={() => console.log('ainda não feito')}
                />
              </div>
              <div className="flex gap-5">
                <Button
                  variant="outline"
                  className="w-1/2 border-[#C0C8D0FF]"
                  onClick={() => setDialogOpen(false)}
                >
                  Cancelar
                </Button>
                <Button
                  className="w-1/2"
                  onClick={handleClick}
                  disabled={!requiredFiled}
                >
                  {isEditing ? 'Salvar' : 'Agendar Mensagem'}
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
);

export default NewWarningDialog;