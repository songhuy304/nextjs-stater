import { authService } from '@/shared/services';
import { ISignInRequest } from '@/shared/services/auth/auth.type';
import { useMutation } from '@tanstack/react-query';

const useSignIn = () => {
  const signInMutation = useMutation({
    mutationFn: (payload: ISignInRequest) => authService.signIn(payload)
  });

  return { ...signInMutation };
};

export { useSignIn };
