const { useState, useEffect } = React;
const { motion } = window.Motion;

// Constants
const SUPERVISORS = [
    { name: "Amine Ammar", password: "amine2025" },
    { name: "Anass Kraifa", password: "anass2025" },
    { name: "Halima", password: "halima2025" },
    { name: "Karim Abahmane", password: "karim2025" },
    { name: "Adame Nibba", password: "adame2025" },
    { name: "Fouad", password: "fouad25" },
    { name: "Rachid", password: "rachid25" },
    { name: "Mehdi", password: "mehdi25" },
    { name: "Ayoub", password: "ayoub25" }
];

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [currentUser, setCurrentUser] = useState(null);
    const [loginError, setLoginError] = useState('');
    
    const handleLogin = (name, password) => {
        const user = SUPERVISORS.find(s => s.name === name && s.password === password);
        if (user) {
            setIsLoggedIn(true);
            setCurrentUser(user.name);
            setLoginError('');
        } else {
            setLoginError('Nom ou mot de passe incorrect');
        }
    };
    
    return (
        <div className="min-h-screen bg-gray-50">
            {!isLoggedIn ? (
                <LoginPage 
                    supervisors={SUPERVISORS} 
                    onLogin={handleLogin} 
                    error={loginError} 
                />
            ) : (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                >
                    {/* Dashboard will go here */}
                    <div className="p-8">
                        <h1 className="text-2xl font-bold">
                            Welcome, {currentUser}!
                        </h1>
                        {/* More dashboard content will be added */}
                    </div>
                </motion.div>
            )}
        </div>
    );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(React.createElement(App));