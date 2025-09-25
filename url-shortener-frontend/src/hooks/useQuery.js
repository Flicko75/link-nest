import { useQuery } from "@tanstack/react-query";
import api from "../api/api";

export const useFetchTotalClicks = (token, onError) => {
  return useQuery({
    queryKey: ["url-totalclick", token], 
    queryFn: async () => {
      const res = await api.get(
        "/api/url/totalClicks?startDate=2025-01-01&endDate=2025-11-01",
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return res;
    },
    select: (data) =>
      Object.keys(data.data).map((key) => ({
        clickDate: key,
        count: data.data[key],
      })),
    onError,
    staleTime: 5000,
  });
};
