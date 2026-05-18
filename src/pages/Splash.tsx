import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { Wallet } from 'lucide-react';

export default function Splash() {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/intro');
    }, 3000); // 3 seconds display

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background text-primary">
      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="flex flex-col items-center gap-6"
      >
        <div className="relative flex h-32 w-32 items-center justify-center rounded-3xl bg-primary text-primary-foreground shadow-2xl">
          <Wallet className="h-16 w-16" />
          <motion.div
            className="absolute -right-2 -top-2 h-8 w-8 rounded-full bg-green-400 ring-4 ring-background"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.5, type: "spring" }}
          />
        </div>
        
        <div className="text-center space-y-2">
          <motion.h1 
            className="text-4xl font-bold tracking-tighter sm:text-5xl"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            AI Personal CFO
          </motion.h1>
          <motion.p 
            className="text-lg text-muted-foreground"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.5 }}
          >
            Thinks before you invest.
          </motion.p>
        </div>
      </motion.div>
    </div>
  );
}
