export enum OrderStatus {
  ORDERED = 'Sudah Pesan',
  NOT_ORDERED = 'Belum Pesan',
}

export enum FinalStatus {
  IN_PROGRESS = 'Dalam Proses',
  COMPLETED = 'Selesai',
  PENDING = 'Tertunda',
}

export interface Expat {
  id: string;
  expatName: string;
  arrivalDate: string; // YYYY-MM-DD
  businessCard: OrderStatus;
  iphone: OrderStatus;
  simCard: OrderStatus;
  hotel: OrderStatus;
  driver: string;
  car: string;
  handoverDate: string; // YYYY-MM-DD
  finalStatus: FinalStatus;
  notes: string;
}