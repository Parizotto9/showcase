import { useMemo, useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { useQuery } from '@tanstack/react-query';
import { Badge } from '@/components/ui/badge';
import { ChevronRight, ChevronLeft, CirclePlus } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import telegram from '@/assets/telegram.svg';
import whatsapp from '@/assets/whatsapp.svg';
import { getGroups } from '@/components/api/NewAuction';
import type { ChatGroup } from '@/types/newAuction';

export const SelectGroups = ({ updateSelectedGroups }) => {
  const {
    data: groups = [],
    isLoading,
    isError,
    error,
    isFetching,
  } = useQuery<ChatGroup[]>({
    queryKey: ['groups'],
    queryFn: getGroups,
    staleTime: 30_000,
  });

  const [selectedGroups, setSelectedGroups] = useState<ChatGroup[]>([]);
  const [highlightedGroups, setHighlightedGroups] = useState<string[]>([]);

  const groupsLeft = useMemo(() => {
    return groups.filter(
      (group) =>
        !selectedGroups.some((selected) => group.phone === selected.phone)
    );
  }, [groups, selectedGroups]);

  const toggleGroup = (phone: string) => {
    setHighlightedGroups((groupPhone) =>
      groupPhone.includes(phone)
        ? groupPhone.filter((ind) => ind !== phone)
        : [...groupPhone, phone]
    );
  };
  const selectHighlightedGroups = () => {
    const groupsToSelect = groupsLeft.filter((group) =>
      highlightedGroups.includes(group.phone)
    );
    const updatedSelected = [...selectedGroups, ...groupsToSelect];
    setSelectedGroups(updatedSelected);

    setHighlightedGroups((oldGroup) =>
      oldGroup.filter(
        (phone) => !groupsToSelect.some((group) => group.phone === phone)
      )
    );
    updateFormGroups(updatedSelected);
  };

  const removeHighlightedGroups = () => {
    const groupsToRemove = selectedGroups.filter((group) =>
      highlightedGroups.includes(group.phone)
    );

    const updatedSelected = selectedGroups.filter(
      (g) => !groupsToRemove.some((group) => group.phone === g.phone)
    );

    setSelectedGroups(updatedSelected);

    setHighlightedGroups((oldGroup) =>
      oldGroup.filter(
        (phone) => !groupsToRemove.some((group) => group.phone === phone)
      )
    );
    updateFormGroups(updatedSelected);
  };

  const updateFormGroups = (groupsToForm) => {
    const phones = groupsToForm.map((group) => group.phone);
    updateSelectedGroups(phones);
  };

  return (
    <div className="mt-3 flex flex-col">
      <h3 className="font-bold text-xl mb-3">
        Agendamento de Avisos Automáticos (Whatsapp)
      </h3>
      <div className="flex gap-16 justify-between flex-grow">
        <Input label={`Grupos Disponiveis (${groupsLeft.length})`} />
        <Input label={`Grupos Selecionados (${selectedGroups.length})`} />
      </div>
      <div className="mb-2 mt-3 gap-5 flex">
        <Badge className="px-4 h-9 bg-[#EEFDF3] text-[#117B34] hover:text-[#EEFDF3] hover:bg-[#117B34] ">
          WhatsApp (99)
        </Badge>
        <Badge className="px-4 h-9 bg-[#F1F8FD] text-[#379AE6] hover:text-[#F1F8FD] hover:bg-[#379AE6]">
          Telegram (100)
        </Badge>
        <Button className="bg-transparent text-[#313C4FFF] h-9">
          <CirclePlus />
          Adicionar grupos
        </Button>
      </div>
      <div className="flex h-[400px] ">
        <div className="flex flex-col border-2 border-[#DEE1E6FF] rounded-md p-2 w-[45%] text-sm gap-2 overflow-y-auto">
          {groupsLeft.map((group, ind) => {
            const isSelected = highlightedGroups.includes(group.phone);
            return (
              <div
                key={ind}
                onClick={() => toggleGroup(group.phone)}
                className={`flex gap-1 cursor-pointer rounded-sm p-1 hover:bg-green-300 ${
                  isSelected ? 'bg-green-200' : ''
                }`}
              >
                {/* <img src={telegram} alt="telegram icon" className="w-5" /> */}
                <img src={whatsapp} alt="whatsapp icon" className="w-5" />
                <span>{group.name}</span>
              </div>
            );
          })}
        </div>
        <div className="w-14 mx-2 flex flex-col gap-2 justify-center ">
          <Button
            className=" h-12 w-12 rounded-lg bg-[#E4E7EAFF] hover:bg-[#cdd0d3]"
            onClick={() => removeHighlightedGroups()}
          >
            <ChevronLeft strokeWidth={4} size={2} color="#40445CFF" />
          </Button>
          <Button
            className=" h-12 w-12 rounded-lg bg-[#E4E7EAFF] hover:bg-[#cdd0d3]"
            onClick={() => selectHighlightedGroups()}
          >
            <ChevronRight strokeWidth={4} size={2} color="#40445CFF" />
          </Button>
        </div>
        <div className="flex flex-col border-2 border-[#DEE1E6FF] rounded-md p-2 w-[45%] text-sm gap-2 overflow-y-auto">
          {selectedGroups.map((group, ind) => {
            const isSelected = highlightedGroups.includes(group.phone);
            return (
              <div
                key={ind}
                onClick={() => toggleGroup(group.phone)}
                className={`flex gap-1 cursor-pointer rounded-sm p-1 hover:bg-green-300 ${
                  isSelected ? 'bg-green-200' : ''
                }`}
              >
                {/* <img src={telegram} alt="telegram icon" className="w-5" /> */}
                <img src={whatsapp} alt="whatsapp icon" className="w-5" />
                <span>{group.name}</span>
              </div>
            );
          })}
        </div>
      </div>
      <p className="mb-1 mt-10 font-bold text-[#57576CFF]">Interatividade</p>
      <div className="flex p-4 bg-[#cacaca] rounded-sm gap-2 text-sm items-center text-[#575B74FF]">
        <Switch className=" " />
        <span>Habilitar mensagens automaticas engraçadas/interativas</span>
      </div>
    </div>
  );
};

export default SelectGroups;