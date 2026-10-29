'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import { useGetMe } from '@/features/auth/hooks';
import { useAppDispatch, useAppSelector } from '@/shared/hooks/useRedux';
import { tokenStorage } from '@/shared/lib/auth';
import { AUTH_PATHS } from '@/shared/config/paths.config';
import { selectIsLoading, setUser } from '@/shared/store';
import { LoadingPage } from '../loading-page';

export default function AppBootstrap({ children }: { children: React.ReactNode }) {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const globalLoading = useAppSelector(selectIsLoading);

  const [isHydrated, setIsHydrated] = useState(false);
  const [hasToken, setHasToken] = useState(false);

  useEffect(() => {
    const accessToken = tokenStorage.getAccess();
    setHasToken(!!accessToken);
    setIsHydrated(true);
  }, []);

  const { data, error, isPending } = useGetMe({
    enabled: isHydrated && hasToken
  });

  useEffect(() => {
    if (!isHydrated) return;

    if (!hasToken || error) {
      router.replace(
        `${AUTH_PATHS.SIGN_IN}?redirect=${encodeURIComponent(window.location.pathname)}`
      );
    }
  }, [isHydrated, hasToken, error, router]);

  useEffect(() => {
    if (data) {
      dispatch(setUser(data.data));
    }
  }, [data, dispatch]);

  const isAuthorized = isHydrated && hasToken && !!data && !error;

  if (!isHydrated || (hasToken && isPending)) {
    return <LoadingPage />;
  }

  if (!isAuthorized) {
    return <LoadingPage />;
  }

  return (
    <>
      {globalLoading && <LoadingPage />}
      {children}
    </>
  );
}
