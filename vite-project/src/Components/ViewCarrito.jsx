import { useCart } from "./Carrito";
import '../styles/ViewCarrito.css'

export const ViewCarrito = () => {
    const { carrito, deleteToCarrito, getEmptyCarrito, getTotalPrice } = useCart();
    return (
        <div className="Global-ViewCarrito">
            <h1 style={{textAlign:'center'}}>CARRITO DE COMPRAS</h1>
            <div className="Global-ProductList">
                {carrito.map((prod) => (
                    <div key={prod.id} className="ProductList">
                        <img src={prod.images} style={{width:'200px'}}/>
                        <h1>{prod.title}</h1>
                        <h3>Price: ${prod.price}</h3>
                        <h3>Amount: {prod.quantity}</h3>
                        <button onClick={() => deleteToCarrito(prod.id)}>Delete</button>
                    </div>
                ))}
            </div>
            <div className="Footer">
                <h1 className="Total-title">Total: ${getTotalPrice()}</h1> {/* Invoca la función getTotalPrice */}
                <button onClick={getEmptyCarrito} className="Empty-btn">Empty Carrito</button>
            </div>
        </div>
    );
};
