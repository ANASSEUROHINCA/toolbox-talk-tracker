const { motion } = window.Motion;

function LoginPage({ supervisors, onLogin, error }) {
    const [name, setName] = React.useState("");
    const [password, setPassword] = React.useState("");
    
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-800 to-slate-950 p-6"
            style={{
                backgroundImage: `url('https://eurohinca.com/wp-content/uploads/2024/02/slide4.jpg')`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundBlendMode: 'overlay'
            }}
        >
            {/* Glass effect container */}
            <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="relative w-full max-w-md"
            >
                {/* Floating elements */}
                <motion.div
                    animate={{ 
                        y: [0, -10, 0],
                        rotate: [0, 5, 0]
                    }}
                    transition={{ 
                        duration: 5,
                        repeat: Infinity,
                        repeatType: "reverse"
                    }}
                    className="absolute -top-20 -left-16 w-32 h-32 bg-blue-500/20 rounded-full blur-xl"
                />
                <motion.div
                    animate={{ 
                        y: [0, 10, 0],
                        rotate: [0, -5, 0]
                    }}
                    transition={{ 
                        duration: 4,
                        repeat: Infinity,
                        repeatType: "reverse"
                    }}
                    className="absolute -bottom-20 -right-16 w-32 h-32 bg-indigo-500/20 rounded-full blur-xl"
                />

                {/* Main card */}
                <div className="backdrop-blur-xl bg-white/10 p-8 rounded-3xl shadow-[0_8px_32px_0_rgba(0,0,0,0.3)] border border-white/20">
                    <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="text-center mb-8"
                    >
                        {/* Logo animation */}
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ 
                                type: "spring",
                                stiffness: 260,
                                damping: 20,
                                delay: 0.3
                            }}
                            className="mx-auto mb-6 w-24 h-24 relative"
                        >
                            <div className="absolute inset-0 bg-blue-600 rounded-xl rotate-45 transform -translate-y-2 translate-x-2" />
                            <div className="absolute inset-0 bg-indigo-700 rounded-xl" />
                            <div className="absolute inset-0 flex items-center justify-center">
                                <svg className="w-12 h-12 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                                        d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" 
                                    />
                                </svg>
                            </div>
                        </motion.div>

                        <motion.h1
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.4 }}
                            className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-indigo-400 mb-2"
                        >
                            EUROHINA
                        </motion.h1>
                        <motion.p
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.5 }}
                            className="text-blue-200"
                        >
                            Microtunneling Safety Management
                        </motion.p>
                    </motion.div>

                    <motion.form
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.6 }}
                        onSubmit={(e) => {
                            e.preventDefault();
                            onLogin(name, password);
                        }}
                        className="space-y-6"
                    >
                        <div>
                            <label className="block text-sm font-medium text-blue-200 mb-2">
                                Superviseur
                            </label>
                            <motion.select
                                whileFocus={{ scale: 1.02 }}
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-white placeholder-white/50"
                                required
                            >
                                <option value="" className="bg-slate-800">Sélectionner un superviseur</option>
                                {supervisors.map(sup => (
                                    <option key={sup.name} value={sup.name} className="bg-slate-800">
                                        {sup.name}
                                    </option>
                                ))}
                            </motion.select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-blue-200 mb-2">
                                Mot de passe
                            </label>
                            <motion.input
                                whileFocus={{ scale: 1.02 }}
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-white"
                                required
                            />
                        </div>

                        {error && (
                            <motion.div
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="bg-red-500/20 border border-red-500/50 text-red-200 px-4 py-3 rounded-lg"
                            >
                                <p>{error}</p>
                            </motion.div>
                        )}

                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            type="submit"
                            className="w-full py-3 px-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg font-medium shadow-lg shadow-blue-600/30 hover:shadow-blue-600/50 transition-all duration-200"
                        >
                            Se connecter
                        </motion.button>
                    </motion.form>

                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.8 }}
                        className="mt-8 text-center text-sm text-blue-200/80"
                    >
                        <p>Developed by Anass Kraifa</p>
                        <p className="mt-1">Eurohina Safety Team</p>
                    </motion.div>
                </div>
            </motion.div>
        </motion.div>
    );
}

export default LoginPage;
