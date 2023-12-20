import {useEffect, useReducer} from 'react'
import { Link, useParams, useLocation } from 'react-router-dom'
import "../styles/Products.css"
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

    const location = useLocation();
    //creo un objeto URLSearchParams a partir de location.search, 
    //que representa la parte de la URL después del signo ?, es decir, los parámetros de búsqueda en la URL
    const queryParams = new URLSearchParams(location.search);

    //Se extrae el valor del parámetro category de los parámetros de búsqueda utilizando queryParams.get('category'). 
    //Esto se utilizará para filtrar los productos por categoría.
    const categoryId = queryParams.get('category');

    useEffect(()=>{
        //el dispatch envia las acciones al reducer
        dispatch({
            type: 'loading',
            payload: true
        });

        const url = categoryId ? `https://fakeapi.platzi.com/products?category=${categoryId}` : 'https://api.escuelajs.co/api/v1/products'
        fetch(url)
            .then((res)=>{
                if(!res.ok){
                    throw new Error('ERROR RESPONSE')
                }
                return res.json()
            })
            .then((data)=>{
                dispatch({
                    type:'success',
                    payload: data,
                });
            })
            .catch((error)=>{
                dispatch({
                    type:'error',
                    payload: error.message,
                })
            })
    },[categoryId])
    return state;
}

export default function GetProducts(){
    const {data, loading, error} = useFetchDataProducts();

    if (loading) {
        return <h1 style={{textAlign:'center'}}>CARGANDO...</h1>
    }

    if (error) {
        return <h1>{error}</h1>
    }

    return (
        <div className='Global'>
            <div className='Product-Global'>
                {data.map((prod)=>{
                    return(
                        <div key={prod.id} className='Product'>
                            <div className='Product-Card'>
                                <img src={prod.images} style={{width:'200px'}}/>
                                <h1>{prod.title}</h1>
                                <h3>${prod.price}</h3>
                                <h3>{prod.description}</h3>
                                <Link
                                    to={{
                                        pathname: `/products/${prod.id}`,
                                        state: {
                                            title: prod.title,
                                            price: prod.price,
                                            description: prod.description
                                        }
                                    }}
                                >
                                    Ver Más
                                </Link>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export function GetProductsId(){
    const {id} = useParams()
    const location = useLocation()

    const {title, price, description} = location.state || {}; 


    return (
        <div style={{textAlign:'center'}}>
            <h1>Product: {title}</h1>
            <p>({id})</p>
            <h3>Price: {price}</h3>
            <h3>Description: {description}</h3>
        </div>
    )
}
