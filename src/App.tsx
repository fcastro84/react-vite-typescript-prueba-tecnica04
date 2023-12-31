import { useEffect, useMemo, useRef, useState } from 'react'
import './App.css'
import { fetchUsers } from './services/fetchUsers'
import { SortedBy, User } from './interfaces/types.d'
import Userslist from './components/Userslist'

function App() {

  const [users, setUsers] = useState<User[]>([])
  const [showColor, setShowColor] = useState(false)
  const [sorting, setSorting] = useState<SortedBy>(SortedBy.NONE)
  const [filterCountry, setFilterCountry] = useState('')
  const originalArray = useRef<User[]>([])

  const handleToogleColor = () => {
    setShowColor(!showColor)
  }

  const handleToogleSortByCountry = () => {
    const sort = ( sorting === SortedBy.NONE || sorting === SortedBy.LAST || sorting === SortedBy.NAME) ? SortedBy.COUNTRY : SortedBy.NONE 
    setSorting(sort)
  }

  const handleSort = (sort: SortedBy) => {
    setSorting(sort)
  }

  const handleDeleteUser = ( email: string ) => {
    const newArray = users.filter( user => user.email !== email)
    setUsers(newArray)
  }

  const handleReset = () => {
    setUsers(originalArray.current)
  }
  
  const filterUser = useMemo(() => {
    return filterCountry !== '' && filterCountry.length > 0
                          ? users.filter( user => user.location.country.toLowerCase().includes(filterCountry.toLowerCase()))
                          : users
  }, [users, filterCountry])

 

  const sortingUser = useMemo(() => {
    
    //Variante 1
    // if( sorting === SortedBy.NONE) return filterUser

    // if( sorting === SortedBy.NAME){
    //   return filterUser.toSorted((a: User,b:User) => a.name.first.localeCompare(b.name.first))
    // }

    // if( sorting === SortedBy.LAST){
    //   return filterUser.toSorted((a: User,b:User) => a.name.last.localeCompare(b.name.last))
    // }

    // if( sorting === SortedBy.COUNTRY){
    //   return filterUser.toSorted((a: User,b:User) => a.location.country.localeCompare(b.location.country))
    // }

    //Variante 2
    // switch (sorting) {
    //   case SortedBy.NAME: {
    //     return filterUser.toSorted((a: User,b:User) => a.name.first.localeCompare(b.name.first))
    //   }
    //   case SortedBy.LAST: {
    //     return filterUser.toSorted((a: User,b:User) => a.name.last.localeCompare(b.name.last))
    //   }
    //   case SortedBy.COUNTRY: {
    //     return filterUser.toSorted((a: User,b:User) => a.location.country.localeCompare(b.location.country))
    //   }
    //   default:
    //     return filterUser
    // }

    //Variante 3 Midulive
    if( sorting === SortedBy.NONE) return filterUser

    const compareProperties: Record<string, (user: User) => string> = {
      [SortedBy.COUNTRY]: user => user.location.country,
      [SortedBy.NAME]: user => user.name.first,
      [SortedBy.LAST]: user => user.name.last
    }

    return filterUser.toSorted( (a, b) => {
      const extractProperty = compareProperties[sorting]
      return extractProperty(a).localeCompare(extractProperty(b))
    })
   
  }, [sorting, filterUser] )

  useEffect(() => {
    fetchUsers()
      .then(data => {
        setUsers(data)
        originalArray.current = data
      })
      .catch(console.log)
  }, [])
  
   
  return (
    <>
      <header className="navbar bg-neutral text-neutral-content justify-center p-10 flex-col gap-4">
        <h1 className='text-center text-6xl'>Prueba Técnica (React + TypeScript)</h1>
        <p className='text-lg'>El objetivo de esta prueba técnica es crear una aplicación similar a la que se proporciona en este <a href="https://midu-react-11.surge.sh/" target='_blank' className='link ml-3 font-extrabold'> EXAMPLE </a> </p>
      </header>
      <nav className="menu menu-horizontal bg-white w-full border justify-center gap-4 p-4 mb-6">
        <button className='btn btn-outline btn-primary' onClick={handleToogleColor}>Colorear rows</button>
        <button className='btn btn-outline btn-primary' onClick={handleToogleSortByCountry}>Ordenar por país</button>
        <button className='btn btn-outline btn-primary' onClick={handleReset}>Resetear estado</button>
        <input type="text" className='input input-bordered w-full max-w-xs' placeholder='Filtra por país' onChange={(e) => {setFilterCountry(e.target.value)}} />
      </nav>
      <Userslist sortingUser={sortingUser} showColor={showColor} deleteUser={handleDeleteUser} changeSort={handleSort} />
    </>
  )
}

export default App
