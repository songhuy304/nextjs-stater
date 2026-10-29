import { authService } from '@/shared/services';
import { IForgotPasswordRequest } from '@/shared/services/auth/auth.type';
import { useMutation } from '@tanstack/react-query';

const useForgotPassword = () => {
  const forgotPasswordMutation = useMutation({
    mutationFn: (payload: IForgotPasswordRequest) => authService.forgotPassword(payload)
  });

  return { ...forgotPasswordMutation };
};

export { useForgotPassword };
