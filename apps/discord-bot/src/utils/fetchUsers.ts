import type { User } from '../types/global';

const API_URL = 'https://ikihaji-tube-api.up.railway.app/api/users';

export const fetchUsers = async (): Promise<User[]> => {
  try {
    const response = await fetch(API_URL);

    if (!response.ok) {
      throw new Error(`Failed to fetch users: ${response.statusText}`);
    }

    const data: User[] = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching users:', error);
    throw error;
  }
};
