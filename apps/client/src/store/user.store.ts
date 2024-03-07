import { create } from 'zustand';

type UserState = {
    username: string;
    setUsername: (username: string) => void;
};

export const useUserStore = create<UserState>((set) => ({
    username: localStorage.getItem('username') ?? '',
    setUsername: (username: string) => set({ username }),
}));
