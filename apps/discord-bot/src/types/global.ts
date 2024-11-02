export type Video = {
  id: string;
  title: string;
  thumbnailUrl: string;
};

export type ViewingHistory = Video[];

export type User = {
  id: string;
  viewingHistory: ViewingHistory;
};
