import AuthStore from "../mobx/AuthStore";

export const testResponse = async () => {
  fetch(process.env.NEXT_BACKEND_URL || "localhost:3000", {
    method: "post",
    headers: await AuthStore.getAuthHeader(),
    body: JSON.stringify({A:"a",B:"b"})
  });
};
