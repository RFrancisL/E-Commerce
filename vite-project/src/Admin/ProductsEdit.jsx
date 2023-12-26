import {useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom";
import '../styles/ProductsEdit.css'
export default function EditProduct(){
    const {id} = useParams()
    const [title, setTitle] = useState('');
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState(null);
    
    useEffect(() => {
        fetch(`https://api.escuelajs.co/api/v1/products/${id}`)
            .then((res) => {
                if(!res.ok){
                    throw new Error('ERROR RESPONSE')
                }
                return res.json() 
            })
            .then((data) => {
                setTitle(data.title)
                setPrice(data.price)
                setDescription(data.description)
            })
            .catch((error) => {
                console.log(error)
            })
    }, [id])

    const handleFileChange = (event) => {
        const file = event.target.files[0]; // Obtener el archivo seleccionado
        setImage(file); // Establecer el archivo en el estado
    }

    const handleSubmit = (event) => {
        event.preventDefault();

        const updateProduct = {
            title: title,
            price: price,
            description: description,
            image: image
        }

        fetch(`https://api.escuelajs.co/api/v1/products/${id}`,{
            method: 'PUT',
            headers: {
                'Content-Type':'application/json'
            },
            body: JSON.stringify(updateProduct)
        })
            .then((res) => {
                if (!res.ok){
                    throw new Error('ERROR RESPONSE')
                }
            })
            .catch((error) => {
                console.log(error)
            })
    }

    return (
        <div className="global">
            <div className="global-form">
            <h1 style={{textAlign:'center', fontSize:'50px', margin:'30px'}}>EDIT PRODUCT</h1>
                <form onSubmit={handleSubmit} className="form-edit">
                    <label>
                        <h1>New Name</h1>
                        <input
                            type="text"
                            placeholder="Name Product"
                            value={title}
                            onChange={(event)=> setTitle(event.target.value)}
                        />
                    </label>
                    <label>
                        <h1>New Price</h1>
                        <input
                            type="number"
                            placeholder="New Price"
                            value={price}
                            onChange={(event)=> setPrice(event.target.value)}
                        />
                    </label>
                    <label>
                        <h1>New Description</h1>
                        <textarea
                            type="text"
                            placeholder="New Description"
                            value={description}
                            onChange={(event)=> setDescription(event.target.value)}
                        />
                    </label>
                    <label>
                        <h1>New Image</h1>
                        <input
                            type="file"
                            value={image}
                            onChange={handleFileChange}
                        />    
                    </label>
                    <br></br>
                    <button type="submit" className="Save-btn">Save Changes</button>
                </form>
                <Link to='/products' style={{marginLeft:'37%', marginRight:'29%', marginTop:'5%'}}>VIEW PRODUCTS</Link>
            </div>
        </div>
    )
}
