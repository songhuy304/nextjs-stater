'use client';

import { IResetPasswordRequest } from '@/shared/services/auth/auth.type';
import { AUTH_PATHS } from '@/shared/config/paths.config';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import { useQueryState } from 'nuqs';
import { toast } from 'sonner';
import ResetPasswordForm from '../forms/reset-password-form';
import { useResetPassword } from '../hooks/useResetPassword';
import { ResetPasswordValues } from '../shemas';

const ResetPasswordViewPage = () => {
  const t = useTranslations();
  const [token] = useQueryState('token');
  const route = useRouter();
  const { mutate: resetPassword, isPending } = useResetPassword();

  const handleSubmit = (values: ResetPasswordValues) => {
    const payload: IResetPasswordRequest = {
      password: values.password,
      token: token || ''
    };

    resetPassword(payload, {
      onSuccess: () => {
        toast.success('Your password has been reset successfully.');
        route.replace(AUTH_PATHS.SIGN_IN);
      },
      onError(error) {
        toast.error(t(error.message));
      }
    });
  };

  return (
    <div className='w-full max-w-xs mx-auto flex flex-col items-center justify-center'>
      <h2 className='text-2xl font-bold mb-1'>Reset password</h2>

      <p className='text-muted-foreground text-sm text-center mb-8'>
        Enter your new password below.
      </p>

      <ResetPasswordForm onSubmit={handleSubmit} isPending={isPending} />
    </div>
  );
};

export { ResetPasswordViewPage };
