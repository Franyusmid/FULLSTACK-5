// ./src/context/Pizza/BreakerState

import { useReducer } from "react"
import axios from "axios"

import BreakerContext from "./BreakerContext"
import BreakerReducer from "./BreakerReducer"

const BreakerState = (props) => {
  // 1. VALOR INICIAL
  const initialState = {
    breakers: [],
    breaker: {
      _id: "",
      idStripe: "",
      name: "",
      currency: "",
      prices: [],
      img: [""],
      description: "",
      slug: "",
    },
  }

  // 2. MANEJO DE REDUCERS (CAMBIOS EN EL ESTADO)
  const [globalState, dispatch] = useReducer(BreakerReducer, initialState)

  // 3. EVENTOS - DISPATCHERS

  // A. OBTENER TODAS LOS BREAKERS
  const getBreakers = async () => {
    const res = await axios.get("http://localhost:3005/api/v1/breakers/")
    console.log("res", res)
    const { data } = res
    const { data: dataBreakers } = data

    // VALIDACIONES DE ERRORES

    dispatch({
      type: "GET_BREAKERS",
      payload: dataBreakers,
    })
  }

  // B. OBTENER UNA SOLO BREAKERS
  const getBreaker = async (slug) => {
    const res = await axios.get(
      `http://localhost:3005/api/v1/breakers/readone/${slug}`
    )

    console.log(res)

    const { data } = res
    const { data: dataBreaker } = data

    dispatch({
      type: "GET_BREAKER",
      payload: dataBreaker,
    })
  }

  // 4. RETORNO - ARMADO DE ESTADO

  return (
    <BreakerContext.Provider
      value={{
        breakers: globalState.breakers,
        breaker: globalState.breaker,
        getBreakers,
        getBreaker,
      }}
    >
      {props.children}
    </BreakerContext.Provider>
  )
}

export default BreakerState
