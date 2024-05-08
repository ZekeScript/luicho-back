export const errorHandler = (error, requ, res, next) => {
  console.log(`error ${error.stack}`)
  const status = error.status || 500
  res.status(status).send({ msg: error.message })
}
