import express from 'express'
const router = express()
import db from "../../db/index.js"
import {Item, Subcategory} from "../../db/schema.js"
import {eq,and} from "drizzle-orm"
import {SubcategorySchema} from "../../validation/index.js"
router.get('/',async (req,res) => {
    try{
        const data = await db.select().from(Subcategory)
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
        const data = await db.select().from(Subcategory).where(eq(Subcategory.id,id))
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
        const data = await db.select().from(Subcategory).where(eq(Subcategory.name,name))
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
        const data = await db.select().from(Subcategory).where(eq(Subcategory.category_id,category_id))
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
        const subcategory = await SubcategorySchema.validate(body) 
        if(!subcategory.isTaxed)subcategory.tax=0
        const data = await db.insert(Subcategory).values(subcategory).returning()
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
        if(!id)throw new Error(`Subcategory id is required`)
        const original =await db.query.Subcategory.findFirst({
            where:eq(id,Subcategory.id)
        })
        if(!original)throw new Error(`Subcategory does not exist`)
        // console.log(body)
        const categoryIdChange = body.category_id?original.category_id!=body.category_id:false
        const originalCategoryId = original.category_id
        for(const key in body){
            original[key]=body[key] //Updating vals in old entry based on data given
        }
        // console.log(original)
        const subcategory = await SubcategorySchema.validate(original) //Validating
        console.log(subcategory)
        if(!subcategory.isTaxed)subcategory.tax=0
        
        const updated = await db.update(Subcategory).set({...subcategory}).where(eq(id,Subcategory.id)).returning()
        console.log(categoryIdChange)
        if(categoryIdChange){
            const updateItems = await db.update(Item).set({category_id:body.category_id}).where(and(eq(Item.category_id,originalCategoryId),eq(Item.subcategory_id,id)))
        }
        res.json(updated)
    }
    catch(err){
        console.log(err)
        res.status(500).send(err.message)
    }
})

export default router