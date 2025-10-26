export interface Review {
    id:string
    username: string;
    rating: number;
    status:string;
    ratingText: string;
    avatar: string;
    destinationId: string;
    badge:string,
    status01: "APPROVED" | "DELETED" 
    date:string


  }
  
  export const reviews: Review[] = [
    {
      id:'1',
      username: "Linh Nguyen",
      rating: 5,
      status:'Amazing',
      ratingText: "Không gian yên tĩnh, phù hợp để học và làm việc. Rất thích cách phục vụ ở đây!",
      avatar: "https://randomuser.me/api/portraits/women/68.jpg",
      destinationId: "highland-coffee",
      badge:'Adventurer',
      status01: "APPROVED",
      date: "2025-08-06",


    },
    {
      id:'2',
      username: "Minh Tran",
      rating: 4,
      status:'Amazing',
      ratingText: "Cà phê ngon, nhân viên dễ thương, chỉ hơi đông vào giờ cao điểm.",
      avatar: "https://randomuser.me/api/portraits/men/45.jpg",
      destinationId: "highland-coffee",
      badge:'Adventurer',
      date: "2025-08-06",
      status01: "APPROVED",

    },
    {
      id:'3',
      username: "Quynh Anh",
      rating: 5,
      status:'Amazing',
      ratingText: "Không gian đẹp, nước uống chất lượng. Rất hợp để hẹn bạn bè!",
      avatar: "https://randomuser.me/api/portraits/women/12.jpg",
      destinationId: "the-coffee-house",
      badge:'Adventurer',
      date: "2025-08-06",
      status01: "APPROVED",

    },
    {
      id:'4',
      username: "Hoang Pham",
      rating: 4.5,
      status:'Amazing',
      ratingText: "Trà ổn, cà phê hơi đắng so với khẩu vị của mình. Bù lại view khá đẹp.",
      avatar: "https://randomuser.me/api/portraits/men/33.jpg",
      badge:'Adventurer',
      date: "2025-08-06",
      status01: "DELETED",
    
      destinationId: "phuc-long"
    },
    {
      id:'5',
      username: "Thao Le",
      rating: 4,
      status:'Amazing',
      ratingText: "Phúc Long luôn là lựa chọn hàng đầu của mình khi muốn uống trà ngon!",
      avatar: "https://randomuser.me/api/portraits/women/25.jpg",
      status01: "DELETED",
      badge:'Adventurer',
      date: "2025-08-06",
      destinationId: "phuc-long"
    }
  ];
  