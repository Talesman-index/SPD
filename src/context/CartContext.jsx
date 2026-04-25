import React, { createContext, useContext, useState, useEffect } from 'react'

const CartContext = createContext()

export const CartProvider = ({ children }) => {
  const [items, setItems] = useState([])        // [{ id, name, price, qty, image }]
  const [isOpen, setIsOpen] = useState(false)   // drawer open/close

  // Persist cart to localStorage
  useEffect(() => {
    const saved = localStorage.getItem('spd_cart_items')
    if (saved) {
      try { setItems(JSON.parse(saved)) } catch {}
    }
  }, [])

  const save = (newItems) => {
    setItems(newItems)
    localStorage.setItem('spd_cart_items', JSON.stringify(newItems))
  }

  const addToCart = (product = {}) => {
    const item = {
      id: product.id || 'spd-x1',
      name: product.name || 'Smart Petri Dish Diagnostic System',
      subtitle: product.subtitle || '3-in-1 Bio-Sensor Platform',
      price: product.price || 149,
      image: product.image || '/smart-petri-dish-render.png',
      qty: product.qty || 1,
    }
    setItems(prev => {
      const existing = prev.find(i => i.id === item.id)
      let next
      if (existing) {
        next = prev.map(i => i.id === item.id ? { ...i, qty: i.qty + item.qty } : i)
      } else {
        next = [...prev, item]
      }
      localStorage.setItem('spd_cart_items', JSON.stringify(next))
      return next
    })
    setIsOpen(true) // auto-open drawer on add
  }

  const removeItem = (id) => {
    save(items.filter(i => i.id !== id))
  }

  const updateQty = (id, qty) => {
    if (qty < 1) return removeItem(id)
    save(items.map(i => i.id === id ? { ...i, qty } : i))
  }

  const clearCart = () => {
    save([])
    localStorage.removeItem('spd_cart_items')
  }

  const cartCount = items.reduce((sum, i) => sum + i.qty, 0)
  const cartTotal = items.reduce((sum, i) => sum + i.price * i.qty, 0)

  return (
    <CartContext.Provider value={{
      items, cartCount, cartTotal,
      isOpen, setIsOpen,
      addToCart, removeItem, updateQty, clearCart
    }}>
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => {
  const context = useContext(CartContext)
  if (!context) throw new Error('useCart must be used within a CartProvider')
  return context
}
