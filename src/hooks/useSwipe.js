import { ref } from "vue";

const useSwipe = (
  threshold = 100,
  orientation = "clientY",
  callback = () => {}
) => {
  const touchStart = ref(0);
  const touchEnd = ref(0);

  const swipeStart = (event) => {
    touchStart.value = event.touches[0][orientation];
  };

  const swipeMove = (event) => {
    touchEnd.value = event.touches[0][orientation];
  };

  const swipeEnd = () => {
    if (touchEnd.value - touchStart.value > threshold) {
      callback();
    }
  };

  return {
    swipeStart,
    swipeMove,
    swipeEnd,
  };
};

export default useSwipe;
