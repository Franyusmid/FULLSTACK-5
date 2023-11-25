import mongoose from "mongoose"

const ProdUrl =
  "mongodb+srv://analistacost:LU065nOM6V0q4Tbd@almacenelectrico-db.phwwnyk.mongodb.net/"
const LocalUrl = "mongodb://localhost:27017/"
const connectDB = async () => {
  try {
    // local:mongodb://localhost:27017/
    // PROD:mongodb+srv://analistacost:LU065nOM6V0q4Tbd@almacenelectrico-db.phwwnyk.mongodb.net/
    /* EL COACH MIKE SE CONECTO URL LOCAL PERO NOSOTROS NOS CONECTAMOS A LA DE PRODUCCION */
    await mongoose.connect(ProdUrl + "{AlmacenElectrico-db}")
    console.log("Base de datos conectada.")
  } catch (error) {
    console.log(error)
    process.emit(1)
    /* es comadndo sirve para detener el proceso en saco que se muestre el error y no agotar recursos */
  }
}

export default connectDB
