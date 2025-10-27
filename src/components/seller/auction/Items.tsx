import { useState, useEffect, useRef, useCallback } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import uploadImage from '@/assets/upload.jpg';
import { ArrowLeft, ArrowRight, X } from 'lucide-react';
import type { Products } from '@/types/newAuction';

export const Items = ({ products, updateFormData, setStep }) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [images, setImages] = useState<File[]>([]);
  const [groupSize, setGroupSize] = useState<number>(1);
  const [createdGroups, setCreatedGroups] = useState<Products[]>([]);

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const files = Array.from(e.dataTransfer.files);
    checkImages(files);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    checkImages(files);
  };
  const removeImage = (index: number) => {
    setImages(images.filter((_, ind) => index !== ind));
  };

  const checkImages = useCallback((files: File[]) => {
    const acceptedTypes = ['image/jpeg', 'image/png', 'image/bmp'];
    const maxSizeMB = 2;

    const validImages = files.filter((file) => {
      return (
        acceptedTypes.includes(file.type) &&
        file.size <= maxSizeMB * 1024 * 1024
      );
    });
    setImages((oldImages) => [...oldImages, ...validImages]);
  }, []);

  const formGroupImages = () => {
    const formattedGroup = [...createdGroups];

    for (let i = 0; i < images.length; i += groupSize) {
      const imageGroup = images.slice(i, i + groupSize);

      const product = {
        title: '',
        price: 0,
        condition: '',
        tag: '',
        image: imageGroup,
      };
      formattedGroup.push(product);
    }
    updateFormData('Products', formattedGroup);
    setImages([]);
  };

  useEffect(() => {
    setCreatedGroups([...products]);
  }, [products]);

  return (
    <div className=" flex flex-col px-6 w-[1280px] mx-auto bg-[#FFFEFEFF]">
      <div className="flex justify-between items-center mb-8 mt-5">
        <h2 className="text-[#565E6CFF] text-3xl font-semibold mr-10">
          Etapa 3: Selecionar Itens
        </h2>
        <Button className="h-9 w-min" onClick={() => inputRef.current?.click()}>
          Adicionar itens com Fotos
        </Button>
      </div>

      <h3 className="text-[#565E6CFF] text-xl font-semibold">
        1. Faça Upload das fotos
      </h3>
      <div className="flex items-center">
        <span className="whitespace-nowrap font-bold text-[#171A1FFF]">
          Agrupar automaticamente a cada X fotos selecionadas:
        </span>
        <Input
          type="number"
          className=" text-xs w-14 h-9 ml-4"
          value={groupSize}
          min={1}
          onChange={(e) => setGroupSize(Number(e.target.value))}
        />
      </div>
      <div
        id="dropzone"
        className="flex flex-col justify-center items-center rounded-md border border-[#d1d5dbff] h-[200px] my-3"
        onClick={() => inputRef.current?.click()}
        onDrop={handleDrop}
        onDragOver={(e) => e.preventDefault()}
      >
        <img src={uploadImage} alt="upload Image" />
        <span className="text-[#7F55E0FF] font-bold text-2xl my-2">
          Arraste e solte as fotos aqui ou clique para selecionar.
        </span>
        <span className="text-[#888CA0FF]">
          Formatos aceitos: JPG, PNG, BMP. Max 2MB por foto.
        </span>

        <input
          ref={inputRef}
          type="file"
          className="hidden"
          multiple
          accept=".jpg,.jpeg,.png,.bmp"
          onChange={handleFileChange}
        />
      </div>
      <div className="flex justify-between items-center">
        <h3 className="text-[#565E6CFF] text-xl font-semibold mb-3">
          2. Imagens Carregadas
        </h3>
        <Button
          className="h-9 w-min mb-8 mt-5"
          onClick={formGroupImages}
          disabled={images.length === 0}
        >
          Criar {Math.ceil(images.length / groupSize)} Lotes
        </Button>
      </div>

      <div className="bg-[#F3F4F6FF] rounded-md min-h-[200px] p-3 relative">
        {images.length > 0 && (
          <div className="flex gap-4 flex-wrap">
            {images.map((file, index) => (
              <div className="relative">
                <img
                  src={URL.createObjectURL(file)}
                  key={index}
                  alt={`preview-${index}`}
                  className="h-24 w-24 object-cover rounded"
                />
                <button
                  className="absolute top-1 right-1"
                  onClick={() => removeImage(index)}
                >
                  <X color="#DE3B40FF" />
                </button>
              </div>
            ))}
          </div>
        )}
        {images.length === 0 && (
          <span className="text-[#7D8393FF] font-bold text-2xl absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            Nenhuma imagem carregada ainda.
          </span>
        )}
      </div>
      <h3 className="text-[#565E6CFF] text-xl font-semibold my-3">
        3. Lotes/Itens Criados
      </h3>
      <div className="bg-[#F3F4F6FF] rounded-md min-h-[200px] p-3 relative">
        {createdGroups.length > 0 ? (
          <div className="flex gap-4 flex-wrap ">
            {createdGroups.map((product, index) => (
              <div
                key={index}
                className="flex gap-2 flex-wrap w-fit p-4 border border-[#d1d5dbff] rounded-md"
              >
                {product.image.map((file, ind) => (
                  <img
                    key={ind}
                    src={URL.createObjectURL(file)}
                    alt={`preview-${index}-${ind}`}
                    className="h-20 w-20 object-cover rounded"
                  />
                ))}
              </div>
            ))}
          </div>
        ) : (
          <span className="text-[#7D8393FF] font-bold text-2xl absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            Nenhum grupo carregado ainda.
          </span>
        )}
      </div>
      <span className="text-[#7D8393FF] font-bold text-2xl">
        Nenhum lote/item criado ainda.
      </span>
      <div className="w-full flex justify-between">
        <Button className="h-9 w-min mb-8 mt-5" onClick={() => setStep(1)}>
          <ArrowLeft />
          Voltar (Config. Gerais)
        </Button>
        <Button
          className="h-9 w-min mb-8 mt-5"
          onClick={() => setStep(3)}
          disabled={createdGroups.length === 0}
        >
          Configurar Detalhes dos Lotes
          <ArrowRight />
        </Button>
      </div>
    </div>
  );
};

export default Items;
