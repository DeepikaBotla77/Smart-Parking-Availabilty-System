import { useState } from 'react';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'Order Inquiry',
    message: ''
  });

  const [formSubmitted, setFormSubmitted] = useState(false);
  const [activeFaq, setActiveFaq] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.name.trim() && formData.email.trim() && formData.message.trim()) {
      setFormSubmitted(true);
      setFormData({ name: '', email: '', subject: 'Order Inquiry', message: '' });
      setTimeout(() => setFormSubmitted(false), 5000);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const toggleFaq = (index) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  const faqs = [
    {
      q: 'How long does shipping take?',
      a: 'Standard shipping takes 3-5 business days. Express shipping options (1-2 business days) are available during checkout. Orders placed before 1 PM EST are shipped the same business day.'
    },
    {
      q: 'What is your returns and exchange policy?',
      a: 'We offer free returns and exchanges on all items in new, unworn, and unwashed condition within 30 days of purchase. Original packaging and tags must be intact.'
    },
    {
      q: 'Do you ship internationally?',
      a: 'Yes, we ship to over 50 countries worldwide. International shipping rates and delivery estimates are calculated automatically during the checkout phase.'
    },
    {
      q: 'How can I track my package?',
      a: 'Once your order ships, you will receive a confirmation email containing a tracking number and a direct link to check shipping status updates on the courier’s portal.'
    }
  ];

  return (
    <div className="page-transition max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      
      {/* Page Title */}
      <div className="text-center mb-16">
        <span className="text-xs font-bold uppercase tracking-widest text-brand dark:text-brand-light">
          Get in Touch
        </span>
        <h1 className="text-4xl font-extrabold tracking-tight mt-2 mb-4">We're Here to Help</h1>
        <p className="text-sm text-text-secondary max-w-md mx-auto leading-relaxed">
          Have a question about a product, shipping, or an active order? Reach out to our design team and we'll reply shortly.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 mb-20">
        
        {/* Contact Form Column */}
        <div className="glass-card p-6 sm:p-8 rounded-2xl space-y-6">
          <h3 className="text-base font-extrabold pb-3 border-b border-border-color">Send Us a Message</h3>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold uppercase text-text-secondary mb-1">Your Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full px-4 py-2.5 text-xs rounded-xl custom-input"
                placeholder="Jane Doe"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase text-text-secondary mb-1">Email Address</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full px-4 py-2.5 text-xs rounded-xl custom-input"
                placeholder="jane@example.com"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase text-text-secondary mb-1">Subject</label>
              <select
                name="subject"
                value={formData.subject}
                onChange={handleInputChange}
                className="w-full px-3 py-2.5 text-xs rounded-xl border border-border-color bg-primary text-text-primary custom-input"
              >
                <option value="Order Inquiry">Order Inquiry</option>
                <option value="Product Sizing / Details">Product Sizing / Details</option>
                <option value="Returns &amp; Refund">Returns &amp; Refund</option>
                <option value="Brand Partnership">Brand Partnership</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase text-text-secondary mb-1">Message</label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                rows="5"
                className="w-full px-4 py-2.5 text-xs rounded-xl custom-input resize-none"
                placeholder="Describe your request in detail..."
                required
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-brand hover:bg-brand-dark text-xs font-semibold text-white rounded-xl transition-all shadow-md shadow-brand/20 cursor-pointer text-center"
            >
              Send Message
            </button>
          </form>

          {formSubmitted && (
            <div className="bg-brand/10 border border-brand/20 text-brand text-xs font-semibold px-4 py-3.5 rounded-xl animate-fade-in text-center">
              Message sent successfully! We will get back to you within 24 hours.
            </div>
          )}
        </div>

        {/* Contact Details & Map Column */}
        <div className="flex flex-col justify-between gap-8">
          {/* Info cards */}
          <div className="space-y-6">
            <h3 className="text-base font-extrabold pb-3 border-b border-border-color">Contact Information</h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="flex gap-3 items-start">
                <div className="w-9 h-9 rounded-lg bg-brand/10 text-brand flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.94.725l.548 2.2a1 1 0 01-.321.988l-1.305.98a10.582 10.582 0 004.872 4.872l.98-1.305a1 1 0 01.988-.321l2.2.548a1 1 0 01.725.94V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <div>
                  <h4 className="text-xs font-bold uppercase text-text-primary mb-0.5">Phone Support</h4>
                  <p className="text-xs text-text-secondary">+1 (800) 555-8423</p>
                  <p className="text-[10px] text-text-secondary mt-0.5">Mon - Fri: 9 AM - 6 PM EST</p>
                </div>
              </div>

              <div className="flex gap-3 items-start">
                <div className="w-9 h-9 rounded-lg bg-brand/10 text-brand flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <h4 className="text-xs font-bold uppercase text-text-primary mb-0.5">Email Inquiries</h4>
                  <p className="text-xs text-text-secondary hover:text-brand transition-colors">
                    <a href="mailto:support@vibe-shop.com">support@vibe-shop.com</a>
                  </p>
                  <p className="text-[10px] text-text-secondary mt-0.5">Response within 1 business day</p>
                </div>
              </div>

              <div className="flex gap-3 items-start sm:col-span-2">
                <div className="w-9 h-9 rounded-lg bg-brand/10 text-brand flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div>
                  <h4 className="text-xs font-bold uppercase text-text-primary mb-0.5">Design Headquarters</h4>
                  <p className="text-xs text-text-secondary">420 Minimalist Way, Brooklyn, NY 11201</p>
                  <p className="text-[10px] text-text-secondary mt-0.5">Visits by appointment only</p>
                </div>
              </div>
            </div>
          </div>

          {/* Graphic Placeholder Mock Map (Premium design) */}
          <div className="h-56 w-full rounded-2xl overflow-hidden bg-secondary relative border border-border-color flex items-center justify-center text-center">
            {/* Aesthetic Grid Map Background */}
            <div className="absolute inset-0 opacity-15 dark:opacity-20 bg-[radial-gradient(#6366f1_1px,transparent_1px)] [background-size:16px_16px]" />
            <div className="absolute w-28 h-28 rounded-full bg-brand/5 blur-xl animate-pulse" />
            
            <div className="relative z-10 p-6">
              <div className="w-8 h-8 rounded-full bg-brand text-white flex items-center justify-center mx-auto mb-2.5 shadow-md shadow-brand/35">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                </svg>
              </div>
              <h4 className="text-xs font-bold text-text-primary">Interactive Map Placeholder</h4>
              <p className="text-[10px] text-text-secondary mt-1">Brooklyn Studio, New York</p>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ Accordion Section */}
      <section className="border-t border-border-color pt-16">
        <h2 className="text-2xl font-bold tracking-tight text-center mb-10">Frequently Asked Questions</h2>
        
        <div className="max-w-3xl mx-auto space-y-4">
          {faqs.map((faq, i) => (
            <div
              key={i}
              className="glass-card rounded-2xl overflow-hidden border border-border-color"
            >
              <button
                onClick={() => toggleFaq(i)}
                className="w-full px-6 py-4 text-left font-bold text-xs sm:text-sm text-text-primary flex justify-between items-center hover:bg-black/5 dark:hover:bg-white/5 cursor-pointer"
              >
                <span>{faq.q}</span>
                <svg
                  className={`w-4 h-4 text-text-secondary transition-transform duration-200 ${
                    activeFaq === i ? 'rotate-180 text-brand' : ''
                  }`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {activeFaq === i && (
                <div className="px-6 pb-4 pt-1 text-xs text-text-secondary leading-relaxed border-t border-border-color/30 animate-fade-in">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}
