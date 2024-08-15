import express from 'express'
const router = express()
import db from "../../db/index.js"
import {Category} from "../../db/schema.js"
import {eq} from "drizzle-orm"
import {CategorySchema} from "../../validation/index.js"

router.get('/',async (req,res) => {
    try{
        const data = await db.select().from(Category)
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
        const data = await db.select().from(Category).where(eq(Category.id,id))
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
        const data = await db.select().from(Category).where(eq(Category.name,name))
        res.json(data)
    }
    catch(err){
        console.log(err)
        res.status(500).send(err.message)
    }
})

router.post('/',async(req,res)=>{
    try{
        const {id,...body} = req.body
        const category = await CategorySchema.validate(body) 
        if(!category.isTaxed)category.tax=0
        console.log(category)
        const data = await db.insert(Category).values(category).returning()
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
        if(!id)throw new Error(`Category id is required`)
        const original =await db.query.Category.findFirst({
            where:eq(id,Category.id)
        })
        if(!original)throw new Error(`Category does not exist`)
        for(const key in body){
            original[key]=body[key] //Updating vals in old entry based on data given
        }
        console.log(original)
        const category = await CategorySchema.validate(original) 
    
        if(!category.isTaxed)category.tax=0
        
        const updated = await db.update(Category).set(category).where(eq(id,Category.id)).returning()

        res.json(updated)
    }
    catch(err){
        console.log(err)
        res.status(500).send(err.message)
    }
})
export default router