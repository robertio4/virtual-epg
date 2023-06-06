import useSWR from "swr";
import { Channel } from "../types";

type ResponseDataEpg = {
  channels: Channel[];
  isLoading: boolean;
  isError: boolean;
};

const fetcher = (url: string) =>
  fetch(url).then((res) => {
    return res.json();
  });

const useDataEpg = (): ResponseDataEpg => {
  const url = import.meta.env.VITE_API_HOST + import.meta.env.VITE_API_PATH;

  const { data, error, isLoading } = useSWR(url, fetcher);

  return {
    channels: data?.channels || [],
    isLoading,
    isError: error,
  };
};

export default useDataEpg;
