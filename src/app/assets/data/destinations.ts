export interface Destination {
  id: string;
  name: string;
  rating: number;
  reviewCount: number;
  serviceCount: number;
  status: string;
  category: string;
  location: string;
  image: string;
  description: string;
  distance:string;
  gallery: string[]; 
  lat: number;      
  lng: number;      
}

export const destinations: Destination[] = [
    {
      id: "highland-coffee",
      name: "Highlands Coffee",
      rating: 4.2,
      reviewCount: 171,
      serviceCount:171,
      distance:'500m',
      status: "Very Good",
      category: "Cà phê",
      location: "Việt Nam",
      image: "https://i.pinimg.com/736x/e1/62/75/e16275cf5825367d3ed1fdc43cae207f.jpg",
      lat: 10.7769, 
      lng: 106.7009,
      gallery: [
        "https://i.pinimg.com/736x/55/46/94/554694bd7f04790c18110fcd03345428.jpg",
        "https://i.pinimg.com/736x/b8/39/a0/b839a008f71c5333f846edfb485e3533.jpg",
        "https://i.pinimg.com/736x/4f/5d/76/4f5d761553b2148a3944118864ffc1c8.jpg",
        "https://i.pinimg.com/736x/b9/9f/a5/b99fa5e3c5a558f6a4c19ce4f518a5ff.jpg",
        "https://i.pinimg.com/736x/c9/8e/27/c98e274b5ce201b29065ea589fb6f2ab.jpg"
      ],
      description: `Năm 1999, một doanh nhân Việt Kiều trẻ tuổi – David Thái đã trở về Việt Nam khi tình yêu và khát vọng cống hiến cho quê hương thôi thúc. Vị cha mẹ đều là người Việt, ngay từ khi còn nhỏ, anh đã được nghe nhiều câu chuyện thú vị và các giá trị truyền thống dày tự hào về đất nước hình chữ S. Nên dù tiếp nhận nền giáo dục phương Tây, dòng máu Việt vẫn không ngừng chảy và đưa anh trở về tìm hiểu văn hóa quê hương.
  
  Từ tình yêu với Việt Nam và niềm đam mê cà phê, năm 1999, thương hiệu Highlands Coffee ra đời với khát vọng nâng tầm di sản cà phê lâu đời của Việt Nam và lan rộng tinh thần tự hào, kết nối hai nửa truyền thống với hiện đại.`
    },  
  
    {
      id: "the-coffee-house",
      name: "The Coffee House",
      rating: 4.5,
      reviewCount: 210,
      distance:'500m',
      serviceCount:171,
      status: "Excellent",
      category: "Cà phê",
      location: "TP. Hồ Chí Minh",
      image: "https://i.pinimg.com/736x/e1/62/75/e16275cf5825367d3ed1fdc43cae207f.jpg",
      lat: 10.7769, 
      lng: 106.7009,
      gallery: [
        "https://i.pinimg.com/736x/c7/cd/d0/c7cdd09e5fe1f337f681df98d4fd5895.jpg",
        "https://i.pinimg.com/736x/b8/39/a0/b839a008f71c5333f846edfb485e3533.jpg",
        "https://i.pinimg.com/736x/4f/5d/76/4f5d761553b2148a3944118864ffc1c8.jpg",
        "https://i.pinimg.com/736x/b9/9f/a5/b99fa5e3c5a558f6a4c19ce4f518a5ff.jpg",
        "https://i.pinimg.com/736x/c9/8e/27/c98e274b5ce201b29065ea589fb6f2ab.jpg"
      ],
      description: "The Coffee House là chuỗi cửa hàng cà phê nổi bật với không gian hiện đại, phù hợp để làm việc, học tập và gặp gỡ bạn bè."
    },
  
    {
      id: "phuc-long",
      name: "Phúc Long Coffee & Tea",
      rating: 4.3,
      reviewCount: 198,
      serviceCount:171,
      distance:'500m',
      status: "Very Good",
      category: "Cà phê - Trà",
      location: "Việt Nam",
      image: "https://i.pinimg.com/736x/e1/62/75/e16275cf5825367d3ed1fdc43cae207f.jpg",
      lat: 10.7769, 
      lng: 106.7009,
      gallery: [
        "https://i.pinimg.com/736x/c7/cd/d0/c7cdd09e5fe1f337f681df98d4fd5895.jpg",
        "https://i.pinimg.com/736x/b8/39/a0/b839a008f71c5333f846edfb485e3533.jpg",
        "https://i.pinimg.com/736x/4f/5d/76/4f5d761553b2148a3944118864ffc1c8.jpg",
        "https://i.pinimg.com/736x/b9/9f/a5/b99fa5e3c5a558f6a4c19ce4f518a5ff.jpg",
        "https://i.pinimg.com/736x/c9/8e/27/c98e274b5ce201b29065ea589fb6f2ab.jpg"
      ],
      description: "Phúc Long nổi tiếng với trà truyền thống và cà phê đậm vị, là điểm đến quen thuộc cho người yêu thức uống Việt."
    }
  ];
  