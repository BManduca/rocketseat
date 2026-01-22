import { useQuery } from "@tanstack/react-query"
import { fetcher } from "@/helpers/api"
import type { User } from "@/models/user"

export default function useUsers() {
  const { data, isLoading } = useQuery<User[]>({
    queryKey: ["users"],
    queryFn: () => fetcher("/users"),
  })

  return {
    users: data || [],
    isLoadingUsers: isLoading,
  }
}
