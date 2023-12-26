import {useEffect, useReducer, useState} from 'react'
import { Link, useLocation, useParams } from 'react-router-dom'
import "../styles/Products.css"
import "../styles/ProductsID.css"
import  {useCart}  from './Carrito'
import { useProductContext } from './ProductContext'
//creo un estado incial
const INIT = {
    data:[],
    loading: false,
    error: '',
}

//aplico un reducer
function reducer(state, action){
    if(action.type === 'success'){
        return {data: action.payload, loading: false, error: ''}
    }

    if(action.type === 'loading'){
        return {data: [], loading: action.payload, error:''}
    }

    if(action.type === 'error'){
        return {data: [], loading: false, error: action.payload}
    }

    return state;
}

//hago el llamado a la API
function useFetchDataProducts(){
    const [state, dispatch] = useReducer(reducer, INIT) 


    useEffect(() => {
        dispatch({
        type: 'loading',
        payload: true
        });

        fetch('https://api.escuelajs.co/api/v1/products')
        .then((res) => {
            if (!res.ok) {
            throw new Error('ERROR RESPONSE');
            }
            return res.json();
        })
        .then((data) => {
            dispatch({
            type: 'success',
            payload: data,
            });
        })
        .catch((error) => {
            dispatch({
            type: 'error',
            payload: error.message,
            });
        });
    }, []);
    return state;
}


export default function GetProducts(){
    const {data, loading, error} = useFetchDataProducts();
    const { addToCarrito } = useCart()
    const { state: {products} } = useProductContext()

    const handleAdd = (product) => {
        addToCarrito({
            id: product.id,
            title: product.title,
            price: product.price,
            description: product.description,
            images: product.images,
            categoryId: product.category.id,
            categoryName: product.category.name,
            categoryImage: product.category.image,
        });
    };

    if (loading) {
        return <h1 style={{textAlign:'center'}}>CARGANDO...</h1>
    }

    if (error) {
        return <h1>{error}</h1>
    }

    return (
        <>  
            <div>
                <h1 style={{textAlign: 'center'}}>PRODUCTS</h1>
            </div>
            <div className='Global-Carrito'>
                <h1 className='Title-Products'>THE BEST PRODUCTS YOU FIND IT HERE!</h1>
                <p className='Text-Products'>Revamp your style with the latest designer trends in clothes 
                or achieve a perfectly curated wardrobe thanks to our line-up timeless pieces</p>
            </div>
            <div className='Global'>
                <div className='Product-Global'>
                    {products.map((product) => {
                            return(
                                <div key={product.id}>
                                    <div>
                                        <img src={product.image} style={{ width: '200px' }} alt={`Product ${product.productName}`} />
                                        <h1>{product.productName}</h1>
                                        <h3>${product.price}</h3>
                                        <h3>{product.description}</h3>
                                        <h3>CATEGORY: {product.category.name}</h3>
                                        <Link to={{pathname: `/products/${product.id}`}}>Ver Más</Link>
                                    </div>
                                    <button onClick={()=>{return handleAdd(product)}} style={{margin:'7%'}}>ADD TO SHOP</button>
                                    <div>
                                        <Link to={{pathname: `/edit/${product.id}`}}>Edit</Link>
                                    </div>
                                </div>
                            )
                    })}
                    {data.map((prod)=>{
                        return(
                            <div key={prod.id} className='Product'>
                                <div className='Product-Card'>
                                    <img src={prod.images} style={{width:'200px'}}/>
                                    <h1>{prod.title}</h1>
                                    <h3>${prod.price}</h3>
                                    <h3>{prod.description}</h3>
                                    <h3>{prod.category.name}</h3>
                                    <Link to={{pathname: `/products/${prod.id}`}}> Ver Más </Link>
                                </div>
                                <button onClick={()=>{return handleAdd(prod)}} style={{margin:'7%'}}>ADD TO SHOP</button>
                                <div>
                                    <Link to={{pathname: `/edit/${prod.id}`}}>Edit</Link>
                                </div>
                            </div>
                        )
                    })}

                </div>
            </div>
        </>
    )
}

export function GetCategoriesId() {
    const [categoryProducts, setCategoryProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const categoryId = queryParams.get('category');

    useEffect(() => {
        if (categoryId) {
            setLoading(true);
            setError('');
            fetch(`https://api.escuelajs.co/api/v1/categories/${categoryId}`)
                .then((res) => {
                    if (!res.ok) {
                        throw new Error('ERROR RESPONSE');
                    }
                    return res.json();
                })
                .then((data) => {
                    setCategoryProducts(data);
                    setLoading(false);
                })
                .catch((error) => {
                    setError(error.message);
                    setLoading(false);
                });
        } else {
            setCategoryProducts([]);
        }
    }, [categoryId]);
    

    if (loading) {
        return <h1>Cargando...</h1>;
    }

    if (error) {
        return <h1>{error}</h1>;
    }

    return (
        <div>
            {categoryProducts.map((productCat) => {
                return (
                    <div key={productCat.id}>
                        <img src={productCat.images} style={{ width: '200px' }} />
                        <h1>{productCat.title}</h1>
                        <h3>${productCat.price}</h3>
                        <h3>{productCat.description}</h3>
                        <h3>{productCat.category.name}</h3>
                    </div>
                );
            })}
        </div>
    );
}

export function GetProductsId() {
    const { id } = useParams();
    const [productDetails, setProductDetails] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const { addToCarrito } = useCart()
    
    const handleAdd = (product) => {
        addToCarrito({
            id: product.id,
            title: product.title,
            price: product.price,
            description: product.description,
            images: product.images,
            categoryName:product.category.name,
        });
    };

    useEffect(() => {
        fetch(`https://api.escuelajs.co/api/v1/products/${id}`)
            .then((res) => {
                if (!res.ok) {
                    throw new Error('ERROR RESPONSE');
                }
                return res.json();
            })
            .then((data) => {
                setProductDetails(data);
                setLoading(false);
            })
            .catch((error) => {
                setError(error.message);
                setLoading(false);
            });
    }, [id]);

    if (loading) {
        return <h1>Cargando...</h1>;
    }

    if (error) {
        return <h1>{error}</h1>;
    }

    // Renderiza los detalles del producto
    return (
        <div className='Global-ProductID'>
            <div className='Product-ImageContainer'>
                <img src={productDetails.images} className='Product-Image' alt="Product" />
            </div>
            <div className='Card-ProductID'>
                <div className='Product-Title'>
                    <h1>{productDetails.title}</h1>
                    <button onClick={()=>{return handleAdd(productDetails)}} className='Product-btn' >
                        <Link to="/shop" style={{textDecoration:'none',color:'white'}}>ADD TO SHOP</Link>
                    </button>
                </div>
                <div className='Product-Details'>
                    <h3 className='Product-Label'><i>PRICE</i></h3>
                    <h3 className='Product-Price'>${productDetails.price}</h3>
                    <h3 className='Product-Label'><i>DESCRIPTION</i></h3>
                    <p className='Product-Description'>{productDetails.description}</p>
                </div>
            </div>
        </div>
    )
}


