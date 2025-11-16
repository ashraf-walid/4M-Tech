# 🛒 Buy Tech Store

**Buy Tech Store** is a modern e-commerce web app for selling laptops and computer devices.  
It is built with **Next.js (App Router)**, **MongoDB**, **Zustand**, and **Tailwind CSS**,  
and deployed on **Railway**.

---

## 🚀 Features

- ⚡ Fast and responsive UI built with Next.js.
- 🧩 Global state management using Zustand.
- 🗄️ MongoDB database for products, users, and orders.
- 🖼️ Cloudinary integration for image storage and optimization.
- 🔑 Authentication using NextAuth (planned).
- 💰 Cash on delivery (COD) payment system.
- 🛍️ Shopping cart and order management.
- 🔎 Dynamic search and category filtering.
- 🌙 Fully RTL Arabic layout support.

---

## 🧠 Tech Stack

| Technology | Purpose |
|-------------|----------|
| **Next.js 14 (App Router)** | Frontend & API routes |
| **MongoDB (Mongoose)** | Database for products & users |
| **Zustand** | Global state management |
| **Tailwind CSS** | Styling and responsive design |
| **Cloudinary** | Image hosting & optimization |
| **NextAuth (planned)** | Authentication system |
| **Railway** | Hosting and deployment |

---

## ⚙️ Installation

1. **Clone the repository**
   
   git clone https://github.com/ashraf-walid/Buy-Tech-Store.git

   cd Buy-Tech-Store

   MONGODB_URI="your_mongodb_connection_string"

   CLOUDINARY_CLOUD_NAME=your_cloud_name
   CLOUDINARY_API_KEY=your_api_key
   CLOUDINARY_API_SECRET=your_api_secret

   NEXTAUTH_SECRET=your_secret_key


  🔒 Security

    Secure environment variables in .env.local.

    Server-side API validation using Next.js Route Handlers.

    Protected admin actions (add/edit/delete products).

    No sensitive data exposed on the client side.

  📦 Deployment

    Hosted on Railway

    Environment variables managed via Railway dashboard


  👨‍💻 Developer

    Ashraf
    Frontend Developer
    📧 Email: ashrafelgezery2014@gmail.com

    🌐 Portfolio: https://ashraf-portfolio-seven.vercel.app/