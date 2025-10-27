import { useState, useRef, useEffect } from 'react';
import Navbar from '@/components/layout/Navbar';
import General from '@/components/seller/auction/General';
import Items from '@/components/seller/auction/Items';
import Details, { DetailsRef } from '@/components/seller/auction/Details';
import Review from '@/components/seller/auction/Review';
import type { NewAuction } from '@/types/newAuction';

const widthSteps = {
  1: 'w-[12.5%]',
  2: 'w-[37.5%]',
  3: 'w-[62.5%]',
  4: 'w-[87.5%]',
  5: 'w-[100%]',
};

const NewAuction = () => {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [formData, setFormData] = useState<NewAuction>({
    Title: '',
    Rules: '',
    PixCode: '',
    StartDate: null,
    EndDate: null,
    AuctionType: '',
    ScheduledMessage: [],
    Phones: [],
    Products: [],
  });

  const detailsRef = useRef<DetailsRef>(null);

  const updateFormData = (field, value) => {
    setFormData((oldForm) => ({ ...oldForm, [field]: value }));
  };
  const setStep = (step: number) => {
    setCurrentStep(step);
  };
  const updateProduct = (index, newProduct) => {
    setFormData((oldForm) => ({
      ...oldForm,
      Products: oldForm.Products.map((product, ind) =>
        ind === index ? newProduct : product
      ),
    }));
  };
  const removeProduct = (index) => {
    setFormData((oldForm) => ({
      ...oldForm,
      Products: oldForm.Products.filter((_, ind) => ind !== index),
    }));
  };

  useEffect(() => {
    detailsRef.current?.updateWithProps(formData.Products);
  }, [formData.Products]);

  const steps = [
    {
      stepName: 'Geral',
      component: (
        <General
          formData={formData}
          updateFormData={updateFormData}
          setStep={setStep}
        />
      ),
    },
    {
      stepName: 'Items',
      component: (
        <Items
          updateFormData={updateFormData}
          products={formData.Products}
          setStep={setStep}
        />
      ),
    },
    {
      stepName: 'Detalhes',
      component: (
        <Details
          ref={detailsRef}
          products={formData.Products}
          updateProduct={updateProduct}
          removeProduct={removeProduct}
          setStep={setStep}
        />
      ),
    },
    {
      stepName: 'Revisar',
      component: <Review formData={formData} setStep={setStep} />,
    },
  ];

  return (
    <div className="min-h-screen ">
      <Navbar />
      <div className="pb-1 shadow-lg ">
        <div className="p-3 pt-24">
          <h1 className="text-4xl font-bold">Criar Nova Venda em Massa</h1>
          <h2 className="pt-1">Configure os detalhes gerais da sua venda</h2>
        </div>
        <div className="mx-10 relative">
          <div className="w-full absolute bg-white h-1 mt-[24px]">
            <div className={`absolute top-0 w-full bg-[#DEE1E6FF] h-1`}></div>
            <div
              className={`${widthSteps[currentStep]} absolute  transition-all duration-300 ease-in-out bg-[#636AE8FF] h-1`}
            ></div>
          </div>
          <ol className="flex relative justify-around w-full text-center">
            {steps.map((step, ind) => {
              return (
                <li key={ind} className="flex flex-col items-center">
                  <div
                    className={`transition duration-150 ease-in-out w-12 h-12 rounded-full flex justify-center items-center text-2xl text-white ${
                      ind + 1 <= currentStep
                        ? 'bg-[#636AE8FF]'
                        : 'bg-[#DEE1E6FF]'
                    }`}
                  >
                    {ind + 1}
                  </div>
                  <span
                    className={`text-[#3B65CAFF] text-xl   ${
                      ind + 1 <= currentStep
                        ? 'text-[#3B65CAFF]'
                        : 'text-[#DEE1E6FF]'
                    }`}
                  >
                    {step.stepName}
                  </span>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
      <div className="mt-4 ">
        {steps.map((step, ind) => {
          const visible =
            currentStep === ind + 1 ||
            (currentStep === 5 && ind === steps.length - 1);
          return (
            <div className={`${visible ? '' : 'hidden'}`} key={step.stepName}>
              {step.component}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default NewAuction;