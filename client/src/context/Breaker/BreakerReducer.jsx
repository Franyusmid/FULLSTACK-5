// ./src/context/PizzaReducer.jsx

const BreakerReducer = (globalState, action) => {
  switch (action.type) {
    case "GET_BREAKERS":
      return {
        ...globalState,
        breakers: action.payload,
      }

    case "GET_BREAKER":
      return {
        ...globalState,
        breaker: {
          ...globalState.breaker,
          ...action.payload,
        },
      }

    default:
      return globalState
  }
}

export default BreakerReducer
