type UserListProps = {
  id: number
  name: string
}

async function fetchUsers(): Promise<UserListProps[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      return resolve([
        { id: 1, name: 'João' },
        { id: 2, name: 'Arthur' },
        { id: 3, name: 'Maria' },
      ])
    }, 4000)
  })
}

async function UserList() {
  const userList = await fetchUsers()

  return (
    <div className="mt-20 text-white">
      {userList.map((user) => (
        <p key={user.id}>{user.name}</p>
      ))}
    </div>
  )
}

export default function UserListPage() {
  return (
    <div>
      <h2>User List</h2>
      <UserList />
    </div>
  )
}
