// Íconos de categorías: el perfil guarda el NOMBRE del ícono lucide (string) y
// la UI lo resuelve con este mapa. Si el nombre no existe, cae a Shapes.
import {
  Baby, Car, Clapperboard, Coffee, Dumbbell, GraduationCap, Gift, HeartPulse, Home, PawPrint,
  Plane, Shapes, Shirt, ShoppingCart, Smartphone, User, Utensils, Wrench,
} from 'lucide-react'

export const CATEGORY_ICONS = {
  ShoppingCart, Utensils, Car, Home, HeartPulse, Clapperboard, User, Shapes,
  Shirt, GraduationCap, PawPrint, Gift, Plane, Baby, Dumbbell, Smartphone, Coffee, Wrench,
}

export const categoryIcon = (name) => CATEGORY_ICONS[name] || Shapes

// Paleta para categorías nuevas (colores de dato, no de estado).
export const CATEGORY_COLORS = ['#2F56D9', '#0E7C86', '#7A4CC2', '#B5487A', '#C2671F', '#4B7F2A', '#5B6475', '#9A7B12']

export const DEFAULT_CATEGORIES = [
  { id: 'mercado', label: 'Mercado', icon: 'ShoppingCart', color: '#4B7F2A', budget: null },
  { id: 'comida', label: 'Comida fuera', icon: 'Utensils', color: '#C2671F', budget: null },
  { id: 'transporte', label: 'Transporte', icon: 'Car', color: '#2F56D9', budget: null },
  { id: 'hogar', label: 'Hogar', icon: 'Home', color: '#0E7C86', budget: null },
  { id: 'salud', label: 'Salud', icon: 'HeartPulse', color: '#B5487A', budget: null },
  { id: 'entretenimiento', label: 'Entretenimiento', icon: 'Clapperboard', color: '#7A4CC2', budget: null },
  { id: 'personal', label: 'Personal', icon: 'User', color: '#9A7B12', budget: null },
  { id: 'otros', label: 'Otros', icon: 'Shapes', color: '#5B6475', budget: null },
]
