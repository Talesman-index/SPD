import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Plus, Minus, ShoppingCart, ArrowUpRight, Trash2 } from 'lucide-react'
import { useCart } from '../../context/CartContext'

const CartDrawer = () => {
  const { items, isOpen, setIsOpen, cartTotal, removeItem, updateQty, clearCart } = useCart()

  return (
    <>
      {/* Backdrop */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-indigo-950/60 backdrop-blur-sm z-[300]"
            onClick={() => setIsOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="drawer"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="fixed top-0 right-0 h-full w-full max-w-[480px] bg-white z-[400] flex flex-col shadow-2xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-8 border-b border-indigo-50">
              <div>
                <h2 className="text-2xl font-black text-indigo-950 uppercase italic tracking-tighter">Your Cart</h2>
                <p className="text-[11px] font-black text-indigo-950/30 uppercase tracking-[0.2em] mt-1">
                  {items.length === 0 ? 'No items' : `${items.reduce((s, i) => s + i.qty, 0)} item${items.reduce((s, i) => s + i.qty, 0) > 1 ? 's' : ''}`}
                </p>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="w-12 h-12 rounded-full bg-indigo-50 flex items-center justify-center text-indigo-950 hover:bg-indigo-900 hover:text-white transition-all duration-300"
              >
                <X size={22} />
              </button>
            </div>

            {/* Items */}
            <div className="flex-grow overflow-y-auto px-8 py-6 space-y-6">
              <AnimatePresence>
                {items.length === 0 ? (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex flex-col items-center justify-center h-64 gap-6"
                  >
                    <div className="w-20 h-20 rounded-full bg-indigo-50 flex items-center justify-center text-indigo-950/20">
                      <ShoppingCart size={36} />
                    </div>
                    <div className="text-center">
                      <p className="text-lg font-black text-indigo-950 mb-2">No items found.</p>
                      <p className="text-[10px] font-black text-indigo-950/40 uppercase tracking-widest">Continue Shopping</p>
                    </div>
                  </motion.div>
                ) : (
                  items.map((item) => (
                    <motion.div
                      key={item.id}
                      layout
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, x: 40 }}
                      transition={{ duration: 0.3 }}
                      className="flex gap-6 p-6 bg-indigo-50/50 rounded-[28px] group border border-indigo-100/50"
                    >
                      {/* Product image */}
                      <div className="w-20 h-20 rounded-[20px] bg-indigo-900 flex-shrink-0 overflow-hidden flex items-center justify-center">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-16 h-auto object-contain"
                        />
                      </div>

                      {/* Details */}
                      <div className="flex-grow min-w-0">
                        <p className="text-sm font-black text-indigo-950 leading-snug mb-1">{item.name}</p>
                        <p className="text-[11px] font-black text-indigo-950/40 uppercase tracking-wide mb-4">{item.subtitle}</p>
                        <div className="flex items-center justify-between">
                          {/* Qty */}
                          <div className="flex items-center gap-3 bg-white rounded-full px-2 py-1 shadow-sm">
                            <button
                              onClick={() => updateQty(item.id, item.qty - 1)}
                              className="w-7 h-7 rounded-full flex items-center justify-center text-indigo-950 hover:bg-indigo-900/10 transition-colors"
                            >
                              <Minus size={14} />
                            </button>
                            <span className="text-sm font-black text-indigo-950 w-4 text-center">{item.qty}</span>
                            <button
                              onClick={() => updateQty(item.id, item.qty + 1)}
                              className="w-7 h-7 rounded-full flex items-center justify-center text-indigo-950 hover:bg-indigo-900/10 transition-colors"
                            >
                              <Plus size={14} />
                            </button>
                          </div>
                          {/* Price */}
                          <span className="text-base font-black text-indigo-950">
                            ${(item.price * item.qty).toFixed(2)}
                          </span>
                        </div>
                      </div>

                      {/* Remove */}
                      <button
                        onClick={() => removeItem(item.id)}
                        className="opacity-0 group-hover:opacity-100 transition-opacity text-indigo-950/30 hover:text-red-500 flex-shrink-0 self-start mt-1"
                      >
                        <Trash2 size={16} />
                      </button>
                    </motion.div>
                  ))
                )}
              </AnimatePresence>
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="p-8 border-t border-indigo-50 space-y-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-[10px] font-black text-indigo-950/40 uppercase tracking-widest">Subtotal</span>
                  <span className="text-2xl font-black text-indigo-950 tracking-tighter">${cartTotal.toFixed(2)} USD</span>
                </div>

                <button className="w-full h-16 rounded-2xl bg-indigo-900 text-white font-black uppercase tracking-widest flex items-center justify-center gap-4 hover:bg-petri-500 transition-all shadow-xl shadow-indigo-900/10 group text-xs">
                  Continue to Checkout
                  <ArrowUpRight size={20} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </button>

                <button
                  onClick={clearCart}
                  className="w-full text-center text-[10px] font-black text-indigo-950/20 uppercase tracking-[0.2em] hover:text-red-500 transition-colors py-2"
                >
                  Clear Cart
                </button>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default CartDrawer
