export interface Post {
  id: string;
  title: string;
}

export interface Review {
  id: string;
  title: string;
}

export interface User {
  id: string;
  username: string;
  avatar: string;
  cover: string;
  email: string;
  phone: string;
  totalPoints: number;
  badges: string;
  createdAt: string; // Ngày tạo tài khoản
  postCount: number; // Số bài viết
  reviewCount: number; // Số đánh giá
  posts: Post[];
  reviews: Review[];
  status:boolean;
}

export const users: User[] = [
  {
    id: "user_1",
    username: "john_doe",
    avatar: "https://i.pinimg.com/736x/c9/8e/27/c98e274b5ce201b29065ea589fb6f2ab.jpg",
    cover: "https://i.pinimg.com/736x/55/46/94/554694bd7f04790c18110fcd03345428.jpg",
    email: "john@example.com",
    phone: "123456789",
    totalPoints: 1200,
    badges: "Adventurer",
    createdAt: "2024-01-15",
    status:true,
    posts: [
      { id: "p1", title: "Top 10 điểm đến ở Việt Nam" },
      { id: "p2", title: "Hành trình phượt Hà Giang" }
    ],
    reviews: [
      { id: "r1", title: "Review khách sạn ABC Đà Lạt" },
      { id: "r2", title: "Trải nghiệm chèo SUP ở Đà Nẵng" }
    ],
    postCount: 2,
    reviewCount: 2
  },
  {
    id: "user_2",
    username: "mary_smith",
    avatar: "https://i.pinimg.com/736x/c9/8e/27/c98e274b5ce201b29065ea589fb6f2ab.jpg",
    cover: "https://i.pinimg.com/736x/55/46/94/554694bd7f04790c18110fcd03345428.jpg",
    email: "mary@example.com",
    phone: "987654321",
    totalPoints: 950,
    badges: "Explorer",
    createdAt: "2023-09-20",
    status:true,
    posts: [
      { id: "p3", title: "Check-in Phú Quốc" }
    ],
    reviews: [
      { id: "r3", title: "Review nhà hàng A+" }
    ],
    postCount: 1,
    reviewCount: 1
  },
  {
    id: "user_3",
    username: "alex_wong",
    avatar: "https://i.pinimg.com/736x/c9/8e/27/c98e274b5ce201b29065ea589fb6f2ab.jpg",
    cover: "https://i.pinimg.com/736x/55/46/94/554694bd7f04790c18110fcd03345428.jpg",
    email: "alex@example.com",
    phone: "555666777",
    totalPoints: 1500,
    badges: "Master Traveler",
    createdAt: "2022-12-05",
    status:false,
    posts: [
      { id: "p4", title: "Khám phá hang Sơn Đoòng" },
      { id: "p5", title: "Ẩm thực đường phố Hà Nội" },
      { id: "p6", title: "Phượt bằng xe máy xuyên Việt" }
    ],
    reviews: [
      { id: "r4", title: "Review khách sạn 5 sao" }
    ],
    postCount: 3,
    reviewCount: 1
  }
];
