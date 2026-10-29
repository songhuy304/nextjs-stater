import { tokenStorage } from '@/shared/lib/auth';
import { userService } from '@/shared/services';
import { QUERY_KEY } from '@/shared/config/query-keys';
import { useQuery } from '@tanstack/react-query';

interface UseGetMeOptions {
  enabled?: boolean;
}

const useGetMe = (options?: UseGetMeOptions) => {
  const accessToken = tokenStorage.getAccess();

  return useQuery({
    queryKey: [QUERY_KEY.USER.ROOT],
    queryFn: () => userService.getMe(),
    enabled: !!accessToken && options?.enabled,
    retry: 0
  });
};

export { useGetMe };
