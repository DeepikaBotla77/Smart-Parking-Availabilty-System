import { useLocation, Link, Navigate } from 'react-router-dom';

export default function OrderSuccessPage() {
  const location = useLocation();
  const order = location.state?.orderSummary;

  // Fallback if accessed directly without completing checkout
  if (!order) {
    return <Navigate to="/shop" replace />;
  }

  return (
    <div className="page-transition max-w-3xl mx-auto px-4 py-16 sm:py-24 text-center">
      {/* Success Animation Banner */}
      <div className="w-20 h-20 rounded-full bg-green-500/10 border border-green-500/30 flex items-center justify-center mx-auto mb-8 animate-bounce">
        <svg className="w-10 h-10 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
        </svg>
      </div>

      <span className="text-xs font-bold uppercase tracking-widest text-brand dark:text-brand-light">
        Payment Successful
      </span>
      <h1 className="text-4xl font-extrabold tracking-tight mt-2 mb-4">
        Thank You for Your Order!
      </h1>
      <p className="text-sm text-text-secondary max-w-md mx-auto leading-relaxed mb-10">
        Your order has been received and is currently being processed. A receipt and shipping updates have been sent to your email.
      </p>

      {/* Delivery Stepper Tracker (Premium Visual) */}
      <div className="glass-card p-6 sm:p-8 rounded-2xl mb-8 text-left space-y-6">
        <h3 className="text-sm font-extrabold pb-3 border-b border-border-color">Order Tracker</h3>
        
        {/* Stepper */}
        <div className="grid grid-cols-4 relative">
          {/* Stepper bar */}
          <div className="absolute top-3.5 left-0 right-0 h-1 bg-border-color -z-10" />
          <div className="absolute top-3.5 left-0 w-[33%] h-1 bg-brand -z-10" />

          {/* Steps */}
          <div className="text-center flex flex-col items-center">
            <div className="w-8 h-8 rounded-full bg-brand text-white flex items-center justify-center text-xs font-bold border-4 border-secondary shadow-sm">
              1
            </div>
            <span className="text-[10px] font-bold text-text-primary mt-2">Placed</span>
          </div>

          <div className="text-center flex flex-col items-center">
            <div className="w-8 h-8 rounded-full bg-brand text-white flex items-center justify-center text-xs font-bold border-4 border-secondary shadow-sm">
              2
            </div>
            <span className="text-[10px] font-bold text-text-primary mt-2">Processing</span>
          </div>

          <div className="text-center flex flex-col items-center">
            <div className="w-8 h-8 rounded-full bg-secondary text-text-secondary flex items-center justify-center text-xs font-bold border-4 border-border-color shadow-sm">
              3
            </div>
            <span className="text-[10px] font-bold text-text-secondary mt-2">Shipped</span>
          </div>

          <div className="text-center flex flex-col items-center">
            <div className="w-8 h-8 rounded-full bg-secondary text-text-secondary flex items-center justify-center text-xs font-bold border-4 border-border-color shadow-sm">
              4
            </div>
            <span className="text-[10px] font-bold text-text-secondary mt-2">Delivered</span>
          </div>
        </div>
      </div>

      {/* Details Box */}
      <div className="glass-card p-6 sm:p-8 rounded-2xl text-left space-y-4 mb-10">
        <h3 className="text-sm font-extrabold pb-3 border-b border-border-color flex justify-between">
          <span>Order Details</span>
          <span className="text-brand dark:text-brand-light font-black">{order.orderNumber}</span>
        </h3>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-text-secondary">
          <div>
            <span className="block font-bold text-text-primary mb-1">Customer Details</span>
            <span>{order.customerName}</span>
          </div>
          <div>
            <span className="block font-bold text-text-primary mb-1">Total Paid</span>
            <span className="font-extrabold text-text-primary text-sm">${order.total.toFixed(2)}</span>
          </div>
          <div className="sm:col-span-2">
            <span className="block font-bold text-text-primary mb-1">Delivery Address</span>
            <span>{order.deliveryAddress}</span>
          </div>
          <div>
            <span className="block font-bold text-text-primary mb-1">Estimated Delivery</span>
            <span className="font-semibold text-brand dark:text-brand-light">{order.estimatedDelivery}</span>
          </div>
        </div>
      </div>

      {/* CTA Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Link
          to="/shop"
          className="px-8 py-3.5 bg-brand hover:bg-brand-dark text-xs font-semibold text-white rounded-xl transition-all shadow-md shadow-brand/20 cursor-pointer"
        >
          Continue Shopping
        </Link>
        <Link
          to="/"
          className="px-8 py-3.5 bg-secondary hover:bg-black/5 dark:hover:bg-white/5 border border-border-color text-xs font-semibold text-text-primary rounded-xl transition-all cursor-pointer"
        >
          Back to Home
        </Link>
      </div>

    </div>
  );
}
