export interface dataProps {
  address: {
    buildingNumber: string;
    city: string;
    country: string;
    country_code: string;
    id: number;
    latitude: number;
    longitude: number;
    street: string;
    streetName: string;
    zipcode: string;
  };
  birthday: string;
  email: string;
  firstname: string;
  gender: string;
  id: number;
  image: string;
  lastname: string;
  phone: string;
  website: string;
}

export interface customDataProps {
  id: number;
  name: string;
  group: string;
  username: string;
  birthday: string;
  email: string;
  website: string;
  phNum: string;
  image: string;
  gender: string;
  address: {
    buildingNumber: string;
    city: string;
    country: string;
    country_code: string;
    id: number;
    latitude: number;
    longitude: number;
    street: string;
    streetName: string;
    zipcode: string;
  };
}
