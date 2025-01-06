import { useQuery } from "@tanstack/react-query"

const fetchData = async () => {
  const response = await fetch("https://jsonplaceholder.typicode.com/todos", {
    method: "GET",
  })
  if (!response.ok) {
    throw new Error("Network response was not ok")
  }
  return response.json()
}

function MyComponent() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["books"],
    queryFn: fetchData,
    networkMode: "offlineFirst"
  })

  if (isLoading) return <div>Loading...</div>
  if (isError) return <div>Error fetching data</div>

  return (
    <div>
      {data.map((todo: any) => (
        <div key={todo.id}>
          <h2>{todo.title}</h2>
          <p>{todo.completed ? "Completed" : "Not completed"}</p>
        </div>
      ))}
    </div>
  )
}

export default function About() {
  return (
    <div>
      <h1>About</h1>
      <MyComponent />
      <MyComponent />
      <MyComponent />
      <MyComponent />
      <MyComponent />
    </div>
  )
}

