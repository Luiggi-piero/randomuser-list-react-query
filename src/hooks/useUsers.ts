import { useInfiniteQuery } from "@tanstack/react-query";
import { fetchUsers } from "../services/user";
import { type User } from "../types.d";

/**
 * NOTA ✅
 * - Usar react-query es como tener un estado global, es decir, es como usar redux-toolkit o useContext
 * - Puedes compartir los datos del estado a varios lugares
 */

export const useUsers = () => {
    const { isLoading, isError, data, refetch, fetchNextPage, hasNextPage } =
        useInfiniteQuery<{ nextCursor?: number, users: User[] }>({
            queryKey: ['users'], // identifica al estado o la query que hacemos
            getNextPageParam: (lastPage) => lastPage.nextCursor, // indica de donde obtenemos el param de la pag
            queryFn: ({ pageParam }) => fetchUsers({ pageParam }), // como traer la informacion
            initialPageParam: 1,
            /**
             * refetchOnWindowFocus
             * - Para que no realice la peticon cuando se hace focus en 
             * la pag(la web, el usuario cambia de pestaña, regresa y hace
             * la peticion cuando refetchOnWindowFocus es true)
             * - Por defecto es true
             */
            refetchOnWindowFocus: false, 
            // staleTime: Indica cuando despues de cuando tiempo los datos seran consideradon antiguos
            staleTime: 1000 * 3, // 3 seg

        })

    return {
        isLoading,
        isError,
        users: data?.pages.flatMap(page => page.users) ?? [],
        refetch,
        fetchNextPage,
        hasNextPage
    }
}
