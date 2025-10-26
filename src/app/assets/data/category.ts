export type CategoryView = {
    category: string;
    views: number;
  };


  export const categoryViews: CategoryView[] = [
    { category: "Du lịch", views: 3500 },
    { category: "Ẩm thực", views: 2500 },
    { category: "Văn hóa", views: 1500 },
    { category: "Khác", views: 1500 },

  ];  


  export interface Category {
    id: string;
    category: string;
    order: number;
    status: boolean;
    checkinCount:number; 
    destinationCount:number;
  }
  
  export const categories: Category[] = [
    {
      id: '1',
      category: "Công nghệ",
      order: 1,
      status: true,
      checkinCount:400,
      destinationCount:400,
    },
    {
      id: '2',
      category: "Thể thao",
      order: 2,
      status: true,
      checkinCount:400,
      destinationCount:400,

    },
    {
      id: '3',
      category: "Giải trí",
      order: 3,
      status: false,
      checkinCount:400,
      destinationCount:400,

    },
    {
      id: '4',
      category: "Kinh tế",
      order: 4,
      status: true,
      checkinCount:400,
      destinationCount:400,

    },
  ];