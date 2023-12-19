import { create } from 'zustand';

type Store = {
  login: string;
  username: string;
  updateLogin: (value: string) => void,
  updateUsername: (value: string) => void,
  exUsername: () => void;
};

const useLogin = create<Store>((set) => ({
  login: "Login",
  username: "",
  updateLogin: (value: string) => set((state) => ({ login: value })),
  updateUsername: (value: string) => set((state) => ({ username: value })),
  exUsername: () => set((username) => ({ username: "CodeCamp" })),
}));

export default useLogin;
