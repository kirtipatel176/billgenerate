import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Estimate, Item } from "@/types/estimate";
import { calculateSubtotal, calculateTotal } from "./calculations";

const initialEstimate: Estimate = {
  id: "draft",
  businessInfo: {
    name: "HYDROCOOL SERVICES",
    services: "AC | RO | GEYSER | WASHING MACHINE",
    proprietor: "Sanjay Patel",
    phone: "+91 78781 29063",
    address: "Ground Floor, Shop No. 3, Parishram Complex,\nGandhinagar–Dabhoda Highway,\nNear GIFT City, Gandhinagar",
  },
  customerInfo: {
    name: "",
    phone: "",
    email: "",
    address: "",
    city: "",
    state: "",
    country: "",
  },
  serviceLocation: {
    name: "",
    phone: "",
    address: "",
  },
  estimateDetails: {
    estimateNumber: "EST-001",
    estimateDate: new Date().toISOString().split("T")[0],
    validUntil: "",
  },
  items: [],
  notes: [
    "1. 1/2\" & 1/4\" Copper Pipes (RR).",
    "2. 1/2\" & 1/4\" Sleeves (A-Flex).",
    "3. 2.5 sq. mm, 4-core cables (Darshan).",
    "4. White pipe tapping.",
  ],
  terms: [
    "1. Payment is required upon completion of work for all 5 floors.",
    "2. If the price of materials increases, the revised (higher) price will apply to this estimate.",
  ],
  discount: 0,
  taxRate: 0,
  subtotal: 0,
  total: 0,
};

interface EstimateStore {
  estimate: Estimate;
  setEstimate: (estimate: Partial<Estimate>) => void;
  updateBusinessInfo: (info: Partial<Estimate["businessInfo"]>) => void;
  updateCustomerInfo: (info: Partial<Estimate["customerInfo"]>) => void;
  updateServiceLocation: (info: Partial<Estimate["serviceLocation"]>) => void;
  updateEstimateDetails: (details: Partial<Estimate["estimateDetails"]>) => void;
  setItems: (items: Item[]) => void;
  addItem: (item: Item) => void;
  updateItem: (id: string, item: Partial<Item>) => void;
  removeItem: (id: string) => void;
  updateFinancials: (discount: number, taxRate: number) => void;
  resetEstimate: (newEstimateNumber: string) => void;
}

export const useEstimateStore = create<EstimateStore>()(
  persist(
    (set, get) => ({
      estimate: initialEstimate,
      setEstimate: (newEst) => set((state) => ({ estimate: { ...state.estimate, ...newEst } })),
      updateBusinessInfo: (info) => set((state) => ({
        estimate: { ...state.estimate, businessInfo: { ...state.estimate.businessInfo, ...info } },
      })),
      updateCustomerInfo: (info) => set((state) => ({
        estimate: { ...state.estimate, customerInfo: { ...state.estimate.customerInfo, ...info } },
      })),
      updateServiceLocation: (info) => set((state) => ({
        estimate: { ...state.estimate, serviceLocation: { ...state.estimate.serviceLocation, ...info } },
      })),
      updateEstimateDetails: (details) => set((state) => ({
        estimate: { ...state.estimate, estimateDetails: { ...state.estimate.estimateDetails, ...details } },
      })),
      setItems: (items) => set((state) => {
        const subtotal = calculateSubtotal(items);
        const total = calculateTotal(subtotal, state.estimate.discount, state.estimate.taxRate);
        return { estimate: { ...state.estimate, items, subtotal, total } };
      }),
      addItem: (item) => set((state) => {
        const items = [...state.estimate.items, item];
        const subtotal = calculateSubtotal(items);
        const total = calculateTotal(subtotal, state.estimate.discount, state.estimate.taxRate);
        return { estimate: { ...state.estimate, items, subtotal, total } };
      }),
      updateItem: (id, itemUpdate) => set((state) => {
        const items = state.estimate.items.map(item =>
          item.id === id ? { ...item, ...itemUpdate } : item
        );
        const subtotal = calculateSubtotal(items);
        const total = calculateTotal(subtotal, state.estimate.discount, state.estimate.taxRate);
        return { estimate: { ...state.estimate, items, subtotal, total } };
      }),
      removeItem: (id) => set((state) => {
        const items = state.estimate.items.filter(item => item.id !== id);
        const subtotal = calculateSubtotal(items);
        const total = calculateTotal(subtotal, state.estimate.discount, state.estimate.taxRate);
        return { estimate: { ...state.estimate, items, subtotal, total } };
      }),
      updateFinancials: (discount, taxRate) => set((state) => {
        const total = calculateTotal(state.estimate.subtotal, discount, taxRate);
        return { estimate: { ...state.estimate, discount, taxRate, total } };
      }),
      resetEstimate: (newEstimateNumber) => set(() => ({
        estimate: {
          ...initialEstimate,
          estimateDetails: {
            ...initialEstimate.estimateDetails,
            estimateNumber: newEstimateNumber,
            estimateDate: new Date().toISOString().split("T")[0],
          }
        },
      })),
    }),
    {
      name: "estimate-storage",
    }
  )
);
