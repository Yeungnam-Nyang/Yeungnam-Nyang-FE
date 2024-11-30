import { create } from "zustand";

export const useCatMapPosts = create((set) => ({
  //초기값
  postsCount: 0,
  setPostsCount: (count) => set({ postsCount: count }),
}));
//