export interface Car {
  id: string;
  name: string;
  brand: string;
  price: number;
  year: number;
  image: string;
}

export interface CartItem extends Car {
  quantity: number;
}
