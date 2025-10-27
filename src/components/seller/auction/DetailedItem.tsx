import { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Copy, Trash, Save } from 'lucide-react';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import type { Products } from '@/types/newAuction';

interface DetailsItemProps {
  product: Products;
  updateProduct: (item: Products) => void;
  removeProduct: () => void;
}

export const Details = ({
  product,
  updateProduct,
  removeProduct,
}: DetailsItemProps) => {
  const [form, setForm] = useState({ ...product });

  useEffect(() => {
    setForm({ ...product });
  }, [product]);
  return (
    <div className="rounded-md border border-[#d1d5dbff] min-h-[200px] p-4 mb-6">
      <div className="flex h-full">
        <div className="flex w-1/3">
          <input
            // id={id}
            type="checkbox"
            // checked={checked}
            // onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            //   onChange(id, e.target.checked)
            // }
            value=""
            className="w-4 h-4 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600 mx-4"
          />
          <div className="flex items-start gap-2">
            {form.image.map((file, index) => (
              <img
                src={URL.createObjectURL(file)}
                key={index}
                alt={`preview-${index}`}
                className="h-20 w-20 object-cover rounded"
              />
            ))}
          </div>
        </div>
        <div className="w-2/3">
          <Input
            placeholder="Cartinha do Pokemon XPTO"
            label="Nome do Item/Lote"
            required
            value={form.title}
            onChange={(e) =>
              setForm((prev) => ({ ...prev, title: e.target.value }))
            }
          />
          <Textarea
            label="Descrição detalhada"
            placeholder="informações sobre o produto"
            className="my-4"
          />
          <div className="flex gap-4 items-end">
            <Input label="SKU/Ref." />
            <Select>
              <SelectTrigger
                id="auction"
                className=" px-3 py-2 h-10 w-full rounded-md border bg-background text-base focus:ring-0 placeholder:text-muted-foreground  focus-visible:outline-none border-[#d1d5dbff] focus:border-[#a5a8ad] disabled:cursor-not-allowed disabled:opacity-50 "
              >
                <SelectValue placeholder="Select an auction" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem
                  value={'oi'}
                  className="data-[highlighted]:bg-[#636AE8FF]"
                >
                  oi
                </SelectItem>
              </SelectContent>
            </Select>
            <Select>
              <SelectTrigger
                id="auction"
                className=" px-3 py-2 h-10 w-full rounded-md border bg-background text-base focus:ring-0 placeholder:text-muted-foreground  focus-visible:outline-none border-[#d1d5dbff] focus:border-[#a5a8ad] disabled:cursor-not-allowed disabled:opacity-50 "
              >
                <SelectValue placeholder="Select an auction" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem
                  value={'oi'}
                  className="data-[highlighted]:bg-[#636AE8FF]"
                >
                  oi
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      <h3 className="text-[#565E6CFF] text-xl font-semibold my-4">
        Configurações Específicas
      </h3>
      <div className="grid grid-cols-2 gap-7 ">
        <Input
          label="Preço inicial (Lance Minimo)"
          required
          placeholder="Ex: 50.00"
          value={form.price}
          onChange={(e) =>
            setForm((prev) => ({ ...prev, price: Number(e.target.value) }))
          }
        />
        <Input label="Incremento Minimo" required placeholder="Ex: 5.00" />
        <Input
          label="Preço Arremete Imediato"
          placeholder="Deixe em branco se não aplicavel"
        />
        <Input label="Valor Reserva" placeholder="Lance minimo para venda" />
      </div>
      <div className="flex justify-end mt-4 ">
        <Button className="h-9 w-min mr-4 bg-[#E4E7EB]">
          <Copy />
          Duplicar
        </Button>
        <Button className="h-9 w-min mr-4" onClick={() => removeProduct()}>
          <Trash />
          Remover Item
        </Button>
        <Button className="h-9 w-min mr-4" onClick={() => updateProduct(form)}>
          <Save />
          Salvar Alterações do item
        </Button>
      </div>
    </div>
  );
};

export default Details;