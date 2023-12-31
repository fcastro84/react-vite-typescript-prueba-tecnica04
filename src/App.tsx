import { useEffect, useRef, useState } from 'react'
import './App.css'
import { fetchUsers } from './services/fetchUsers'
import { User } from './interfaces/types.d'

function App() {

  const [users, setUsers] = useState<User[]>([])
  const [showColor, setShowColor] = useState(false)
  const [sortCountry, setSortCountry] = useState(false)
  const [filterCountry, setFilterCountry] = useState('')
  const originalArray = useRef<User[]>([])

  const handleToogleColor = () => {
    setShowColor(!showColor)
  }

  const handleDeleteUser = ( email: string ) => {
    const newArray = users.filter( user => user.email !== email)
    setUsers(newArray)
  }

  const handleReset = () => {
    setUsers(originalArray.current)
  }

  
  const filterUser = filterCountry !== ''
                          ? users.filter( user => user.location.country.toLowerCase().includes(filterCountry.toLowerCase()))
                          : users

 

  const sortingUser = sortCountry
                          ? filterUser.toSorted((a: User,b:User) => a.location.country.localeCompare(b.location.country))
                          : filterUser

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
      <header className="navbar bg-neutral text-neutral-content justify-center p-10">
        <h1 className='text-center text-6xl'>Prueba Técnica</h1>
      </header>
      <nav className="menu menu-horizontal bg-white w-full border justify-center gap-4 p-4 mb-6">
        <button className='btn btn-outline btn-primary' onClick={handleToogleColor}>Colorear rows</button>
        <button className='btn btn-outline btn-primary' onClick={() => setSortCountry(!sortCountry)}>Ordenar por país</button>
        <button className='btn btn-outline btn-primary' onClick={handleReset}>Resetear estado</button>
        <input type="text" className='input input-bordered w-full max-w-xs' placeholder='Filtra por país' onChange={(e) => {setFilterCountry(e.target.value)}} />
      </nav>
      <main className='overflow-x-auto'>
          <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th className='font-black text-lg'>Foto</th>
              <th className='font-black text-lg'>Nombre</th>
              <th className='font-black text-lg'>Apellido</th>
              <th className='font-black text-lg'>País</th>
              <th className='font-black text-lg'>Acciones</th>
            </tr>
          </thead>
          <tbody className={showColor ? 'color-row' : ''}>
            {/* row 1 */}
            {
              sortingUser.map( user => {
                return (
                  <tr key={user.email}>
                    <td>
                      <div className="flex items-center gap-3">
                        <div className="avatar">
                          <div className="mask mask-squircle w-12 h-12">
                            <img src={user.picture.thumbnail} alt={user.name.title} />
                          </div>
                        </div>
                      </div>
                    </td>
                    <td>
                      {user.name.first}
                    </td>
                    <td>
                    {user.name.last}
                    </td>
                    <td>{user.location.country}</td>
                    <th>
                      <button className="btn btn-primary btn-md" onClick={() => handleDeleteUser(user.email)}>Borrar</button>
                    </th>
                </tr>
                )
              } )
            }
          </tbody>
      </table>
      </main>
    </>
  )
}

export default App
