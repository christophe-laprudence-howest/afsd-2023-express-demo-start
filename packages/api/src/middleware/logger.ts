import { Request, Response, NextFunction } from 'express'

export const myLogger = (req: Request, res: Response, next: NextFunction) => {
  console.log('Request logged!')
  console.log(`Request method: ${req.method}`)
  console.log(`Request path: ${req.path}`)
  next()
}
