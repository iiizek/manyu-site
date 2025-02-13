import { reactive } from "vue";
import { defineStore } from "pinia";

const useFavoritesStore = defineStore("favorites", () => {
  const favorites = reactive([]);

  const getFavorites = async () => {
    const newFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    favorites.splice(0, favorites.length, ...newFavorites);
  };

  const toggleFavorite = (productId) => {
    if (!favorites.includes(productId)) {
      favorites.push(productId);
      localStorage.setItem("favorites", JSON.stringify(favorites));
    } else {
      const index = favorites.indexOf(productId);
      favorites.splice(index, 1);
      localStorage.setItem("favorites", JSON.stringify(favorites));
    }
  };

  return {
    favorites,
    getFavorites,
    toggleFavorite,
  };
});

export default useFavoritesStore;
