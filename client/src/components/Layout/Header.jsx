// ./src/components/Layout/Header.jsx
import { Link } from "react-router-dom"
import UserContext from "../../context/User/UserContext"
import { useContext, useEffect, useState } from "react"
import { Cart } from "react-bootstrap-icons"
import NavBar from "./../Header/NavBar"

function Header() {
  const [total, setTotal] = useState(0)

  const [user, setUser] = useState({
    name: "",
    lastname: "",
  })

  const userCtx = useContext(UserContext)

  const { cart, authStatus, currentUser, logoutUser, getCart } = userCtx

  useEffect(() => {
    if (currentUser) {
      const { name, lastname } = currentUser

      setUser({
        name,
        lastname,
      })
    }
  }, [currentUser])

  console.log(cart)

  useEffect(() => {
    const fetchCart = async () => {
      await getCart()
    }

    fetchCart()
  }, [currentUser])

  useEffect(() => {
    const getTotalProducts = () => {
      const totalQty = cart.reduce((acc, cv) => {
        return acc + cv.quantity
      }, 0)

      return totalQty
    }

    const totalQty = getTotalProducts()

    setTotal(totalQty)
  }, [cart])

  return (
    <div>
      <NavBar />
      <ul>
        <li>
          <Link to="/"></Link>
        </li>

        {authStatus ? (
          <>
            <p>
              Te damos la bienvenida, {user.name} {user.lastname}
            </p>
            <button onClick={logoutUser}>
              <Link to="/">Cerrar sesión</Link>
            </button>
            <p style={{ textDecoration: "underline" }}>
              <Link to="/carrito">
                <Cart style={{ marginRight: "8px" }} /> Tu carrito de compras:{" "}
                <span>{total}</span>
              </Link>
            </p>
          </>
        ) : (
          <>
            <li>
              <Link to="/registro"></Link>
            </li>
            <li>
              <Link to="/iniciar-sesion"></Link>
            </li>
          </>
        )}
      </ul>
    </div>
  )
}

export default Header
