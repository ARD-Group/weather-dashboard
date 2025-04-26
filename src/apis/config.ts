export const getToken = (): string => {
  const accessToken = localStorage.getItem("core-access-token") ?? undefined;

  return accessToken ? `Bearer ${accessToken}` : "";
};
