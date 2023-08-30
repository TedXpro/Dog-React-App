const { createContext, useState, useContext } = require("react");

// create a context
export const AuthContext = createContext()

export const useAuth = () => useContext(AuthContext)

//This function will provide the context with other components
export default function AuthProvider({ children }) {

    // setting it up to share with other children

    // const [number, setNumber] = useState()

    // Put Some state in the context
    const [isAuthenticated, setAuthenticated] = useState(false)

    const[username, setUsername] = useState(null)

    function login(username, password) {
        if (username === 'Yohannes' && password === 'dummy') {
            setAuthenticated(true)
            setUsername(username)
            return true
        }
        else {
            setAuthenticated(false)
            setUsername(null)
            return false
        }
    }

    function logout() {
        setAuthenticated(false)
    }

    const valueToBeShared = { isAuthenticated, login, logout, username }

    return (
        <AuthContext.Provider value={valueToBeShared} >
            {children}
        </AuthContext.Provider>

    )
}