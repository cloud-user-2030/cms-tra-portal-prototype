import React, { useMemo, useState, memo } from "react";
import {
  BarChart3,
  Brain,
  Shield,
  Network,
  Database,
  Workflow,
  Search,
  Sparkles,
  ArrowRight,
  FileText,
  GitBranch,
  Map,
  Grid3X3,
  Layers3,
  Info,
} from "lucide-react";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Bar,
  ScatterChart,
  Scatter,
  ZAxis,
  FunnelChart,
  Funnel,
  Cell,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  Line,
  ComposedChart,
  PieChart,
  Pie,
  Sector,
} from "recharts";

/* -----------------------------
   lightweight UI primitives
----------------------------- */

function cn(...parts) {
  return parts.filter(Boolean).join(" ");
}

function Card({ className = "", children, onClick }) {
  return (
    <div
      onClick={onClick}
      className={cn(
        "rounded-3xl border border-slate-200 bg-white shadow-sm",
        onClick ? "cursor-pointer transition hover:border-blue-300 hover:shadow-md" : "",
        className
      )}
    >
      {children}
    </div>
  );
}

function CardHeader({ className = "", children }) {
  return <div className={cn("p-5 pb-3", className)}>{children}</div>;
}

function CardTitle({ className = "", children }) {
  return (
    <div className={cn("text-lg font-bold leading-tight text-slate-900", className)}>
      {children}
    </div>
  );
}

function CardContent({ className = "", children }) {
  return <div className={cn("p-5 pt-0", className)}>{children}</div>;
}

function Button({
  className = "",
  children,
  onClick,
  type = "button",
  variant = "solid",
}) {
  const base =
    "inline-flex items-center justify-center gap-2 rounded-2xl px-4 py-3 text-sm font-semibold transition whitespace-nowrap";
  const styles =
    variant === "outline"
      ? "border border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
      : variant === "ghost"
      ? "bg-transparent text-slate-700 hover:bg-slate-100"
      : variant === "soft"
      ? "bg-blue-50 text-blue-700 hover:bg-blue-100"
      : "bg-blue-600 text-white hover:bg-blue-700";
  return (
    <button type={type} onClick={onClick} className={cn(base, styles, className)}>
      {children}
    </button>
  );
}

function Badge({ className = "", children, dark = false }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold",
        dark ? "bg-white/15 text-white" : "bg-slate-100 text-slate-700",
        className
      )}
    >
      {children}
    </span>
  );
}

function Input({ className = "", ...props }) {
  return (
    <input
      {...props}
      className={cn(
        "w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none focus:border-blue-400",
        className
      )}
    />
  );
}

function ProgressBar({ value }) {
  return (
    <div className="mt-2 h-3 w-full overflow-hidden rounded-full bg-slate-200">
      <div
        className="h-full rounded-full bg-blue-600 transition-all"
        style={{ width: `${value}%` }}
      />
    </div>
  );
}

function Select({ value, onChange, options, className = "" }) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className={cn(
        "min-w-[170px] rounded-full border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-700 outline-none",
        className
      )}
    >
      {options.map((opt) => (
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
  );
}

/* -----------------------------
   data
----------------------------- */

const topTabs = [
  "Business Rules",
  "Recommended Practices",
  "AI Insights",
  "Heat Map",
  "Analytics",
  "Traceability",
  "Reference Library",
  "Acronym Guide",
];

const heroContent = {
  "Business Rules": {
    eyebrow: "Business Rules",
    title: "Explore enforceable CMS TRA rules",
    description:
      "Review rule intent, supporting standards, and governance-ready details for faster architecture and TRB decisions.",
    actions: [
      ["Open rules", "summary"],
      ["View mappings", "trace"],
      ["Check risk", "risk"],
      ["Compare standards", "nist"],
    ],
    detail:
      "Business rule view is active. Focus is on enforceable guidance, mappings, and review readiness.",
  },
  "Recommended Practices": {
    eyebrow: "Recommended Practices",
    title: "Implementation patterns made easier",
    description:
      "Browse supporting practices, examples, and operational guidance that complement the CMS TRA rule set.",
    actions: [
      ["Browse practices", "summary"],
      ["Map to NIST", "nist"],
      ["Open trace", "trace"],
      ["Analyze impact", "risk"],
    ],
    detail:
      "Recommended practices view is active. Focus is on supporting implementation guidance and design patterns.",
  },
  "AI Insights": {
    eyebrow: "AI Insights",
    title: "Smarter, faster TRA decisions",
    description:
      "Explore business rules, compare to NIST, identify risk, and generate executive-ready summaries with AI guidance built for CMS TRA reviews.",
    actions: [
      ["Generate summary", "summary"],
      ["Compare to NIST", "nist"],
      ["Open trace", "trace"],
      ["Analyze risk", "risk"],
    ],
    detail:
      "AI insight view is active. Focus is on summaries, risk observations, and executive-ready outputs.",
  },
  "Heat Map": {
    eyebrow: "Heat Map",
    title: "See maturity and risk at a glance",
    description:
      "Switch from narrative guidance to visual maturity patterns across domains, quarters, and control coverage.",
    actions: [
      ["Open heat map", "summary"],
      ["View risk overlay", "risk"],
      ["Show controls", "trace"],
      ["Compare maturity", "nist"],
    ],
    detail:
      "Heat map view is active. Focus is on maturity visualization, risk overlay, and control coverage.",
  },
  Analytics: {
    eyebrow: "Analytics",
    title: "Executive metrics with live signals",
    description:
      "Track compliance, readiness, mappings, and operational trends using interactive charts and compact executive analytics.",
    actions: [
      ["Open analytics", "summary"],
      ["Show trends", "trace"],
      ["Analyze risk", "risk"],
      ["Compare standards", "nist"],
    ],
    detail: "Analytics view is active. Focus is on trends, live signals, and executive metrics.",
  },
  Traceability: {
    eyebrow: "Traceability",
    title: "Follow the path from rule to evidence",
    description:
      "Connect CMS TRA rules to derived requirements, standards, evidence, and governance workflows in one view.",
    actions: [
      ["Open trace", "trace"],
      ["Show evidence", "summary"],
      ["Check controls", "nist"],
      ["Scan gaps", "risk"],
    ],
    detail:
      "Traceability view is active. Focus is on rule-to-requirement-to-evidence linkage.",
  },
  "Reference Library": {
    eyebrow: "Reference Library",
    title: "Reference material in one place",
    description:
      "Open linked guidance, standards, and CMS TRA source pages directly from the executive experience layer.",
    actions: [
      ["Open sources", "summary"],
      ["View links", "trace"],
      ["Compare standards", "nist"],
      ["Analyze gaps", "risk"],
    ],
    detail:
      "Reference library view is active. Focus is on linked guidance, standards, and source pages.",
  },
  "Acronym Guide": {
    eyebrow: "Acronym Guide",
    title: "Decode enterprise architecture language",
    description:
      "Keep CMS TRA, ARS, NIST, and governance terms easy to scan for executives, analysts, and review teams.",
    actions: [
      ["Open guide", "summary"],
      ["Show mappings", "trace"],
      ["Compare terms", "nist"],
      ["Flag confusion", "risk"],
    ],
    detail:
      "Acronym guide view is active. Focus is on terminology and executive readability.",
  },
};

const sparklineSeries = {
  Trust: [58, 62, 61, 66, 70, 72],
  Controls: [63, 66, 71, 76, 81, 84],
  Risk: [74, 78, 83, 86, 89, 91],
  Evidence: [65, 69, 73, 79, 84, 88],
};

const complianceStatusData = [
  { name: "Compliant", value: 62 },
  { name: "Monitoring", value: 28 },
  { name: "At Risk", value: 10 },
];

const riskBreakdownData = [
  { name: "Identity", value: 32 },
  { name: "Access", value: 27 },
  { name: "Data", value: 23 },
  { name: "Devices", value: 18 },
];

const complianceStatusColors = ["#14b8a6", "#fbbf24", "#f87171"];
const riskBreakdownColors = ["#38bdf8", "#a78bfa", "#fbbf24", "#fb7185"];

const kpis = [
  { label: "Compliance Score", value: "92%", sub: "Up 6% this quarter" },
  { label: "Mapped Controls", value: "2,386", sub: "Linked to evidence" },
  { label: "Open Risks", value: "14", sub: "3 need immediate action" },
  { label: "AI Summaries", value: "328", sub: "Generated for reviews" },
];

const trendData = [
  { month: "Jan", compliance: 72, risk: 28, mappings: 920 },
  { month: "Feb", compliance: 76, risk: 24, mappings: 1120 },
  { month: "Mar", compliance: 79, risk: 20, mappings: 1380 },
  { month: "Apr", compliance: 84, risk: 18, mappings: 1760 },
  { month: "May", compliance: 89, risk: 16, mappings: 2140 },
  { month: "Jun", compliance: 92, risk: 14, mappings: 2386 },
];

const bubbleData = [
  { x: 18, y: 82, z: 240, name: "Identity" },
  { x: 28, y: 76, z: 180, name: "Devices" },
  { x: 35, y: 68, z: 220, name: "Networks" },
  { x: 22, y: 88, z: 200, name: "Applications" },
  { x: 14, y: 91, z: 260, name: "Data" },
];

const funnelData = [
  { value: 428, name: "TRA Rules" },
  { value: 241, name: "Mapped to Controls" },
  { value: 123, name: "AI Reviewed" },
  { value: 54, name: "TRB Ready" },
];

const radarData = [
  { subject: "Identity", score: 86 },
  { subject: "Devices", score: 72 },
  { subject: "Networks", score: 78 },
  { subject: "Apps", score: 84 },
  { subject: "Data", score: 92 },
  { subject: "Governance", score: 81 },
];

const ganttItems = [
  { name: "Rule Intake", start: 8, end: 22 },
  { name: "AI Mapping", start: 16, end: 38 },
  { name: "Analyst Review", start: 30, end: 54 },
  { name: "TRB Summary", start: 48, end: 72 },
  { name: "EA Sync", start: 66, end: 92 },
];

const heat = [
  ["Identity", 92, 84, 80, 74],
  ["Devices", 78, 69, 64, 58],
  ["Networks", 88, 80, 76, 71],
  ["Apps", 90, 85, 79, 72],
  ["Data", 95, 92, 86, 80],
];

const domainLinks = [
  {
    label: "Foundation",
    href: "https://www.cms.gov/tra/Foundation/FD_0010_Foundation_Introduction.htm",
  },
  {
    label: "Infrastructure / Virtualization",
    href: "https://www.cms.gov/tra/Infrastructure_Services/IS_0010_Virtualization_Introduction.htm",
  },
  {
    label: "Application Development",
    href: "https://www.cms.gov/tra/Application_Development/AD_0010_Application_Introduction.htm",
  },
  {
    label: "Data Management",
    href: "https://www.cms.gov/tra/Data_Management/DM_0010_Introduction.htm",
  },
  {
    label: "Data Storage Services",
    href: "https://www.cms.gov/tra/Data_Management/DM_0160_Data_Storage_Services_Introduction.htm",
  },
  {
    label: "Business Intelligence",
    href: "https://www.cms.gov/tra/Data_Management/DM_0210_Business_Intelligence_Introduction.htm",
  },
];

const leftDomainLinks = domainLinks.slice(0, 3);
const rightDomainLinks = domainLinks.slice(3);

const detailContent = {
  "Compliance Score": {
    title: "Compliance Score metadata",
    text:
      "Current compliance is 92%, up 6% this quarter. Primary gains came from stronger control mapping, clearer evidence linkage, and improved review readiness.",
  },
  "Mapped Controls": {
    title: "Mapped Controls metadata",
    text:
      "2,386 controls are linked to rules, requirements, and evidence paths. This supports faster analyst review and traceability into governance workflows.",
  },
  "Open Risks": {
    title: "Open Risks metadata",
    text:
      "14 open risks remain. Three are flagged as priority items tied to missing evidence, weak encryption enforcement, or incomplete readiness artifacts.",
  },
  "AI Summaries": {
    title: "AI Summaries metadata",
    text:
      "328 AI summaries have been generated for working sessions, leadership reviews, and draft TRB packages.",
  },
  "BR-AUTH-1": {
    title: "BR-AUTH-1 metadata",
    text:
      "Rule focus: strong authentication, identity assurance, and better access confidence across services.",
  },
  "REQ-123": {
    title: "REQ-123 metadata",
    text:
      "Derived requirement sample showing how a TRA rule can become an implementable requirement with verification and audit support.",
  },
  "NIST SP 800-63B": {
    title: "NIST SP 800-63B metadata",
    text:
      "This mapping card represents standards traceability and supporting evidence alignment.",
  },
  "Heat Map": {
    title: "Heat Map metadata",
    text:
      "Heat map cells represent maturity, risk, or control coverage by domain and quarter.",
  },
  Analytics: {
    title: "Analytics metadata",
    text:
      "Analytics views compare compliance, risk, control mapping, and readiness over time.",
  },
  Traceability: {
    title: "Traceability metadata",
    text:
      "Traceability connects CMS TRA rules to derived requirements, standards, evidence, and governance packages.",
  },
  "Business Rules": {
    title: "Business Rules metadata",
    text:
      "This section is designed for rule-level exploration, summaries, mappings, and governance status.",
  },
  "Recommended Practices": {
    title: "Recommended Practices metadata",
    text:
      "Recommended practices provide supporting guidance and implementation patterns.",
  },
  "AI Insights": {
    title: "AI Insights metadata",
    text:
      "AI Insights surfaces summaries, comparisons, risk observations, and executive-ready outputs.",
  },
};

/* -----------------------------
   memo widgets
----------------------------- */

const TopNav = memo(function TopNav({ activeTopTab, onChange }) {
  return (
    <div className="px-4 py-4 md:px-6">
      <div className="overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        <div className="flex w-max min-w-full gap-2 rounded-[24px] border border-white/15 bg-white/10 p-2 backdrop-blur-sm">
          {topTabs.map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => onChange(tab)}
              className={cn(
                "min-h-[42px] shrink-0 rounded-[18px] px-4 py-2.5 text-sm font-semibold transition",
                activeTopTab === tab
                  ? "bg-white text-blue-700 shadow-md"
                  : "text-white hover:bg-white/15"
              )}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
});

function KPI({ label, value, sub, onClick }) {
  return (
    <Card className="h-full" onClick={() => onClick?.(label)}>
      <CardContent className="grid gap-2 p-4">
        <div className="text-sm text-slate-500">{label}</div>
        <div className="text-[34px] font-extrabold leading-none tracking-[-0.03em] text-slate-900">
          {value}
        </div>
        <div className="text-sm text-slate-500">{sub}</div>
      </CardContent>
    </Card>
  );
}

function MetricCard({ title, children, action, contentClassName = "" }) {
  return (
    <Card className="h-full overflow-hidden">
      <CardHeader className="flex flex-row items-center justify-between gap-3">
        <CardTitle className="text-base">{title}</CardTitle>
        <div className="shrink-0">{action}</div>
      </CardHeader>
      <CardContent className={cn("min-w-0", contentClassName)}>{children}</CardContent>
    </Card>
  );
}

function MiniHeatMap() {
  const columns = ["Q1", "Q2", "Q3", "Q4"];

  const toneClass = (value) => {
    if (value >= 90) return "bg-blue-700 text-white";
    if (value >= 80) return "bg-blue-500 text-white";
    if (value >= 70) return "bg-blue-200 text-slate-900";
    return "bg-slate-200 text-slate-700";
  };

  return (
    <div className="flex h-full min-h-[320px] flex-col rounded-3xl border border-slate-200 bg-slate-50 p-4">
      <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
        <div>
          <h3 className="text-base font-bold text-slate-900">Maturity Heat Map</h3>
          <p className="text-sm text-slate-500">Quarterly domain maturity</p>
        </div>
        <Badge>Hover</Badge>
      </div>

      <div className="w-full overflow-x-auto overflow-y-hidden pb-2">
        <div className="grid min-w-[560px] grid-cols-[120px_repeat(4,minmax(88px,1fr))] gap-3 text-sm">
          <div />
          {columns.map((q) => (
            <div key={q} className="text-center font-semibold text-slate-500">
              {q}
            </div>
          ))}

          {heat.map(([label, ...values]) => (
            <React.Fragment key={label}>
              <div className="pr-2 text-sm font-semibold text-slate-700">{label}</div>
              {values.map((value, i) => (
                <div
                  key={i}
                  className={cn(
                    "flex h-11 items-center justify-center rounded-xl text-sm font-bold",
                    toneClass(value)
                  )}
                >
                  {value}
                </div>
              ))}
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
}

function GanttMock() {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-12 pl-28 text-xs text-slate-400">
        {["W1", "W2", "W3", "W4", "W5", "W6", "W7", "W8", "W9", "W10", "W11", "W12"].map((w) => (
          <div key={w}>{w}</div>
        ))}
      </div>
      {ganttItems.map((item) => (
        <div key={item.name} className="grid grid-cols-[110px_1fr] items-center gap-4">
          <div className="text-sm font-medium text-slate-700">{item.name}</div>
          <div className="relative h-7 overflow-hidden rounded-xl bg-slate-100">
            <div
              className="absolute top-0 h-7 rounded-xl bg-blue-600"
              style={{ left: `${item.start}%`, width: `${item.end - item.start}%` }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

function BubbleMapMock() {
  const nodes = [
    { left: "14%", top: "52%", size: 68, label: "FL" },
    { left: "36%", top: "30%", size: 44, label: "VA" },
    { left: "61%", top: "23%", size: 54, label: "MD" },
    { left: "74%", top: "46%", size: 80, label: "DC" },
    { left: "48%", top: "65%", size: 58, label: "TX" },
  ];

  return (
    <div className="relative h-full min-h-[320px] overflow-hidden rounded-3xl border border-slate-200 bg-gradient-to-br from-slate-50 to-blue-50">
      <div
        className="absolute inset-0 opacity-40"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(148,163,184,.2) 1px, transparent 1px), linear-gradient(to bottom, rgba(148,163,184,.2) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />
      {nodes.map((n) => (
        <div
          key={n.label}
          className="absolute -translate-x-1/2 -translate-y-1/2"
          style={{ left: n.left, top: n.top }}
        >
          <div
            className="flex items-center justify-center rounded-full border-4 border-white bg-blue-600/80 font-semibold text-white shadow-lg"
            style={{ width: n.size, height: n.size }}
          >
            {n.label}
          </div>
        </div>
      ))}
      <div className="absolute bottom-4 left-4 rounded-lg bg-white/80 px-3 py-2 text-xs text-slate-500">
        Bubble map mock for risk concentration by region
      </div>
    </div>
  );
}

function SparkMini({ label, value, series }) {
  const max = Math.max(...series);
  const min = Math.min(...series);
  const points = series
    .map((point, index) => {
      const x = (index / (series.length - 1)) * 100;
      const y = max === min ? 50 : 100 - ((point - min) / (max - min)) * 100;
      return `${x},${y}`;
    })
    .join(" ");

  return (
    <div className="rounded-2xl border border-white/10 bg-white/10 px-3 py-2.5">
      <div className="flex items-center justify-between gap-2 text-[11px] text-blue-100">
        <span className="truncate">{label}</span>
        <span className="shrink-0">{value}%</span>
      </div>
      <div className="mt-2 grid grid-cols-[56px_1fr] items-center gap-2">
        <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="h-7 w-full overflow-visible">
          <polyline
            fill="none"
            stroke="rgba(255,255,255,0.95)"
            strokeWidth="6"
            strokeLinecap="round"
            strokeLinejoin="round"
            points={points}
          />
        </svg>
        <div className="h-2 overflow-hidden rounded-full bg-white/10">
          <div className="h-2 rounded-full bg-white/90" style={{ width: `${value}%` }} />
        </div>
      </div>
    </div>
  );
}

function InsightDonutCard({ title, data, centerValue, colors }) {
  const [activeSlice, setActiveSlice] = useState(null);

  return (
    <div className="overflow-hidden rounded-3xl bg-white p-4 text-slate-800 shadow-sm">
      <div className="text-sm font-semibold leading-5">{title}</div>
      <div className="mt-3 grid grid-cols-[minmax(0,1fr)_88px] items-center gap-3">
        <div className="space-y-2 pr-1 text-[11px]">
          {data.map((item, idx) => {
            const isActive = activeSlice === idx;
            return (
              <div
                key={item.name}
                className={cn(
                  "grid grid-cols-[minmax(0,1fr)_34px] items-center gap-2 rounded-lg px-2 py-1",
                  isActive ? "bg-slate-100" : ""
                )}
              >
                <div className="flex items-center gap-2 overflow-hidden">
                  <span
                    className="h-2.5 w-2.5 shrink-0 rounded-full"
                    style={{ backgroundColor: colors[idx % colors.length] }}
                  />
                  <span className="truncate text-slate-700">{item.name}</span>
                </div>
                <span className="text-right font-medium text-slate-800">{item.value}%</span>
              </div>
            );
          })}
        </div>
        <div className="relative h-[88px] w-[88px] justify-self-end">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                dataKey="value"
                nameKey="name"
                innerRadius={24}
                outerRadius={36}
                paddingAngle={2}
                isAnimationActive
                activeIndex={activeSlice ?? undefined}
                activeShape={(props) => {
                  const { cx, cy, innerRadius, outerRadius, startAngle, endAngle, fill } = props;
                  return (
                    <Sector
                      cx={cx}
                      cy={cy}
                      innerRadius={innerRadius}
                      outerRadius={outerRadius + 3}
                      startAngle={startAngle}
                      endAngle={endAngle}
                      fill={fill}
                      stroke="rgba(15,23,42,0.12)"
                      strokeWidth={2}
                    />
                  );
                }}
                onMouseEnter={(_, index) => setActiveSlice(index)}
                onMouseLeave={() => setActiveSlice(null)}
                stroke="rgba(255,255,255,0.9)"
                strokeWidth={2}
              >
                {data.map((_, idx) => (
                  <Cell key={idx} fill={colors[idx % colors.length]} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center text-lg font-bold text-slate-700">
            {activeSlice !== null ? `${data[activeSlice].value}%` : `${centerValue}%`}
          </div>
        </div>
      </div>
    </div>
  );
}

function SignalTimelineCard() {
  const SignalTooltip = ({ active, payload, label }) => {
    if (!active || !payload || !payload.length) return null;
    const point = payload[0];
    return (
      <div className="rounded-xl border border-white/20 bg-slate-900/95 px-3 py-2 text-xs text-white shadow-xl backdrop-blur-sm">
        <div className="font-semibold text-slate-100">{label}</div>
        <div className="mt-1 flex items-center justify-between gap-3 text-slate-200">
          <span>AI readiness</span>
          <span className="font-semibold text-white">{point.value}%</span>
        </div>
      </div>
    );
  };

  return (
    <div className="min-w-0 overflow-hidden rounded-3xl border border-white/15 bg-gradient-to-br from-white/12 to-white/6 p-4">
      <div className="flex items-center justify-between gap-3">
        <div>
          <div className="text-sm font-semibold leading-5 text-white">Signal timeline</div>
          <div className="mt-1 text-xs text-blue-100">6-month AI readiness trend</div>
        </div>
        <Badge className="bg-white/90 text-blue-700">Live</Badge>
      </div>
      <div className="mt-3 h-28">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={trendData} margin={{ top: 12, right: 12, left: 12, bottom: 4 }}>
            <defs>
              <linearGradient id="signalFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="rgba(255,255,255,0.95)" stopOpacity={0.45} />
                <stop offset="95%" stopColor="rgba(255,255,255,0.15)" stopOpacity={0.05} />
              </linearGradient>
            </defs>
            <CartesianGrid stroke="rgba(255,255,255,0.2)" strokeDasharray="3 3" />
            <XAxis
              dataKey="month"
              interval={0}
              tick={{ fontSize: 11, fill: "#e0f2fe" }}
              axisLine={{ stroke: "rgba(255,255,255,0.4)" }}
              tickLine={false}
            />
            <YAxis
              tick={{ fontSize: 11, fill: "#e0f2fe" }}
              axisLine={{ stroke: "rgba(255,255,255,0.4)" }}
              tickLine={false}
            />
            <Tooltip content={<SignalTooltip />} cursor={{ stroke: "rgba(255,255,255,0.35)", strokeWidth: 1 }} />
            <Area
              type="monotone"
              dataKey="compliance"
              stroke="rgba(255,255,255,0.95)"
              strokeWidth={2}
              fill="url(#signalFill)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

/* -----------------------------
   app
----------------------------- */

export default function App() {
  const [query, setQuery] = useState("How can I securely transfer sensitive data?");
  const [aiOutput, setAiOutput] = useState(
    "Use approved encryption, verify identity, and link the recommendation to TRA and NIST evidence."
  );
  const [viz, setViz] = useState("heatmap");
  const [activeTopTab, setActiveTopTab] = useState("AI Insights");
  const [activeSubTab, setActiveSubTab] = useState("insights");
  const [detailPanel, setDetailPanel] = useState(detailContent["AI Insights"]);

  const aiActions = {
    summary:
      "✔ This rule aligns with CMS TRA standards. Recommended for TRB approval with minor adjustments.",
    nist: "✔ Mapped to NIST SP 800-53 AC-2, IA-5. Full compliance coverage achieved.",
    risk: "⚠ Medium risk detected due to missing encryption enforcement.",
    trace:
      "Trace view generated: CMS TRA rule → derived requirement → control mapping → evidence → TRB package.",
  };

  const activeHero = heroContent[activeTopTab] || heroContent["AI Insights"];

  const runAI = (type) => {
    setAiOutput(aiActions[type] || "Analysis completed.");
  };

  const openDetail = (key) => {
    setDetailPanel(
      detailContent[key] || {
        title: `${key} metadata`,
        text:
          "Interactive preview metadata is available for this item. In the live version, this can open a drawer, modal, or linked details panel.",
      }
    );
  };

  const handleTopTabChange = (tab) => {
    setActiveTopTab(tab);
    openDetail(tab);
    setViz(tab === "Heat Map" ? "heatmap" : tab === "Analytics" ? "bubble" : viz);
  };

  const vizPanel = useMemo(() => {
    switch (viz) {
      case "bubble":
        return <BubbleMapMock />;

      case "funnel":
        return (
          <ResponsiveContainer width="100%" height="100%">
            <FunnelChart>
              <Tooltip />
              <Funnel dataKey="value" data={funnelData}>
                {funnelData.map((_, idx) => (
                  <Cell key={idx} fill={["#2563eb", "#3b82f6", "#60a5fa", "#93c5fd"][idx]} />
                ))}
              </Funnel>
            </FunnelChart>
          </ResponsiveContainer>
        );

      case "gauge":
        return (
          <div className="flex h-full min-h-[320px] flex-col justify-center gap-6">
            {[
              ["Zero Trust maturity", 84],
              ["Evidence completeness", 71],
              ["TRB readiness", 63],
            ].map(([label, value]) => (
              <div key={label}>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-600">{label}</span>
                  <span className="font-semibold">{value}%</span>
                </div>
                <ProgressBar value={value} />
              </div>
            ))}
          </div>
        );

      case "gantt":
        return <GanttMock />;

      case "cluster":
        return (
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart data={radarData} outerRadius="68%">
              <PolarGrid />
              <PolarAngleAxis
                dataKey="subject"
                tick={{ fontSize: 11, fill: "#475569" }}
                tickFormatter={(value) => (value === "Governance" ? "Govern." : value)}
                tickLine={false}
                axisLine={false}
              />
              <PolarRadiusAxis tick={{ fontSize: 10 }} />
              <Radar dataKey="score" fill="#3b82f6" fillOpacity={0.5} stroke="#1d4ed8" />
              <Tooltip />
            </RadarChart>
          </ResponsiveContainer>
        );

      case "choropleth":
        return (
          <div className="grid h-full min-h-[320px] grid-cols-5 gap-3 items-center">
            {[88, 64, 78, 92, 55, 60, 81, 74, 95, 69].map((v, i) => (
              <div
                key={i}
                className="flex h-20 items-center justify-center rounded-2xl text-sm font-bold text-white"
                style={{ background: `rgba(37,99,235,${Math.max(0.25, v / 100)})` }}
              >
                {v}
              </div>
            ))}
          </div>
        );

      case "grid":
      case "heatmap":
      default:
        return <MiniHeatMap />;
    }
  }, [viz]);

  return (
    <div className="min-h-screen bg-slate-100 p-4 md:p-6">
      <div className="mx-auto grid max-w-[1520px] gap-6">
        <div className="overflow-hidden rounded-[34px] bg-blue-700 text-white shadow-xl">
          <div className="border-b border-white/10 px-6 pb-5 pt-6 md:px-8">
            <div className="flex flex-col gap-4 xl:flex-row xl:items-start xl:justify-between">
              <div>
                <div className="flex items-center gap-2 text-sm text-blue-100">
                  <Layers3 className="h-4 w-4" />
                  CMS TRA Interactive Portal
                </div>
                <h1 className="mt-2 text-[38px] font-extrabold leading-[1.05] tracking-[-0.03em] md:text-[46px]">
                  Executive analytics preview
                </h1>
                <p className="mt-2 max-w-3xl text-base text-blue-100">
                  AI-enabled architecture, traceability, and compliance workspace
                </p>
              </div>

              <div className="flex flex-wrap gap-2 xl:justify-end">
                <Badge dark>Release 2025 R1</Badge>
                <Badge dark>Zero Trust Ready</Badge>
                <Badge dark>AI Copilot Enabled</Badge>
              </div>
            </div>
          </div>

          <TopNav activeTopTab={activeTopTab} onChange={handleTopTabChange} />
        </div>

        <div className="grid grid-cols-1 gap-6 xl:grid-cols-[280px_minmax(0,1fr)_280px]">
          {/* left rail */}
          <div className="grid gap-6">
            <Card className="bg-gradient-to-br from-blue-50 to-white">
              <CardHeader>
                <CardTitle className="text-blue-900">Interactive metadata</CardTitle>
              </CardHeader>
              <CardContent className="grid gap-4">
                <div className="text-base font-semibold text-slate-900">{detailPanel.title}</div>
                <div className="text-[15px] leading-7 text-slate-600">{detailPanel.text}</div>
                <div className="rounded-2xl border border-blue-100 bg-white p-4 text-sm leading-6 text-slate-500">
                  Click a KPI card, rule tile, top menu tab, or analytics section to update this panel.
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Quick actions</CardTitle>
              </CardHeader>
              <CardContent className="grid grid-cols-2 gap-3">
                {[
                  ["Business Rules", FileText],
                  ["AI Copilot", Brain],
                  ["Heat Map", Map],
                  ["Analytics", BarChart3],
                  ["Grid View", Grid3X3],
                  ["Trace Links", GitBranch],
                ].map(([label, Icon]) => (
                  <Button
                    key={label}
                    variant="outline"
                    className="min-h-[88px] flex-col gap-2 whitespace-normal text-center text-slate-700"
                    onClick={() => openDetail(label)}
                  >
                    <Icon className="h-4 w-4" />
                    <span className="leading-tight">{label}</span>
                  </Button>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Browse by domain</CardTitle>
              </CardHeader>
              <CardContent className="grid grid-cols-2 gap-3">
                {[
                  ["Application", Workflow],
                  ["Data", Database],
                  ["Security", Shield],
                  ["Infrastructure", Network],
                  ["Cloud", Sparkles],
                  ["Integration", ArrowRight],
                ].map(([label, Icon]) => (
                  <Button
                    key={label}
                    variant="outline"
                    className={cn(
                      "min-h-[88px] flex-col gap-2 whitespace-normal text-center text-slate-700",
                      label === "Security" ? "ring-2 ring-blue-500" : ""
                    )}
                    onClick={() => openDetail(label)}
                  >
                    <Icon className="h-4 w-4" />
                    <span className="leading-tight">{label}</span>
                  </Button>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Live status</CardTitle>
              </CardHeader>
              <CardContent className="grid gap-4 text-sm">
                <div className="flex items-center justify-between gap-3">
                  <span className="text-slate-500">Rules mapped</span>
                  <span className="font-semibold">1,248</span>
                </div>
                <div className="flex items-center justify-between gap-3">
                  <span className="text-slate-500">High risk gaps</span>
                  <span className="font-semibold">14</span>
                </div>
                <div className="flex items-center justify-between gap-3">
                  <span className="text-slate-500">AI summaries</span>
                  <span className="font-semibold">328</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>CMS TRA source links</CardTitle>
              </CardHeader>
              <CardContent className="grid gap-3">
                {leftDomainLinks.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    target="_blank"
                    rel="noreferrer"
                    className="block rounded-2xl border border-slate-200 p-4 text-sm text-slate-700 transition hover:border-blue-400 hover:bg-blue-50"
                  >
                    <div className="break-words font-medium leading-6">{link.label}</div>
                    <div className="mt-1 text-xs text-slate-500">Open CMS TRA source page</div>
                  </a>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* center */}
          <div className="grid gap-6">
            <Card>
              <CardContent className="grid gap-4">
                <div className="grid grid-cols-1 gap-3 lg:grid-cols-[minmax(0,1fr)_auto_auto]">
                  <div className="relative">
                    <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                    <Input
                      value={query}
                      onChange={(e) => setQuery(e.target.value)}
                      className="pl-11 text-base"
                    />
                  </div>
                  <Button className="rounded-2xl">
                    <Sparkles className="h-4 w-4" />
                    Ask TRA AI
                  </Button>
                  <Button variant="outline" className="rounded-2xl">
                    Filters
                  </Button>
                </div>

                <div className="flex flex-wrap gap-2">
                  {[
                    "Show all Zero Trust rules in identity assurance",
                    "Compare AI rule to NIST and CMS ARS mappings",
                    "Find controls with high risk and low maturity",
                    "Generate TRB-ready compliance summary",
                  ].map((s) => (
                    <button
                      key={s}
                      onClick={() => setQuery(s)}
                      className="rounded-full bg-blue-50 px-3 py-2 text-xs font-medium text-blue-700 transition hover:bg-blue-100"
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 2xl:grid-cols-4">
              {kpis.map((k) => (
                <KPI key={k.label} {...k} onClick={openDetail} />
              ))}
            </div>

            <Card className="overflow-hidden rounded-[34px] border-0 bg-blue-700 text-white shadow-xl">
              <CardContent className="p-6 md:p-8">
                <div className="grid grid-cols-1 gap-6 2xl:grid-cols-[minmax(0,1.25fr)_360px]">
                  <div className="grid gap-6">
                    <div>
                      <div className="text-[11px] uppercase tracking-[0.24em] text-blue-200">
                        {activeHero.eyebrow}
                      </div>
                      <h2 className="mt-2 max-w-[13ch] text-4xl font-extrabold leading-tight tracking-[-0.03em]">
                        {activeHero.title}
                      </h2>
                      <p className="mt-3 max-w-3xl text-base leading-8 text-blue-100">
                        {activeHero.description}
                      </p>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {activeHero.actions.map(([label, key]) => (
                        <Button
                          key={label}
                          variant="soft"
                          className="rounded-full bg-white text-blue-700 hover:bg-blue-50"
                          onClick={() => runAI(key)}
                        >
                          {label}
                        </Button>
                      ))}
                    </div>

                    <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
                      <Button
                        variant="soft"
                        className="min-h-[56px] rounded-2xl bg-white text-slate-900 hover:bg-white"
                        onClick={() => runAI("summary")}
                      >
                        Generate TRB Summary
                      </Button>
                      <Button
                        variant="soft"
                        className="min-h-[56px] rounded-2xl bg-white text-slate-900 hover:bg-white"
                        onClick={() => runAI("nist")}
                      >
                        Compare to NIST
                      </Button>
                      <Button
                        variant="soft"
                        className="min-h-[56px] rounded-2xl bg-white text-slate-900 hover:bg-white"
                        onClick={() => runAI("risk")}
                      >
                        Analyze Risk
                      </Button>
                    </div>

                    <div className="min-h-[110px] rounded-3xl border border-white/20 bg-white/15 p-5 text-base leading-8 text-white/95">
                      {activeTopTab === "AI Insights" ? aiOutput : activeHero.detail}
                    </div>

                    <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
                      <button
                        type="button"
                        onClick={() => openDetail("AI Insights")}
                        className="overflow-hidden rounded-3xl border border-white/15 bg-gradient-to-br from-white/12 to-white/6 p-5 text-left transition hover:bg-white/15"
                      >
                        <div className="flex items-start justify-between gap-3">
                          <div>
                            <div className="text-base font-semibold leading-5">Decision signals</div>
                            <div className="mt-1 text-sm leading-6 text-blue-100">
                              Live recommendation indicators
                            </div>
                          </div>
                          <Badge className="bg-white/90 text-blue-700">Live</Badge>
                        </div>
                        <div className="mt-4 grid grid-cols-3 gap-3">
                          {[
                            ["Ready", "18"],
                            ["Review", "7"],
                            ["Risk", "3"],
                          ].map(([label, value]) => (
                            <div
                              key={label}
                              className="rounded-2xl border border-white/10 bg-white/10 px-3 py-3 text-center"
                            >
                              <div className="text-xl font-bold leading-none">{value}</div>
                              <div className="mt-1 text-xs text-blue-100">{label}</div>
                            </div>
                          ))}
                        </div>
                      </button>

                      <button
                        type="button"
                        onClick={() => openDetail("Analytics")}
                        className="overflow-hidden rounded-3xl border border-white/15 bg-gradient-to-br from-white/12 to-white/6 p-5 text-left transition hover:bg-white/15"
                      >
                        <div className="flex items-start justify-between gap-3">
                          <div>
                            <div className="text-base font-semibold leading-5">Floating analytics</div>
                            <div className="mt-1 text-sm leading-6 text-blue-100">
                              Mini performance trends
                            </div>
                          </div>
                          <Badge className="bg-white/90 text-blue-700">Live</Badge>
                        </div>
                        <div className="mt-4 grid gap-2">
                          {[
                            ["Trust", 72],
                            ["Controls", 84],
                            ["Risk", 91],
                            ["Evidence", 88],
                          ].map(([label, value]) => (
                            <SparkMini
                              key={label}
                              label={label}
                              value={value}
                              series={sparklineSeries[label]}
                            />
                          ))}
                        </div>
                      </button>
                    </div>
                  </div>

                  <div className="grid gap-4">
                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 2xl:grid-cols-2">
                      <button
                        onClick={() => openDetail("AI Insights")}
                        className="overflow-hidden rounded-3xl border border-white/15 bg-white/12 p-5 text-left transition hover:bg-white/18"
                      >
                        <div className="text-xs leading-4 text-blue-200">AI Confidence</div>
                        <div className="mt-2 text-3xl font-extrabold leading-none">94%</div>
                        <div className="mt-2 text-sm text-blue-100">Summary quality</div>
                      </button>

                      <button
                        onClick={() => openDetail("Traceability")}
                        className="overflow-hidden rounded-3xl border border-white/15 bg-white/12 p-5 text-left transition hover:bg-white/18"
                      >
                        <div className="text-xs leading-4 text-blue-200">Trace Links</div>
                        <div className="mt-2 text-3xl font-extrabold leading-none">2,386</div>
                        <div className="mt-2 text-sm text-blue-100">Mapped records</div>
                      </button>
                    </div>

                    <div className="overflow-hidden rounded-3xl border border-white/15 bg-white/12 p-5">
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <div className="text-base font-semibold">Active workflow</div>
                          <div className="mt-1 text-sm leading-6 text-blue-100">
                            AI summary → standards mapping → TRB package
                          </div>
                        </div>
                        <Badge className="bg-white text-blue-700">Live</Badge>
                      </div>

                      <div className="mt-4 grid gap-3">
                        {[
                          ["Rule summary", "Ready"],
                          ["NIST comparison", "Ready"],
                          ["Risk scan", "Medium"],
                        ].map(([label, status]) => (
                          <button
                            key={label}
                            onClick={() => openDetail("AI Insights")}
                            className="flex items-center justify-between gap-3 overflow-hidden rounded-2xl border border-white/10 bg-white/10 px-4 py-3 text-sm transition hover:bg-white/15"
                          >
                            <span className="truncate text-left">{label}</span>
                            <span className="shrink-0 text-blue-100">{status}</span>
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="overflow-hidden rounded-3xl border border-white/15 bg-gradient-to-br from-white/14 to-white/8 p-5">
                      <div className="flex items-center justify-between gap-3">
                        <div>
                          <div className="text-base font-semibold">Quick insights</div>
                          <div className="mt-1 text-sm text-blue-100">Live signal snapshot</div>
                        </div>
                        <Badge className="bg-white/90 text-blue-700">Live</Badge>
                      </div>
                      <div className="mt-4 grid gap-3">
                        <InsightDonutCard
                          title="Compliance by Status"
                          data={complianceStatusData}
                          centerValue={62}
                          colors={complianceStatusColors}
                        />
                        <InsightDonutCard
                          title="Risk Factor Breakdown"
                          data={riskBreakdownData}
                          centerValue={27}
                          colors={riskBreakdownColors}
                        />
                      </div>
                    </div>

                    <SignalTimelineCard />
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="grid gap-4">
              <div className="rounded-[28px] border border-blue-200 bg-white p-2 shadow-sm">
                <div className="grid grid-cols-2 gap-2 rounded-[22px] bg-slate-100/90 p-1 md:grid-cols-4">
                  {[
                    ["insights", "Insights"],
                    ["heatmap", "Heat Map"],
                    ["analytics", "Analytics"],
                    ["traceability", "Traceability"],
                  ].map(([key, label]) => (
                    <button
                      key={key}
                      type="button"
                      onClick={() => {
                        setActiveSubTab(key);
                        openDetail(label);
                      }}
                      className={cn(
                        "min-h-[46px] rounded-[18px] px-3 text-sm font-semibold transition",
                        activeSubTab === key
                          ? "bg-blue-600 text-white shadow-md"
                          : "text-slate-600 hover:bg-white"
                      )}
                    >
                      {label}
                    </button>
                  ))}
                </div>
              </div>

              {activeSubTab === "insights" && (
                <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
                  {[
                    [
                      "BR-AUTH-1",
                      "Strong authentication",
                      [
                        "Require MFA for privileged and user access",
                        "Support stronger identity assurance",
                        "Improve access confidence across services",
                      ],
                    ],
                    [
                      "REQ-123",
                      "Identity verification requirement",
                      [
                        "Implement identity proofing",
                        "Verify access before service use",
                        "Support auditable trust decisions",
                      ],
                    ],
                    [
                      "NIST SP 800-63B",
                      "Control mapping",
                      [
                        "Map to identity assurance controls",
                        "Support traceable governance",
                        "Link rule intent to standard evidence",
                      ],
                    ],
                  ].map(([id, title, bullets]) => (
                    <Card key={id} onClick={() => openDetail(id)}>
                      <CardContent className="grid gap-3 p-5">
                        <div className="break-words text-lg font-bold leading-6 text-slate-900">{id}</div>
                        <div className="text-sm leading-6 text-slate-500">{title}</div>
                        <ul className="grid gap-2 pl-5 text-sm leading-6 text-slate-700">
                          {bullets.map((b) => (
                            <li key={b} className="list-disc">
                              {b}
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}

              {activeSubTab === "heatmap" && (
                <div className="grid grid-cols-1 gap-4 2xl:grid-cols-[minmax(0,1.3fr)_360px]">
                  <MetricCard
                    title="Maturity heat map"
                    action={<Badge>Hover-ready</Badge>}
                    contentClassName="min-h-[360px]"
                  >
                    <MiniHeatMap />
                  </MetricCard>

                  <MetricCard title="Heat map filters" contentClassName="min-h-[360px]">
                    <div className="grid gap-5 text-sm">
                      <div>
                        <div className="mb-2 text-slate-500">Domain</div>
                        <div className="flex flex-wrap gap-2">
                          {["Identity", "Devices", "Networks", "Apps", "Data"].map((t) => (
                            <Badge key={t}>{t}</Badge>
                          ))}
                        </div>
                      </div>
                      <div>
                        <div className="mb-2 text-slate-500">View</div>
                        <div className="flex flex-wrap gap-2">
                          {["Quarterly", "Risk overlay", "Control mapping"].map((t) => (
                            <Badge key={t}>{t}</Badge>
                          ))}
                        </div>
                      </div>
                      <div className="rounded-2xl bg-slate-50 p-4 leading-6 text-slate-600">
                        Hover on a cell to show rule count, maturity level, and linked evidence.
                      </div>
                    </div>
                  </MetricCard>
                </div>
              )}

              {activeSubTab === "analytics" && (
                <div className="grid gap-4">
                  <div className="grid grid-cols-1 gap-4 2xl:grid-cols-2">
                    <MetricCard title="Compliance trend" contentClassName="min-h-[340px]">
                      <div className="h-[300px]">
                        <ResponsiveContainer width="100%" height="100%">
                          <AreaChart data={trendData}>
                            <defs>
                              <linearGradient id="complianceFill" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#2563eb" stopOpacity={0.35} />
                                <stop offset="95%" stopColor="#2563eb" stopOpacity={0.05} />
                              </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="month" interval={0} tick={{ fontSize: 11 }} />
                            <YAxis />
                            <Tooltip />
                            <Area
                              type="monotone"
                              dataKey="compliance"
                              stroke="#2563eb"
                              strokeWidth={2}
                              fill="url(#complianceFill)"
                            />
                          </AreaChart>
                        </ResponsiveContainer>
                      </div>
                    </MetricCard>

                    <MetricCard title="Risk vs readiness bubbles" contentClassName="min-h-[340px]">
                      <div className="h-[300px]">
                        <ResponsiveContainer width="100%" height="100%">
                          <ScatterChart>
                            <CartesianGrid />
                            <XAxis type="number" dataKey="x" name="Risk" />
                            <YAxis type="number" dataKey="y" name="Readiness" />
                            <ZAxis type="number" dataKey="z" range={[80, 600]} />
                            <Tooltip cursor={{ strokeDasharray: "3 3" }} />
                            <Scatter data={bubbleData} fill="#2563eb" />
                          </ScatterChart>
                        </ResponsiveContainer>
                      </div>
                    </MetricCard>
                  </div>

                  <div className="grid grid-cols-1 gap-4 2xl:grid-cols-2">
                    <MetricCard
                      title="Dynamic visual explorer"
                      action={
                        <Select
                          value={viz}
                          onChange={(value) => {
                            setViz(value);
                            openDetail(value === "heatmap" ? "Heat Map" : "Analytics");
                          }}
                          options={[
                            { value: "heatmap", label: "Heat map" },
                            { value: "bubble", label: "Bubbles" },
                            { value: "choropleth", label: "Choropleth" },
                            { value: "cluster", label: "Cluster" },
                            { value: "funnel", label: "Funnel" },
                            { value: "gantt", label: "Gantt" },
                            { value: "gauge", label: "Gauge" },
                            { value: "grid", label: "Grid" },
                          ]}
                        />
                      }
                      contentClassName="min-h-[380px]"
                    >
                      <div className="h-[340px]">{vizPanel}</div>
                    </MetricCard>

                    <MetricCard
                      title="Mappings by month"
                      action={
                        <Button
                          variant="ghost"
                          className="rounded-full"
                          onClick={() => openDetail("Analytics")}
                        >
                          <Info className="mr-1 h-4 w-4" />
                          Meta
                        </Button>
                      }
                      contentClassName="min-h-[380px]"
                    >
                      <div className="h-[340px]">
                        <ResponsiveContainer width="100%" height="100%">
                          <ComposedChart data={trendData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="month" interval={0} tick={{ fontSize: 11 }} />
                            <YAxis yAxisId="left" />
                            <YAxis yAxisId="right" orientation="right" />
                            <Tooltip />
                            <Bar yAxisId="left" dataKey="mappings" barSize={28} fill="#60a5fa" />
                            <Line
                              yAxisId="right"
                              type="monotone"
                              dataKey="risk"
                              stroke="#ef4444"
                              strokeWidth={2}
                            />
                          </ComposedChart>
                        </ResponsiveContainer>
                      </div>
                    </MetricCard>
                  </div>
                </div>
              )}

              {activeSubTab === "traceability" && (
                <Card>
                  <CardContent className="grid gap-5 p-6">
                    <div className="text-sm text-slate-500">Trace path</div>
                    <div className="grid grid-cols-1 gap-5 xl:grid-cols-5">
                      {[
                        "CMS TRA Rule",
                        "Derived Requirement",
                        "NIST / ARS Control",
                        "Evidence Link",
                        "TRB Decision",
                      ].map((n, i) => (
                        <div
                          key={n}
                          className="relative flex min-h-[108px] items-center justify-center rounded-3xl border border-slate-200 bg-slate-50 p-5 text-center text-sm font-semibold text-slate-700"
                        >
                          <span className="max-w-[13ch] leading-6">{n}</span>
                          {i < 4 && (
                            <div className="absolute -right-6 top-1/2 hidden h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-slate-200 bg-white shadow-sm xl:flex">
                              <ArrowRight className="h-4 w-4 text-slate-500" />
                            </div>
                          )}
                        </div>
                      ))}
                    </div>

                    <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
                      <div className="rounded-3xl bg-blue-50 p-5 text-sm leading-6 text-slate-700">
                        AI can summarize the gap, explain the mapping, and generate a TRB-ready summary from the same trace path.
                      </div>
                      <div className="rounded-3xl bg-slate-50 p-5 text-sm leading-6 text-slate-700">
                        This preview positions the portal as an experience layer above CMS TRA and Sparx EA, not as a replacement.
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>

          {/* right rail */}
          <div className="grid gap-6">
            <Card>
              <CardHeader>
                <CardTitle>AI Copilot</CardTitle>
              </CardHeader>
              <CardContent className="grid gap-4">
                <div className="rounded-3xl bg-slate-50 p-4">
                  <div className="text-xs text-slate-500">Suggested prompt</div>
                  <div className="mt-2 text-sm leading-6 text-slate-700">
                    How can I securely transfer sensitive data?
                  </div>
                </div>
                <div className="rounded-3xl border border-slate-200 p-4 text-sm leading-7 text-slate-700">
                  Use BR-DSS style guidance: protect data in transit with approved encryption and secure transfer protocols such as TLS-protected APIs or SFTP.
                </div>
                <Button className="w-full rounded-2xl">
                  <Brain className="h-4 w-4" />
                  Run AI analysis
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>CMS TRA source links</CardTitle>
              </CardHeader>
              <CardContent className="grid gap-3">
                {rightDomainLinks.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    target="_blank"
                    rel="noreferrer"
                    className="block rounded-2xl border border-slate-200 p-4 text-sm text-slate-700 transition hover:border-blue-400 hover:bg-blue-50"
                  >
                    <div className="break-words font-medium leading-6">{link.label}</div>
                    <div className="mt-1 text-xs text-slate-500">Open CMS TRA source page</div>
                  </a>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Suggested content</CardTitle>
              </CardHeader>
              <CardContent className="grid gap-3">
                {[
                  "Data encryption best practices",
                  "Cloud compliance checklist",
                  "Recent Zero Trust updates",
                  "AI-ready TRB review template",
                ].map((item) => (
                  <div
                    key={item}
                    className="flex items-center justify-between gap-3 rounded-2xl border border-slate-200 px-4 py-4 text-sm text-slate-700 transition hover:bg-slate-50"
                  >
                    <span>{item}</span>
                    <ArrowRight className="h-4 w-4 shrink-0" />
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Latest updates</CardTitle>
              </CardHeader>
              <CardContent className="grid gap-3 text-sm text-slate-700">
                {[
                  "New ARS 5.0 guidelines",
                  "TRB compliance review tips",
                  "Zero Trust framework overview",
                  "AI governance starter checklist",
                ].map((item) => (
                  <div key={item} className="rounded-2xl bg-slate-50 p-4">
                    {item}
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Analyst mode</CardTitle>
              </CardHeader>
              <CardContent className="grid gap-4 text-sm text-slate-700">
                <div className="flex items-center justify-between gap-3">
                  <span>Executive summary export</span>
                  <Badge>Ready</Badge>
                </div>
                <div className="flex items-center justify-between gap-3">
                  <span>Risk heat map view</span>
                  <Badge>Enabled</Badge>
                </div>
                <div className="flex items-center justify-between gap-3">
                  <span>TRB summary workflow</span>
                  <Badge>Mock</Badge>
                </div>
                <div className="flex items-center justify-between gap-3">
                  <span>Sparx EA sync preview</span>
                  <Badge>Concept</Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}