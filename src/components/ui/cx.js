import { createElement, isValidElement } from 'react'

// Une clases ignorando falsy: cx('a', cond && 'b') → "a b"
export const cx = (...parts) => parts.filter(Boolean).join(' ')

// Ícono lucide como componente (CalendarDays) o como elemento (<CalendarDays />).
// Siempre strokeWidth 1.75 (docs/SPEC.md, regla de íconos).
export const renderIcon = (icon, size = 20, className) => {
  if (!icon) return null
  if (isValidElement(icon)) return icon
  return createElement(icon, { size, strokeWidth: 1.75, 'aria-hidden': true, className })
}
