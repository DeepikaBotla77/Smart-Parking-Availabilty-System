export const products = [
  {
    id: "tech-1",
    name: "AeroSound Max ANC Headphones",
    price: 249.99,
    category: "Electronics",
    rating: 4.8,
    reviewsCount: 124,
    description: "Experience pure audio bliss with the AeroSound Max. Featuring industry-leading Active Noise Cancellation (ANC), 45-hour battery life, and high-fidelity 40mm dynamic drivers that deliver rich bass and crisp highs.",
    images: [
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1484704849700-f032a568e944?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=600&q=80"
    ],
    colors: ["Space Gray", "Silver", "Midnight Blue"],
    specs: {
      "Driver Size": "40 mm",
      "Battery Life": "Up to 45 hours",
      "Bluetooth Version": "5.2",
      "Weight": "250g"
    },
    inStock: true,
    featured: true
  },
  {
    id: "tech-2",
    name: "VividView 4K Ultra Short Throw Projector",
    price: 899.99,
    category: "Electronics",
    rating: 4.6,
    reviewsCount: 88,
    description: "Transform your living room into a cinematic haven. The VividView projects a stunning 120-inch 4K UHD image from just inches away from the wall. Features 2500 ANSI lumens, HDR10 support, and integrated Dolby Audio speakers.",
    images: [
      "https://images.unsplash.com/photo-1535016120720-40c646be5580?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?auto=format&fit=crop&w=600&q=80"
    ],
    colors: ["Alabaster White", "Charcoal Black"],
    specs: {
      "Resolution": "3840 x 2160 (4K)",
      "Brightness": "2500 ANSI Lumens",
      "Aspect Ratio": "16:9",
      "Contrast Ratio": "2,000,000:1"
    },
    inStock: true,
    featured: true
  },
  {
    id: "tech-3",
    name: "ClickPro Mechanical Keyboard",
    price: 129.99,
    category: "Electronics",
    rating: 4.7,
    reviewsCount: 245,
    description: "A premium mechanical keyboard designed for coders and writers. Features hot-swappable tactile switches, double-shot PBT keycaps, customizable RGB backlighting, and a solid CNC-aluminum case for zero flex and a premium weight.",
    images: [
      "https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?auto=format&fit=crop&w=600&q=80"
    ],
    colors: ["Retro Grey", "Nordic Dark", "Cyberpunk Pink"],
    specs: {
      "Form Factor": "75% Layout",
      "Switch Type": "Gateron Brown (Tactile)",
      "Connectivity": "Wired USB-C, 2.4GHz Wireless, Bluetooth 5.0",
      "Battery Capacity": "4000 mAh"
    },
    inStock: true,
    featured: false
  },
  {
    id: "fashion-1",
    name: "Classic Wool Overcoat",
    price: 189.99,
    category: "Fashion",
    rating: 4.5,
    reviewsCount: 64,
    description: "Stay warm and look sharp. This classic overcoat is crafted from a premium merino wool blend, featuring a tailored silhouette, notch lapels, three-button closure, and deep interior pockets. Fully lined for comfort and easy layering.",
    images: [
      "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=600&q=80"
    ],
    colors: ["Camel", "Charcoal", "Navy"],
    sizes: ["S", "M", "L", "XL"],
    specs: {
      "Material": "70% Merino Wool, 30% Polyester",
      "Fit": "Slim-regular Tailored",
      "Lining": "100% Viscose",
      "Care": "Dry clean only"
    },
    inStock: true,
    featured: true
  },
  {
    id: "fashion-2",
    name: "Urban Explorer Daypack",
    price: 79.99,
    category: "Fashion",
    rating: 4.4,
    reviewsCount: 112,
    description: "The ultimate companion for daily commutes and weekend getaways. Crafted from water-resistant ballistic nylon, this bag features a dedicated padded 16-inch laptop sleeve, hidden security pocket, and ergonomic shoulder straps.",
    images: [
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?auto=format&fit=crop&w=600&q=80"
    ],
    colors: ["Olive Green", "Matte Black", "Desert Tan"],
    specs: {
      "Capacity": "22 Liters",
      "Material": "1680D Ballistic Nylon",
      "Laptop Sleeve": "Up to 16\" MacBook Pro",
      "Dimensions": "48 x 30 x 15 cm"
    },
    inStock: true,
    featured: false
  },
  {
    id: "fashion-3",
    name: "Minimalist Leather Sneakers",
    price: 119.99,
    category: "Fashion",
    rating: 4.6,
    reviewsCount: 153,
    description: "Versatile sneakers that transition seamlessly from smart-casual offices to weekend outings. Handcrafted from top-grain Italian leather, featuring a durable Margom rubber sole and a cushioned cork insole that molds to your feet over time.",
    images: [
      "https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=600&q=80"
    ],
    colors: ["Crisp White", "Suede Grey", "Tan Leather"],
    sizes: ["8", "9", "10", "11", "12"],
    specs: {
      "Upper": "Full-grain Calfskin Leather",
      "Sole": "100% Natural Rubber",
      "Made in": "Portugal",
      "Insole": "Ortholite with Leather cover"
    },
    inStock: true,
    featured: true
  },
  {
    id: "home-1",
    name: "Serene Aura Ceramic Diffuser",
    price: 45.00,
    category: "Home & Living",
    rating: 4.7,
    reviewsCount: 204,
    description: "Scent your space naturally. Crafted from handmade porcelain, the Serene Aura diffuser uses ultrasonic vibrations to disperse a fine, cooling mist of essential oils into the air. Features ambient warm lighting and automated safety shut-off.",
    images: [
      "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1536924940846-227afb31e2a5?auto=format&fit=crop&w=600&q=80"
    ],
    colors: ["Terracotta", "Stone White", "Basalt Black"],
    specs: {
      "Water Tank": "120 mL",
      "Run Time": "Up to 8 hours (intermittent)",
      "Coverage": "Up to 500 sq ft",
      "Material": "Ceramic and BPA-free Plastic"
    },
    inStock: true,
    featured: false
  },
  {
    id: "home-2",
    name: "Architectural Table Lamp",
    price: 135.00,
    category: "Home & Living",
    rating: 4.8,
    reviewsCount: 42,
    description: "A statement lighting piece combining structural geometry with warm illumination. Features a solid travertine stone base, a brushed brass arm, and a frosted glass globe that diffuses light evenly to create a cozy, premium ambiance.",
    images: [
      "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?auto=format&fit=crop&w=600&q=80"
    ],
    colors: ["Brushed Brass & Travertine"],
    specs: {
      "Height": "45 cm",
      "Base Diameter": "12 cm",
      "Bulb Type": "G9 LED (included)",
      "Cord Length": "1.8 m woven fabric cord"
    },
    inStock: true,
    featured: true
  },
  {
    id: "home-3",
    name: "Organic Waffle Weave Throw Blanket",
    price: 65.00,
    category: "Home & Living",
    rating: 4.9,
    reviewsCount: 312,
    description: "Wrap yourself in pure softness. Made from 100% certified organic cotton, our throw blankets feature a dimensional waffle weave that is lightweight yet beautifully insulating. Pre-washed for a relaxed, textured feel.",
    images: [
      "https://images.unsplash.com/photo-1580301762395-21ce84d00bc6?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1543294001-f7cbfe92237e?auto=format&fit=crop&w=600&q=80"
    ],
    colors: ["Sage Green", "Oatmeal", "Soft Mustard"],
    specs: {
      "Material": "100% Organic Cotton",
      "Dimensions": "130 x 170 cm",
      "Certification": "GOTS Certified",
      "Wash": "Machine washable cold"
    },
    inStock: true,
    featured: false
  },
  {
    id: "fitness-1",
    name: "Apex Adjustable Dumbbell (Single)",
    price: 199.99,
    category: "Fitness & Outdoors",
    rating: 4.7,
    reviewsCount: 167,
    description: "Reclaim your home gym space. The Apex Adjustable Dumbbell replaces 15 individual weights with a smart dial system. Easily adjust the weight from 5 lbs (2.3 kg) to 52.5 lbs (24 kg) in small increments with a simple click.",
    images: [
      "https://images.unsplash.com/photo-1638536532686-d610adfc8e5c?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=600&q=80"
    ],
    colors: ["Black Steel"],
    specs: {
      "Weight Range": "5 to 52.5 lbs (2.3 to 24 kg)",
      "Settings": "15 weight selection settings",
      "Grip Type": "Textured Chrome Ergonomic",
      "Safety": "Dial-lock safety mechanism"
    },
    inStock: true,
    featured: true
  },
  {
    id: "fitness-2",
    name: "HydroFlow Premium Water Bottle",
    price: 39.99,
    category: "Fitness & Outdoors",
    rating: 4.5,
    reviewsCount: 421,
    description: "Designed to keep up with your active lifestyle. Double-walled vacuum insulation keeps your water ice-cold for 24 hours or steaming hot for 12. Comes with an leak-proof straw lid and a durable, slip-resistant powder-coated exterior.",
    images: [
      "https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1523362628745-0c100150b504?auto=format&fit=crop&w=600&q=80"
    ],
    colors: ["Cobalt Blue", "Forest Green", "Midnight Black"],
    specs: {
      "Capacity": "32 oz (950 mL)",
      "Material": "18/8 Pro-Grade Stainless Steel",
      "BPA Free": "Yes",
      "Insulation": "TempShield Double-Wall Vacuum"
    },
    inStock: true,
    featured: false
  },
  {
    id: "fitness-3",
    name: "Trailblazer Lightweight Trekking Poles",
    price: 85.00,
    category: "Fitness & Outdoors",
    rating: 4.6,
    reviewsCount: 74,
    description: "Take the pressure off your knees during long hikes. Made from aerospace-grade 100% carbon fiber, these trekking poles are ultra-lightweight and feature secure metal flip locks for fast length adjustments and moisture-wicking cork grips.",
    images: [
      "https://images.unsplash.com/photo-1590487988256-9ed24133863e?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1473448912268-2022ce9509d8?auto=format&fit=crop&w=600&q=80"
    ],
    colors: ["Carbon Matte"],
    specs: {
      "Material": "100% Carbon Fiber",
      "Weight per pair": "440g",
      "Adjustable Length": "62 to 135 cm",
      "Locking System": "Quick Flick Lock (Metal)"
    },
    inStock: false,
    featured: false
  }
];

export const categories = [
  "All",
  "Electronics",
  "Fashion",
  "Home & Living",
  "Fitness & Outdoors"
];
