'use client';

import { AUTH_PATHS } from '@/shared/config/paths.config';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import SignUpForm from '../forms/sign-up.form';
import { useSignup } from '../hooks';
import { SignUpFormValues } from '../shemas';

export default function SignUpViewPage() {
  const t = useTranslations();
  const router = useRouter();
  const { mutate: signupMutation, isPending } = useSignup();

  const handleSignUp = (values: SignUpFormValues) => {
    signupMutation(values, {
      onSuccess: () => {
        toast.success(t('SignUp.sign-up-success'));
        router.push(AUTH_PATHS.SIGN_IN);
      },
      onError: (error) => {
        toast.error(t(error.message));
      }
    });
  };

  return (
    <div className='flex flex-col items-center justify-center'>
      <h2 className='text-2xl font-bold mb-1'>{t('SignUp.title')}</h2>
      <p className='text-muted-foreground text-sm text-center mb-8'>{t('SignUp.description')}</p>
      <SignUpForm onSubmit={handleSignUp} isPending={isPending} />
    </div>
  );
}
