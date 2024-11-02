import type { User } from '../types/global';

const userTestData: User[] = [
  {
    id: 'user123',
    viewingHistory: [
      {
        id: 'video1',
        title: 'Learning TypeScript',
        thumbnailUrl: 'https://example.com/video1_thumbnail.jpg',
      },
      {
        id: 'video2',
        title: 'Advanced JavaScript',
        thumbnailUrl: 'https://example.com/video2_thumbnail.jpg',
      },
      {
        id: 'video3',
        title: 'React for Beginners',
        thumbnailUrl: 'https://example.com/video3_thumbnail.jpg',
      },
    ],
  },
  {
    id: 'user456',
    viewingHistory: [
      {
        id: 'video4',
        title: 'Understanding Async/Await',
        thumbnailUrl: 'https://example.com/video4_thumbnail.jpg',
      },
      {
        id: 'video5',
        title: 'CSS Grid Tutorial',
        thumbnailUrl: 'https://example.com/video5_thumbnail.jpg',
      },
    ],
  },
];

export default userTestData;
