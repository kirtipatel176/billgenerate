import { z } from "zod";

export const ItemSchema = z.object({
  id: z.string(),
  description: z.string().min(1, "Description is required"),
  quantity: z.number().nullable(),
  unit: z.string().optional(),
  rate: z.number().nullable(),
  amount: z.number().default(0),
});

export const BusinessInfoSchema = z.object({
  name: z.string().min(1, "Business Name is required"),
  services: z.string().optional(),
  proprietor: z.string().optional(),
  phone: z.string().optional(),
  address: z.string().optional(),
});

export const CustomerInfoSchema = z.object({
  name: z.string().min(1, "Customer Name is required"),
  phone: z.string().optional(),
  email: z.string().email().optional().or(z.literal("")),
  address: z.string().optional(),
  city: z.string().optional(),
  state: z.string().optional(),
  country: z.string().optional(),
});

export const ServiceLocationSchema = z.object({
  name: z.string().optional(),
  phone: z.string().optional(),
  address: z.string().optional(),
});

export const EstimateDetailsSchema = z.object({
  estimateNumber: z.string().min(1, "Estimate Number is required"),
  estimateDate: z.string().min(1, "Estimate Date is required"),
  validUntil: z.string().optional(),
});

export const EstimateSchema = z.object({
  id: z.string(),
  businessInfo: BusinessInfoSchema,
  customerInfo: CustomerInfoSchema,
  serviceLocation: ServiceLocationSchema,
  estimateDetails: EstimateDetailsSchema,
  items: z.array(ItemSchema),
  notes: z.array(z.string()),
  terms: z.array(z.string()),
  discount: z.number().default(0),
  taxRate: z.number().default(0), // Percentage
  subtotal: z.number().default(0),
  total: z.number().default(0),
});

export type Item = z.infer<typeof ItemSchema>;
export type BusinessInfo = z.infer<typeof BusinessInfoSchema>;
export type CustomerInfo = z.infer<typeof CustomerInfoSchema>;
export type ServiceLocation = z.infer<typeof ServiceLocationSchema>;
export type EstimateDetails = z.infer<typeof EstimateDetailsSchema>;
export type Estimate = z.infer<typeof EstimateSchema>;
