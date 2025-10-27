export type ChatGroup = {
  isGroup: boolean;
  name: string;
  phone: string;
  unread: string;
  lastMessageTime: string;
  isMuted: string;
  isMarkedSpam: string;
  archived: string;
  pinned: string;
  muteEndTime: {
    valueKind: number;
  };
};

export type NewAuction = {
  Title: string;
  Rules: string;
  PixCode: string;
  StartDate: Date | null;
  EndDate: Date | null;
  AuctionType: string;
  ScheduledMessage: ScheduledMessage[];
  Phones: string[];
  Products: Products[];
};

export type ScheduledMessage = {
  startDate: Date | null;
  message: string;
};
export type ScheduledMessageId = {
  id: string;
  startDate: Date | null;
  message: string;
};

export type Products = {
  title: string;
  price: number;
  condition: string;
  tag: string;
  image: File[];
};