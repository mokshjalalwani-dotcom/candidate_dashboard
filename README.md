# TalentFlow — Candidate Management Dashboard

A polished, production-ready **Next.js 16** internship assignment dashboard for managing job applicants. Built with TypeScript, Tailwind CSS v4, Zustand, Framer Motion, and shadcn-style components.

![Dashboard Preview](./public/preview.png)

---

## ✨ Features

| Feature | Details |
|---|---|
| **Applicant Listing** | Grid of cards with name, email, college, skills, and status |
| **Search** | Debounced search across name, email, and college |
| **Filter by Status** | Pending / Selected / Rejected / Interviewing / All |
| **Sort** | By name, status, or applied date — ascending or descending |
| **Pagination** | 9 cards per page with ellipsis-aware page controls |
| **Detail Modal** | Full profile view with all applicant info |
| **Add Applicant Form** | react-hook-form + zod validation, duplicate email check |
| **Summary Cards** | Total, Selected, Pending, Rejected, Interviewing counts |
| **Skeleton Loaders** | While API data is loading |
| **Toast Notifications** | Success/error feedback via react-hot-toast |
| **Dark Mode** | Full dark mode via next-themes toggle in header |
| **Responsive** | Mobile-first grid layout |
| **API Integration** | Fetches 30 users from DummyJSON, normalized to `Applicant` model |
| **localStorage Persistence** | Manually added applicants persist across reloads |
| **Framer Motion** | Subtle entrance animations on cards, modals, and counters |

---

## 🛠 Tech Stack

| Category | Technology |
|---|---|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS v4 |
| Components | shadcn/ui (manual, no CLI) |
| Forms | react-hook-form + zod |
| State | Zustand |
| Animations | Framer Motion |
| UI Primitives | Radix UI |
| Icons | Lucide React |
| Toasts | react-hot-toast |
| Dark Mode | next-themes |

---

## 📁 Project Structure

```
src/
├── app/
│   ├── layout.tsx          # Root layout, ThemeProvider, Toaster
│   ├── page.tsx            # Main dashboard page
│   └── globals.css         # Global styles + Tailwind v4 theme
├── components/
│   ├── ui/                 # button, badge, card, input, dialog, select, avatar, skeleton, label
│   ├── dashboard/          # SummaryCards, SearchBar, FilterBar, ApplicantCard, ApplicantGrid,
│   │                       # ApplicantCardSkeleton, EmptyState, ApplicantDetailModal,
│   │                       # AddApplicantForm, Pagination
│   └── layout/             # Header, ThemeProvider
├── store/
│   └── useApplicantStore.ts  # Zustand store: applicants, filters, pagination, UI state
├── hooks/
│   └── useDebounce.ts      # Debounce hook for search
├── services/
│   └── applicantService.ts # Fetches from DummyJSON, normalizes to Applicant model
├── data/
│   └── mockData.ts         # Seeded college, skills, status, date generators
├── lib/
│   └── utils.ts            # cn, formatDate, getInitials, truncate, debounce
└── types/
    └── index.ts            # Applicant, ApplicationStatus, FilterState types
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm 9+

### Installation

```bash
# Clone or navigate to the project
cd candidate-dashboard

# Install dependencies
npm install

# Start dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Production Build

```bash
npm run build
npm start
```

---

## 🌐 Deployment (Vercel)

1. Push the `candidate-dashboard/` folder to a GitHub repo
2. Import the repo in [Vercel](https://vercel.com/new)
3. Set **Root Directory** to `candidate-dashboard` (if not at repo root)
4. Click **Deploy** — no environment variables required

### Deployment (Render)

1. Create a new **Web Service** on Render
2. Connect your GitHub repo
3. Set **Build Command**: `npm install && npm run build`
4. Set **Start Command**: `npm start`
5. Set **Root Directory**: `candidate-dashboard`

---

## 📐 Data Model

```ts
interface Applicant {
  id: string;
  name: string;
  email: string;
  collegeName: string;
  skills: string[];
  status: 'Pending' | 'Selected' | 'Rejected' | 'Interviewing' | 'Unknown';
  avatar?: string;
  initials: string;
  appliedAt: string;       // ISO date string
  phone?: string;
  location?: string;
  isLocal?: boolean;       // true for manually added applicants
}
```

---

## 🔌 API Integration

Data is fetched from **DummyJSON** at:
```
GET https://dummyjson.com/users?limit=30&skip=0
```

Since DummyJSON users don't have `collegeName`, `skills`, or `status`, these are **seeded deterministically** using the user's numeric ID — meaning the same user always gets the same college, skill set, and status (no random flicker on reload).

---

## ⚠️ Assumptions

1. **DummyJSON** is used as the public API. Its user objects lack recruitment fields, so college, skills, and status are seeded per user ID.
2. `localStorage` is used for persistence of user-added applicants; this is reset per browser.
3. The application assumes a **single-user** context — no auth or multi-user sync.
4. A **duplicate email check** is performed client-side before adding applicants.
5. Unknown/missing status values from future API changes fall back to `"Unknown"`.
6. All dates displayed are formatted in **IST locale** (en-IN).

---

## 🧪 Edge Cases Handled

- ✅ API failure → error message displayed in grid
- ✅ Null/missing API fields → normalized with fallbacks
- ✅ No results after search/filter → EmptyState with reset button
- ✅ Empty initial state → EmptyState with Add CTA
- ✅ Invalid form → zod inline error messages
- ✅ Duplicate email → toast error, form not submitted
- ✅ Very long names/colleges → `truncate` CSS applied
- ✅ Large skill lists → shows first 3, "+N more" in card
- ✅ Slow network → skeleton loaders shown
- ✅ Modal close → Escape key, overlay click, X button all work
- ✅ Missing status values → falls back to "Unknown" badge
- ✅ LocalStorage quota errors → silently caught
- ✅ Refresh after adding → local applicants reloaded from localStorage

---

## 📝 License

MIT — free to use for internship submissions and learning purposes.
