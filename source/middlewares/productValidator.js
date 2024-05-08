export const productValidator = (request, response, next) => {
  if (
    request.body.title === undefined ||
    request.body.description === undefined ||
    request.body.code === undefined ||
    request.body.price === undefined ||
    request.body.stock === undefined ||
    request.body.category === undefined
  ) {
    response.status(404).json({ msg: 'invalid body' })
  } else {
    next()
  }
}
