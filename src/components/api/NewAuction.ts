import { apiService } from './ApiService';
import type { ChatGroup, NewAuction } from '@/types/newAuction';

const axios = apiService.axios;

export async function getGroups(): Promise<ChatGroup[]> {
  try {
    const response = await axios.get('Message/Groups');
    return response.data;
  } catch (error) {
    console.log(error); // Adicionar ajustes e notificações de erro
  }
}

export async function postNewAuctionButton(newAuction: NewAuction) {
  try {
    const formData = new FormData();

    formData.append('Title', newAuction.Title);
    formData.append('Rules', newAuction.Rules);
    formData.append('PixCode', newAuction.PixCode);
    formData.append('StartDate', newAuction.StartDate.toISOString());
    formData.append('EndDate', newAuction.EndDate.toISOString());
    formData.append('AuctionType', 'AUCTION');

    newAuction.Phones.forEach((phone, ind) => {
      formData.append(`Phones[${ind}]`, phone);
    });

    newAuction.ScheduledMessage.forEach((msg, ind) => {
      if (msg.startDate)
        formData.append(
          `ScheduledMessage[${ind}]`,
          msg.startDate.toISOString()
        );
      formData.append(`ScheduledMessage[${ind}]`, msg.message);
    });
    newAuction.Products.forEach((product, ind) => {
      formData.append(`Products[${ind}].Title`, product.title);
      formData.append(`Products[${ind}].Price`, product.price.toString());
      formData.append(`Products[${ind}].Condition`, product.condition);
      formData.append(`Products[${ind}].Tag`, product.tag);

      product.image.forEach((file) => {
        formData.append(`Products[${ind}].Image`, file);
      });
    });

    const response = await axios.post('Auction/add/buttons', formData);
    return response.data;
  } catch (error) {
    console.log(error); // Adicionar ajustes e notificações de erro
  }
}