/**
 * PRISM — realistic mock financial data.
 * SBI-flavoured products, Indian merchants, INR amounts.
 * Everything is deterministic (no Math.random at module scope) so SSR is stable.
 */

export type TxnCategory =
  | "Food & Dining"
  | "Transport"
  | "Shopping"
  | "Groceries"
  | "Bills & Utilities"
  | "Entertainment"
  | "Health"
  | "Investments"
  | "Transfers"
  | "Income"
  | "EMI"
  | "Travel";

export type Transaction = {
  id: string;
  merchant: string;
  category: TxnCategory;
  amount: number; // negative = debit, positive = credit
  date: string; // ISO
  method: "UPI" | "Card" | "NEFT" | "IMPS" | "AutoPay" | "Cash";
  account: "SBI Savings" | "SBI Salary" | "SBI Credit Card" | "YONO Wallet";
  aiTag?: string; // AI-inferred sub-category
  merchantLogoBg: string; // one of a few token classes
};

export const user = {
  name: "Vishal",
  firstName: "Vishal",
  email: "vishal@sbi.example.com",
  phone: "+91 98765 43210",
  memberSince: "2019",
  customerId: "SBI-**-4821",
  cif: "•••• 4821",
  branch: "Bandra West, Mumbai",
};

export const healthScore = {
  score: 782,
  band: "Excellent" as const,
  delta: 12,
  max: 900,
  factors: [
    { label: "Savings rate", weight: 92 },
    { label: "Debt discipline", weight: 88 },
    { label: "Investment mix", weight: 74 },
    { label: "Emergency cover", weight: 61 },
    { label: "Insurance depth", weight: 55 },
  ],
};

export const twinScore = {
  score: 86,
  confidence: 0.92,
  lastSyncMinutes: 4,
  memoryPoints: 1_284,
  signalsTracked: 42,
};

export const netWorth = {
  total: 87_42_500,
  delta: 1_24_300,
  deltaPct: 1.44,
  breakdown: [
    { label: "Cash & Deposits", value: 12_40_000, color: "chart-1" },
    { label: "Mutual Funds", value: 34_60_000, color: "chart-2" },
    { label: "Equity", value: 22_10_000, color: "chart-3" },
    { label: "Gold & Bonds", value: 8_32_500, color: "chart-4" },
    { label: "Real Estate", value: 10_00_000, color: "chart-5" },
  ],
};

export const monthly = {
  income: 3_85_000,
  expenses: 1_74_200,
  savings: 2_10_800,
  savingsRate: 54.7,
};

/** 12-month cashflow series for the home chart. */
export const cashflowSeries = [
  { m: "Jul", income: 340000, expenses: 168000 },
  { m: "Aug", income: 355000, expenses: 172000 },
  { m: "Sep", income: 340000, expenses: 181000 },
  { m: "Oct", income: 380000, expenses: 205000 },
  { m: "Nov", income: 360000, expenses: 194000 },
  { m: "Dec", income: 420000, expenses: 238000 },
  { m: "Jan", income: 370000, expenses: 165000 },
  { m: "Feb", income: 375000, expenses: 172000 },
  { m: "Mar", income: 410000, expenses: 198000 },
  { m: "Apr", income: 380000, expenses: 176000 },
  { m: "May", income: 385000, expenses: 180000 },
  { m: "Jun", income: 385000, expenses: 174200 },
];

export const wealthProjection = [
  { year: "2024", value: 78_00_000 },
  { year: "2025", value: 87_42_500 },
  { year: "2026", value: 98_20_000 },
  { year: "2027", value: 1_12_40_000 },
  { year: "2028", value: 1_29_80_000 },
  { year: "2029", value: 1_51_20_000 },
  { year: "2030", value: 1_78_50_000 },
];

export const insights = [
  {
    id: "ins-1",
    kind: "prediction" as const,
    title: "You're on track for a ₹42L bonus year",
    body: "Cash inflows are trending 8.2% above last year. PRISM predicts a full-year income of ₹46.8L based on your 12-month pattern.",
    confidence: 0.89,
    action: "See breakdown",
    trend: [42, 44, 43, 47, 46, 48, 50, 49, 52, 55, 54, 57],
    accent: "primary" as const,
  },
  {
    id: "ins-2",
    kind: "risk" as const,
    title: "Discretionary spend up 22% this month",
    body: "Dining and shopping are outpacing your 6-month baseline. A ₹18,400 reallocation to your Emergency Fund keeps June on-plan.",
    confidence: 0.94,
    action: "Auto-adjust",
    trend: [22, 24, 21, 28, 26, 30, 27, 32, 35, 34, 38, 42],
    accent: "warning" as const,
  },
  {
    id: "ins-3",
    kind: "opportunity" as const,
    title: "Idle ₹3.4L in Savings could earn 6.8%",
    body: "Sweep the excess above your buffer into an SBI Multi Option Deposit. Estimated 12-month gain: ₹23,120.",
    confidence: 0.97,
    action: "Simulate",
    trend: [30, 32, 34, 33, 36, 38, 40, 42, 41, 44, 46, 48],
    accent: "success" as const,
  },
];

export const journeys = [
  {
    id: "jny-home",
    title: "Buy your first home",
    subtitle: "SBI Home Loan · ₹1.2 Cr target",
    progress: 34,
    eta: "Q3 2027",
    nextStep: "Complete pre-approval",
    milestones: 8,
    completed: 3,
  },
  {
    id: "jny-retire",
    title: "Retire by 55",
    subtitle: "₹8 Cr corpus · 28 years to go",
    progress: 21,
    eta: "2053",
    nextStep: "Increase SIP by ₹15,000",
    milestones: 12,
    completed: 3,
  },
  {
    id: "jny-tax",
    title: "Optimise FY26 tax",
    subtitle: "Save up to ₹1.48L",
    progress: 62,
    eta: "Mar 2026",
    nextStep: "Add ₹42,000 to ELSS",
    milestones: 5,
    completed: 3,
  },
  {
    id: "jny-baby",
    title: "Baby financial plan",
    subtitle: "Health, education & term cover",
    progress: 12,
    eta: "6 months",
    nextStep: "Upgrade health cover to ₹25L",
    milestones: 7,
    completed: 1,
  },
];

export const transactions: Transaction[] = [
  { id: "t1", merchant: "Zomato", category: "Food & Dining", amount: -842, date: "2026-07-04T20:14:00", method: "UPI", account: "SBI Salary", aiTag: "Weekend dining", merchantLogoBg: "bg-warning/10 text-warning" },
  { id: "t1a", merchant: "Transfer to Sneha", category: "Transfers", amount: -2500, date: "2026-07-03T14:30:00", method: "UPI", account: "SBI Savings", aiTag: "Personal", merchantLogoBg: "bg-primary/10 text-primary" },
  { id: "t2", merchant: "Salary — Infosys Ltd", category: "Income", amount: 3_85_000, date: "2026-07-01T09:02:00", method: "NEFT", account: "SBI Salary", aiTag: "Payroll", merchantLogoBg: "bg-success/10 text-success" },
  { id: "t3", merchant: "SIP — Parag Parikh Flexi Cap", category: "Investments", amount: -25_000, date: "2026-07-01T06:00:00", method: "AutoPay", account: "SBI Savings", aiTag: "Recurring SIP", merchantLogoBg: "bg-primary/10 text-primary" },
  { id: "t4", merchant: "Amazon.in", category: "Shopping", amount: -3_240, date: "2026-06-30T18:22:00", method: "Card", account: "SBI Credit Card", aiTag: "Home essentials", merchantLogoBg: "bg-accent-cyan/10 text-accent-cyan" },
  { id: "t5", merchant: "BESCOM Electricity", category: "Bills & Utilities", amount: -2_180, date: "2026-06-29T11:10:00", method: "AutoPay", account: "SBI Savings", aiTag: "Utility · fixed", merchantLogoBg: "bg-warning/10 text-warning" },
  { id: "t6", merchant: "Uber India", category: "Transport", amount: -318, date: "2026-06-29T08:41:00", method: "UPI", account: "YONO Wallet", aiTag: "Daily commute", merchantLogoBg: "bg-foreground/10 text-foreground" },
  { id: "t7", merchant: "BigBasket", category: "Groceries", amount: -4_612, date: "2026-06-28T19:15:00", method: "UPI", account: "SBI Salary", aiTag: "Weekly groceries", merchantLogoBg: "bg-success/10 text-success" },
  { id: "t8", merchant: "HDFC Home Loan EMI", category: "EMI", amount: -48_200, date: "2026-06-28T00:01:00", method: "AutoPay", account: "SBI Salary", aiTag: "EMI · fixed", merchantLogoBg: "bg-destructive/10 text-destructive" },
];

export const upcomingTasks = [
  { id: "u1", title: "Credit card bill", due: "in 3 days", amount: 42_180, kind: "bill" as const },
  { id: "u2", title: "PPF top-up window", due: "in 8 days", amount: 15_000, kind: "opportunity" as const },
  { id: "u3", title: "Term insurance renewal", due: "in 22 days", amount: 12_400, kind: "insurance" as const },
];

export const goals = [
  { id: "g1", title: "Emergency Fund", target: 6_00_000, saved: 3_84_000, eta: "Nov 2026" },
  { id: "g2", title: "Bali Trip", target: 2_20_000, saved: 1_46_000, eta: "Dec 2026" },
  { id: "g3", title: "MacBook Pro M5", target: 3_20_000, saved: 92_000, eta: "Mar 2027" },
];

export const marketPulse = [
  { symbol: "NIFTY 50", value: "24,812.30", change: 0.42 },
  { symbol: "SENSEX", value: "81,204.11", change: 0.31 },
  { symbol: "GOLD 24K", value: "₹7,412 /g", change: -0.18 },
  { symbol: "USD/INR", value: "83.14", change: 0.08 },
];

export const aiSummary = {
  headline: "You're 14% ahead of your July plan.",
  body:
    "Cash inflow landed early on 1 July and your SIP executed cleanly. Discretionary spend is running warm — PRISM auto-parked ₹18,400 in your Emergency Fund to keep the month on-track. Two opportunities detected: a Multi-Option Deposit sweep and an ELSS top-up before Mar 2026.",
  actions: ["Review sweep", "Add ₹42k to ELSS", "Skip"],
  confidence: 0.92,
};

/* ============================================================
 * Extended datasets for full app surfaces
 * ============================================================ */

export type Account = {
  id: string;
  name: string;
  kind: "Savings" | "Salary" | "Credit Card" | "Loan" | "FD" | "Wallet";
  number: string;
  balance: number;
  available?: number;
  limit?: number;
  ifsc?: string;
  branch?: string;
  accent: string;
};

export const accounts: Account[] = [
  { id: "a1", name: "SBI Salary Account", kind: "Salary", number: "XXXX 4821", balance: 4_82_130, available: 4_82_130, ifsc: "SBIN0001234", branch: "Bandra West", accent: "gradient-wealth" },
  { id: "a2", name: "SBI Savings", kind: "Savings", number: "XXXX 9032", balance: 7_58_400, available: 7_58_400, ifsc: "SBIN0001234", branch: "Bandra West", accent: "gradient-aurora" },
  { id: "a3", name: "SBI Card ELITE", kind: "Credit Card", number: "•••• 4402", balance: -42_180, limit: 5_00_000, available: 4_57_820, accent: "gradient-primary" },
  { id: "a4", name: "HDFC Home Loan", kind: "Loan", number: "LN-8874", balance: -62_40_000, accent: "gradient-primary" },
  { id: "a5", name: "SBI Multi-Option FD", kind: "FD", number: "FD-2201", balance: 6_00_000, accent: "gradient-wealth" },
  { id: "a6", name: "YONO Wallet", kind: "Wallet", number: "@vishal.sbi", balance: 12_450, accent: "gradient-aurora" },
];

export type Holding = {
  id: string;
  symbol: string;
  name: string;
  kind: "Equity" | "Mutual Fund" | "ETF" | "Bond" | "Gold";
  units: number;
  avg: number;
  ltp: number;
  invested: number;
  current: number;
  dayChange: number;
};

export const holdings: Holding[] = [
  { id: "h1", symbol: "PPFCF", name: "Parag Parikh Flexi Cap", kind: "Mutual Fund", units: 4820.12, avg: 62.40, ltp: 84.15, invested: 3_00_768, current: 4_05_614, dayChange: 0.42 },
  { id: "h2", symbol: "AXSSMC", name: "Axis Small Cap Direct", kind: "Mutual Fund", units: 2140.5, avg: 78.20, ltp: 96.30, invested: 1_67_387, current: 2_06_130, dayChange: -0.31 },
  { id: "h3", symbol: "MOSNAS", name: "MO Nasdaq 100 FoF", kind: "Mutual Fund", units: 1240.0, avg: 30.10, ltp: 41.65, invested: 37_324, current: 51_646, dayChange: 0.88 },
  { id: "h4", symbol: "HDFCBANK", name: "HDFC Bank Ltd", kind: "Equity", units: 120, avg: 1420, ltp: 1682, invested: 1_70_400, current: 2_01_840, dayChange: 0.24 },
  { id: "h5", symbol: "INFY", name: "Infosys Ltd", kind: "Equity", units: 240, avg: 1310, ltp: 1520, invested: 3_14_400, current: 3_64_800, dayChange: -0.12 },
  { id: "h6", symbol: "NIFTYBEES", name: "Nippon Nifty BeES", kind: "ETF", units: 800, avg: 210, ltp: 258, invested: 1_68_000, current: 2_06_400, dayChange: 0.44 },
  { id: "h7", symbol: "SGB2028", name: "SGB 2028 Series-II", kind: "Gold", units: 40, avg: 5820, ltp: 7412, invested: 2_32_800, current: 2_96_480, dayChange: -0.18 },
  { id: "h8", symbol: "AAA-CORP", name: "REC AAA 2029", kind: "Bond", units: 10, avg: 10000, ltp: 10420, invested: 1_00_000, current: 1_04_200, dayChange: 0.05 },
];

export type Insight = {
  id: string;
  kind: "prediction" | "risk" | "opportunity" | "nudge";
  title: string;
  body: string;
  category: "Cashflow" | "Investing" | "Credit" | "Tax" | "Insurance" | "Goals";
  confidence: number;
  createdAt: string;
};

export const insightFeed: Insight[] = [
  { id: "if1", kind: "opportunity", title: "Sweep ₹3.4L excess to MOD deposit", body: "Idle balance above your 3-month buffer earns just 3.0%. A Multi-Option Deposit yields 6.8% and stays liquid.", category: "Cashflow", confidence: 0.97, createdAt: "2026-07-04" },
  { id: "if2", kind: "risk", title: "Dining spend outpacing baseline by 22%", body: "Zomato + Swiggy YTD have overshot your 6-month median by ₹18,400.", category: "Cashflow", confidence: 0.94, createdAt: "2026-07-03" },
  { id: "if3", kind: "prediction", title: "FY26 tax outgo estimated at ₹4.2L", body: "Current withholdings + capital gains put your final liability at ₹4.18L. Two moves can save ₹42k.", category: "Tax", confidence: 0.9, createdAt: "2026-07-03" },
  { id: "if4", kind: "nudge", title: "Term cover is 6× income — target is 15×", body: "PRISM recommends adding a ₹1.5Cr top-up term policy. Estimated premium: ₹1,240/mo.", category: "Insurance", confidence: 0.86, createdAt: "2026-07-02" },
  { id: "if5", kind: "opportunity", title: "Rebalance: Small-cap 14% overweight", body: "Trim ₹42,000 from Axis Small Cap into Nifty BeES to return to target allocation.", category: "Investing", confidence: 0.92, createdAt: "2026-07-01" },
  { id: "if6", kind: "risk", title: "Credit utilisation at 52% — score risk", body: "Rolling utilisation crossed 40% for 3rd consecutive statement. Prepay ₹22,000 before 12 Jul.", category: "Credit", confidence: 0.95, createdAt: "2026-06-30" },
  { id: "if7", kind: "prediction", title: "Emergency fund reaches goal by Nov 2026", body: "At current savings rate of 54.7%, your ₹6L emergency corpus completes 3 weeks early.", category: "Goals", confidence: 0.88, createdAt: "2026-06-29" },
  { id: "if8", kind: "opportunity", title: "ELSS ₹42k top-up saves ₹13,100 in tax", body: "You have ₹42k remaining in 80C. An ELSS SIP top-up matures with a 3-year lock-in and equity upside.", category: "Tax", confidence: 0.98, createdAt: "2026-06-28" },
];

export const twinMemory = [
  { id: "m1", when: "2 min ago", label: "Salary credited, categorised as Payroll", weight: 0.9 },
  { id: "m2", when: "1 hr ago", label: "SIP executed cleanly, portfolio rebalanced", weight: 0.7 },
  { id: "m3", when: "Today", label: "Predicted July bonus band shifted +3%", weight: 0.85 },
  { id: "m4", when: "Yesterday", label: "Detected new recurring merchant: Blinkit", weight: 0.6 },
  { id: "m5", when: "2 days ago", label: "Health cover recommendation surfaced", weight: 0.5 },
  { id: "m6", when: "3 days ago", label: "Cashflow anomaly on 28 Jun — resolved", weight: 0.75 },
  { id: "m7", when: "5 days ago", label: "Goal 'Bali Trip' ETA advanced by 2 weeks", weight: 0.65 },
  { id: "m8", when: "1 week ago", label: "Auto-parked ₹18,400 to Emergency Fund", weight: 0.9 },
];

export const twinSignals = [
  { id: "s1", label: "Income stability", value: 94, tone: "success" as const },
  { id: "s2", label: "Spending discipline", value: 78, tone: "primary" as const },
  { id: "s3", label: "Investment consistency", value: 88, tone: "success" as const },
  { id: "s4", label: "Risk exposure", value: 42, tone: "warning" as const },
  { id: "s5", label: "Liquidity buffer", value: 71, tone: "primary" as const },
  { id: "s6", label: "Insurance coverage", value: 55, tone: "warning" as const },
];

export const chatSeed = [
  { id: "c1", role: "assistant" as const, text: "Hi Vishal — I'm PRISM. Ask about your spend, goals, taxes, or a what-if scenario. I can act on your behalf when you approve." },
  { id: "c2", role: "user" as const, text: "Can I afford a ₹1.2Cr home loan in 18 months?" },
  { id: "c3", role: "assistant" as const, text: "Based on your income growth (8.2% YoY), current EMI-to-income of 12.5% and target down payment of ₹36L, you're on track. Two changes make this comfortable:\n\n• Raise your SIP by ₹15k/mo\n• Convert ₹4L Savings excess into an SBI Home Loan booking amount\n\nWant me to model this as a Journey?", sources: ["Cashflow · last 12 mo", "SBI Home Loan · 8.6% floater", "Twin projection · 92% confidence"] },
];

export const notifications = [
  { id: "n1", ts: "2 min ago", title: "Salary credited · ₹3,85,000", body: "Auto-categorised as Payroll. SIP triggered on schedule.", tone: "success" as const, unread: true },
  { id: "n2", ts: "1 hr ago", title: "Credit card bill due in 3 days", body: "Auto-pay is on. Minimum ₹4,218, statement ₹42,180.", tone: "warning" as const, unread: true },
  { id: "n3", ts: "Today", title: "New insight: sweep ₹3.4L for 6.8%", body: "Simulate the MOD deposit — no lock-in, breaks in 1 day.", tone: "primary" as const, unread: true },
  { id: "n4", ts: "Yesterday", title: "Goal update — Bali Trip", body: "You're 66% funded. ETA advanced to 2 Dec 2026.", tone: "primary" as const, unread: false },
  { id: "n5", ts: "2 days ago", title: "Term insurance renewal", body: "₹12,400 debits on 26 Jul. Coverage: ₹1Cr, tenure: 30y.", tone: "muted" as const, unread: false },
  { id: "n6", ts: "3 days ago", title: "Login from new device", body: "MacBook Pro · Mumbai · 3 Jul, 21:04. Not you?", tone: "warning" as const, unread: false },
];

export const documents = [
  { id: "d1", name: "Vishal_ITR_FY25.pdf", kind: "Tax", size: "1.2 MB", updated: "12 Jun 2026", tags: ["ITR", "FY25"] },
  { id: "d2", name: "SBI_Salary_Statement_Jun26.pdf", kind: "Statement", size: "418 KB", updated: "1 Jul 2026", tags: ["Salary", "Jun 26"] },
  { id: "d3", name: "Form16_Infosys_FY25.pdf", kind: "Tax", size: "230 KB", updated: "3 Jun 2026", tags: ["Form 16"] },
  { id: "d4", name: "Home_Loan_Sanction.pdf", kind: "Loan", size: "2.4 MB", updated: "22 May 2026", tags: ["HDFC", "Sanction"] },
  { id: "d5", name: "LIC_Term_Policy.pdf", kind: "Insurance", size: "780 KB", updated: "10 Apr 2026", tags: ["Term", "LIC"] },
  { id: "d6", name: "Passport_Vishal.pdf", kind: "KYC", size: "312 KB", updated: "2 Feb 2026", tags: ["KYC"] },
  { id: "d7", name: "PAN_Copy.pdf", kind: "KYC", size: "88 KB", updated: "2 Feb 2026", tags: ["KYC", "PAN"] },
  { id: "d8", name: "Rental_Agreement_2026.pdf", kind: "Property", size: "1.6 MB", updated: "1 Apr 2026", tags: ["Rent"] },
];

export const exploreProducts = [
  { id: "p1", name: "SBI Home Loan · 8.60%", category: "Loans", tagline: "Floater from 8.60% · up to ₹5 Cr", cta: "Check eligibility", accent: "primary" as const },
  { id: "p2", name: "SBI Multi-Option Deposit", category: "Deposits", tagline: "6.80% · breaks in 1 day · no lock-in", cta: "Open MOD", accent: "success" as const },
  { id: "p3", name: "SBI Card ELITE", category: "Cards", tagline: "5X on dining · club membership · ₹4,999", cta: "Apply", accent: "primary" as const },
  { id: "p4", name: "SBI Life eShield Next", category: "Insurance", tagline: "₹1Cr term cover from ₹1,240/mo", cta: "Get a quote", accent: "warning" as const },
  { id: "p5", name: "SBI Mutual Fund · ELSS", category: "Investing", tagline: "3-yr lock-in · save up to ₹46,800 tax", cta: "Start SIP", accent: "success" as const },
  { id: "p6", name: "YONO UPI Global", category: "Payments", tagline: "Send to 65+ countries · 0% forex on Tier-1", cta: "Enable", accent: "primary" as const },
  { id: "p7", name: "SBI SGB Series-IV", category: "Investing", tagline: "Sovereign gold · 2.5% coupon · tax-free redemption", cta: "Reserve", accent: "warning" as const },
  { id: "p8", name: "SBI Health Optima Plus", category: "Insurance", tagline: "₹25L family floater · no room-rent cap", cta: "Compare", accent: "success" as const },
];

export const journeySteps = [
  { id: "js1", label: "Set target & horizon", done: true },
  { id: "js2", label: "Confirm affordability with Twin", done: true },
  { id: "js3", label: "Auto-park down payment", done: true },
  { id: "js4", label: "Pre-approval — SBI Home Loan", done: false, next: true },
  { id: "js5", label: "Shortlist properties (RERA verified)", done: false },
  { id: "js6", label: "Legal & valuation", done: false },
  { id: "js7", label: "Disbursement & registration", done: false },
  { id: "js8", label: "Move in · celebrate", done: false },
];

export const supportTopics = [
  { id: "st1", q: "How does PRISM protect my money?", a: "Every action requires biometric approval; PRISM never moves funds without your explicit consent. All predictions are explainable and sourced from your own account data — no third-party sharing." },
  { id: "st2", q: "What is the Digital Twin?", a: "A privacy-preserving model of your finances. It watches income, spend, holdings and goals in real-time, then predicts and recommends the next best action for you." },
  { id: "st3", q: "Can I opt out of auto-parking?", a: "Yes — Settings → Automation → Auto-park. You can also cap the max amount PRISM moves per week." },
  { id: "st4", q: "How is my Financial Health Score computed?", a: "A weighted score of savings rate, debt discipline, investment mix, emergency cover and insurance depth. Full explainability is available on the Health page." },
  { id: "st5", q: "Which regulators oversee PRISM?", a: "PRISM operates within State Bank of India, regulated by RBI, IRDAI and SEBI depending on the product. Data residency: India." },
];

export const healthHistory = [
  { m: "Jul '25", score: 712 },
  { m: "Aug", score: 720 },
  { m: "Sep", score: 728 },
  { m: "Oct", score: 735 },
  { m: "Nov", score: 742 },
  { m: "Dec", score: 748 },
  { m: "Jan '26", score: 756 },
  { m: "Feb", score: 762 },
  { m: "Mar", score: 764 },
  { m: "Apr", score: 770 },
  { m: "May", score: 778 },
  { m: "Jun", score: 782 },
];