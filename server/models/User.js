// 1.Importacion

import mongoose from "mongoose"

// 2.shema o equema

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
})

// 3.Modelos
const User = mongoose.model("user", userSchema)

// 4.Expotacion

export default User
