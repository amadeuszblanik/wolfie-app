import { useMutation } from "@tanstack/react-query";
import { ApiService } from "@/service";
import ApiAuthResetPasswordPutPayload from "@/model/api-auth-reset-password-put.model";

const useHook = () => {
  const {
    mutate,
    data: rawData,
    isPending,
    isSuccess,
    isError,
  } = useMutation({
    mutationFn: ({ token, password }: Partial<ApiAuthResetPasswordPutPayload>) =>
      new ApiService().auth.resetPassword.put(new ApiAuthResetPasswordPutPayload({ token, password })),
  });

  const data = rawData?.data;
  const error = rawData?.error;

  return { mutate, data, error, isPending, isSuccess, isError };
};

export default useHook;
