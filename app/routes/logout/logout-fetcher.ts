import { useFetcher } from "@remix-run/react";

export const useLogoutFetcher = () => {
  const fetcher = useFetcher({
    key: "logout",
  });
  const logout = () => {
    fetcher.submit(null, {
      method: "post",
      action: "/logout",
    });
  };

  return {
    logout,
  };
};
