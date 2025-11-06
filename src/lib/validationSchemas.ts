import { z } from "zod";

export const quotationSchema = z.object({
  name: z.string()
    .trim()
    .min(2, { message: "El nombre debe tener al menos 2 caracteres" })
    .max(100, { message: "El nombre debe tener menos de 100 caracteres" }),
  
  email: z.string()
    .trim()
    .email({ message: "Correo electrónico inválido" })
    .max(255, { message: "El correo debe tener menos de 255 caracteres" }),
  
  phone: z.string()
    .trim()
    .min(7, { message: "El número de teléfono debe tener al menos 7 caracteres" })
    .max(20, { message: "El número de teléfono debe tener menos de 20 caracteres" }),
  
  company: z.string()
    .trim()
    .min(2, { message: "El nombre de la empresa debe tener al menos 2 caracteres" })
    .max(100, { message: "El nombre de la empresa debe tener menos de 100 caracteres" }),
  
  position: z.string()
    .trim()
    .min(2, { message: "El cargo debe tener al menos 2 caracteres" })
    .max(100, { message: "El cargo debe tener menos de 100 caracteres" }),
  
  linkedin: z.string()
    .trim()
    .url({ message: "Debe ser una URL válida" })
    .optional()
    .or(z.literal("")),
  
  consultant: z.string()
    .min(1, { message: "Selecciona un consultor" }),
});

export type QuotationFormData = z.infer<typeof quotationSchema>;
