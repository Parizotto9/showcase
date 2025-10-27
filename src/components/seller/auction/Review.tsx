import { Button } from '@/components/ui/button';
import { Save, Edit, Clock, Rocket, ArrowLeft } from 'lucide-react';
import type { NewAuction } from '@/types/newAuction';
import { postNewAuctionButton } from '@/components/api/NewAuction';

interface FormData {
  formData: NewAuction;
  setStep: (step: number) => void;
}
export const Review = ({ formData, setStep }: FormData) => {
  const postMessageButton = async () => {
    await postNewAuctionButton(formData);
    setStep(5);
  };

  return (
    <div className=" flex flex-col px-6 w-[1280px] mx-auto bg-[#FFFEFEFF]">
      <div className="mb-8 mt-5">
        <h2 className="text-[#485062FF] text-3xl font-bold mr-10">
          Etapa 4: Revisar e Publicar sua Venda
        </h2>
        <span className="text-[#565E6CFF]">
          Por favor, verifique todos os detalhes cuidadosamente.
        </span>
      </div>
      <div className="rounded-md border border-[#d1d5dbff] text-[#565E6CFF] font-medium px-4 grid grid-cols-2 gap-3 py-6">
        <h3 className=" text-2xl font-semibold text-[#485062FF] mr-10 mb-4">
          1. Configurações gerais
        </h3>
        <Button
          className="h-9 w-min mr-4 bg-[#E4E7EB] text-[#273244FF] ml-auto"
          onClick={() => setStep(1)}
        >
          <Edit />
          Editar
        </Button>
        <span>Nome da Venda:</span>
        <span>{formData?.Title}</span>
        <span>Tipo da Venda:</span>
        <span>Leilão (Highest Bidder Auction)</span>
        <span>Inicio da Venda:</span>
        <span>{formData?.StartDate?.toDateString()}</span>
        <span>Fim da Venda:</span>
        <span>{formData?.EndDate?.toDateString()}</span>
        <div className="col-span-2">Descrição:</div>
        <div className="col-span-2">
          Grande oportunidade para adquirir produtos incríveis com descontos
          imperdíveis! O leilão termina dia 05/12...
        </div>
        <span>Mensagens Engraçadas:</span>
        <span>Habilitadas</span>
      </div>
      <div className="flex flex-col rounded-md border border-[#d1d5dbff] text-[#565E6CFF] px-4 py-6 my-6">
        <div className="flex justify-between w-full mb-4">
          <h3 className="font-semibold text-[#485062FF] text-2xl mr-10 w-1/2">
            2. Itens configurados ({formData?.Products.length})
          </h3>
          <Button
            className="h-9 w-min mr-4 bg-[#E4E7EB] text-[#273244FF] ml-auto"
            onClick={() => setStep(3)}
          >
            <Edit />
            Editar Itens
          </Button>
        </div>
        {formData?.Products.map((product) => {
          return (
            <div className="flex p-3 items-center rounded-md border border-[#d1d5dbff] mb-4">
              <img
                src={URL.createObjectURL(product.image[0])}
                alt={product?.title}
                className="h-20 w-20 object-cover"
              />
              <div className="flex flex-col ml-4">
                <span className="font-bold">{product?.title}</span>
                <span className="text-sm text-[#888C9BFF]">
                  Eletrônicos - Qtd: 1
                </span>
                <span className="font-medium">
                  Lance Inicial: R$ {product?.price}
                </span>
              </div>
              <Button
                variant="outline"
                className="ml-auto text-[#2463EBFF] hover:bg-[#2463EBFF]"
              >
                Ver/Editar
              </Button>
            </div>
          );
        })}
      </div>
      <div className="flex flex-col rounded-md border border-[#d1d5dbff] px-4 py-6 my-6 text-[#565E6CFF]">
        <div className="flex justify-between w-full mb-4">
          <h3 className="font-semibold text-[#485062FF] text-2xl mr-10 w-1/2">
            3. Avisos Agendados ({formData?.ScheduledMessage.length})
          </h3>
          <Button
            className="h-9 w-min mr-4 bg-[#E4E7EB] text-[#273244FF] ml-auto"
            onClick={() => setStep(1)}
          >
            <Edit />
            Editar Avisos
          </Button>
        </div>
        {formData?.ScheduledMessage.map((message) => {
          return (
            <div className=" rounded-md bg-[#E4E7EB] mb-2 mx-3 p-2">
              <p className="font-medium">{message.startDate.toDateString()}</p>
              <span className="text-sm">Mensagem: {message.message}</span>
            </div>
          );
        })}
      </div>

      <p className="font-bold text-[#565E6CFF] text-2xl">
        Opções de publicação
      </p>
      <div className="flex justify-end gap-3">
        <Button className="h-9 w-min bg-[#E4E7EB] text-[#273244FF]">
          <Save />
          Salvar como Rascunho
        </Button>
        <Button className="h-9 w-min bg-[#2463EBFF] text-white hover:text-[#2463ebff] hover:bg-white">
          <Clock /> Agendar Publicação
        </Button>
        <Button
          className="h-9 w-min bg-[#12B981] text-white"
          onClick={postMessageButton}
        >
          <Rocket />
          Publicar Venda Agora
        </Button>
      </div>

      <div className="flex justify-between items-center my-6">
        <Button
          className="h-9 w-min bg-[#E4E7EB] text-[#273244FF]"
          onClick={() => setStep(3)}
        >
          <ArrowLeft /> Voltar (Detalhes dos itens)
        </Button>
        <span className="text-[#565E6CFF] text-sm">
          Revise tudo antes de finalizar.
        </span>
      </div>
    </div>
  );
};

export default Review;