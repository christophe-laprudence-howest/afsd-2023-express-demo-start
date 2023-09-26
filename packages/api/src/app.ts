// app.ts
import express, { Request, Response } from 'express'

// APP SETUP
const app = express(),
  port = process.env.PORT || 3000

// MIDDLEWARE
app.use(express.json()) // for parsing application/json

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
