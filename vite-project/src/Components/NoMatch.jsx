import { Link } from "react-router-dom";

export default function NoMatch(){
    return (
        <div>
            <h1 style={{textAlign:"center"}}>ERROR: 404 😥</h1>
            <h4 style={{textAlign:"center"}}>
                <b>
                    <Link to="/">Go to home page</Link>
                </b>
            </h4>
        </div>
    )
}