import { useParams } from "react-router-dom"
import { Link } from "react-router-dom"

export default function WelcomeComponent() {
    
    const { username } = useParams() // this is deconstructed and what ever mathces with username is given.
    
    return (
        <div className="WelcomeComponent">
            <h1>Welcome {username}</h1>

            <div>
                {/* Dog List - <a href="/dogs">Go here</a>   */}
                {/* The above part is not recommended since this link when clicked refreshes the entire page */}

                {/*RECOMMENDED -  The below link when clicked only refreshes the needed part of the link */}
                Dog List - <Link to = "/dogs">Go here</Link>
            </div>
            
        </div>
    )
}