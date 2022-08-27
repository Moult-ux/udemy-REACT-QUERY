import { useQuery, useQueryClient } from "react-query";

import type { Treatment } from "../../../../../shared/types";
import { axiosInstance } from "../../../axiosInstance";
import { queryKeys } from "../../../react-query/constants";

// for when we need a query function for useQuery
async function getTreatments(): Promise<Treatment[]> {
  const { data } = await axiosInstance.get("/treatments");
  console.log("getTreatments " + JSON.stringify(data));
  return data;
}

export function useTreatments(): Treatment[] {
  const defaultData = [];
  const { data = defaultData } = useQuery(queryKeys.treatments, getTreatments);

  console.log("use treatments " + JSON.stringify(data));
  return data;
}

export function usePrefetchTreatments() {
  const queryClient = useQueryClient();
  queryClient.prefetchQuery(queryKeys.treatments, getTreatments);
  console.log("prefecth");
}
