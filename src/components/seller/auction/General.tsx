import { useState, useMemo } from 'react';
import { Input } from '@/components/ui/input';
import { DateSelector } from '@/components/ui/dateSelector';
import { apiService } from '@/components/api/ApiService';
import { useQuery } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import ScheduledTable from '@/components/seller/auction/ScheduledTable';
import SelectGroups from '@/components/seller/auction/SelectGroups';
import { ArrowRight } from 'lucide-react';

export const General = ({ formData, updateFormData, setStep }) => {
  const [selectedAuction, setSelectedAuction] = useState<string>('');
  const requiredFiled = useMemo(() => {
    return !!formData.Title && !!formData.StartDate && !!formData.EndDate;
  }, [formData.Title, formData.StartDate, formData.EndDate]);

  const { data: auctions = [] } = useQuery({
    queryKey: ['auctions'],
    queryFn: () =>
      apiService.auctionApi
        .auctionAllGet(0, 100)
        .then((res) => res.data.auctionSummaries),
    staleTime: 60_000,
  });

  const updateSelectedGroups = (value) => {
    updateFormData('Phones', value);
  };
  const updateFormMessages = (value) => {
    updateFormData('ScheduledMessage', value);
  };

  return (
    <div className=" flex px-6 w-[1280px] mx-auto bg-[#FFFEFEFF] flex-wrap">
      <h2 className="text-[#565E6CFF] text-3xl font-semibold  w-full mb-8 mt-5">
        Etapa 1: Informações Gerais
      </h2>
      <div className="w-1/2 px-5 ">
        <h3 className="font-bold text-2xl mb-2">
          Informações gerais sobre a venda
        </h3>
        <Input
          label="Nome para a venda em Massa "
          placeholder="Ex: Grande Venda de Primareva"
          value={formData.Title}
          onChange={(e) => updateFormData('Title', e.target.value)}
        />
        <div className="flex justify-between gap-5 my-2">
          <DateSelector
            label="Inicio da Venda"
            required
            value={formData.StartDate}
            onChange={(date) => {
              updateFormData('StartDate', date);
            }}
          />
          <DateSelector
            label="Final da Venda"
            required
            value={formData.EndDate}
            onChange={(date) => updateFormData('EndDate', date)}
          />
        </div>
        <span className=" mb-1 block  font-bold text-[#57576CFF]">
          Tipo de Venda *
        </span>
        <Select value={selectedAuction} onValueChange={setSelectedAuction}>
          <SelectTrigger
            id="auction"
            className=" px-3 py-2 h-10 w-full rounded-md border bg-background text-base focus:ring-0 placeholder:text-muted-foreground  focus-visible:outline-none border-[#d1d5dbff] focus:border-[#a5a8ad] disabled:cursor-not-allowed disabled:opacity-50 "
          >
            <SelectValue placeholder="Select an auction" />
          </SelectTrigger>
          <SelectContent>
            {auctions.map((auction) => (
              <SelectItem
                key={auction.id}
                value={auction['id']?.toString()}
                className="data-[highlighted]:bg-[#636AE8FF]"
              >
                {auction.title}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <ScheduledTable setFormMessages={updateFormMessages} />
      </div>
      <div className="w-1/2 px-5">
        <h3 className="font-bold text-2xl mb-2">Detalhes da Venda</h3>
        <span className="mb-1 block  font-bold text-[#57576CFF]">
          Descrição detalhada e instrução da Venda *
        </span>
        <span className="text-[#848A9CFF] text-xs mb-2">
          explique como a venda funcionará, regras, formas de pagamento, ...
        </span>
        <SelectGroups updateSelectedGroups={updateSelectedGroups} />
      </div>
      <div className="flex px-8 py-2 mt-4 w-full">
        <Button
          onClick={() => setStep(2)}
          className=" w-min mb-1 ml-auto"
          disabled={!requiredFiled}
        >
          Salvar e ir para Revisar
          <ArrowRight />
        </Button>
      </div>
    </div>
  );
};

export default General;