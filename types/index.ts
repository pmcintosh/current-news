export interface News {
  favicon: string;
  title: string;
  link: string;
  discuss: string[];
  tags: string;
}

export interface NewsData {
  tags: string[];
  news: News[];
}
