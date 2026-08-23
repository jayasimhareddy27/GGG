export const loadOrderState = () => {
  if (typeof window === "undefined") return undefined;
  try {
    const serialized = localStorage.getItem("draftOrder");
    return serialized ? JSON.parse(serialized) : undefined;
  } catch (error) {
    console.error("Could not load order state:", error);
    return undefined;
  }
};

export const saveOrderState = (currentOrder) => {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem("draftOrder", JSON.stringify(currentOrder));
  } catch (error) {
    console.error("Could not save order state:", error);
  }
};

export const clearOrderState = () => {
  if (typeof window === "undefined") return;
  try {
    localStorage.removeItem("draftOrder");
  } catch (error) {
    console.error("Could not clear order state:", error);
  }
};