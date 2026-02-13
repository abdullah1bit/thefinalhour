import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { motion } from "framer-motion";
import { Home } from "lucide-react";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="flex flex-1 items-center justify-center px-4 py-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="text-center"
      >
        <h1 className="gold-text font-heading text-7xl font-bold md:text-9xl">
          404
        </h1>
        <p className="mt-4 font-heading text-xl text-foreground md:text-2xl">
          Page not found
        </p>
        <p className="mt-2 max-w-md text-sm leading-relaxed text-muted-foreground">
          The path <span className="font-mono text-primary/80">{location.pathname}</span> does
          not exist. It may have been moved or removed.
        </p>
        <Link to="/" className="mt-8 inline-block">
          <Button variant="outline" className="gap-2 border-primary/30 hover:bg-primary/10 hover:text-primary">
            <Home className="h-4 w-4" />
            Return Home
          </Button>
        </Link>
      </motion.div>
    </div>
  );
};

export default NotFound;
