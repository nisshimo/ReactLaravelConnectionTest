import {
  ApiSet,
  BaseResponse,
  IndexApiSet,
  useDeleteApi,
  useDownloadApi,
  useIndexApi,
  usePostApi,
  usePutApi,
  useShowApi,
} from "utils/network/api_hooks";
import { Form, useEffectSkipFirst } from "utils/hooks";
import { HttpClient } from "../utils/network/axios";

import { User, UserForm, UserSearchForm } from "entities/user";
import { PagingResponse } from "entities";

type UsersResponse = PagingResponse & {
  results: User[];
};

export function useFetchUsersApi(
  searchForm?: Form<UserSearchForm>
): IndexApiSet<UsersResponse> & { execute: () => void } {
  const apiPath = "users/";
  const api = useIndexApi<UsersResponse>(new HttpClient(), {
    initialResponse: { count: 0, results: [] },
    initialState: {
      page: searchForm?.object?.page || 1,
      perPage: searchForm?.object?.perPage || 100000000,
    },
  });

  const execute = (): void => {
    api.execute(apiPath);
  };

  return { ...api, execute: execute };
}

export type UserResponse = BaseResponse & {
  user: User;
};

export function useFetchUserApi(): ApiSet<UserResponse> & {
  execute: (id: number) => void;
} {
  const api = useShowApi<UserResponse>(new HttpClient(), {
    initialResponse: { user: {} },
  });

  const execute = (id: number): void => {
    const apiPath = `users/${id}/`;
    api.execute(apiPath);
  };

  return {
    ...api,
    isSuccess: () => !api.loading && !api.isError,
    execute: execute,
  };
}

export function useFetchLoginUserApi(): IndexApiSet<UserResponse> & {
  execute: () => void;
} {
  const apiPath = "users/login_user/";
  const api = useIndexApi<UserResponse>(new HttpClient(), {
    initialResponse: { user: {} },
  });

  const execute = (): void => {
    api.execute(apiPath);
  };

  return { ...api, execute: execute };
}
