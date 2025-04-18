import { useParams } from "react-router"


const Details = () => {
  const {name} = useParams()
  return (
    <div>Details for :{name}</div>
  )
}

export default Details