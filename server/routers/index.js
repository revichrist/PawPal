const router = require('express').Router()
const userRouter = require('./userRouter')
const petRouter = require('./petRouter')
const { errorHandler } = require('../middlewares')


router.get('/', async (request, response, next)=>{
  try {
    response.status(200).json('iProject euy mantab')
  } catch (error) {
    next(error)
  }
})

router.use('/', userRouter)
router.use('/pet', petRouter)
router.use(errorHandler);


module.exports = router
