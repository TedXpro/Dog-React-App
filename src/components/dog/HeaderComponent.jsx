import { Link } from "react-router-dom"
import { useAuth } from "./security/AuthContext"

export default function HeaderComponent() {
    // return (
    //     <header className="header">
    //         <div className="container">
    //             <ul className="navbar-nav">
    //                 <li className="nav-item">
    //                     <a className="nav-link" href="/login">Login</a>
    //                 </li>
    //                 <li className="nav-item">
    //                     <a className="nav-link" href="/dogs">Dogs</a>
    //                 </li>
    //             </ul>
    //         </div>
    //     </header>

    // )

    // displaying the required buttons when the user is authenticated or not.

    const authContext = useAuth()

    const isAuthenticated = authContext.isAuthenticated

    function logout() {
        authContext.logout()
    }

    return (
        <header className="border-bottom border-light border-5 mb-5 p-2">
            <div className="container">
                <div className="row">
                    <nav className="navbar navbar-expand-lg">
                        <div className="collapse navbar-collapse">
                            <ul className="navbar-nav">
                                {isAuthenticated &&
                                    <li className="nav-item fs-5"><Link className="nav-link" to="/welcome/Yohannes">Home</Link></li>}
                                {isAuthenticated &&
                                    <li className="nav-item fs-5"><Link className="nav-link" to="/dogs">dogs</Link></li>}
                            </ul>
                        </div>
                        <ul className="navbar-nav">
                            {!isAuthenticated &&
                                <li className="nav-item fs-5"><Link className="nav-link" to="/login">Login</Link></li>}
                            {isAuthenticated && <li className="nav-item fs-5"><Link className="nav-link" to="/logout" onClick={logout}>Logout</Link></li>}
                        </ul>
                    </nav>
                </div>
            </div>
        </header>
    )
}