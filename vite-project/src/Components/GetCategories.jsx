import { useEffect, useReducer } from "react";
import { Link} from "react-router-dom"
import '../styles/Categories.css'

const INIT = {
    data: [],
    loading: false,
    error: '',
}

function reducer(state, action){
    if (action.type === 'success'){
        return {data: action.payload, loading: false, error:''}
    }

    if (action.type === 'loading'){
        return {data: [], loading: action.payload, error:''}
    }

    if (action.type === 'error'){
        return {data:[], loading: false, error:action.payload}
    }
    
    return state
}

function useFetchDataCategories(){
    const [state, dispatch] = useReducer(reducer, INIT)

    useEffect(()=>{
        dispatch({
            type: 'loading',
            payload: true
        })

        fetch('https://api.escuelajs.co/api/v1/categories')
            .then((res)=>{
                if(!res){
                    throw new Error('ERROR RESPONSE')
                }
                return res.json()
            })
            .then((data)=>{
                dispatch({
                    type:'success',
                    payload: data
                })
            })
            .catch((error)=>{
                dispatch({
                    type:'error',
                    payload: error.message
                })
            })
    },[])
    return state;
}

export default function GetCategories(){
    const {data, loading, error} = useFetchDataCategories()

    if(loading){
        return <h1 style={{textAlign:'center'}}>CARGANDO</h1>
    }

    if(error){
        return ({error})
    }

    return (
        <div className="Global">
            <div className="Categorie-Global">
                {data.map((cat)=>{
                    return (
                        <>
                            <div className="Categorie">
                                <div key={cat.id} className="Categorie-Card">
                                    <img src={cat.image} style={{width:'200px'}}/>
                                    <h1>{cat.name}</h1>
                                    <Link to={`/products?category=${cat.id}`}>{cat.name}</Link>
                                </div>
                            </div>  
                        </>
                    )
                })}
            </div>
        </div>
    )
}
