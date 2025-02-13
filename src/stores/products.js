import { reactive } from "vue";
import { defineStore } from "pinia";
import { readItems } from "@directus/sdk";
import directus from "@/services/directus";

const useProductsStore = defineStore("products", () => {
  const sizes = reactive([]);

  const getProductsByCollectionId = async (collectionId) => {
    try {
      let data = await directus.request(
        readItems("products_collections", {
          filter: {
            collections_id: { _eq: collectionId },
          },
          fields: [
            "products_id.id",
            "products_id.name",
            "products_id.images.directus_files_id",
          ],
        })
      );

      data = data.map((item) => item.products_id);
      data.forEach((item) => {
        item.image = item.images[0].directus_files_id;
        delete item.images;
      });

      return data;
    } catch (error) {
      console.error("Ошибка при запросе товаров:", error);
      return [];
    }
  };

  const getProductsBySlug = async (slug) => {
    try {
      let data = await directus.request(
        readItems("collections", {
          filter: {
            slug: { _eq: slug },
          },
          fields: ["id", "name"],
        })
      );

      if (!data.length) {
        return [];
      }

      const collectionId = data[0].id;
      const collectionName = data[0].name;

      const products = await getProductsByCollectionId(collectionId);
      return { collectionName, products };
    } catch (error) {
      console.error("Ошибка при запросе товаров по slug:", error);
      return [];
    }
  };

  const getProductByIdMin = async (productId) => {
    try {
      let data = await directus.request(
        readItems("products", {
          filter: {
            id: { _eq: productId },
          },
          fields: ["id", "name", "images.directus_files_id"],
        })
      );

      if (!data.length) {
        return {};
      }

      const product = data[0];
      product.image = product.images[0].directus_files_id;
      delete product.images;

      return product;
    } catch (error) {
      console.error("Ошибка при запросе товара по id:", error);
      return null;
    }
  };

  const getProductById = async (productId) => {
    try {
      let data = await directus.request(
        readItems("products", {
          filter: {
            id: { _eq: productId },
          },
          fields: [
            "name",
            "cost",
            "composition",
            "description",
            "images.directus_files_id",
            "colors.colors_id.id",
            "colors.colors_id.name",
            "colors.colors_id.color",
            "sizes.sizes_id.id",
            "sizes.sizes_id.ru_size",
            "sizes.sizes_id.main_size",
            "sizes.sizes_id.waist",
            "sizes.sizes_id.hip",
            "sizes.sizes_id.chest",
          ],
        })
      );

      if (!data.length) {
        return {};
      }

      const product = data[0];
      return product;
    } catch (error) {
      console.error("Ошибка при запросе товара по id:", error);
      return null;
    }
  };

  const getSizes = async () => {
    try {
      if (sizes.length > 0) return;
      let data = await directus.request(
        readItems("sizes", {
          fields: ["id", "ru_size", "main_size", "waist", "hip", "chest"],
        })
      );

      sizes.push(...data);
    } catch (error) {
      console.error("Ошибка при запросе размеров:", error);
      return [];
    }
  };

  return {
    getProductsByCollectionId,
    getProductsBySlug,
    getProductByIdMin,
    getProductById,
    sizes,
    getSizes,
  };
});

export default useProductsStore;
