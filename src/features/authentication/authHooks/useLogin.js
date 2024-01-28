import toast from "react-hot-toast";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { login as loginApi } from "../../../services/apiAuth";
import { useNavigate } from "react-router-dom";

export function useLogin() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { mutate: login, isLoading } = useMutation({
    mutationFn: ({ email, password }) => loginApi({ email, password }),
    onSuccess: (user) => {
      toast.success("Logged in succesfsfully");

      // storing the current user to react query cached
      queryClient.setQueryData(["user"], user.user);

      navigate("/dashboard", { replace: true });
    },
    onError: (err) => {
      toast.error(err.message);
      console.log("Error from useLogin is: " + err);
    },
  });

  return { login, isLoading };
}
