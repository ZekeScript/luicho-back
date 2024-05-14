import { Router } from 'express'

const router = Router()

router.get('/', (request, response) => {
  response.render('vista1')
})

router.get('/vista2', (request, response) => {
  response.render('vista2')
})

export default router
