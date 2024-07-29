import { Schema, model } from 'mongoose'

const ProductSchema = new Schema({
  title: { type: String, require: true },
  description: { type: String },
  code: { type: String },
  price: { type: Number, require: true },
  status: { type: Boolean },
  stock: { type: Number, require: true },
  category: { type: String },
  thumbnail: { type: String }
})

export const ProductModel = model(
  'product',
  ProductSchema
)
