import { Dispatch, SetStateAction, useState } from "react";

import type { Staff } from "../../../../../shared/types";
import { axiosInstance } from "../../../axiosInstance";
import { queryKeys } from "../../../react-query/constants";
import { filterByTreatment } from "../utils";
import { useQuery } from "react-query";

async function getStaff(): Promise<Staff[]> {
  const { data } = await axiosInstance.get("/staff");
  return data;
}

interface UseStaff {
  staff: Staff[];
  filter: string;
  setFilter: Dispatch<SetStateAction<string>>;
}

export function useStaff(): UseStaff {
  // for filtering staff by treatment
  const [filter, setFilter] = useState("all");

  const emptyStaff = [];

  const { data: staff = emptyStaff } = useQuery(queryKeys.staff, getStaff, {
    select:
      filter === "all" ? undefined : (data) => filterByTreatment(data, filter),
  });

  return { staff, filter, setFilter };
}
