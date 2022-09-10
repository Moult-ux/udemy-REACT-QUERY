import { AxiosResponse } from "axios";
import { useQuery } from "react-query";
import { queryClient } from "react-query/queryClient";

import type { User } from "../../../../../shared/types";
import { axiosInstance, getJWTHeader } from "../../../axiosInstance";
import { queryKeys } from "../../../react-query/constants";
import {
  clearStoredUser,
  getStoredUser,
  setStoredUser,
} from "../../../user-storage";

async function getUser(user: User | null): Promise<User | null> {
  if (!user) return null;
  const { data }: AxiosResponse<{ user: User }> = await axiosInstance.get(
    `/user/${user.id}`,
    {
      headers: getJWTHeader(user),
    }
  );
  return data.user;
}

interface UseUser {
  user: User | null;
  updateUser: (user: User) => void;
  clearUser: () => void;
}

export function useUser(): UseUser {
  const { data: user } = useQuery(queryKeys.user, () => getUser(user), {
    onSuccess: (received: User | null) => {
      if (!received) {
        clearStoredUser();
      } else {
        setStoredUser(received);
      }
    },
    initialData: getStoredUser,
  });

  // meant to be called from useAuth
  function updateUser(newUser: User): void {
    // TODO: update the user in the query cache
    queryClient.setQueryData(queryKeys.user, newUser);
  }

  // meant to be called from useAuth
  function clearUser() {
    // TODO: reset user to null in query cache
    queryClient.setQueryData(queryKeys.user, null);
    queryClient.removeQueries("User Appointments"); 
  }

  return { user, updateUser, clearUser };
}
