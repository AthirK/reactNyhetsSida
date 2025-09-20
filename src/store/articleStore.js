import { create } from "zustand";

// Helper: sync to localStorage
const loadUserArticles = () => {
  const saved = localStorage.getItem("userArticles");
  return saved ? JSON.parse(saved) : [];
};

export const useArticleStore = create((set, get) => ({
  dummyArticles: [],
  userArticles: loadUserArticles(),

  // fetch API articles
  fetchDummyArticles: async () => {
    try {
      const response = await fetch("https://dummyjson.com/posts");
      const data = await response.json();
      set({ dummyArticles: data.posts });
    } catch (error) {
      console.error("Could not fetch dummy articles:", error);
    }
  },

  // add user article
  addUserArticle: (article) => {
    const updated = [article, ...get().userArticles];
    set({ userArticles: updated });
    localStorage.setItem("userArticles", JSON.stringify(updated));
  },

  // delete user article
  deleteUserArticle: (id) => {
    const updated = get().userArticles.filter((a) => a.id !== id);
    set({ userArticles: updated });
    localStorage.setItem("userArticles", JSON.stringify(updated));
  },

  // update reactions
  updateReactions: (id, type) => {
    const updated = get().userArticles.map((a) =>
      a.id === id
        ? {
            ...a,
            reactions: {
              ...a.reactions,
              [type]: a.reactions[type] + 1,
            },
          }
        : a
    );
    set({ userArticles: updated });
    localStorage.setItem("userArticles", JSON.stringify(updated));
  },
}));