// ./src/pages/breakers/breaker/index.jsx
import { Link, useParams } from "react-router-dom"
import priceFormatter from "../../../lib/priceFormatter"
import useBreaker from "../../../hooks/useBreaker"

function BreakerPage() {
  const params = useParams()
  const { slug } = params
  console.log(params)

  // CUSTOM HOOK
  const { authStatus, cart, breaker, localPrices, handleChange, handleSubmit } =
    useBreaker(slug)

  const { name, currency, prices, img, description } = breaker

  // LOCALPRICES = {...PRICES, QUANTITY }
  console.log(localPrices)
  console.log(prices)

  const quantityOptions = [0, 1, 2, 3, 4, 5]

  return (
    <>
      <div>
        <img src={img[0]} />
        <h1>{name}</h1>
        <p>{description}</p>

        <form onSubmit={handleSubmit}>
          <ul>
            {prices.length !== 0 ? (
              <>
                {localPrices.map((element) => {
                  console.log(element)
                  const { price, size, priceDescription } = element

                  return (
                    <>
                      <li>
                        <h2>Tipo de precio por tamaño: {size}</h2>
                        <p>
                          Precio: {priceFormatter(price)} {currency}{" "}
                        </p>

                        {authStatus ? (
                          <select
                            type="option"
                            name={`${element.id}`}
                            data-breaker-name={name}
                            data-breaker-size={size}
                            data-breaker-pricedescription={priceDescription}
                            data-breaker-price={price}
                            data-breaker-img={img[0]}
                            data-breaker-slug={slug}
                            onChange={(evt) => {
                              handleChange(evt)
                            }}
                          >
                            {quantityOptions.map((qo) => {
                              return (
                                <>
                                  {qo === element.quantity ? (
                                    <option selected value={qo}>
                                      {qo}
                                    </option>
                                  ) : (
                                    <option value={qo}>{qo}</option>
                                  )}
                                </>
                              )
                            })}
                          </select>
                        ) : null}
                      </li>
                    </>
                  )
                })}
              </>
            ) : (
              "No hay precios disponibles"
            )}
          </ul>
          {authStatus ? (
            <button type="submit">
              {cart.length !== 0 ? "Modificar carrito" : "Agregar al carrito"}
            </button>
          ) : (
            <Link to="/iniciar-sesion">
              <button>Crea tu carrito con tu sesión</button>
            </Link>
          )}
        </form>
      </div>
    </>
  )
}

export default BreakerPage
