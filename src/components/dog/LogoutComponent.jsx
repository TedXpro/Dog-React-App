import { useAuth } from "./security/AuthContext"

export default function LogoutComponent() {
    return (
        <div className="LogoutComponent" >
            <h1>You are Logged Out</h1>
            <div>
                Thank You for using! Come Back Soon
            </div>

        </div>
    )
}