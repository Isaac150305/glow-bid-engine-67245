import { z } from "zod";

export const quotationSchema = z.object({
  projectName: z.string()
    .trim()
    .min(3, { message: "El nombre debe tener al menos 3 caracteres" })
    .max(100, { message: "El nombre debe tener menos de 100 caracteres" }),
  
  projectDescription: z.string()
    .trim()
    .min(10, { message: "La descripción debe tener al menos 10 caracteres" })
    .max(1000, { message: "La descripción debe tener menos de 1000 caracteres" }),
  
  serviceType: z.string()
    .min(1, { message: "Selecciona un tipo de servicio" }),
  
  budgetRange: z.string()
    .min(1, { message: "Selecciona un rango de presupuesto" }),
  
  timeline: z.string()
    .min(1, { message: "Selecciona un plazo" }),
  
  email: z.string()
    .trim()
    .email({ message: "Correo electrónico inválido" })
    .max(255, { message: "El correo debe tener menos de 255 caracteres" }),
  
  name: z.string()
    .trim()
    .min(2, { message: "El nombre debe tener al menos 2 caracteres" })
    .max(100, { message: "El nombre debe tener menos de 100 caracteres" }),
});

export type QuotationFormData = z.infer<typeof quotationSchema>;
