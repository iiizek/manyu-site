import { useRouter } from "vue-router";

export default function useRouterBack() {
  const router = useRouter();

  return () => {
    if (window.history.length > 1) {
      router.back();
    } else {
      router.push("/");
    }
  };
}
