import { useEffect, useReducer } from "react";

const INIT = {
    data: [],
    loading: false,
    error: ''
}

function reducer(state, action){
    if (action.type === 'success'){
        return {data: action.payload, loading: false, error:''}
    }

    if (action.type === 'loading'){
        return {data: [], loading: action.payload, error:''}
    }

    if (action.type === 'error'){
        return {data:[], loading: false, error: action.payload}
    }

    return state;
}

function useFetchDataEditProduct(){
    const [state, dispatch] = useReducer(reducer, INIT);

    useEffect(()=>{
        dispatch({
            type: 'loading',
            payload: true
        })

        fetch('https://api.escuelajs.co/api/v1/products/1')
            .then((res)=>{
                if(!res.ok){
                    throw new Error("ERROR RESPONSE")
                }
                return res.json()
            })
            .then((data)=>{
                dispatch({
                    type: 'success',
                    payload: data
                })
            })
            .catch((error)=>{
                dispatch({
                    type: 'error',
                    payload: error.message
                })
            })
    },[])

    return state
}

export default function ProductsEdit(){
    const {data, loading, error} = useFetchDataEditProduct();

    if(loading){
        return <h1>LOADING...</h1>
    }

    if(error){
        return ({error})
    }

    return(
        <div>
            {data.map((prod)=>{
                return (
                    <div key={prod.categoryId}>
                        <img src={prod.images}/>
                        <h1>{prod.title}</h1>
                        <h3>{prod.price}</h3>
                        <h3>{prod.description}</h3>
                    </div>
                )
            })}
        </div>
    )
}