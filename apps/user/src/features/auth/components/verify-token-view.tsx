'use client';

import { useAppDispatch } from '@/shared/hooks/useRedux';
import { tokenStorage } from '@/shared/lib/auth';
import { AUTH_PATHS } from '@/shared/config/paths.config';
import { Spinner } from '@repo/ui/components/ui/spinner';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { toast } from 'sonner';
import { useVerifyToken } from '../hooks/useVerifyToken';

interface IVerifyTokenViewProps {
  token: string;
}

const VerifyTokenView = ({ token }: IVerifyTokenViewProps) => {
  const t = useTranslations();
  const { mutate, isPending } = useVerifyToken();
  const dispatch = useAppDispatch();
  const route = useRouter();

  useEffect(() => {
    if (token) {
      mutate(
        { token },
        {
          onSuccess(data) {
            const { accessToken, refreshToken } = data.data;
            tokenStorage.setTokens({ accessToken, refreshToken });
            route.push('/');
          },
          onError(error) {
            toast.error(t(error.message) || 'Failed to verify token');
            route.push(AUTH_PATHS.SIGN_IN);
          }
        }
      );
    }
  }, [token, mutate]);

  if (isPending) {
    return <Spinner />;
  }
};

export { VerifyTokenView };
