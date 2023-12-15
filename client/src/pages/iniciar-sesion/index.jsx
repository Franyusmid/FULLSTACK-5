// ./src/pages/iniciar-sesion

import { useState, useContext } from "react"
import UserContext from "../../context/User/UserContext"
import Button from "../../components/Molecules/Button"
import { iniciarSesion } from "../../pages/iniciar-sesion/index"

function Login() {
  const [user, setUser] = useState({
    email: "",
    password: "",
  })

  const userCtx = useContext(UserContext)

  const { loginUser } = userCtx

  const handleChange = (event) => {
    setUser({
      ...user,
      [event.target.name]: event.target.value,
    })
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    return loginUser(user)
  }

  return (
    <div>
      <iniciarSesion handleChange={handleChange} />
      <form onSubmit={handleSubmit}>
        <div>
          <label>Correo electrónico</label>
          <input
            name="email"
            type="email"
            value={user.email}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Password</label>
          <input
            name="password"
            type="password"
            value={user.password}
            onChange={handleChange}
          />
        </div>

        <Button message="Iniciar sesión" icon="check" />
      </form>
    </div>
  )
}

export default Login
