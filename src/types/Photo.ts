export interface Photo {
  id: string;
  description: string;
  urls: {
    regular: string;
  };
  likes: number;
  user: {
    name: string;
    username: string;
    id: string;
  };
}
