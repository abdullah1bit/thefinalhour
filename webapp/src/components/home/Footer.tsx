import { motion } from "framer-motion";

const Footer = () => {
  return (
    <motion.footer
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="border-t border-border/30 px-6 py-10"
    >
      <div className="mx-auto max-w-4xl text-center">
        <p className="font-arabic text-lg text-primary/50" dir="rtl">
          بسم الله الرحمن الرحيم
        </p>
        <p className="mt-3 text-xs leading-relaxed text-muted-foreground/50">
          This is an educational resource compiled from traditional Islamic
          scholarship. All hadith references are from authenticated collections.
          May Allah guide us all to the truth.
        </p>
      </div>
    </motion.footer>
  );
};

export default Footer;
