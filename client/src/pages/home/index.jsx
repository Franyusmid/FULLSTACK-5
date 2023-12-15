// ./src/pages/home/index.jsx

import { Link } from "react-router-dom"
import { useQuery } from "../../hooks/useQuery"
import { useContext, useEffect } from "react"

import toast from "react-hot-toast"
import UserContext from "../../context/User/UserContext"

function notify(message) {
  toast(message)
}

function Home() {
  const { editCart } = useContext(UserContext)

  const query = useQuery()
  console.log(query)

  const status = query.get("status")
  console.log(status)

  useEffect(() => {
    console.log(status)
    if (status === "successful") {
      notify("Pago realizado con éxito.")
      editCart([])
    }
  }, [])

  return (
    <div>
      <ul>
        <li>
          <Link to="/breakers">Protecciones Electricas</Link>
        </li>
      </ul>
    </div>
  )
}

export default Home
