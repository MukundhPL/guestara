
import { object, string, number, mixed,boolean} from 'yup'

const taxEnum = ["Luxury","GST","VAT","Service"]

export const CategorySchema = object({
    name : string().required("Name is required"),
    description : string().nullable(true),
    isTaxed : boolean().default(false),
    tax : number().default(0),
    image : string().matches(
            /((https?):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/, //URL Regex
            "Invalid Image Url"
        ).nullable(true).default(null),
    taxType : mixed().oneOf(taxEnum).default("GST")
})

export const SubcategorySchema = object({
    name : string().required("Name is required"),
    category_id : number("Invalid Category Id").integer("Invalid Category Id").positive("Invalid Category Id").required("Category Id is required"),
    description : string().nullable(true),
    isTaxed : boolean().default(false),
    tax : number().default(0),
    image : string().matches(
            /((https?):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/, //URL Regex
            "Invalid Image Url"
        ).nullable(true),
})

export const ItemSchema = object({
    
    category_id : number("Invalid Category Id").integer("Invalid Category Id").positive("Invalid Category Id").required("Category Id is required"),
    subcategory_id : number("Invalid Subcategory Id").integer("Invalid Subcategory Id").positive("Invalid Subcategory Id").nullable(true),
    name : string().required("Name is required"),
    description : string().nullable(true),
    isTaxed : boolean().default(false),
    tax : number().default(0),
    baseAmount: number().required("Base amount is required"),
    discount:number().default(0),
    image : string().matches(
            /((https?):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/, //URL Regex
            "Invalid Image Url"
        ).nullable(true),
})
