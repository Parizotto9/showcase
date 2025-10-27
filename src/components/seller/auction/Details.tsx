import {
  useState,
  useCallback,
  forwardRef,
  useImperativeHandle,
  Ref,
} from 'react';
import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';
import DetailedItem from '@/components/seller/auction/DetailedItem';
import type { Products } from '@/types/newAuction';
import { ArrowLeft, ArrowRight } from 'lucide-react';

interface DetailsProps {
  products: Products[];
  updateProduct: (index: number, item: Products) => void;
  removeProduct: (index: number) => void;
  setStep: (step: number) => void;
}
export interface DetailsRef {
  updateWithProps: (newProducts: Products[]) => void;
}
export const Details = forwardRef<DetailsRef, DetailsProps>(
  (
    { products, updateProduct, removeProduct, setStep }: DetailsProps,
    ref: Ref<DetailsRef>
  ) => {
    const [localProducts, setLocalProducts] = useState([...products]);

    const updateWithProps = useCallback((newProducts) => {
      setLocalProducts([...newProducts]);
    }, []);

    useImperativeHandle(ref, () => ({
      updateWithProps,
    }));

    return (
      <div className=" flex flex-col px-6 w-[1280px] mx-auto bg-[#FFFEFEFF]">
        <div className="flex mb-8 mt-5">
          <h2 className="text-[#565E6CFF] text-3xl font-semibold mr-10">
            Etapa 3: Detalhes dos itens
          </h2>
          <Button className="h-9 w-min mr-4">
            Importar planilha com itens
          </Button>
          <Button className="h-9 w-min ">
            <Download />
            Baixar template
          </Button>
        </div>
        {localProducts.map((product, index) => (
          <DetailedItem
            key={index}
            product={product}
            updateProduct={(item) => updateProduct(index, item)}
            removeProduct={() => removeProduct(index)}
          />
        ))}
        <div className="flex justify-between px-8 py-2">
          <Button
            onClick={() => setStep(2)}
            className="bg-[#E4E7EAFF] hover:bg-[#d8dfe7] text-[#57576CFF] w-min mb-1"
          >
            <ArrowLeft /> Voltar para Items
          </Button>
          <Button onClick={() => setStep(4)} className=" w-min mb-1">
            Salvar e ir para Revisar
            <ArrowRight />
          </Button>
        </div>
      </div>
    );
  }
);

export default Details;