import { useRef, useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { DataTable } from '@/components/ui/data-table';
import { CircleX, Pencil } from 'lucide-react';
import NewWarningDialog, { DialogRef } from './NewWarningDialog';
import CheckBox from '@/components/seller/auction/CheckBox';
import type { ScheduledMessageId } from '@/types/newAuction';

export const ScheduledTable = ({ setFormMessages }) => {
  const [scheduledMessages, setScheduledMessages] = useState<
    ScheduledMessageId[]
  >([]);
  const [itemToEdit, setItemToEdit] = useState<ScheduledMessageId>();
  const dialogRef = useRef<DialogRef>(null);

  const [selectedMessages, setSelectedMessages] = useState<string[]>([]);

  const handleCheckboxChange = (id: string, checked: boolean) => {
    setSelectedMessages((prev) =>
      checked ? [...prev, id] : prev.filter((i) => i !== id)
    );
  };

  const selectAll = () => {
    const ids = scheduledMessages.map((msg) => msg.id);
    const allSelected = ids.every((id) => selectedMessages.includes(id));

    if (allSelected) setSelectedMessages([]);
    else setSelectedMessages(ids);
  };

  const deleteSelected = () => {
    setScheduledMessages(
      scheduledMessages.filter(
        (message) => !selectedMessages.includes(message.id)
      )
    );
    setSelectedMessages([]);
  };

  const deleteOne = (idDelete: string) => {
    setScheduledMessages((oldMessages) =>
      oldMessages.filter((message) => message.id !== idDelete)
    );
    setSelectedMessages((oldIds) => oldIds.filter((id) => id !== idDelete));
  };

  const addNewMessage = (message: ScheduledMessageId) => {
    setScheduledMessages((oldMessages) => [...oldMessages, message]);
  };

  const EditMessage = (message: ScheduledMessageId) => {
    setScheduledMessages((oldMessages) =>
      oldMessages.map((item) => (item.id === message.id ? message : item))
    );
    setItemToEdit(null);
  };

  useEffect(() => {
    const formattedMessages = scheduledMessages.map(
      ({ id, ...items }) => items
    );
    setFormMessages(formattedMessages);
  }, [scheduledMessages]);

  const warningColumns = [
    {
      header: (
        <CheckBox
          id={'selectAll'}
          onChange={selectAll}
          checked={selectedMessages.length === scheduledMessages.length}
        />
      ),
      accessorKey: '',
      className: '',
      cell: (bid) => (
        <CheckBox
          id={bid.id}
          onChange={handleCheckboxChange}
          checked={selectedMessages.includes(bid.id)}
        />
      ),
    },
    {
      header: 'Data/Horário',
      accessorKey: 'startDate',
      cell: (bid) => <span className="">{bid.startDate?.toDateString()}</span>,
    },
    {
      header: 'Repetir',
      accessorKey: '',
      className: '',
    },
    {
      header: 'Conteúdo',
      accessorKey: 'message' as const,
      cell: (bid) => <span className="">{bid.message}</span>,
    },
    {
      header: '',
      cell: (bid) => (
        <div className="flex">
          <Button
            variant="ghost"
            size="sm"
            className="hover:bg-transparent"
            onClick={() => deleteOne(bid.id)}
          >
            <CircleX color="red" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="hover:bg-transparent"
            onClick={() => dialogRef.current?.openEditDialog(bid)}
          >
            <Pencil color="purple" />
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div className="my-5 flex flex-col relative">
      <h3 className="font-bold text-xl mb-8">
        Agendamento de Avisos Automáticos (Whatsapp)
      </h3>
      {scheduledMessages.length === 0 && (
        <span className="text-[#848A9CFF] text-xs mb-2 absolute top-8">
          Nenhum aviso agendado
        </span>
      )}
      <NewWarningDialog
        ref={dialogRef}
        CreateNewScheduledMessage={addNewMessage}
        EditMessage={EditMessage}
      />
      <DataTable
        data={scheduledMessages}
        columns={warningColumns}
        className="mb-6 max-h-[400px]"
      />
      {selectedMessages.length > 0 && (
        <Button
          onClick={() => deleteSelected()}
          className="bg-[#DE3B40FF] hover:bg-[#da3439] text-white w-min"
        >
          Remover Selecionadas
        </Button>
      )}
    </div>
  );
};

export default ScheduledTable;
