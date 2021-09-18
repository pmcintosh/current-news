export interface News {
  favicon: string;
  title: string;
  link: string;
  discuss: string[];
  tags: string;
}

export interface NewsData {
  published: Date;
  tags: string[];
  news: News[];
}
