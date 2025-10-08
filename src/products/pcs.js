// PC And All In One Offers
const pcAndAllInOneOffers = [
  {
    brand: "ASUS",
    model: "PENTIUM 7th Gen",
    cpu: "Intel Pentium 7th Gen",
    storage: "SSD 128GB + HDD 500GB",
    ram: "8GB DDR4",
    gpu: null,
    price: 4500,
    extraFeatures: [
      "مزودة براك متنقل أصلي",
      "كيسة جبارة",
      "باور سبلاي قوي جدًا",
      "إمكانية التحديث"
    ]
  },
  {
    brand: "HP",
    model: "600 G3",
    cpu: "Intel Core i5 7th Gen",
    storage: "SSD 128GB + HDD 500GB",
    ram: null,
    gpu: null,
    price: 6000,
    extraFeatures: ["حلويات وشياكة"]
  },
  {
    brand: "FSC",
    model: "PC",
    cpu: "Intel Core i3-8100",
    storage: "SSD M.2 128GB + HDD 500GB",
    ram: "8GB",
    gpu: "Intel Integrated",
    price: 4999,
    extraFeatures: ["المازربورد جيل ثامن", "مناسب للشركات والمشاريع"]
  },
  {
    brand: "HP",
    model: "800 G2",
    cpu: "Intel Core i5 6th Gen",
    storage: "SSD 200GB + HDD 500GB",
    ram: "8GB DDR4",
    gpu: "Intel Integrated",
    price: 6500,
    extraFeatures: ["كيسة جميلة جدًا جدًا جدًا", "جيل سادس", "تقبل أي تحديث"]
  },
  {
    brand: "HP",
    model: "705 G4 Tiny",
    cpu: "AMD Ryzen 5 2400",
    storage: "SSD 256GB",
    ram: "8GB DDR4",
    gpu: null,
    price: 6500,
    extraFeatures: []
  },
  {
    brand: "HP",
    model: "Z440",
    cpu: null,
    storage: null,
    ram: null,
    gpu: null,
    price: null,
    extraFeatures: [
      "كيسة Workstation جبارة للمهام الشاقة",
      "مزودة بمحول 700 وات",
      "تقبل جميع أنواع التحديث والتطوير",
      "تدعم مساحات تخزين أكبر",
      "تدعم رامات إضافية",
      "تدعم كروت شاشة متعددة",
      "متوفرة بعدة معالجات تناسب كل الاستخدامات والشرائح السعرية"
    ]
  }
];

const xeonWorkstations = [
  {
    brand: "HP",
    model: "Z440",
    cpu: "Xeon E5-1603",
    ram: "8GB",
    gpu: "1GB",
    storage: "SSD 128GB + HDD 500GB",
    condition: "Used",
    category: "Workstation",
    price: 7000
  },
  {
    brand: "HP",
    model: "Z440",
    cpu: "Xeon E5-2670",
    ram: "8GB",
    gpu: "1GB",
    storage: "SSD 128GB + HDD 500GB",
    condition: "Used",
    category: "Workstation",
    price: 8000
  },
  {
    brand: "HP",
    model: "Z440",
    cpu: "Xeon E5-2670",
    ram: "8GB",
    gpu: "2GB GTX",
    storage: "SSD 128GB + HDD 500GB",
    condition: "Used",
    category: "Workstation",
    price: 9999
  },
  {
    brand: "HP",
    model: "Z440",
    cpu: "Xeon E5-2680",
    ram: "8GB",
    gpu: "2GB K2000",
    storage: "SSD 128GB + HDD 500GB",
    condition: "Used",
    category: "Workstation",
    price: 9999
  },
  {
    brand: "HP",
    model: "Z440",
    cpu: "Xeon E5-2680",
    ram: "16GB",
    gpu: "4GB K2200",
    storage: "SSD 128GB + HDD 500GB",
    condition: "Used",
    category: "Workstation",
    price: 11000
  },
  {
    brand: "HP",
    model: "Z440",
    cpu: "Xeon E5-2680",
    ram: "16GB",
    gpu: "6GB GTX 1060",
    storage: "SSD 128GB + HDD 500GB",
    condition: "Used",
    category: "Workstation",
    price: 13500
  },
  {
    brand: "HP",
    model: "Z440",
    cpu: "Xeon E5-2697",
    ram: "32GB",
    gpu: "RTX 3050",
    storage: "SSD 2000GB",
    condition: "Used",
    category: "Workstation",
    price: 26000
  }
];


const specialGamingAndWorkstations = [
  {
    id: 1,
    brand: "HP",
    model: "Z840",
    cpu: "Xeon Dual CPU 2×2697",
    ram: "64GB DDR4",
    gpu: "RTX 3050",
    storage: "SSD 2000GB",
    condition: "Used",
    category: "Workstation",
    price: 45000,
    stock: 3,
    images: ["/images/z840.jpg"],
    tags: ["Xeon", "Workstation", "High Performance"],
    description: "مواصفات خاصة جبارة جداً"
  },
  {
    id: 2,
    brand: "Custom Build",
    cpu: "Ryzen 5 4650G",
    ram: "8GB",
    gpu: "8GB (Integrated)",
    storage: "SSD 128GB + HDD 500GB",
    condition: "New",
    category: "Gaming PC",
    price: 10000,
    stock: 5,
    images: ["/images/ryzen5-4650g.jpg"],
    tags: ["Ryzen", "Gaming", "Budget"]
  },
  {
    id: 3,
    brand: "Custom Build",
    cpu: "Ryzen 7 4700S",
    ram: "16GB",
    gpu: "Integrated",
    storage: "SSD 128GB + HDD 500GB",
    condition: "New",
    category: "Gaming PC",
    price: 11000,
    stock: 4,
    images: ["/images/ryzen7-4700s.jpg"],
    tags: ["Ryzen", "Gaming", "High Performance"]
  },
  {
    id: 4,
    brand: "Custom Build",
    cpu: "Ryzen 5 2600 6-Core",
    ram: "8GB",
    gpu: "4GB GT",
    storage: "SSD 128GB + HDD 500GB",
    condition: "New",
    category: "Gaming PC",
    price: 12000,
    stock: 2,
    images: ["/images/ryzen5-2600.jpg"],
    tags: ["Ryzen", "Gaming", "Mid Range"]
  },
  {
    id: 5,
    brand: "Custom Build",
    cpu: "Ryzen 5 5600G 6-Core",
    ram: "8GB",
    gpu: "Integrated",
    storage: "SSD 128GB + HDD 500GB",
    condition: "New",
    category: "Gaming PC",
    price: 14000,
    stock: 3,
    images: ["/images/ryzen5-5600g.jpg"],
    tags: ["Ryzen", "Gaming", "Latest"]
  },
  {
    id: 6,
    brand: "GPU",
    model: "RTX 3050",
    gpu: "8GB",
    category: "Graphics Card",
    price: 13500,
    stock: 10,
    images: ["/images/rtx-3050.jpg"],
    tags: ["GPU", "RTX", "Gaming"]
  },
  {
    id: 7,
    brand: "GPU",
    model: "RTX 3060",
    gpu: "12GB",
    category: "Graphics Card",
    price: 16500,
    stock: 8,
    images: ["/images/rtx-3060.jpg"],
    tags: ["GPU", "RTX", "High Performance"]
  }
];

export { pcAndAllInOneOffers };
export { xeonWorkstations };  
export { specialGamingAndWorkstations };  
