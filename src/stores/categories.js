import { defineStore } from "pinia";
import { reactive } from "vue";
import { readItems } from "@directus/sdk";

import directus from "@/services/directus";

const useCategoriesStore = defineStore("categories", () => {
  const topCollection = reactive({});
  const baseCollections = reactive([]);
  const extraCollections = reactive([]);

  const getTopCollection = async () => {
    try {
      if (Object.keys(topCollection).length > 0) return;

      const data = await directus.request(
        readItems("collections", {
          fields: ["id", "name", "slug", { video: ["id"] }, "background_color"],
          filter: {
            on_top: true,
            extra: false,
          },
        })
      );

      if (data.length) {
        Object.assign(topCollection, data[0]);
      }
    } catch (error) {
      console.error("Ошибка при запросе главной коллекции:", error);
    }
  };

  const getBaseCollections = async () => {
    try {
      if (baseCollections.length > 0) return;
      const data = await directus.request(
        readItems("collections", {
          fields: ["id", "name", "slug", { video: ["id"] }, "background_color"],
          filter: {
            on_top: false,
            extra: false,
          },
        })
      );

      baseCollections.push(...data);
    } catch (error) {
      console.error("Ошибка при запросе базовых коллекций:", error);
    }
  };

  const getExtraCollections = async () => {
    try {
      if (extraCollections.length > 0) return;
      const data = await directus.request(
        readItems("collections", {
          fields: ["id", "name", "slug", { extra_image: ["id"] }],
          filter: {
            on_top: false,
            extra: true,
          },
        })
      );

      extraCollections.push(...data);
    } catch (error) {
      console.error("Ошибка при запросе дополнительных коллекций:", error);
    }
  };

  return {
    baseCollections,
    getBaseCollections,
    extraCollections,
    getExtraCollections,
    topCollection,
    getTopCollection,
  };
});

export default useCategoriesStore;
