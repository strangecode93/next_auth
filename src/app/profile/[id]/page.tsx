

const page = ({params}) => {
  return (
    <div className="flex flex-col min-h-screen items-center justify-center">
        <h1 className="text-3xl font-bold">Profile Page</h1>
        <h2 className="text-3xl font-bold text-blue-500">{params.id}</h2>
    </div>
  )
}

export default page