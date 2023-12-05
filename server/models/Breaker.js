// 1.Importacion

import mongoose from "mongoose"

// 2.shema o equema

const breakerSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
})
// 3.Modelos
const Breaker = mongoose.model("Breaker", breakerSchema)

// 4.Expotacion

export default Breaker
