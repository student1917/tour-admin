export interface Review {
  _id: string;
  productId: {
    _id: string;
    title: string;
  };
  username: string;
  reviewText: string;
  rating: number;
  createdAt: string;
  updatedAt: string;
}

export interface PaginationMeta {
  total: number
  page: number
  pages: number
  limit: number
}

export interface PaginatedReviews {
  success: boolean
  data: Review[]
  pagination: PaginationMeta
}