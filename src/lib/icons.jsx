import {
  Home, UtensilsCrossed, Car, Zap, Heart, Clapperboard, Shirt, Wallet,
  ShoppingCart, Gift, Plane, PawPrint, BookOpen, Dumbbell, Baby, Tag,
} from "lucide-react";

// Set curado de íconos flat para categorías. Se guarda el nombre en category.icon.
export const CATEGORY_ICONS = {
  home: Home,
  utensils: UtensilsCrossed,
  car: Car,
  zap: Zap,
  heart: Heart,
  film: Clapperboard,
  shirt: Shirt,
  wallet: Wallet,
  cart: ShoppingCart,
  gift: Gift,
  plane: Plane,
  paw: PawPrint,
  book: BookOpen,
  dumbbell: Dumbbell,
  baby: Baby,
  tag: Tag,
};

// Perfiles creados antes del cambio a íconos: se infiere por el id de la categoría.
const ICON_BY_LEGACY_ID = {
  vivienda: "home",
  alimentacion: "utensils",
  transporte: "car",
  servicios: "zap",
  salud: "heart",
  educacion: "book",
  entretenimiento: "film",
  ropa: "shirt",
  otros: "wallet",
};

// Monocromo a propósito: el color de la categoría solo se usa en las barras.
export function CategoryIcon({ category, size = 16, className = "text-ink2" }) {
  const name = category?.icon || ICON_BY_LEGACY_ID[category?.id] || "tag";
  const Icon = CATEGORY_ICONS[name] || Tag;
  return <Icon size={size} className={className} strokeWidth={2} />;
}
