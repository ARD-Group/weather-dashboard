import { signUp } from "../api/adapter";
import { SignUpResponse } from "../api/types";
import { useQuery } from "@tanstack/react-query";
// export const useSignUp = (email: string, password: string, name: string) => {
//   const { data = null, isLoading } = useQuery<SignUpResponse>({
//     queryKey: ["signUp", email, password, name],
//     queryFn: () => signUp({ email, password, name }),
//   });
//   return { data, loading: isLoading };
// };
