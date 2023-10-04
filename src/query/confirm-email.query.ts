import { useMutation } from "@tanstack/react-query";
import { ApiService } from "@/service";
import ApiAuthConfirmEmailPostPayload from "@/model/api-auth-confirm-email-post.model";

const useHook = () => {
  const {
    mutate,
    data: rawData,
    isPending,
    isSuccess,
    isError,
  } = useMutation({
    mutationFn: (token: string) =>
      new ApiService().auth.confirmEmail.post(new ApiAuthConfirmEmailPostPayload({ token })),
  });

  const data = rawData?.data;
  const error = rawData?.error;

  return { mutate, data, error, isPending, isSuccess, isError };
};

export default useHook;
