import { motion } from 'framer-motion';
import './LoadingScreen.css';

export default function LoadingScreen() {
  return (
    <motion.div
      className="loading-screen"
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.6, ease: 'easeInOut' }}
    >
      <motion.div
        className="loading-logo"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        SG
      </motion.div>
      <div className="loading-bar-track">
        <div className="loading-bar-fill" />
      </div>
      <motion.p
        className="loading-text"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        Initializing Portfolio...
      </motion.p>
    </motion.div>
  );
}
