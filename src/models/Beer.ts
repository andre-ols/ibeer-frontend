type Beer = {
  id: number;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  abv: number;
  ibu: number;
  ebc: number;
  category: {
    id: number;
    name: string;
    createdAt: Date;
    updatedAt: Date;
  };
  foodPairing: string[];
  brewersTips: string;
  createdAt: Date;
  updatedAt: Date;
};
