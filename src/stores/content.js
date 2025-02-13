import { defineStore } from "pinia";
import { reactive } from "vue";
import { readItems } from "@directus/sdk";

import directus from "@/services/directus";

const useContentStore = defineStore("content", () => {
  const topVideoSection = reactive({});
  const videoSections = reactive([]);

  const getTopVideo = async () => {
    try {
      if (Object.keys(topVideoSection).length) return;

      const data = await directus.request(
        readItems("video_sections", {
          fields: ["background_color", { video: ["id"] }],
          filter: {
            on_top: true,
          },
        })
      );

      if (data.length) {
        Object.assign(topVideoSection, data[0]);
      }
    } catch (error) {
      console.error("Ошибка при запросе hero-видео:", error);
    }
  };

  const getVideoSections = async () => {
    try {
      if (videoSections.length) return;
      const data = await directus.request(
        readItems("video_sections", {
          fields: ["background_color", { video: ["id"] }],
          filter: {
            on_top: false,
          },
        })
      );
      videoSections.push(...data);
    } catch (error) {
      console.error("Ошибка при запросе разделов с видео:", error);
    }
  };

  const getAboutContent = async () => {
    try {
      const data = await directus.request(
        readItems("text_content", {
          fields: ["content"],
          filter: {
            name: "about",
          },
        })
      );
      return data[0].content;
    } catch (error) {
      console.error("Ошибка при запросе текста о нас:", error);
    }
  };

  return {
    topVideoSection,
    videoSections,
    getTopVideo,
    getVideoSections,
    getAboutContent,
  };
});

export default useContentStore;
