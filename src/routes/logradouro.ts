import { Logradouro } from './../models/Logradouro'
import { LogradouroController } from './../controllers/LogradouroController'
import { Request, Response, Router } from 'express'

const logradouroCtrl: LogradouroController = new LogradouroController()
export const logradouroRouter = Router()

logradouroRouter.get('/:cep', async (req: Request, res: Response) => {
  const { cep } = req.params
  const response = await logradouroCtrl.findByCep(cep)
  const status = response.message ? 400 : 200
  return res.status(status).json(response)
})
