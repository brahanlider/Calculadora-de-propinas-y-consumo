export type TMenuItem = {
  id: number;
  name: string;
  price: number;
};

//  & => AGREGA
export type TOrderItem = TMenuItem & {
  quantity: number;
};
