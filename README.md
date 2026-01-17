# Multi-Vendor E-Commerce Platform

A full-stack **multi-vendor e-commerce web application** that allows multiple sellers to manage products while customers can browse, purchase, and track orders seamlessly.

Built with a modern tech stack focusing on scalability, security, and real-world workflows.

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Node](https://img.shields.io/badge/node-%3E%3D18.0.0-brightgreen)
![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)

---

## 🚀 Features

### User & Customer Features
- 🔐 Secure authentication (OAuth & email-based login)
- 🛍️ Product browsing with advanced categories and filters
- 🛒 Shopping cart & streamlined checkout system
- 💳 Stripe payment integration with secure transactions
- 📦 Real-time order tracking
- 🧾 Complete order history & downloadable invoices

### Multi-Vendor Capabilities
- 🧑‍💼 Comprehensive seller dashboard
- 📦 Product management (add, update, delete, stock control)
- 💰 Vendor-specific orders & earnings analytics
- 📊 Sales reporting and insights

### Admin Panel
- 📊 Platform-wide overview dashboard
- 👥 User & seller management system
- 📦 Product moderation and approval
- 🧾 Complete order monitoring
- 💳 Payment and commission tracking

### System Features
- ⏱️ Background jobs & workflows using **Inngest**
- ☁️ Cloud-ready PostgreSQL database (Neon)
- 🔒 Secure REST APIs with role-based access control
- ⚡ Optimized performance for production deployment
- 🤖 AI-powered product descriptions using OpenAI ⭐
- 📸 Cloud-based image storage with Cloudinary

---

## 🛠️ Tech Stack

### Frontend
- **React** - UI library
- **Tailwind CSS** - Utility-first CSS framework
- **Redux Toolkit** - State management

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **Prisma ORM** - Database toolkit

### Database
- **PostgreSQL** - Primary database
- **Neon** - Serverless Postgres platform

### Integrations & Tools
- **Stripe** - Payment processing
- **Inngest** - Background jobs & workflows
- **Passport.js** - Authentication middleware
- **OpenAI API** - AI-powered product analysis ⭐
- **Cloudinary** - Image storage and optimization
- **REST APIs** - Backend communication

---

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** 18.x or higher
- **npm** or **yarn** package manager
- **PostgreSQL** database (or Neon account)
- **Git** for version control

### Required API Keys
- Stripe account (Secret Key & Webhook Secret)
- Google OAuth credentials (Client ID & Secret)
- Neon database connection string
- Cloudinary account (optional, for image uploads)
- OpenAI API key (optional, for AI features)

---

## ⚙️ Installation & Setup

### 1. Clone the Repository

```bash
git clone https://github.com/ram2005024/ECOM_APP.git
cd ECOM_APP
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Install Prisma (Development)

```bash
npm install prisma@6.3.1 --save-dev
npm install @prisma/client@6.3.1
```

### 4. Initialize Prisma

```bash
npx prisma init
```

### 5. Configure Environment Variables

Create a `.env` file in the root directory:

```env
# Database Configuration
DATABASE_URL="postgresql://user:password@host:5432/database?sslmode=require"

# Stripe Configuration
STRIPE_SECRET_KEY=sk_test_your_stripe_secret_key
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret

# Google OAuth
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret

# Session Secret
SESSION_SECRET=your_random_session_secret

# Cloudinary (Optional)
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# OpenAI (Optional)
OPENAI_API_KEY=sk-your_openai_api_key

# Server Configuration
PORT=8000
NODE_ENV=development
```

### 6. Run Database Migrations

```bash
npx prisma migrate dev --name init
```

### 7. Generate Prisma Client

```bash
npx prisma generate
```

### 8. Setup Inngest Server

```bash
npx --ignore-scripts=false inngest-cli@latest dev -u http://localhost:8000/api/inngest
```

### 9. Run the Development Server

```bash
npm run dev
```

The application should now be running at `http://localhost:8000`

---

## 🔧 Troubleshooting

### Prisma Generate Issues

If `npx prisma generate` fails, try the following solutions:

**Solution 1: Remove Prisma cache**
```bash
# PowerShell
Remove-Item -Recurse -Force .\node_modules\.prisma

# Then regenerate
npx prisma generate
```

**Solution 2: Complete reinstall**
```bash
# PowerShell
Remove-Item -Recurse -Force .\node_modules
Remove-Item -Force .\package-lock.json

# Reinstall dependencies
npm install

# Generate Prisma client
npx prisma generate
```

**Solution 3: Clear npm cache**
```bash
npm cache clean --force
npm install
npx prisma generate
```

### Common Issues

- **Database connection errors**: Verify your `DATABASE_URL` in `.env`
- **Stripe webhook issues**: Ensure webhook secret matches your Stripe dashboard
- **OAuth errors**: Confirm redirect URIs are correctly configured
- **Port conflicts**: Change `PORT` in `.env` if 8000 is occupied

---

## 📂 Project Structure

```
ECOM_APP/
├── src/
│   ├── controllers/          # Request handlers
│   ├── routes/              # API route definitions
│   ├── libs/                # Utility libraries
│   ├── utils/               # Helper functions
│   ├── inngest/             # Background job definitions
│   ├── prisma/              # Database schema & migrations
│   │   ├── schema.prisma
│   │   └── migrations/
│   ├── middleware/          # Custom middleware
│   └── server.js            # Application entry point
├── public/                  # Static assets
├── .env                     # Environment variables
├── .gitignore              # Git ignore rules
├── package.json            # Dependencies & scripts
├── vercel.json             # Vercel deployment config
└── README.md               # Project documentation
```

---

## 🚀 Deployment

### Deploy to Vercel

1. **Push to GitHub**
```bash
git add .
git commit -m "Ready for deployment"
git push origin main
```

2. **Import to Vercel**
   - Go to [Vercel Dashboard](https://vercel.com)
   - Import your GitHub repository
   - Configure environment variables

3. **Add Vercel Configuration**

Create `vercel.json` in root:

```json
{
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/"
    }
  ],
  "env": {
    "DATABASE_URL": "@database_url",
    "STRIPE_SECRET_KEY": "@stripe_secret_key",
    "STRIPE_WEBHOOK_SECRET": "@stripe_webhook_secret"
  }
}
```

4. **Run Build Command**
```bash
npm run build
```

5. **Deploy**
   - Vercel will automatically deploy on push to main branch
   - Update Stripe webhook URL to your production domain
   - Update OAuth redirect URIs

### Database Setup (Neon)

1. Create a Neon project at [neon.tech](https://neon.tech)
2. Copy the connection string
3. Add to Vercel environment variables
4. Run migrations in Vercel:
```bash
npx prisma migrate deploy
```

---

## 📝 Available Scripts

```bash
# Development
npm run dev              # Start development server
npm run dev:inngest      # Start Inngest dev server

# Database
npx prisma studio        # Open Prisma Studio (DB GUI)
npx prisma migrate dev   # Create & apply migration
npx prisma generate      # Generate Prisma Client
npx prisma db push       # Push schema to database

# Production
npm run build           # Build for production
npm start              # Start production server

# Utilities
npm run lint           # Run ESLint
npm test              # Run tests
```

---

## 🎨 UI Credit

- UI design inspired by **GreatStack**
- UI structure and visuals were referenced for learning purposes
- **All backend logic, database design, API implementation, authentication, payment flow, and integrations were implemented independently**

---

## 🔮 Future Improvements

- ⭐ Product reviews & ratings system
- 💸 Automated vendor payout system
- 📊 Advanced analytics dashboard with charts
- 📧 Email & push notification system
- 🔍 Advanced search with Elasticsearch
- 📱 Mobile application (React Native)
- 🌐 Multi-language support (i18n)
- 🚀 Performance optimization for 10,000+ products
- 🤖 AI-powered product recommendations
- 📦 Inventory management automation

---

## 📸 Screenshots



### Customer Interface
<img width="1919" height="986" alt="Screenshot 2026-01-18 001504" src="https://github.com/user-attachments/assets/a6682dc2-1ce0-4b43-8faa-46b1fa95b52f" />
<img width="1911" height="990" alt="Screenshot 2026-01-18 001455" src="https://github.com/user-attachments/assets/03d425d9-1093-4fb9-9952-03b683195d12" />
<img width="1916" height="993" alt="Screenshot 2026-01-18 001449" src="https://github.com/user-attachments/assets/90c023a7-1911-4db3-a01f-56e8ced83ce1" />
<img width="1914" height="995" alt="Screenshot 2026-01-18 001556" src="https://github.com/user-attachments/assets/582489c2-2eda-4655-80d1-65268f1790e4" />


### Vendor Dashboard
<img width="1919" height="996" alt="Screenshot 2026-01-18 001738" src="https://github.com/user-attachments/assets/b92cab22-d734-415d-9f72-b4045b93ed77" />
<img width="1919" height="1000" alt="Screenshot 2026-01-18 001732" src="https://github.com/user-attachments/assets/80b773d8-7a12-4c69-97a6-e4c0c0e40164" />
<img width="1919" height="989" alt="Screenshot 2026-01-18 001752" src="https://github.com/user-attachments/assets/8c3a3f75-edb1-4d03-b173-0413d9684b69" />


### Admin Panel

<img width="1919" height="987" alt="Screenshot 2026-01-18 001927" src="https://github.com/user-attachments/assets/72193be7-41bf-4279-b6f7-647a27a05c1f" />
<img width="1918" height="990" alt="Screenshot 2026-01-18 001921" src="https://github.com/user-attachments/assets/a81293cf-60d7-4fa0-b3a6-5ad4aff42daa" />
<img width="1919" height="987" alt="Screenshot 2026-01-18 001916" src="https://github.com/user-attachments/assets/7d78c7bf-601d-42ac-896f-e5df7c2a06d7" />
<img width="1919" height="986" alt="Screenshot 2026-01-18 001909" src="https://github.com/user-attachments/assets/4657e27d-f5cc-44e8-b871-04a14c705f27" />
<img width="1919" height="989" alt="Screenshot 2026-01-18 001932" src="https://github.com/user-attachments/assets/7e7841b3-d50c-427f-a1bf-e27adf29516a" />

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License 

---

## 👨‍💻 Author

**Ram Sharma**  
B.Sc. Computer Science & Information Technology  
Amrit Campus, Kathmandu, Nepal

### Connect With Me

- 🔗 **GitHub**: [ram2005024](https://github.com/ram2005024)
- 💼 **LinkedIn**: [Ram Sharma](https://www.linkedin.com/in/ram-sharma-7b8426316/)
- 📘 **Facebook**: [Shekhar Sharma](https://www.facebook.com/shekhar.sharma.390674)
- 📧 **Email**: ramsharma2005024@gmail.com

---

## 🤝 Open to Opportunities

I am actively seeking opportunities to work with **real companies on real-world projects**.

### What I Bring
- ✅ Full-stack development expertise
- ✅ Backend systems & API design
- ✅ Modern web technologies
- ✅ Database design & optimization
- ✅ Payment integration experience
- ✅ Cloud deployment knowledge

### My Commitment
- 🚀 Highly motivated and eager to learn
- 💡 Problem-solving mindset
- 🎯 Ready to contribute from day one
- 📈 Growth-oriented approach

**If you are looking for a dedicated and growth-oriented developer, feel free to connect!**

---

## 🙏 Acknowledgments

- **GreatStack** - For UI/UX inspiration
- **Stripe** - For seamless payment integration
- **Neon** - For serverless PostgreSQL hosting
- **Inngest** - For background job processing
- **Vercel** - For deployment platform
- **OpenAI** - For AI capabilities

---

## 📊 Project Stats

- **Development Time**: 3+ months
- **Lines of Code**: 10,000+
- **Database Tables**: 15+
- **API Endpoints**: 50+
- **Technologies Used**: 12+

---

⭐ **If you find this project useful, please give it a star!**

🐛 **Found a bug?** [Open an issue](https://github.com/ram2005024/ECOM_APP/issues)

💬 **Have questions?** Feel free to reach out!

---

**Built with ❤️ by Ram Sharma**
