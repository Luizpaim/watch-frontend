export default defineNuxtPlugin(() => {
  return {
    provide: {
      locally: {
        getItem<T>(item: string) {
          return JSON.parse(localStorage.getItem(item)!) as T;
        },

        setItem<T>(item: string, value: T) {
          return localStorage.setItem(item, JSON.stringify(value));
        },
        removeItem(item: string) {
          return localStorage.removeItem(item);
        },
      },
    },
  };
});
