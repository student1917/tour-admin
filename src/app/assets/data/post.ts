export type Post = {
    id: string
    username: string
    badge:string
    avatar: string
    cover: string
    views: number
    date: string
    title: string
    content:string
    gallery: string[]
    status: "APPROVED" | "DELETED" | "PENDING"
    video:string
    category:string
  }
  
  export const posts: Post[] = [
    {
      id: '1',
      username: "user_1",
      avatar:'https://i.pinimg.com/736x/c9/de/9a/c9de9a2ac3cd8706baeda36c869b900a.jpg',
      badge:'Adventurer',
      cover: "https://i.pinimg.com/1200x/12/00/0d/12000dc94f5ac4f32695e4777a857f59.jpg",
      views: 1234,
      date: "2025-08-07",
      title: "Khám phá vùng đất bí ẩn",
      status: "APPROVED",
      content: `Hành trình bắt đầu từ những ngọn núi sương mù, nơi ánh nắng len lỏi qua kẽ lá. 
      Các con đường mòn quanh co dẫn đến những cảnh vật kỳ bí chưa từng thấy. 
      Người dân địa phương kể những truyền thuyết ly kỳ về vùng đất này. 
      Mỗi bước đi đều mang đến sự ngạc nhiên và khám phá mới. 
      Cuối cùng, vẻ đẹp hoang sơ của nơi đây để lại ấn tượng sâu sắc trong tâm trí.`,
      gallery: [
        "https://i.pinimg.com/736x/55/46/94/554694bd7f04790c18110fcd03345428.jpg",
        "https://i.pinimg.com/736x/b8/39/a0/b839a008f71c5333f846edfb485e3533.jpg",
        "https://i.pinimg.com/736x/4f/5d/76/4f5d761553b2148a3944118864ffc1c8.jpg",
        "https://i.pinimg.com/736x/b9/9f/a5/b99fa5e3c5a558f6a4c19ce4f518a5ff.jpg",
        "https://i.pinimg.com/736x/c9/8e/27/c98e274b5ce201b29065ea589fb6f2ab.jpg"
      ],
      video:'https://res.cloudinary.com/dwizko2j8/video/upload/v1744636041/MS4wLjABAAAAsJ9sW5cQ_6iw1hZUcuNwnOwg7pb4HFa0ni_2B1I3sYg-7492278926002130186-video--godownloader.com_ysrtcr.mp4',
      category: 'An uong',
    },
    {
      id: '2',
      username: "user_1",
      avatar:'https://i.pinimg.com/736x/c9/de/9a/c9de9a2ac3cd8706baeda36c869b900a.jpg',
      badge:'Adventurer',
      gallery: [
        "https://i.pinimg.com/736x/55/46/94/554694bd7f04790c18110fcd03345428.jpg",
        "https://i.pinimg.com/736x/b8/39/a0/b839a008f71c5333f846edfb485e3533.jpg",
        "https://i.pinimg.com/736x/4f/5d/76/4f5d761553b2148a3944118864ffc1c8.jpg",
        "https://i.pinimg.com/736x/b9/9f/a5/b99fa5e3c5a558f6a4c19ce4f518a5ff.jpg",
        "https://i.pinimg.com/736x/c9/8e/27/c98e274b5ce201b29065ea589fb6f2ab.jpg"
      ],
      cover: "https://i.pinimg.com/1200x/12/00/0d/12000dc94f5ac4f32695e4777a857f59.jpg",
      views: 5678,
      date: "2025-08-06",
      title: "Hành trình đến đỉnh núi tuyết",
      status: "APPROVED",
      video:'https://res.cloudinary.com/dwizko2j8/video/upload/v1744636041/MS4wLjABAAAAsJ9sW5cQ_6iw1hZUcuNwnOwg7pb4HFa0ni_2B1I3sYg-7492278926002130186-video--godownloader.com_ysrtcr.mp4',
      category: 'An uong',

      content: `Hành trình bắt đầu từ những ngọn núi sương mù, nơi ánh nắng len lỏi qua kẽ lá. 
      Các con đường mòn quanh co dẫn đến những cảnh vật kỳ bí chưa từng thấy. 
      Người dân địa phương kể những truyền thuyết ly kỳ về vùng đất này. 
      Mỗi bước đi đều mang đến sự ngạc nhiên và khám phá mới. 
      Cuối cùng, vẻ đẹp hoang sơ của nơi đây để lại ấn tượng sâu sắc trong tâm trí.`
    },
    {
      id: '3',
      username: "user_1",
      avatar:'https://i.pinimg.com/736x/c9/de/9a/c9de9a2ac3cd8706baeda36c869b900a.jpg',
      badge:'Adventurer',
      category: 'An uong',

      cover: "https://i.pinimg.com/1200x/12/00/0d/12000dc94f5ac4f32695e4777a857f59.jpg",
      gallery: [
        "https://i.pinimg.com/736x/55/46/94/554694bd7f04790c18110fcd03345428.jpg",
        "https://i.pinimg.com/736x/b8/39/a0/b839a008f71c5333f846edfb485e3533.jpg",
        "https://i.pinimg.com/736x/4f/5d/76/4f5d761553b2148a3944118864ffc1c8.jpg",
        "https://i.pinimg.com/736x/b9/9f/a5/b99fa5e3c5a558f6a4c19ce4f518a5ff.jpg",
        "https://i.pinimg.com/736x/c9/8e/27/c98e274b5ce201b29065ea589fb6f2ab.jpg"
      ],
      video:'https://res.cloudinary.com/dwizko2j8/video/upload/v1744636041/MS4wLjABAAAAsJ9sW5cQ_6iw1hZUcuNwnOwg7pb4HFa0ni_2B1I3sYg-7492278926002130186-video--godownloader.com_ysrtcr.mp4',

      views: 2145,
      date: "2025-08-05",
      status: "DELETED",
      title: "Bí kíp du lịch tiết kiệm mùa hè",
      content: `Hành trình bắt đầu từ những ngọn núi sương mù, nơi ánh nắng len lỏi qua kẽ lá. 
      Các con đường mòn quanh co dẫn đến những cảnh vật kỳ bí chưa từng thấy. 
      Người dân địa phương kể những truyền thuyết ly kỳ về vùng đất này. 
      Mỗi bước đi đều mang đến sự ngạc nhiên và khám phá mới. 
      Cuối cùng, vẻ đẹp hoang sơ của nơi đây để lại ấn tượng sâu sắc trong tâm trí.`
    },
    {
      id: '4',
      username: "user_1",
      avatar:'https://i.pinimg.com/1200x/df/ac/b3/dfacb380710a0149f10064150125b9b0.jpg',
      badge:'Adventurer',
      category: 'An uong',

      cover: "https://i.pinimg.com/1200x/12/00/0d/12000dc94f5ac4f32695e4777a857f59.jpg",
      views: 4210,
      date: "2025-08-04",
      status: "DELETED",
      video:'https://res.cloudinary.com/dwizko2j8/video/upload/v1744636041/MS4wLjABAAAAsJ9sW5cQ_6iw1hZUcuNwnOwg7pb4HFa0ni_2B1I3sYg-7492278926002130186-video--godownloader.com_ysrtcr.mp4',

      gallery: [
        "https://i.pinimg.com/736x/55/46/94/554694bd7f04790c18110fcd03345428.jpg",
        "https://i.pinimg.com/736x/b8/39/a0/b839a008f71c5333f846edfb485e3533.jpg",
        "https://i.pinimg.com/736x/4f/5d/76/4f5d761553b2148a3944118864ffc1c8.jpg",
        "https://i.pinimg.com/736x/b9/9f/a5/b99fa5e3c5a558f6a4c19ce4f518a5ff.jpg",
        "https://i.pinimg.com/736x/c9/8e/27/c98e274b5ce201b29065ea589fb6f2ab.jpg"
      ],
      content: `Hành trình bắt đầu từ những ngọn núi sương mù, nơi ánh nắng len lỏi qua kẽ lá. 
      Các con đường mòn quanh co dẫn đến những cảnh vật kỳ bí chưa từng thấy. 
      Người dân địa phương kể những truyền thuyết ly kỳ về vùng đất này. 
      Mỗi bước đi đều mang đến sự ngạc nhiên và khám phá mới. 
      Cuối cùng, vẻ đẹp hoang sơ của nơi đây để lại ấn tượng sâu sắc trong tâm trí.`,
      title: "Check-in top 5 bãi biển đẹp nhất"
    },
    {
      id: '5',
      username: "user_1",
      avatar:'https://i.pinimg.com/1200x/df/ac/b3/dfacb380710a0149f10064150125b9b0.jpg',
      badge:'Adventurer',
      video:'https://res.cloudinary.com/dwizko2j8/video/upload/v1744636041/MS4wLjABAAAAsJ9sW5cQ_6iw1hZUcuNwnOwg7pb4HFa0ni_2B1I3sYg-7492278926002130186-video--godownloader.com_ysrtcr.mp4',
      category: 'An uong',

      gallery: [
        "https://i.pinimg.com/736x/55/46/94/554694bd7f04790c18110fcd03345428.jpg",
        "https://i.pinimg.com/736x/b8/39/a0/b839a008f71c5333f846edfb485e3533.jpg",
        "https://i.pinimg.com/736x/4f/5d/76/4f5d761553b2148a3944118864ffc1c8.jpg",
        "https://i.pinimg.com/736x/b9/9f/a5/b99fa5e3c5a558f6a4c19ce4f518a5ff.jpg",
        "https://i.pinimg.com/736x/c9/8e/27/c98e274b5ce201b29065ea589fb6f2ab.jpg"
      ],
      cover: "https://i.pinimg.com/1200x/12/00/0d/12000dc94f5ac4f32695e4777a857f59.jpg",
      views: 3120,
      date: "2025-08-03",
      status: "PENDING",
      content: `Hành trình bắt đầu từ những ngọn núi sương mù, nơi ánh nắng len lỏi qua kẽ lá. 
      Các con đường mòn quanh co dẫn đến những cảnh vật kỳ bí chưa từng thấy. 
      Người dân địa phương kể những truyền thuyết ly kỳ về vùng đất này. 
      Mỗi bước đi đều mang đến sự ngạc nhiên và khám phá mới. 
      Cuối cùng, vẻ đẹp hoang sơ của nơi đây để lại ấn tượng sâu sắc trong tâm trí.`,
      title: "Top điểm đến dành cho người thích khám phá",
    },
    {
      id: '6',
      username: "user_1",
      avatar:'https://i.pinimg.com/1200x/df/ac/b3/dfacb380710a0149f10064150125b9b0.jpg',
      badge:'Adventurer',
      video:'https://res.cloudinary.com/dwizko2j8/video/upload/v1744636041/MS4wLjABAAAAsJ9sW5cQ_6iw1hZUcuNwnOwg7pb4HFa0ni_2B1I3sYg-7492278926002130186-video--godownloader.com_ysrtcr.mp4',
      category: 'An uong',

      gallery: [
        "https://i.pinimg.com/736x/55/46/94/554694bd7f04790c18110fcd03345428.jpg",
        "https://i.pinimg.com/736x/b8/39/a0/b839a008f71c5333f846edfb485e3533.jpg",
        "https://i.pinimg.com/736x/4f/5d/76/4f5d761553b2148a3944118864ffc1c8.jpg",
        "https://i.pinimg.com/736x/b9/9f/a5/b99fa5e3c5a558f6a4c19ce4f518a5ff.jpg",
        "https://i.pinimg.com/736x/c9/8e/27/c98e274b5ce201b29065ea589fb6f2ab.jpg"
      ],
      cover: "https://i.pinimg.com/1200x/12/00/0d/12000dc94f5ac4f32695e4777a857f59.jpg",
      views: 1987,
      date: "2025-08-02",
      status: "PENDING",
      content: `Hành trình bắt đầu từ những ngọn núi sương mù, nơi ánh nắng len lỏi qua kẽ lá. 
      Các con đường mòn quanh co dẫn đến những cảnh vật kỳ bí chưa từng thấy. 
      Người dân địa phương kể những truyền thuyết ly kỳ về vùng đất này. 
      Mỗi bước đi đều mang đến sự ngạc nhiên và khám phá mới. 
      Cuối cùng, vẻ đẹp hoang sơ của nơi đây để lại ấn tượng sâu sắc trong tâm trí.`,
      title: "Cắm trại giữa rừng thông mát lạnh",
    },
    // {
    //   id: '7',
    //   username: "user_1",
    //   cover: "https://i.pinimg.com/1200x/12/00/0d/12000dc94f5ac4f32695e4777a857f59.jpg",
    //   views: 2560,
    //   date: "2025-08-01",
    //   title: "Hòa mình vào lễ hội mùa hè sôi động"
    // },
    // {
    //   id: '8',
    //   username: "user_1",
    //   cover: "https://i.pinimg.com/1200x/12/00/0d/12000dc94f5ac4f32695e4777a857f59.jpg",
    //   views: 3345,
    //   date: "2025-07-31",
    //   title: "Du lịch trải nghiệm văn hóa bản địa"
    // },
    // {
    //   id: '9',
    //   username: "user_1",
    //   cover: "https://i.pinimg.com/1200x/12/00/0d/12000dc94f5ac4f32695e4777a857f59.jpg",
    //   views: 4421,
    //   date: "2025-07-30",
    //   title: "Khám phá ẩm thực đường phố nổi tiếng"
    // },
    // {
    //   id: '10',
    //   username: "user_1",
    //   cover: "https://i.pinimg.com/1200x/12/00/0d/12000dc94f5ac4f32695e4777a857f59.jpg",
    //   views: 2789,
    //   date: "2025-07-29",
    //   title: "Hành trình xuyên Việt bằng xe máy"
    // },
    // {
    //   id: '11',
    //   username: "user_1",
    //   cover: "https://i.pinimg.com/1200x/12/00/0d/12000dc94f5ac4f32695e4777a857f59.jpg",
    //   views: 3123,
    //   date: "2025-07-28",
    //   title: "Top 10 địa điểm ngắm hoàng hôn đẹp nhất"
    // },
    // {
    //   id: '12',
    //   username: "user_1",
    //   cover: "https://i.pinimg.com/1200x/12/00/0d/12000dc94f5ac4f32695e4777a857f59.jpg",
    //   views: 3900,
    //   date: "2025-07-27",
    //   title: "Khám phá hang động kỳ bí"
    // },
    // {
    //   id: '13',
    //   username: "user_1",
    //   cover: "https://i.pinimg.com/1200x/12/00/0d/12000dc94f5ac4f32695e4777a857f59.jpg",
    //   views: 4201,
    //   date: "2025-07-26",
    //   title: "Tham quan vườn quốc gia hoang sơ"
    // },
    // {
    //   id: '14',
    //   username: "user_1",
    //   cover: "https://i.pinimg.com/1200x/12/00/0d/12000dc94f5ac4f32695e4777a857f59.jpg",
    //   views: 5012,
    //   date: "2025-07-25",
    //   title: "Lặn biển ngắm san hô tuyệt đẹp"
    // },
    // {
    //   id: '15',
    //   username: "user_1",
    //   cover: "https://i.pinimg.com/1200x/12/00/0d/12000dc94f5ac4f32695e4777a857f59.jpg",
    //   views: 2834,
    //   date: "2025-07-24",
    //   title: "Khám phá thành phố về đêm"
    // },
    // {
    //   id: '16',
    //   username: "user_1",
    //   cover: "https://i.pinimg.com/1200x/12/00/0d/12000dc94f5ac4f32695e4777a857f59.jpg",
    //   views: 3542,
    //   date: "2025-07-23",
    //   title: "Du lịch xanh – bảo vệ môi trường"
    // },
    // {
    //   id: '17',
    //   username: "user_1",
    //   cover: "https://i.pinimg.com/1200x/12/00/0d/12000dc94f5ac4f32695e4777a857f59.jpg",
    //   views: 3987,
    //   date: "2025-07-22",
    //   title: "Khám phá vùng cao nguyên đầy nắng gió"
    // },
    // {
    //   id: '18',
    //   username: "user_1",
    //   cover: "https://i.pinimg.com/1200x/12/00/0d/12000dc94f5ac4f32695e4777a857f59.jpg",
    //   views: 2678,
    //   date: "2025-07-21",
    //   title: "Trải nghiệm nhà homestay giữa núi rừng"
    // },
    // {
    //   id: '19',
    //   username: "user_1",
    //   cover: "https://i.pinimg.com/1200x/12/00/0d/12000dc94f5ac4f32695e4777a857f59.jpg",
    //   views: 4312,
    //   date: "2025-07-20",
    //   title: "Khám phá vịnh biển hoang sơ"
    // },
    // {
    //   id: '20',
    //   username: "user_1",
    //   cover: "https://i.pinimg.com/1200x/12/00/0d/12000dc94f5ac4f32695e4777a857f59.jpg",
    //   views: 3891,
    //   date: "2025-07-19",
    //   title: "Câu cá giải trí cuối tuần"
    // },
    // {
    //   id: '21',
    //   username: "user_1",
    //   avatar:'https://i.pinimg.com/1200x/df/ac/b3/dfacb380710a0149f10064150125b9b0.jpg',
    //   cover: "https://i.pinimg.com/1200x/12/00/0d/12000dc94f5ac4f32695e4777a857f59.jpg",
    //   views: 2156,
    //   date: "2025-07-18",
    //   title: "Đạp xe xuyên rừng khám phá thiên nhiên"
    // },
    // {
    //   id: '22',
    //   username: "user_1",
    //   cover: "https://i.pinimg.com/1200x/12/00/0d/12000dc94f5ac4f32695e4777a857f59.jpg",
    //   views: 4760,
    //   date: "2025-07-17",
    //   title: "Leo núi chinh phục đỉnh cao"
    // },
    // {
    //   id: '23',
    //   username: "user_1",
    //   cover: "https://i.pinimg.com/1200x/12/00/0d/12000dc94f5ac4f32695e4777a857f59.jpg",
    //   views: 3234,
    //   date: "2025-07-16",
    //   title: "Khám phá di sản văn hóa thế giới"
    // },
    // {
    //   id: '24',
    //   username: "user_1",
    //   cover: "https://i.pinimg.com/1200x/12/00/0d/12000dc94f5ac4f32695e4777a857f59.jpg",
    //   views: 3567,
    //   date: "2025-07-15",
    //   title: "Ngắm hoa nở rực rỡ vào mùa xuân"
    // },
    // {
    //   id: '25',
    //   username: "user_1",
    //   cover: "https://i.pinimg.com/1200x/12/00/0d/12000dc94f5ac4f32695e4777a857f59.jpg",
    //   views: 2888,
    //   date: "2025-07-14",
    //   title: "Trải nghiệm chèo thuyền kayak trên sông"
    // },
    // {
    //   id: '26',
    //   username: "user_1",
    //   cover: "https://i.pinimg.com/1200x/12/00/0d/12000dc94f5ac4f32695e4777a857f59.jpg",
    //   views: 3344,
    //   date: "2025-07-13",
    //   title: "Hành trình khám phá sa mạc cát vàng"
    // },
    // {
    //   id: '27',
    //   username: "user_1",
    //   cover: "https://i.pinimg.com/1200x/12/00/0d/12000dc94f5ac4f32695e4777a857f59.jpg",
    //   views: 2999,
    //   date: "2025-07-12",
    //   title: "Cắm trại qua đêm bên hồ nước trong xanh"
    // },
    // {
    //   id: '28',
    //   username: "user_1",
    //   cover: "https://i.pinimg.com/1200x/12/00/0d/12000dc94f5ac4f32695e4777a857f59.jpg",
    //   views: 4211,
    //   date: "2025-07-11",
    //   title: "Tham quan làng nghề truyền thống"
    // },
    // {
    //   id: '29',
    //   username: "user_1",
    //   cover: "https://i.pinimg.com/1200x/12/00/0d/12000dc94f5ac4f32695e4777a857f59.jpg",
    //   views: 3500,
    //   date: "2025-07-10",
    //   title: "Khám phá đảo hoang cùng nhóm bạn"
    // },
    // {
    //   id: '30',
    //   username: "user_1",
    //   cover: "https://i.pinimg.com/1200x/12/00/0d/12000dc94f5ac4f32695e4777a857f59.jpg",
    //   views: 4120,
    //   date: "2025-07-09",
    //   title: "Chuyến đi bộ đường dài đầy thử thách"
    // }
  
  ]
  