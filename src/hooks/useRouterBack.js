import { useRouter } from "vue-router";
import { routeHistory } from "@/router";

export default function useRouterBack() {
  const router = useRouter();

  return () => {
    if (routeHistory.previous) {
      router.back();
    } else {
      router.push("/");
    }
  };
}
