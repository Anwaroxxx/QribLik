<div align="center">

<br/>

<img src="https://img.shields.io/badge/version-0.0.0-6366f1?style=for-the-badge&labelColor=0f172a" />
<img src="https://img.shields.io/badge/status-active-22c55e?style=for-the-badge&labelColor=0f172a" />
<img src="https://img.shields.io/badge/license-MIT-f59e0b?style=for-the-badge&labelColor=0f172a" />

<br/><br/>

```
 ██████╗ ██████╗ ██╗██████╗ ██╗     ██╗██╗  ██╗
██╔═══██╗██╔══██╗██║██╔══██╗██║     ██║██║ ██╔╝
██║   ██║██████╔╝██║██████╔╝██║     ██║█████╔╝ 
██║▄▄ ██║██╔══██╗██║██╔══██╗██║     ██║██╔═██╗ 
╚██████╔╝██║  ██║██║██████╔╝███████╗██║██║  ██╗
 ╚══▀▀═╝ ╚═╝  ╚═╝╚═╝╚═════╝ ╚══════╝╚═╝╚═╝  ╚═╝
```

### *Connect Locally. Exchange Freely.*

**Qriblik** is a community-driven local exchange platform that connects neighbors to trade skills, services, and goods — powered by an interactive map, real-time messaging, and AI-assisted publishing.

<br/>

---

</div>

<br/>

## ✦ Tech Stack

<div align="center">

<br/>

[![React](https://img.shields.io/badge/React_19-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite_7-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS_4-0F172A?style=for-the-badge&logo=tailwindcss&logoColor=38BDF8)](https://tailwindcss.com/)
[![React Router](https://img.shields.io/badge/React_Router_7-CA4245?style=for-the-badge&logo=reactrouter&logoColor=white)](https://reactrouter.com/)

[![Framer Motion](https://img.shields.io/badge/Framer_Motion-0055FF?style=for-the-badge&logo=framer&logoColor=white)](https://www.framer.com/motion/)
[![GSAP](https://img.shields.io/badge/GSAP_3-88CE02?style=for-the-badge&logo=greensock&logoColor=white)](https://gsap.com/)
[![Three.js](https://img.shields.io/badge/Three.js-000000?style=for-the-badge&logo=threedotjs&logoColor=white)](https://threejs.org/)
[![Leaflet](https://img.shields.io/badge/Leaflet-199900?style=for-the-badge&logo=leaflet&logoColor=white)](https://leafletjs.com/)

[![Axios](https://img.shields.io/badge/Axios-5A29E4?style=for-the-badge&logo=axios&logoColor=white)](https://axios-http.com/)
[![EmailJS](https://img.shields.io/badge/EmailJS-F4A261?style=for-the-badge&logo=gmail&logoColor=white)](https://www.emailjs.com/)
[![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://vercel.com/)
[![ESLint](https://img.shields.io/badge/ESLint-4B32C3?style=for-the-badge&logo=eslint&logoColor=white)](https://eslint.org/)

<br/>

</div>

---

<br/>

## ✦ Features

<br/>

```
┌─────────────────────────────────────────────────────────────────┐
│                        CORE FEATURES                            │
├──────────────────────┬──────────────────────────────────────────┤
│  🗺  Interactive Map  │  Discover local offers around you.       │
│                      │  Accept an offer → land directly in DMs. │
├──────────────────────┼──────────────────────────────────────────┤
│  🤖  AI Post Creator │  AI-assisted publishing for faster,      │
│                      │  better-written service posts.           │
├──────────────────────┼──────────────────────────────────────────┤
│  💬  Real-Time DMs   │  Chat with users instantly. Chatbot      │
│                      │  assistant built into your inbox.        │
├──────────────────────┼──────────────────────────────────────────┤
│  👤  Rich Profiles   │  Custom avatars, auth-linked data,       │
│                      │  redeemable options & follow system.     │
├──────────────────────┼──────────────────────────────────────────┤
│  🌙  Dark Mode       │  Full dark mode across every page        │
│                      │  and component.                          │
├──────────────────────┼──────────────────────────────────────────┤
│  📱  Fully Responsive│  Pixel-perfect on mobile, tablet,        │
│                      │  and desktop — every single page.        │
└──────────────────────┴──────────────────────────────────────────┘
```

<br/>

---

<br/>

## ✦ Getting Started

### Prerequisites

Make sure you have the following installed:

[![Node.js](https://img.shields.io/badge/Node.js-%3E%3D18.0.0-339933?style=flat-square&logo=nodedotjs&logoColor=white)](https://nodejs.org/)
[![npm](https://img.shields.io/badge/npm-%3E%3D9.0.0-CB3837?style=flat-square&logo=npm&logoColor=white)](https://www.npmjs.com/)

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/Anwaroxxx/qriblik.git

# 2. Navigate into the project folder
cd qriblik

# 3. Install all dependencies
npm install

# 4. Start the development server
npm run dev
```

The app will be running at `http://localhost:5173` ✦

<br/>

### Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start development server with hot reload |
| `npm run build` | Build for production |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | Run ESLint to check code quality |

<br/>

---

<br/>

## ✦ Project Structure

```
qriblik/
├── public/                  # Static assets & favicon
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── Map/             # Leaflet map + profile cards
│   │   ├── Posts/           # Post cards + AI creator
│   │   ├── Messages/        # DM system + chatbot
│   │   ├── Notifications/   # Notification cards
│   │   └── UI/              # Shared UI elements
│   ├── pages/               # Route-level pages
│   │   ├── Home/
│   │   ├── Profile/
│   │   ├── About/
│   │   ├── Support/
│   │   ├── Login/
│   │   └── SignUp/
│   ├── context/             # Global state & auth context
│   ├── hooks/               # Custom React hooks
│   ├── utils/               # Helper functions
│   └── main.jsx             # App entry point
├── package.json
├── vite.config.js
└── README.md
```

<br/>

---

<br/>

## ✦ Team

<br/>

<div align="center">

*Built with focus, collaboration, and a lot of late nights.*

</div>

<br/>

<table align="center">
  <thead>
    <tr>
      <th align="center">Avatar</th>
      <th align="center">Name</th>
      <th align="center">Role</th>
      <th align="center">GitHub</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td align="center">
        <a href="https://github.com/Anwaroxxx">
          <img src="https://github.com/Anwaroxxx.png" width="64" height="64" style="border-radius:50%" alt="Anwar"/>
        </a>
      </td>
      <td align="center"><b>Anwar Azarzou</b></td>
      <td align="center">
        <img src="https://img.shields.io/badge/Team_Leader-6366f1?style=flat-square&logoColor=white" />
        <br/><sub>Map System · AI Post Creator · DM Flow · Profile Cards</sub>
      </td>
      <td align="center">
        <a href="https://github.com/Anwaroxxx">
          <img src="https://img.shields.io/badge/@Anwaroxxx-181717?style=flat-square&logo=github&logoColor=white"/>
        </a>
      </td>
    </tr>
    <tr>
      <td align="center">
        <a href="https://github.com/Hou123ssen">
          <img src="https://github.com/Hou123ssen.png" width="64" height="64" style="border-radius:50%" alt="Hussein"/>
        </a>
      </td>
      <td align="center"><b>Hussein Doudli</b></td>
      <td align="center">
        <img src="https://img.shields.io/badge/Frontend_Engineer-0ea5e9?style=flat-square&logoColor=white" />
        <br/><sub>Full Responsiveness · User Database Linking · Post Sizing</sub>
      </td>
      <td align="center">
        <a href="https://github.com/Hou123ssen">
          <img src="https://img.shields.io/badge/@Hou123ssen-181717?style=flat-square&logo=github&logoColor=white"/>
        </a>
      </td>
    </tr>
    <tr>
      <td align="center">
        <a href="https://github.com/Hafsa-ouahbi">
          <img src="https://github.com/Hafsa-ouahbi.png" width="64" height="64" style="border-radius:50%" alt="Hafssa"/>
        </a>
      </td>
      <td align="center"><b>Hafssa Ouahbi</b></td>
      <td align="center">
        <img src="https://img.shields.io/badge/UI_%2F_UX_Engineer-ec4899?style=flat-square&logoColor=white" />
        <br/><sub>Dark Mode · Female User Assets · Component Styling</sub>
      </td>
      <td align="center">
        <a href="https://github.com/Hafsa-ouahbi">
          <img src="https://img.shields.io/badge/@Hafsa--ouahbi-181717?style=flat-square&logo=github&logoColor=white"/>
        </a>
      </td>
    </tr>
    <tr>
      <td align="center">
        <a href="https://github.com/Hamza-Abouelwahab">
          <img src="https://github.com/Hamza-Abouelwahab.png" width="64" height="64" style="border-radius:50%" alt="Hamza"/>
        </a>
      </td>
      <td align="center"><b>Hamza Abouelwahab</b></td>
      <td align="center">
        <img src="https://img.shields.io/badge/QA_%2F_UI_Polish-f59e0b?style=flat-square&logoColor=white" />
        <br/><sub>Favicon · About Page · Navbar & Footer · Bug Detection</sub>
      </td>
      <td align="center">
        <a href="https://github.com/Hamza-Abouelwahab">
          <img src="https://img.shields.io/badge/@Hamza--Abouelwahab-181717?style=flat-square&logo=github&logoColor=white"/>
        </a>
      </td>
    </tr>
    <tr>
      <td align="center">
        <a href="https://github.com/GhitaDennoune">
          <img src="https://github.com/GhitaDennoune.png" width="64" height="64" style="border-radius:50%" alt="Ghita"/>
        </a>
      </td>
      <td align="center"><b>Ghita Dennoune</b></td>
      <td align="center">
        <img src="https://img.shields.io/badge/Messaging_Engineer-14b8a6?style=flat-square&logoColor=white" />
        <br/><sub>Chatbot Reliability · Inbox Click Delay Fix</sub>
      </td>
      <td align="center">
        <a href="https://github.com/GhitaDennoune">
          <img src="https://img.shields.io/badge/@GhitaDennoune-181717?style=flat-square&logo=github&logoColor=white"/>
        </a>
      </td>
    </tr>
    <tr>
      <td align="center">
        <a href="https://github.com/meriemjabrane1-etu-cyber">
          <img src="https://github.com/meriemjabrane1-etu-cyber.png" width="64" height="64" style="border-radius:50%" alt="Meriem"/>
        </a>
      </td>
      <td align="center"><b>Meriem Jabrane</b></td>
      <td align="center">
        <img src="https://img.shields.io/badge/Social_Features-a855f7?style=flat-square&logoColor=white" />
        <br/><sub>Clickable Profiles · User Cards · Follow & Message Flow</sub>
      </td>
      <td align="center">
        <a href="https://github.com/meriemjabrane1-etu-cyber">
          <img src="https://img.shields.io/badge/@meriemjabrane1--etu--cyber-181717?style=flat-square&logo=github&logoColor=white"/>
        </a>
      </td>
    </tr>
    <tr>
      <td align="center">
        <a href="https://github.com/Aymen-chakir">
          <img src="https://github.com/Aymen-chakir.png" width="64" height="64" style="border-radius:50%" alt="Aymen"/>
        </a>
      </td>
      <td align="center"><b>Aymen Chakir</b></td>
      <td align="center">
        <img src="https://img.shields.io/badge/Frontend_Developer-f97316?style=flat-square&logoColor=white" />
        <br/><sub>Notification Card System</sub>
      </td>
      <td align="center">
        <a href="https://github.com/Aymen-chakir">
          <img src="https://img.shields.io/badge/@Aymen--chakir-181717?style=flat-square&logo=github&logoColor=white"/>
        </a>
      </td>
    </tr>
    <tr>
      <td align="center">
        <a href="https://github.com/youssefelkhafif">
          <img src="https://github.com/youssefelkhafif.png" width="64" height="64" style="border-radius:50%" alt="Youssef"/>
        </a>
      </td>
      <td align="center"><b>Youssef Khafif</b></td>
      <td align="center">
        <img src="https://img.shields.io/badge/Auth_%2F_Profile_Engineer-06b6d4?style=flat-square&logoColor=white" />
        <br/><sub>Profile Scroll · Redeem Bugs · Auth ↔ Profile Linking</sub>
      </td>
      <td align="center">
        <a href="https://github.com/youssefelkhafif">
          <img src="https://img.shields.io/badge/@youssefelkhafif-181717?style=flat-square&logo=github&logoColor=white"/>
        </a>
      </td>
    </tr>
  </tbody>
</table>

<br/>

---

<br/>

## ✦ License

This project is licensed under the **MIT License** — see the [LICENSE](./LICENSE) file for details.

<br/>

---

<br/>

<div align="center">

<sub>Crafted with precision by the Qriblik Team · Morocco 🇲🇦 · 2025</sub>

<br/><br/>

[![GitHub followers](https://img.shields.io/github/followers/Anwaroxxx?style=social)](https://github.com/Anwaroxxx)

</div>