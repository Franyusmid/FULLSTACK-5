// 1.Importacion

import mongoose from "mongoose"

// 2.shema o equema

const fuseSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  slug: {
    type: String,
    required: true,
    unique: true,
  },
  price: {
    type: Number,
    required: true,
  },
  Image: {
    type: String,
    required: false,
  },
  availability: {
    type: Boolean,
    default: true,
  },
})

// 3.Modelos
const Fuse = mongoose.model("Fuse", fuseSchema)

// 4.Expotacion

export default Fuse
