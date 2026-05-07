import { defineStore } from "pinia";

export interface Toast {
  id: number;
  emoji: string;
  title: string;
  description?: string;
}

let nextId = 0;

export const useToastStore = defineStore("toast", {
  state: () => ({
    toasts: [] as Toast[],
  }),
  actions: {
    show(toast: Omit<Toast, "id">, duration = 3000) {
      const id = nextId++;
      this.toasts.push({ id, ...toast });
      setTimeout(() => this.dismiss(id), duration);
    },
    dismiss(id: number) {
      const index = this.toasts.findIndex((t) => t.id === id);
      if (index !== -1) this.toasts.splice(index, 1);
    },
  },
});
