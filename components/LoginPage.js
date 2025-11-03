const { motion } = window.Motion;

function LoginPage({ supervisors, onLogin, error }) {
    const [name, setName] = React.useState("");
    const [password, setPassword] = React.useState("");
    
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 p-6 relative overflow-hidden"
        >
            {/* Animated Background Elements */}
            <div className="absolute inset-0 overflow-hidden">
                {[...Array(5)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute w-96 h-96 bg-blue-500/10 rounded-full"
                        style={{
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                        }}
                        animate={{
                            scale: [1, 1.2, 1],
                            opacity: [0.1, 0.2, 0.1],
                            x: [0, 30, 0],
                            y: [0, 30, 0],
                        }}
                        transition={{
                            duration: 8,
                            repeat: Infinity,
                            delay: i * 0.5,
                        }}
                    />
                ))}
            </div>

            {/* Main Login Card */}
            <motion.div
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, type: "spring" }}
                className="relative w-full max-w-md"
            >
                {/* Glass Effect Card */}
                <div className="bg-white/10 backdrop-blur-lg rounded-3xl shadow-2xl overflow-hidden">
                    {/* Top Design Element */}
                    <div className="bg-gradient-to-r from-blue-600 to-blue-800 p-8 relative overflow-hidden">
                        <motion.div
                            animate={{ 
                                rotate: 360,
                                scale: [1, 1.2, 1],
                            }}
                            transition={{ duration: 20, repeat: Infinity }}
                            className="absolute -right-12 -top-12 w-40 h-40 bg-blue-400/20 rounded-full blur-2xl"
                        />
                        <div className="relative">
                            <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ delay: 0.2, type: "spring" }}
                                className="w-24 h-24 mx-auto mb-6 bg-white rounded-2xl shadow-xl flex items-center justify-center p-4"
                            >
                                {/* Microtunneling Icon */}
                                <svg className="w-full h-full text-blue-600" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                                        d="M12 22a10 10 0 100-20 10 10 0 000 20zM12 16l4-4-4-4-4 4 4 4z" />
                                </svg>
                            </motion.div>
                            <motion.h1
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.4 }}
                                className="text-3xl font-bold text-white text-center mb-2"
                            >
                                EUROHINA
                            </motion.h1>
                            <motion.p
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.5 }}
                                className="text-blue-100 text-center"
                            >
                                Microtunneling Safety System
                            </motion.p>
                        </div>
                    </div>

                    {/* Login Form */}
                    <div className="p-8">
                        <form onSubmit={(e) => {
                            e.preventDefault();
                            onLogin(name, password);
                        }}>
                            <div className="space-y-6">
                                {/* Supervisor Select */}
                                <motion.div
                                    initial={{ x: -50, opacity: 0 }}
                                    animate={{ x: 0, opacity: 1 }}
                                    transition={{ delay: 0.6 }}
                                >
                                    <label className="block text-sm font-medium text-white mb-2">
                                        Superviseur
                                    </label>
                                    <select
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        className="w-full px-4 py-3 bg-white/10 border border-blue-300/30 text-white rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all backdrop-blur-sm"
                                        required
                                    >
                                        <option value="" className="text-gray-900">Sélectionner un superviseur</option>
                                        {supervisors.map(sup => (
                                            <option key={sup.name} value={sup.name} className="text-gray-900">
                                                {sup.name}
                                            </option>
                                        ))}
                                    </select>
                                </motion.div>

                                {/* Password Input */}
                                <motion.div
                                    initial={{ x: 50, opacity: 0 }}
                                    animate={{ x: 0, opacity: 1 }}
                                    transition={{ delay: 0.7 }}
                                >
                                    <label className="block text-sm font-medium text-white mb-2">
                                        Mot de passe
                                    </label>
                                    <input
                                        type="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="w-full px-4 py-3 bg-white/10 border border-blue-300/30 text-white rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all backdrop-blur-sm"
                                        required
                                    />
                                </motion.div>

                                {/* Error Message */}
                                {error && (
                                    <motion.div
                                        initial={{ opacity: 0, y: -10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="bg-red-500/20 border-l-4 border-red-500 p-4 rounded-lg"
                                    >
                                        <p className="text-red-200">{error}</p>
                                    </motion.div>
                                )}

                                {/* Login Button */}
                                <motion.button
                                    type="submit"
                                    className="w-full bg-gradient-to-r from-blue-500 to-blue-700 text-white py-4 rounded-xl font-medium 
                                             hover:from-blue-600 hover:to-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 
                                             focus:ring-offset-transparent transform transition-all duration-150 hover:scale-[1.02] shadow-lg shadow-blue-500/30"
                                    initial={{ y: 50, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    transition={{ delay: 0.8 }}
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                >
                                    Se connecter
                                </motion.button>
                            </div>
                        </form>

                        {/* Footer */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 1 }}
                            className="mt-8 text-center text-sm text-blue-200/60"
                        >
                            <p>© 2023 EUROHINA Microtunneling</p>
                            <p className="mt-1">Safety & Innovation</p>
                        </motion.div>
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
}

export default LoginPage;
