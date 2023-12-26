import { useState } from "react"
import "../styles/ProductsCreate.css"
import { useProductContext } from "../Components/ProductContext"
import { Link } from "react-router-dom"

export default function CreateProduct(){
    const [productId, setProductId] = useState(crypto.randomUUID())
    const [productName, setProductName] = useState('')
    const [price, setPrice] = useState('')
    const [description, setDescription] = useState('')
    const [image, setImage] = useState('')
    const {dispatch} = useProductContext()

    
    function handleSubmit(event){
        event.preventDefault()

        const newProduct = {
            productId,
            productName,
            price,
            description,
            image
        }

        dispatch({ type: 'ADD_PRODUCT', payload:newProduct})
    }

    return(
        <>
            <div>
                <h1 style={{textAlign:'center', fontSize:'50px', margin:'50px'}}>CREATE PRODUCT</h1>
                <form onSubmit={handleSubmit} className="form-Create">
                    <label className="label-Create">
                        <h1>ID Product</h1>
                        <input
                            type="text"
                            placeholder="Name Product"
                            value={productId}
                            className="input-Create"
                        />
                    </label>
                    <label className="label-Create">
                        <h1>Name Product</h1>
                        <input
                            type="text"
                            placeholder="Name Product"
                            value={productName}
                            className="input-Create"
                            onChange={(event)=>{
                                setProductName(event.target.value)
                            }}/>
                    </label>
                    <label className="label-Create">
                        <h1>Price</h1>
                        <input
                            type="number"
                            placeholder="Price"
                            value={price}
                            className="input-Create"
                            onChange={(event)=>{
                                setPrice(event.target.value)
                            }}/>
                    </label>
                    <label className="label-Create">
                        <h1>Description</h1>
                        <textarea
                            type="text"
                            placeholder="Description"
                            value={description}
                            onChange={(event)=>{
                                setDescription(event.target.value)
                            }}/>
                    </label>
                    <label className="label-Create">
                        <h1>Image</h1>
                        <input
                            type="file"
                            placeholder="Image"
                            value={image}
                            className="input-Create"
                            onChange={(event)=>{setImage(event.target.value)}}/>
                    </label>
                    <label className="label-Create">
                        <button type="submit" className="btn-Create">ADD PRODUCT</button>
                    </label>
                    <Link to='/products' style={{marginLeft:'37%', marginRight:'29%'}}>VIEW PRODUCTS</Link>
                </form>
            </div>
        </>
    )
}