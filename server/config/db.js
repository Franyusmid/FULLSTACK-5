import mongoose from "mongoose"

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.BASE_URL_DB_PRODUCTION)
    console.log("Base de datos conectada.")
  } catch (error) {
    console.log(error)
    process.emit(1)
    /* es comadndo sirve para detener el proceso en saco que se muestre el error y no agotar recursos */
  }
}

export default connectDB
