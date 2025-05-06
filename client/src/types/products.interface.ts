export interface Product {
  section: string;
  items: [
    {
      id: {
        type: string;
      };
      title: {
        type: string;
      };
      category: {
        type: string;
      };
      description: {
        type: string;
      };
      price: {
        type: string;
      };
      image: {
        type: string;
      };
      rating: {
        type: string;
      };
    }
  ];
}
