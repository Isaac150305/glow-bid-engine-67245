import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowRight, ArrowLeft, Send, Sparkles } from "lucide-react";
import { toast } from "sonner";
import { ProgressIndicator } from "./ProgressIndicator";
import { quotationSchema, type QuotationFormData } from "@/lib/validationSchemas";

const STEPS = ["Proyecto", "Presupuesto", "Plazo", "Contacto"];

export const QuotationForm = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    trigger,
  } = useForm<QuotationFormData>({
    resolver: zodResolver(quotationSchema),
    mode: "onBlur",
  });

  const serviceType = watch("serviceType");
  const budgetRange = watch("budgetRange");
  const timeline = watch("timeline");

  const nextStep = async () => {
    let fieldsToValidate: (keyof QuotationFormData)[] = [];
    
    switch (currentStep) {
      case 1:
        fieldsToValidate = ["projectName", "projectDescription", "serviceType"];
        break;
      case 2:
        fieldsToValidate = ["budgetRange"];
        break;
      case 3:
        fieldsToValidate = ["timeline"];
        break;
    }

    const isValid = await trigger(fieldsToValidate);
    
    if (isValid) {
      setCurrentStep((prev) => Math.min(prev + 1, 4));
    }
  };

  const prevStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

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
        throw new Error("Error al enviar la cotización");
      }

      toast.success("¡Solicitud enviada!", {
        description: "Te contactaremos pronto con tu cotización",
      });
      console.log("Cotización enviada correctamente:", data);
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
    <div className="w-full max-w-4xl mx-auto px-4">
      <ProgressIndicator currentStep={currentStep} totalSteps={4} steps={STEPS} />

      <form onSubmit={handleSubmit(onSubmit)} className="animate-float">
        <div className="bg-black/40 backdrop-blur-md neon-border-orange rounded-2xl p-8 md:p-12 min-h-[400px] flex flex-col">
          {/* Step 1: Project Details */}
          {currentStep === 1 && (
            <div className="space-y-6 flex-1">
              <div className="flex items-center gap-2 mb-6">
                <Sparkles className="h-6 w-6 text-primary" />
                <h2 className="text-2xl font-bold gradient-text">Detalles del Proyecto</h2>
              </div>

              <div className="space-y-2">
                <Label htmlFor="projectName" className="text-foreground">
                  Nombre del Proyecto
                </Label>
                <Input
                  id="projectName"
                  {...register("projectName")}
                  placeholder="Ej: Desarrollo de aplicación móvil"
                  className="bg-black/50 border-primary/30 focus:border-primary text-foreground"
                />
                {errors.projectName && (
                  <p className="text-destructive text-sm">{errors.projectName.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="projectDescription" className="text-foreground">
                  Descripción
                </Label>
                <Textarea
                  id="projectDescription"
                  {...register("projectDescription")}
                  placeholder="Describe tu proyecto en detalle..."
                  className="bg-black/50 border-primary/30 focus:border-primary text-foreground min-h-[120px] resize-none"
                />
                {errors.projectDescription && (
                  <p className="text-destructive text-sm">{errors.projectDescription.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="serviceType" className="text-foreground">
                  Tipo de Servicio
                </Label>
                <Select value={serviceType} onValueChange={(value) => setValue("serviceType", value)}>
                  <SelectTrigger className="bg-black/50 border-primary/30 focus:border-primary text-foreground">
                    <SelectValue placeholder="Selecciona un servicio" />
                  </SelectTrigger>
                  <SelectContent className="bg-card border-primary/30">
                    <SelectItem value="desarrollo-web">Desarrollo Web</SelectItem>
                    <SelectItem value="aplicacion-movil">Aplicación Móvil</SelectItem>
                    <SelectItem value="diseno-ux">Diseño UX/UI</SelectItem>
                    <SelectItem value="consultoria">Consultoría</SelectItem>
                    <SelectItem value="marketing-digital">Marketing Digital</SelectItem>
                    <SelectItem value="otro">Otro</SelectItem>
                  </SelectContent>
                </Select>
                {errors.serviceType && (
                  <p className="text-destructive text-sm">{errors.serviceType.message}</p>
                )}
              </div>
            </div>
          )}

          {/* Step 2: Budget */}
          {currentStep === 2 && (
            <div className="space-y-6 flex-1">
              <div className="flex items-center gap-2 mb-6">
                <Sparkles className="h-6 w-6 text-primary" />
                <h2 className="text-2xl font-bold gradient-text">Presupuesto</h2>
              </div>

              <div className="space-y-4">
                <Label className="text-foreground text-lg">Selecciona tu rango de presupuesto</Label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    { value: "menos-5k", label: "Menos de $5,000", icon: "💰" },
                    { value: "5k-15k", label: "$5,000 - $15,000", icon: "💎" },
                    { value: "15k-30k", label: "$15,000 - $30,000", icon: "🔥" },
                    { value: "30k-50k", label: "$30,000 - $50,000", icon: "⭐" },
                    { value: "50k-100k", label: "$50,000 - $100,000", icon: "🚀" },
                    { value: "mas-100k", label: "Más de $100,000", icon: "👑" },
                  ].map((option) => (
                    <button
                      key={option.value}
                      type="button"
                      onClick={() => setValue("budgetRange", option.value)}
                      className={`p-6 rounded-xl border-2 transition-all duration-300 text-left ${
                        budgetRange === option.value
                          ? "neon-border-orange bg-primary/10 scale-105"
                          : "border-primary/20 bg-black/30 hover:border-primary/50 hover:bg-black/50"
                      }`}
                    >
                      <div className="text-3xl mb-2">{option.icon}</div>
                      <div className="text-foreground font-semibold">{option.label}</div>
                    </button>
                  ))}
                </div>
                {errors.budgetRange && (
                  <p className="text-destructive text-sm">{errors.budgetRange.message}</p>
                )}
              </div>
            </div>
          )}

          {/* Step 3: Timeline */}
          {currentStep === 3 && (
            <div className="space-y-6 flex-1">
              <div className="flex items-center gap-2 mb-6">
                <Sparkles className="h-6 w-6 text-primary" />
                <h2 className="text-2xl font-bold gradient-text">Plazo de Entrega</h2>
              </div>

              <div className="space-y-4">
                <Label className="text-foreground text-lg">¿Cuándo necesitas el proyecto?</Label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    { value: "urgente", label: "Urgente (1-2 semanas)", icon: "⚡" },
                    { value: "1-mes", label: "1 Mes", icon: "📅" },
                    { value: "2-3-meses", label: "2-3 Meses", icon: "🗓️" },
                    { value: "3-6-meses", label: "3-6 Meses", icon: "📆" },
                    { value: "mas-6-meses", label: "Más de 6 Meses", icon: "🎯" },
                    { value: "flexible", label: "Flexible", icon: "🌟" },
                  ].map((option) => (
                    <button
                      key={option.value}
                      type="button"
                      onClick={() => setValue("timeline", option.value)}
                      className={`p-6 rounded-xl border-2 transition-all duration-300 text-left ${
                        timeline === option.value
                          ? "neon-border-yellow bg-secondary/10 scale-105"
                          : "border-secondary/20 bg-black/30 hover:border-secondary/50 hover:bg-black/50"
                      }`}
                    >
                      <div className="text-3xl mb-2">{option.icon}</div>
                      <div className="text-foreground font-semibold">{option.label}</div>
                    </button>
                  ))}
                </div>
                {errors.timeline && (
                  <p className="text-destructive text-sm">{errors.timeline.message}</p>
                )}
              </div>
            </div>
          )}

          {/* Step 4: Contact Info */}
          {currentStep === 4 && (
            <div className="space-y-6 flex-1">
              <div className="flex items-center gap-2 mb-6">
                <Sparkles className="h-6 w-6 text-primary" />
                <h2 className="text-2xl font-bold gradient-text">Información de Contacto</h2>
              </div>

              <div className="space-y-2">
                <Label htmlFor="name" className="text-foreground">
                  Nombre Completo
                </Label>
                <Input
                  id="name"
                  {...register("name")}
                  placeholder="Tu nombre"
                  className="bg-black/50 border-primary/30 focus:border-primary text-foreground"
                />
                {errors.name && (
                  <p className="text-destructive text-sm">{errors.name.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="text-foreground">
                  Correo Electrónico
                </Label>
                <Input
                  id="email"
                  type="email"
                  {...register("email")}
                  placeholder="tu@email.com"
                  className="bg-black/50 border-primary/30 focus:border-primary text-foreground"
                />
                {errors.email && (
                  <p className="text-destructive text-sm">{errors.email.message}</p>
                )}
              </div>

              <div className="mt-8 p-6 rounded-xl bg-gradient-to-r from-primary/10 to-secondary/10 border border-primary/30">
                <p className="text-sm text-muted-foreground text-center">
                  Al enviar este formulario, aceptas que INTEZIA se ponga en contacto contigo para proporcionarte una cotización personalizada.
                </p>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between items-center mt-8 pt-6 border-t border-primary/20">
            {currentStep > 1 ? (
              <Button
                type="button"
                onClick={prevStep}
                variant="outline"
                className="border-primary/30 hover:border-primary bg-black/50"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Anterior
              </Button>
            ) : (
              <div />
            )}

            {currentStep < 4 ? (
              <Button
                type="button"
                onClick={nextStep}
                variant="gradient"
                className="ml-auto"
              >
                Siguiente
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            ) : (
              <Button
                type="submit"
                variant="gradient"
                className="ml-auto px-8"
                disabled={isSubmitting}
              >
                <Send className="mr-2 h-4 w-4" />
                {isSubmitting ? "Enviando..." : "Enviar Cotización"}
              </Button>
            )}
          </div>
        </div>
      </form>
    </div>
  );
};
