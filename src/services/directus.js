import { staticToken, createDirectus, rest } from "@directus/sdk";

const API_URL = import.meta.env.VITE_API_URL;
const TOKEN = import.meta.env.VITE_DIRECTUS_TOKEN;
const directus = createDirectus(API_URL).with(rest()).with(staticToken(TOKEN));

export default directus;
