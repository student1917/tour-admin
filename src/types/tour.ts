export interface Photo {
  url: string;
  isThumbnail?: boolean;
}

export interface LocalPhoto {
  file: File;
  previewUrl: string;
  isThumbnail?: boolean;
}

export interface Tour {
  _id: string; 
  title: string;
  city: string;
  country: string;
  photos?: Photo[] | LocalPhoto[];
  imageId?: string;
  desc: string;
  price: number;
  maxGroupSize: number;
  reviews?: string[]; 
  featured?: boolean;
  createdAt?: string; 
  updatedAt?: string;
  bookingCount?: number;
  itinerary?: any[];
  isVisible: boolean;
}

export type TourPhoto = Photo | LocalPhoto;
export interface FormType {
  title: string;
  city: string;
  country: string;
  desc: string;
  price: number;
  maxGroupSize: number;
  schedule: string;
  discount: number;
  photos: TourPhoto[];
  itinerary: any[];  
  featured: boolean;
  isVisible: boolean;
}

