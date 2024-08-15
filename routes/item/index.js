import express from 'express'
const router = express()
import db from "../../db/index.js"
import {Item, Subcategory} from "../../db/schema.js"
import {eq,like} from "drizzle-orm"
import {ItemSchema} from "../../validation/index.js"

router.get('/',async (req,res) => {
    try{
        const data = await db.select().from(Item)
        res.json(data)
    }
    catch(err){
        console.log(err)
        res.status(500).send(err.message)
    }
})

router.get('/id/:id',async (req,res) => {
    try{
        const id = req.params.id
        const data = await db.select().from(Item).where(eq(Item.id,id))
        res.json(data)
    }
    catch(err){
        console.log(err)
        res.status(500).send(err.message)
    }
})
router.get('/name/:name',async (req,res) => {
    try{
        const name = req.params.name
        const data = await db.select().from(Item).where(eq(Item.name,name))
        res.json(data)
    }
    catch(err){
        console.log(err)
        res.status(500).send(err.message)
    }
})

router.get('/subcategory/:id',async (req,res) => {
    try{
        const subcategory_id = req.params.id
        const data = await db.select().from(Item).where(eq(Item.subcategory_id,subcategory_id))
        res.json(data)
    }
    catch(err){
        console.log(err)
        res.status(500).send(err.message)
    }
})

router.get('/category/:id',async (req,res) => {
    try{
        const category_id = req.params.id
        const data = await db.select().from(Item).where(eq(Item.category_id,category_id))
        res.json(data)
    }
    catch(err){
        console.log(err)
        res.status(500).send(err.message)
    }
})

router.get('/search/:name',async (req,res) => {
    try{
        const name = req.params.name
        const data = await db.select().from(Item).where(like(Item.name,`%${name}%`))
        res.json(data)
    }
    catch(err){
        console.log(err)
        res.status(500).send(err.message)
    }
})


router.post('/',async (req,res) => {
    try{
        const {id,...body} = req.body
        const item = await ItemSchema.validate(body) 
        console.log(item)
        if(item.subcategory_id){
            const subcategory = await db.query.Subcategory.findFirst({where:eq(item.subcategory_id,Subcategory.id)})
            
            if(!subcategory)throw new Error(`Subcategory does not exist`)
            if(subcategory.category_id!=item.category_id)throw new Error("Given category does not have given subcategory")
        }
        const data = await db.insert(Item).values({...item,totalAmount:(item.baseAmount-item.discount)}).returning()

        res.json(data)
    }
    catch(err){
        console.log(err)
        res.status(500).send(err.message)
    }
})

router.put('/',async (req,res) => {
    try{
        const {id,...body} = req.body
        if(!id)throw new Error(`Item id is required`)
        const original =await db.query.Item.findFirst({
            where:eq(id,Item.id)
        })
        if(!original)throw new Error(`Item does not exist`)
        for(const key in body){
            original[key]=body[key] //Updating vals in old entry based on data given
        }
        // console.log(original)
        const item = await ItemSchema.validate(original) //Validating
        if(!item.isTaxed)item.tax=0
        item.totalAmount=item.baseAmount-item.discount
        // console.log(item)

        if(item.subcategory_id){
            const subcategory = await db.query.Subcategory.findFirst({where:eq(item.subcategory_id,Subcategory.id)})
            if(!subcategory)throw new Error(`Subcategory does not exist`)
            console.log(subcategory.category_id)
            console.log(item.category_id)
            if(subcategory.category_id!=item.category_id)throw new Error("Given category does not have given subcategory")
        }
        
        const updated = await db.update(Item).set(item).where(eq(id,Item.id)).returning()

        res.json(updated)
    }
    catch(err){
        console.log(err)
        res.status(500).send(err.message)
    }
})
export default router