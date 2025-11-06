import { FuturisticBackground } from "@/components/FuturisticBackground";
import { QuotationForm } from "@/components/QuotationForm";
import techdayLogo from "@/assets/techday-logo.png";

const Index = () => {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center py-12 relative">
      <FuturisticBackground />
      
      <div className="container mx-auto flex flex-col items-center gap-8 relative z-10">
        {/* Logo with elegant glow effect */}
        <div className="relative group">
          <div className="absolute -inset-4 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-full blur-2xl opacity-75 group-hover:opacity-100 transition-opacity duration-500" />
          <img 
            src={techdayLogo} 
            alt="IA TechDay Logo" 
            className="h-20 w-auto md:h-24 lg:h-28 object-contain relative z-10 drop-shadow-2xl filter brightness-110"
          />
        </div>

        {/* Welcome message */}
        <div className="text-center max-w-3xl px-4 space-y-3">
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold gradient-text animate-float">
            ¡Bienvenido a IA TechDay!
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground">
            Has sido redirigido a esta <span className="text-primary font-semibold">encuesta especial</span> para conocer mejor tus necesidades y así poder <span className="text-secondary font-semibold">colaborar contigo</span> en el futuro
          </p>
        </div>

        {/* Survey form */}
        <QuotationForm />

        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-32 h-32 border-t-2 border-l-2 border-primary/30 rounded-tl-3xl" />
        <div className="absolute bottom-0 right-0 w-32 h-32 border-b-2 border-r-2 border-secondary/30 rounded-br-3xl" />
      </div>
    </main>
  );
};

export default Index;
