export interface BookResponseInterface {
  book: {
    title: string;
    description: string;
    subscription: {
      id: number;
    };
  };
}
