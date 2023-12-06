// 1.Importacion

import mongoose from "mongoose"

// 2.shema o equema

const breakerSchema = mongoose.Schema({
  idStripe: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  currency: {
    type: String,
    required: true,
  },
  prices: [
    {
      id: {
        type: String,
        required: true,
      },
      size: {
        type: String,
        required: true,
      },
      price: {
        type: Number,
        required: true,
      },
      priceDescription: {
        type: String,
        required: true,
      },
    },
  ],
  img: {
    type: Array,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  slug: {
    type: String,
    required: true,
    unique: true,
  },
})
// 3.Modelos
const Breaker = mongoose.model("Breaker", breakerSchema)

// 4.Expotacion

export default Breaker
