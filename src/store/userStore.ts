import { create } from 'zustand';
import axios from 'axios';

type User = {
  id: number;
  name: string;
  email: string;
  role: string;
};

type UserState = {
  users: User[];
  fetchUsers: () => Promise<User[]>;
  addUser: (user: Omit<User, 'id'>) => Promise<void>;
  updateUser: (id: number, updatedUser: Omit<User, 'id'>) => Promise<void>;
  deleteUser: (id: number) => Promise<void>;
  singleUser: (id: number) => Promise<User | null>;
};

const API_URL = 'https://652b4cd74791d884f1fdb370.mockapi.io/todo/users';

export const useUserStore = create<UserState>((set) => ({
  users: [],
  fetchUsers: async () => {
    try {
      const response = await axios.get<User[]>(API_URL);
      set({ users: response.data });
      return response.data;
    } catch (error) {
      console.error('Failed to fetch users:', error);
      return [];
    }
  },
  addUser: async (user) => {
    try {
      const response = await axios.post<User>(API_URL, user);
      set((state) => ({ users: [...state.users, response.data] }));
    } catch (error) {
      console.error('Failed to add user:', error);
    }
  },
  updateUser: async (id, updatedUser) => {
    try {
      await axios.put(`${API_URL}/${id}`, updatedUser);
      set((state) => ({
        users: state.users.map((user) =>
          user.id === id ? { ...user, ...updatedUser } : user
        ),
      }));
    } catch (error) {
      console.error('Failed to update user:', error);
    }
  },
  deleteUser: async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      set((state) => ({
        users: state.users.filter((user) => user.id !== id),
      }));
    } catch (error) {
      console.error('Failed to delete user:', error);
    }
  },
  singleUser: async (id) => {
    try {
      const response = await axios.get<User>(`${API_URL}/${id}`);
      return response.data;
    } catch (error) {
      console.error('Failed to fetch user:', error);
      return null;
    }
  },
}));
