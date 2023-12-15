// ./src/pages/breaker/index.jsx
import { useContext, useEffect } from "react"
import BreakerContext from "../../context/Breaker/BreakerContext"
import { Link } from "react-router-dom"

function BreakersPage() {
  // TRAERME LOS DATOS DE LOS BREAKER DEL SERVER
  const breakerCtx = useContext(BreakerContext)
  console.log("breakerCtx", breakerCtx)

  const { breakers, getBreakers } = breakerCtx

  useEffect(() => {
    getBreakers()
  }, [])

  return (
    <>
      <div>
        <ul>
          {breakers.length !== 0
            ? breakers.map((breaker, i) => {
                const { name, slug } = breaker

                return (
                  <Link key={i} to={`/breakers/${slug}`}>
                    <li>{name}</li>
                  </Link>
                )
              })
            : "No hay protecciones disponibles"}
        </ul>
      </div>
    </>
  )
}

export default BreakersPage
