// app.ts
import express, { Request, Response } from 'express'
import { myLogger } from './middleware/logger'
import { customHeader } from './middleware/header'
import * as dotenv from 'dotenv'
import 'reflect-metadata'
import { DataSource } from 'typeorm'
import { Shop } from './entitities/shop'

dotenv.config()

const AppDataSource = new DataSource({
  type: 'mongodb',
  url: 'mongodb://localhost:27028/shop',
  entities: [Shop],
  synchronize: true,
  useUnifiedTopology: true,
  useNewUrlParser: true,
})
AppDataSource.initialize()
  .then(() => {
    // here you can start to work with your database
    console.log('Connected to database')
    const shopRepository = AppDataSource.getRepository(Shop)
    // APP SETUP
    const app = express(),
      port = process.env.PORT || 3000

    // MIDDLEWARE
    app.use(express.json()) // for parsing application/json
    app.use(myLogger)
    app.use(customHeader)

    // ROUTES
    app.get('/', (request: Request, response: Response) => {
      response.send(`Welcome, just know: you matter!`)
    })

    // temp_store
    const shopList = ['Maxi Zoo', 'Zooplius', 'Tom & Co']

    app.get('/shop', (req: Request, res: Response) => {
      res.send(shopList)
    })

    app.get('/shop/:myShopId', (req: Request, res: Response) => {
      const id: number = parseInt(req.params.myShopId)
      console.log(`id: ${id}`)
      res.send({ shop: shopList[id] })
    })

    app.post('/shop', (req: Request, res: Response) => {
      const shop = req.body
      const shopName = shop.name
      shopList.push(shopName)
      res.send({ shop: shopName })
    })

    // APP START
    app.listen(port, () => {
      console.info(`\nServer 👾 \nListening on http://localhost:${port}/`)
    })
  })
  .catch(error => console.log(error))
