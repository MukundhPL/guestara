import  {serial,varchar,pgTable,pgEnum,boolean,text,real,integer} from 'drizzle-orm/pg-core'
import {relations} from 'drizzle-orm' 


export const taxEnum = pgEnum("tax",["Luxury","GST","VAT","Service"])
export const Category = pgTable("Category",{
    id:serial("category_id").primaryKey(),
    name:varchar("categoryName").notNull(),
    description:text('description'),
    isTaxed:boolean("taxApplicability").default(false),
    tax:real("tax").default(0),
    image:text("image"),
    taxType:taxEnum("taxType").default("GST")
})

export const Subcategory = pgTable("Subcategory",{
    id:serial("subcategory_id").primaryKey(),
    category_id:integer("category_id").references(()=>Category.id,{onDelete:'cascade',onUpdate:'cascade'}).notNull(),
    name:varchar("subcategoryName").notNull(),
    description:text('description'),
    isTaxed:boolean("taxApplicability").default(false),
    tax:real("tax").default(0),
    image:text("image")
})

export const Item = pgTable("Items",{
    id:serial('item_id').primaryKey(),
    subcategory_id:integer("subcategory_id").references(()=>Subcategory.id,{onDelete:'cascade',onUpdate:'cascade'}),
    category_id:integer("category_id").references(()=>Category.id,{onDelete:'cascade',onUpdate:'cascade'}).notNull(),
    name:varchar("itemName").notNull(),
    description:text('description'),
    isTaxed:boolean("taxApplicability").default(false),
    tax:real("tax").default(0),
    baseAmount:real("baseAmount").notNull(),
    discount:real("discount").default(0),
    totalAmount:real("totalAmount").notNull(),
    image:text("image")
})

//Relations
//Used to tell ORM about foreign key relations. Check drizzle docs for more details
export const CategoryRelations = relations(Category,({many})=>{
    return { 
        subcategories:many(Subcategory),
        items:many(Item)
}})
export const SubcategoryRelations = relations(Subcategory,({one,many})=>{
    return { 
        subcategories:one(Category,{
            fields:[Subcategory.category_id],
            references:[Category.id]
        }),
        items:many(Item)
}})
export const ItemsRelations = relations(Item,({one,many})=>{
    return{ 
        category:one(Category,{
            fields:[Item.category_id],
            references:[Category.id]
        }),
        subcategory:one(Subcategory,{
            fields:[Item.subcategory_id],
            references:[Subcategory.id]
        }),
}})

