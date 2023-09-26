import { Request, Response, NextFunction } from 'express'

export const customHeader = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  res.header('Howest-header', 'MCT is the best!')

  next()
}
