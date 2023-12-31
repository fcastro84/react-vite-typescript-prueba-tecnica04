import { SortedBy, User } from "../interfaces/types.d"

interface UsersListProp {
    sortingUser: User[]
    showColor: boolean
    deleteUser: ( email: string) => void
    changeSort: ( sort: SortedBy) => void
}

const Userslist = ( { sortingUser, showColor, deleteUser, changeSort  }: UsersListProp ) => {
  return (
    <main className='overflow-x-auto'>
          <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th className='font-black text-lg'>Foto</th>
              <th className='font-black text-lg cursor-pointer' onClick={() => changeSort(SortedBy.NAME)}>Nombre</th>
              <th className='font-black text-lg cursor-pointer' onClick={() => changeSort(SortedBy.LAST)}>Apellido</th>
              <th className='font-black text-lg cursor-pointer' onClick={() => changeSort(SortedBy.COUNTRY)}>País</th>
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
                      <button className="btn btn-primary btn-md" onClick={() => deleteUser(user.email)}>Borrar</button>
                    </th>
                </tr>
                )
              } )
            }
          </tbody>
      </table>
      </main>
  )
}

export default Userslist
