import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface UserState {
  username: string;
  access: string
  refresh: string
  logout: () => void;
  login: (username: string, access: string, refresh: string) => void;
}

export const useUserStore = create(
    persist<UserState>(
        (set) => ({
            username: "",
            refresh: "",
            access: "",
            logout: () => set(() => ({
                username: "",
                access: "",
                refresh: ""
             })),
            login: (username: string, access: string, refresh: string) => set(() => ({ 
                username: username,
                access: access,
                refresh: refresh
            })),
        }),
        {
			name: "state",
		}
    )
);
