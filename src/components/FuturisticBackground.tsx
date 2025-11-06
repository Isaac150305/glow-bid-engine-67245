export const FuturisticBackground = () => {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      {/* Dark base */}
      <div className="absolute inset-0 bg-background" />
      
      {/* Radial gradient overlays */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[120px] animate-pulse-glow" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/20 rounded-full blur-[120px] animate-pulse-glow" style={{ animationDelay: '1.5s' }} />
      
      {/* Grid pattern */}
      <div 
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `linear-gradient(hsl(var(--glow-orange)) 1px, transparent 1px),
                           linear-gradient(90deg, hsl(var(--glow-orange)) 1px, transparent 1px)`,
          backgroundSize: '50px 50px'
        }}
      />
      
      {/* Animated particles */}
      <div className="absolute top-20 left-1/4 w-2 h-2 bg-primary rounded-full glow-orange animate-ping" />
      <div className="absolute top-1/3 right-1/3 w-2 h-2 bg-secondary rounded-full glow-yellow animate-ping" style={{ animationDelay: '1s' }} />
      <div className="absolute bottom-1/3 left-1/2 w-2 h-2 bg-primary rounded-full glow-orange animate-ping" style={{ animationDelay: '2s' }} />
      <div className="absolute top-2/3 right-1/4 w-2 h-2 bg-secondary rounded-full glow-yellow animate-ping" style={{ animationDelay: '0.5s' }} />
      
      {/* Horizontal light beams */}
      <div className="absolute top-1/4 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
      <div className="absolute bottom-1/3 left-0 right-0 h-px bg-gradient-to-r from-transparent via-secondary/50 to-transparent" />
    </div>
  );
};
