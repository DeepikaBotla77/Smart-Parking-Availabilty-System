import { Link } from 'react-router-dom';

export default function AboutPage() {
  const values = [
    {
      title: 'Design First',
      desc: 'We believe that everyday tools and items should be visually inspiring and ergonomically perfect.'
    },
    {
      title: 'Sustainable Sourcing',
      desc: 'Our materials are certified organic and ethically sourced from local artisans across Europe and Japan.'
    },
    {
      title: 'Premium Longevity',
      desc: 'We discard the throwaway culture. Every item we design is tested to withstand years of active use.'
    }
  ];

  const milestones = [
    { year: '2024', title: 'Studio Inception', desc: 'VIBE started as a small design project in Brooklyn, New York, aiming to create aesthetic home tech.' },
    { year: '2025', title: 'Global Sourcing', desc: 'Expanded catalog to include premium apparel and functional organic homeware from overseas partners.' },
    { year: '2026', title: 'E-Shop Platform Launch', desc: 'Launched our direct-to-consumer digital shop with responsive global shipping.' }
  ];

  return (
    <div className="page-transition max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      
      {/* Intro Header */}
      <div className="max-w-3xl mb-16">
        <span className="text-xs font-bold uppercase tracking-widest text-brand dark:text-brand-light">
          Our Brand Story
        </span>
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight mt-2 mb-6 leading-tight">
          Crafting visual harmony <br />
          &amp; functional minimalism.
        </h1>
        <p className="text-sm sm:text-base text-text-secondary leading-relaxed">
          At VIBE, we curate and create premium goods designed to bring aesthetic comfort and superior utility to your everyday life. From audio tech to organic fabrics, our focus remains on clean geometries, sustainable fabrics, and timeless design.
        </p>
      </div>

      {/* Values Cards */}
      <section className="mb-20">
        <h2 className="text-xl font-bold tracking-tight mb-8">Our Core Principles</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {values.map((v, i) => (
            <div key={i} className="glass-card p-6 rounded-2xl">
              <h3 className="text-base font-bold mb-2 text-text-primary">{v.title}</h3>
              <p className="text-xs text-text-secondary leading-relaxed">{v.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-secondary/50 rounded-3xl border border-border-color p-8 sm:p-12 mb-20">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div>
            <span className="block text-3xl font-extrabold text-brand dark:text-brand-light">12k+</span>
            <span className="text-[10px] uppercase font-bold text-text-secondary tracking-wider mt-1 block">Orders Shipped</span>
          </div>
          <div>
            <span className="block text-3xl font-extrabold text-brand dark:text-brand-light">99.2%</span>
            <span className="text-[10px] uppercase font-bold text-text-secondary tracking-wider mt-1 block">Satisfaction Score</span>
          </div>
          <div>
            <span className="block text-3xl font-extrabold text-brand dark:text-brand-light">100%</span>
            <span className="text-[10px] uppercase font-bold text-text-secondary tracking-wider mt-1 block">Organic Cotton</span>
          </div>
          <div>
            <span className="block text-3xl font-extrabold text-brand dark:text-brand-light">24/7</span>
            <span className="text-[10px] uppercase font-bold text-text-secondary tracking-wider mt-1 block">Customer Care</span>
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="mb-20">
        <h2 className="text-xl font-bold tracking-tight mb-10">Our Evolution</h2>
        <div className="max-w-2xl space-y-8">
          {milestones.map((m, i) => (
            <div key={i} className="flex gap-6">
              <div className="flex flex-col items-center">
                <div className="w-8 h-8 rounded-full bg-brand text-white text-xs font-bold flex items-center justify-center shadow-md">
                  {m.year.slice(2)}
                </div>
                {i < milestones.length - 1 && (
                  <div className="w-px flex-1 mt-3 bg-border-color" />
                )}
              </div>
              <div className="pb-4">
                <span className="text-[10px] font-bold text-brand dark:text-brand-light uppercase">{m.year}</span>
                <h4 className="text-sm font-extrabold text-text-primary mt-0.5 mb-1.5">{m.title}</h4>
                <p className="text-xs text-text-secondary leading-relaxed">{m.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Call to Action */}
      <section className="glass-card text-center p-8 sm:p-12 rounded-3xl">
        <h2 className="text-2xl font-bold tracking-tight mb-3">Ready to Upgrade Your Space?</h2>
        <p className="text-xs text-text-secondary max-w-sm mx-auto leading-relaxed mb-6">
          Browse our collections of design-forward tech, durable apparel, and organic living essentials.
        </p>
        <Link
          to="/shop"
          className="inline-block px-8 py-3.5 bg-brand hover:bg-brand-dark text-xs font-semibold text-white rounded-xl transition-all shadow-md shadow-brand/20 cursor-pointer"
        >
          Browse Shop
        </Link>
      </section>

    </div>
  );
}
