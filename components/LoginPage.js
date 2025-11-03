const { motion } = window.Motion;

function LoginPage({ supervisors, onLogin, error }) {
    const [name, setName] = React.useState("");
    const [password, setPassword] = React.useState("");
    
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100 p-6"
        >
            <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md">
                <motion.div
                    initial={{ scale: 0.9 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.3 }}
                    className="text-center mb-8"
                >
                    <div className="mx-auto mb-4 w-20 h-20 flex items-center justify-center rounded-full bg-blue-600">
                        <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8V7a4 4 0 00-8 0v4h8z" />
                        </svg>
                    </div>
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">EUROHINA</h1>
                    <p className="text-gray-600">Système de suivi Toolbox Talk</p>
                </motion.div>

                <form onSubmit={(e) => {
                    e.preventDefault();
                    onLogin(name, password);
                }}>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Superviseur
                            </label>
                            <select
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                                required
                            >
                                <option value="">Sélectionner un superviseur</option>
                                {supervisors.map(sup => (
                                    <option key={sup.name} value={sup.name}>
                                        {sup.name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Mot de passe
                            </label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                                required
                            />
                        </div>

                        {error && (
                            <motion.div
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="bg-red-50 border-l-4 border-red-500 p-4 rounded"
                            >
                                <p className="text-red-700">{error}</p>
                            </motion.div>
                        )}

                        <button
                            type="submit"
                            className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transform transition-all duration-150 hover:scale-[1.02]"
                        >
                            Se connecter
                        </button>
                    </div>
                </form>

                <div className="mt-6 text-center text-sm text-gray-600">
                    <p>Made by Anass kraifa</p>
                    <p className="mt-1">Eurohina Safety Team</p>
                </div>
            </div>
        </motion.div>
    );
}

export default LoginPage;
