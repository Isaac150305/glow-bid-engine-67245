import { FuturisticBackground } from "@/components/FuturisticBackground";
import { QuotationForm } from "@/components/QuotationForm";
import inteziaLogo from "@/assets/intezia-logo.png";

const Index = () => {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center py-12 relative">
      <FuturisticBackground />
      
      <div className="container mx-auto flex flex-col items-center gap-16 relative z-10">
        {/* Logo with elegant glow effect */}
        <div className="relative group">
          <div className="absolute -inset-4 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-full blur-2xl opacity-75 group-hover:opacity-100 transition-opacity duration-500" />
          <img 
            src={inteziaLogo} 
            alt="INTEZIA Logo" 
            className="h-28 w-auto md:h-36 lg:h-44 object-contain relative z-10 drop-shadow-2xl filter brightness-110"
          />
        </div>

        {/* Quotation form */}
        <QuotationForm />

        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-32 h-32 border-t-2 border-l-2 border-primary/30 rounded-tl-3xl" />
        <div className="absolute bottom-0 right-0 w-32 h-32 border-b-2 border-r-2 border-secondary/30 rounded-br-3xl" />
      </div>
    </main>
  );
};

export default Index;
