import mongoose from 'mongoose'

const connectionString = 'mongodb://127.0.0.1:27017/product-back'

export const initMongoDB = async () => {
  try {
    await mongoose.connect(connectionString)
    console.log('Conectado a DB')
  } catch (error) {
    console.log(error)
  }
}
