export interface CarDTO {
  id: string;
  name: string;
  brand: string;
  about: string;
  period: string;
  price: number;
  fuel_type: string;
  thumbnail: string;
  accessories: Array<{ id: string; type: string; name: string }>;
  photos: Array<{ id: string; photo: string }>;
}
