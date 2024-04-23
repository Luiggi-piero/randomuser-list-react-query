import { useMemo, useState } from 'react'
import './App.css'
import { SortBy, type User } from './types.d'
import { UsersList } from './components/UsersList'
import { useUsers } from './hooks/useUsers'

function App() {
  const { isLoading, isError, users, refetch, fetchNextPage, hasNextPage } = useUsers()

  const [showColors, setShowColors] = useState(false)
  const [sorting, setSorting] = useState<SortBy>(SortBy.NONE)
  const [filterCountry, setFilterCountry] = useState<string | null>(null)

  const toggleColors = () => {
    setShowColors(!showColors)
  }

  const toggleSortByCountry = () => {
    const newSortingValue = sorting === SortBy.NONE ? SortBy.COUNTRY : SortBy.NONE
    setSorting(newSortingValue)
  }

  const handleReset = async () => {
    await refetch() // vuelve a pedir los datos
  }

  const handleDelete = (email: string) => {
    console.log('borrando', email);
    // filteredUsers.filter((user) => user.email !== email)
  }

  const handleChangeSort = (sort: SortBy) => {
    setSorting(sort)
  }

  // Primero se filtra luego se ordena

  // Arreglo de usuarios filtrados por pais
  const filteredUsers = useMemo(() => {
    // console.log('calculate fitered users');
    //     filterCountry !== null && filterCountry.length > 0
    return (typeof filterCountry === 'string' && filterCountry.length > 0)
      ? users.filter(user => {
        return user.location.country.toLowerCase().includes(filterCountry.toLowerCase())
      })
      : users
  }, [users, filterCountry])



  // sortedUsers: Arreglo de usuarios ordenados
  // toSorted: indica que quieres hacer una copia y un ordenamiento, devuelve un nuevo array
  // Cuando cambie filteredUsers o sortByCountry se volvera a ejecutar esta funcion
  // Guarda el valor de sortedUsers y no se vuelve a calcular entre renderizados
  // hasta que cambie filteredUsers o sortByCountry
  const sortedUsers = useMemo(() => {
    // console.log('calculate sortered users');

    if (sorting === SortBy.NONE) return filteredUsers
    // La otra forma de evaluar esta parte esta al final
    const compareProperties: Record<string, (user: User) => string> = {
      [SortBy.COUNTRY]: user => user.location.country,
      [SortBy.NAME]: user => user.name.first,
      [SortBy.LAST]: user => user.name.last
    }

    return filteredUsers.toSorted((a, b) => {
      // Metodo para extraer el valor de la propiedad sorting
      const extractProperty = compareProperties[sorting]
      return extractProperty(a).localeCompare(extractProperty(b))
    })
  }, [filteredUsers, sorting])


  return (
    <>
      <h1>Random Users</h1>
      <header>
        <button onClick={toggleColors}>
          Colorear filas
        </button>

        <button onClick={toggleSortByCountry}>
          {sorting === SortBy.COUNTRY ? 'No ordenar por país' : 'Ordenar por país'}
        </button>

        <button onClick={handleReset}>Resetear estado</button>

        <input
          type="text"
          placeholder='Filtra por país'
          onChange={(e) => { setFilterCountry(e.target.value) }}
        />
      </header>
      <main>
        {
          users.length > 0 &&
          <UsersList
            changeSorting={handleChangeSort}
            deleteUser={handleDelete}
            showColors={showColors}
            users={sortedUsers}
          />
        }

        {isLoading && <p>Cargando...</p>}

        {isError && <p>Ocurrió un error</p>}

        {!isLoading && !isError && users.length === 0 && <p>No hay usuarios</p>}

        {
          !isLoading && !isError && hasNextPage &&
          <button onClick={() => { fetchNextPage() }}>
            Cargar más resultados
          </button>
        }

        {
          !isLoading && !isError && !hasNextPage &&
          <p>No hay más resultados</p>
        }

      </main>
    </>
  )
}

export default App

/**
 * Paquetes
 * tanStack(react query): Maneja estados asincronos
 * otra opción tambien es useSWR
 * @tanstack/react-query-devtools: para revisar los estados(en este caso la peticion a users) usando react-query 
 */