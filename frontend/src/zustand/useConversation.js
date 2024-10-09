import { create } from "zustand";

const useConversation = create((set) => ({
  selectedConversation: null,
  setSelectedConversation: (selectedConversation) => set({ selectedConversation }),
  messages: [],
  setMessages: (newMessages) => {
    // Check if newMessages is an array or a single object
    if (Array.isArray(newMessages)) {
      set((state) => ({
        messages: [...state.messages, ...newMessages], // Append new messages to existing ones
      }));
    } else if (newMessages) {
      set((state) => ({
        messages: [...state.messages, newMessages], // Append single new message to existing ones
      }));
    }
  },
  clearMessages: () => set(() => ({ messages: [] })),
}));

export default useConversation;
