import { create } from "zustand";

export const useCommentInputStore = create((set) => ({
  //초기값
  isInputOpen: false,
  inputText: "",
  openInput: () => set({ isInputOpen: true }),
  closeInput: () => set({ isInputOpen: false }),
  toggleInput: () =>
    set((state) => {
      return { isInputOpen: !state.isInputOpen };
    }),
  setInputText: (text) => set({ inputText: text }),
  clearInputText: () => set({ inputText: "" }),
}));
