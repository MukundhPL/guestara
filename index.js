import express from 'express'
import 'dotenv/config'

const app = express()

const PORT = process.env.PORT||3500

app.use(express.urlencoded({extended:true}))
app.use(express.json())

import  categoryRouter from './routes/category/index.js'
app.use('/category',categoryRouter)
import subcategoryRouter from './routes/subcategory/index.js'
app.use('/subcategory',subcategoryRouter)
import itemRouter from './routes/item/index.js'
app.use('/item',itemRouter)

app.get('/',(req,res)=>res.send("Guestara server is live"))


app.listen(PORT,()=>console.log(`Running on Port : ${PORT}`))