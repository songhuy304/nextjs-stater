import { useAppDispatch } from '@/shared/hooks/useRedux';
import { AUTH_PATHS } from '@/shared/config/paths.config';
import { logout } from '@/shared/store/slices/auth.slice';
import { useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

export function useLogout() {
  const dispatch = useAppDispatch();
  const queryClient = useQueryClient();
  const router = useRouter();

  const handleLogout = () => {
    dispatch(logout());
    queryClient.clear();
    router.replace(AUTH_PATHS.SIGN_IN);
  };

  return () => {
    handleLogout();
  };
}
