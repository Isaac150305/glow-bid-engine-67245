import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Send, Sparkles } from "lucide-react";
import { toast } from "sonner";
import { quotationSchema, type QuotationFormData } from "@/lib/validationSchemas";

const CONSULTANTS = [
  "Isaac Rodríguez",
  "Guillermo Sanchez",
  "Andres Fornerino",
  "Francisco Roomer",
  "Douglas Vasquez",
  "Ricardo Martinez",
  "Angel Osuna",
  "Juan Figuera",
  "José Alejandro",
  "Eulices Mendoza",
  "Diego Hidalgo",
  "Christian Vilera",
  "Rafael Carrero",
  "Rodrigo Massa",
];

export const QuotationForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<QuotationFormData>({
    resolver: zodResolver(quotationSchema),
    mode: "onBlur",
  });

  const consultant = watch("consultant");

  const onSubmit = async (data: QuotationFormData) => {
    setIsSubmitting(true);
    
    try {
      const response = await fetch("https://desarrollos-intezia-n8n.uh1aur.easypanel.host/webhook/401addbf-3478-42e8-948f-6fddd7a23d3a", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Error al enviar la encuesta");
      }

      toast.success("¡Encuesta enviada!", {
        description: "Gracias por tu tiempo. Te contactaremos pronto",
      });
      console.log("Encuesta enviada correctamente:", data);
    } catch (error) {
      console.error("Error:", error);
      toast.error("Error al enviar", {
        description: "Por favor intenta nuevamente",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto px-4">
      <form onSubmit={handleSubmit(onSubmit)} className="animate-float">
        <div className="bg-black/40 backdrop-blur-md neon-border-orange rounded-2xl p-8 md:p-12">
          <div className="flex items-center gap-2 mb-8">
            <Sparkles className="h-6 w-6 text-primary" />
            <h2 className="text-2xl font-bold gradient-text">Información de Contacto</h2>
          </div>

          <div className="space-y-6">
            {/* Nombre completo */}
            <div className="space-y-2">
              <Label htmlFor="name" className="text-foreground">
                Nombre Completo *
              </Label>
              <Input
                id="name"
                {...register("name")}
                placeholder="Tu nombre completo"
                className="bg-black/50 border-primary/30 focus:border-primary text-foreground"
              />
              {errors.name && (
                <p className="text-destructive text-sm">{errors.name.message}</p>
              )}
            </div>

            {/* Correo electrónico */}
            <div className="space-y-2">
              <Label htmlFor="email" className="text-foreground">
                Correo Electrónico Profesional *
              </Label>
              <Input
                id="email"
                type="email"
                {...register("email")}
                placeholder="tu@empresa.com"
                className="bg-black/50 border-primary/30 focus:border-primary text-foreground"
              />
              {errors.email && (
                <p className="text-destructive text-sm">{errors.email.message}</p>
              )}
            </div>

            {/* Número de teléfono */}
            <div className="space-y-2">
              <Label htmlFor="phone" className="text-foreground">
                Número de Teléfono *
              </Label>
              <Input
                id="phone"
                type="tel"
                {...register("phone")}
                placeholder="+58 412 1234567"
                className="bg-black/50 border-primary/30 focus:border-primary text-foreground"
              />
              {errors.phone && (
                <p className="text-destructive text-sm">{errors.phone.message}</p>
              )}
            </div>

            {/* Nombre de empresa */}
            <div className="space-y-2">
              <Label htmlFor="company" className="text-foreground">
                Nombre de Empresa *
              </Label>
              <Input
                id="company"
                {...register("company")}
                placeholder="Nombre de tu empresa"
                className="bg-black/50 border-primary/30 focus:border-primary text-foreground"
              />
              {errors.company && (
                <p className="text-destructive text-sm">{errors.company.message}</p>
              )}
            </div>

            {/* Cargo/puesto */}
            <div className="space-y-2">
              <Label htmlFor="position" className="text-foreground">
                Cargo/Puesto dentro de la Empresa *
              </Label>
              <Input
                id="position"
                {...register("position")}
                placeholder="Tu cargo o puesto"
                className="bg-black/50 border-primary/30 focus:border-primary text-foreground"
              />
              {errors.position && (
                <p className="text-destructive text-sm">{errors.position.message}</p>
              )}
            </div>

            {/* LinkedIn (opcional) */}
            <div className="space-y-2">
              <Label htmlFor="linkedin" className="text-foreground">
                Enlace a Perfil de LinkedIn <span className="text-muted-foreground">(Opcional)</span>
              </Label>
              <Input
                id="linkedin"
                type="url"
                {...register("linkedin")}
                placeholder="https://linkedin.com/in/tu-perfil"
                className="bg-black/50 border-primary/30 focus:border-primary text-foreground"
              />
              {errors.linkedin && (
                <p className="text-destructive text-sm">{errors.linkedin.message}</p>
              )}
            </div>

            {/* Consultor asignado */}
            <div className="space-y-2">
              <Label htmlFor="consultant" className="text-foreground">
                Consultor que te Atendió *
              </Label>
              <Select value={consultant} onValueChange={(value) => setValue("consultant", value)}>
                <SelectTrigger className="bg-black/50 border-primary/30 focus:border-primary text-foreground">
                  <SelectValue placeholder="Selecciona el consultor" />
                </SelectTrigger>
                <SelectContent className="bg-card border-primary/30 max-h-[300px]">
                  {CONSULTANTS.map((name) => (
                    <SelectItem key={name} value={name}>
                      {name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.consultant && (
                <p className="text-destructive text-sm">{errors.consultant.message}</p>
              )}
            </div>

            {/* Disclaimer */}
            <div className="mt-8 p-6 rounded-xl bg-gradient-to-r from-primary/10 to-secondary/10 border border-primary/30">
              <p className="text-sm text-muted-foreground text-center">
                Al enviar esta encuesta, aceptas que INTEZIA se ponga en contacto contigo para colaborar en tus proyectos futuros.
              </p>
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-end mt-8 pt-6 border-t border-primary/20">
            <Button
              type="submit"
              variant="gradient"
              className="px-8"
              disabled={isSubmitting}
            >
              <Send className="mr-2 h-4 w-4" />
              {isSubmitting ? "Enviando..." : "Enviar Encuesta"}
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};
