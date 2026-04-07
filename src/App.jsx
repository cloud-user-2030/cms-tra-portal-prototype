import React, { memo, useMemo, useState } from "react";
import {
  ArrowRight,
  BarChart3,
  Brain,
  Database,
  FileText,
  GitBranch,
  Grid3X3,
  Layers3,
  Map,
  Network,
  Search,
  Shield,
  Sparkles,
  Workflow,
  Info,
} from "lucide-react";
import {
  Area,
  AreaChart,
  Bar,
  CartesianGrid,
  Cell,
  ComposedChart,
  Funnel,
  FunnelChart,
  Line,
  Pie,
  PieChart,
  PolarAngleAxis,
  PolarGrid,
  PolarRadiusAxis,
  Radar,
  RadarChart,
  ResponsiveContainer,
  Scatter,
  ScatterChart,
  Sector,
  Tooltip,
  XAxis,
  YAxis,
  ZAxis,
} from "recharts";

/* -----------------------------
   Lightweight local UI helpers
----------------------------- */

function cx(...classes) {
  return classes.filter(Boolean).join(" ");
}

function Card({ className = "", children, onClick }) {
  return (
    <div
      onClick={onClick}
      className={cx(
        "rounded-2xl border border-slate-200 bg-white shadow-sm",
        onClick ? "cursor-pointer hover:shadow-md transition" : "",
        className
      )}
    >
      {children}
    </div>
  );
}

function CardHeader({ className = "", children }) {
  return <div className={cx("p-4 pb-2", className)}>{children}</div>;
}

function CardTitle({ className = "", children }) {
  return (
    <div className={cx("text-base font-semibold text-slate-900", className)}>
      {children}
    </div>
  );
}

function CardContent({ className = "", children }) {
  return <div className={cx("p-4", className)}>{children}</div>;
}

function Button({
  className = "",
  children,
  onClick,
  variant = "solid",
  type = "button",
}) {
  const base =
    "inline-flex items-center justify-center gap-2 rounded-xl px-3 py-2 text-sm font-medium transition";
  const styles =
    variant === "outline"
      ? "border border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
      : variant === "ghost"
      ? "bg-transparent text-slate-700 hover:bg-slate-100"
      : "bg-blue-600 text-white hover:bg-blue-700";
  return (
    <button type={type} onClick={onClick} className={cx(base, styles, className)}>
      {children}
    </button>
  );
}

function Badge({ className = "", children }) {
  return (
    <span
      className={cx(
        "inline-flex items-center rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-700",
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
      className={cx(
        "w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:border-blue-400",
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

/* -----------------------------
   Data
----------------------------- */

const TOP_TABS = [
  "Business Rules",
  "Recommended Practices",
  "AI Insights",
  "Heat Map",
  "Analytics",
  "Traceability",
  "Reference Library",
  "Acronym Guide",
];

const HERO_CONTENT = {
  "Business Rules": {
    eyebrow: "Business Rules",
    title: "Explore enforceable CMS TRA rules",
    description:
      "Review rule intent, supporting standards, and governance-ready details for faster architecture and TRB decisions.",
    detail:
      "Business rule view is active. Focus is on enforceable guidance, mappings, and review readiness.",
  },
  "Recommended Practices": {
    eyebrow: "Recommended Practices",
    title: "Implementation patterns made easier",
    description:
      "Browse supporting practices, examples, and operational guidance that complement the CMS TRA rule set.",
    detail:
      "Recommended practices view is active. Focus is on implementation guidance and design patterns.",
  },
  "AI Insights": {
    eyebrow: "AI Insights",
    title: "Smarter, faster TRA decisions",
    description:
      "Explore rules, compare to NIST, identify risk, and generate executive-ready summaries with AI guidance built for CMS TRA reviews.",
    detail:
      "AI insight view is active. Focus is on summaries, risk observations, and executive-ready outputs.",
  },
  "Heat Map": {
    eyebrow: "Heat Map",
    title: "See maturity and risk at a glance",
    description:
      "Switch from narrative guidance to visual maturity patterns across domains, quarters, and control coverage.",
    detail:
      "Heat map view is active. Focus is on maturity visualization, risk overlay, and control coverage.",
  },
  Analytics: {
    eyebrow: "Analytics",
    title: "Executive metrics with live signals",
    description:
      "Track compliance, readiness, mappings, and operational trends using interactive charts and compact executive analytics.",
    detail:
      "Analytics view is active. Focus is on trends, live signals, and executive metrics.",
  },
  Traceability: {
    eyebrow: "Traceability",
    title: "Follow the path from rule to evidence",
    description:
      "Connect CMS TRA rules to derived requirements, standards, evidence, and governance workflows in one view.",
    detail:
      "Traceability view is active. Focus is on rule-to-requirement-to-evidence linkage.",
  },
  "Reference Library": {
    eyebrow: "Reference Library",
    title: "Reference material in one place",
    description:
      "Open linked guidance, standards, and CMS TRA source pages directly from the executive experience layer.",
    detail:
      "Reference library view is active. Focus is on linked guidance, standards, and source pages.",
  },
  "Acronym Guide": {
    eyebrow: "Acronym Guide",
    title: "Decode enterprise architecture language",
    description:
      "Keep CMS TRA, ARS, NIST, and governance terms easy to scan for executives, analysts, and review teams.",
    detail:
      "Acronym guide view is active. Focus is on terminology and executive readability.",
  },
};

const AI_ACTIONS = {
  summary:
    "✔ This rule aligns with CMS TRA standards and is likely ready for TRB packaging with minor analyst validation.",
  nist: "✔ Mapped to NIST SP 800-53 AC-2 and IA-5. Control alignment looks strong.",
  risk: "⚠ Medium risk detected due to incomplete evidence and control enforcement gaps.",
  trace:
    "Trace path generated: CMS TRA rule → derived requirement → control mapping → evidence → TRB summary.",
};

const KPI_DATA = [
  { label: "Compliance Score", value: "92%", sub: "Up 6% this quarter" },
  { label: "Mapped Controls", value: "2,386", sub: "Linked to evidence" },
  { label: "Open Risks", value: "14", sub: "3 need immediate action" },
  { label: "AI Summaries", value: "328", sub: "Generated for reviews" },
];

const TREND_DATA = [
  { month: "Jan", compliance: 72, risk: 28, mappings: 920 },
  { month: "Feb", compliance: 76, risk: 24, mappings: 1120 },
  { month: "Mar", compliance: 79, risk: 20, mappings: 1380 },
  { month: "Apr", compliance: 84, risk: 18, mappings: 1760 },
  { month: "May", compliance: 89, risk: 16, mappings: 2140 },
  { month: "Jun", compliance: 92, risk: 14, mappings: 2386 },
];

const BUBBLE_DATA = [
  { x: 18, y: 82, z: 240, name: "Identity" },
  { x: 28, y: 76, z: 180, name: "Devices" },
  { x: 35, y: 68, z: 220, name: "Networks" },
  { x: 22, y: 88, z: 200, name: "Applications" },
  { x: 14, y: 91, z: 260, name: "Data" },
];

const FUNNEL_DATA = [
  { value: 428, name: "TRA Rules" },
  { value: 241, name: "Mapped to Controls" },
  { value: 123, name: "AI Reviewed" },
  { value: 54, name: "TRB Ready" },
];

const RADAR_DATA = [
  { subject: "Identity", score: 86 },
  { subject: "Devices", score: 72 },
  { subject: "Networks", score: 78 },
  { subject: "Apps", score: 84 },
  { subject: "Data", score: 92 },
  { subject: "Governance", score: 81 },
];

const HEAT_DATA = [
  ["Identity", 92, 84, 80, 74],
  ["Devices", 78, 69, 64, 58],
  ["Networks", 88, 80, 76, 71],
  ["Apps", 90, 85, 79, 72],
  ["Data", 95, 92, 86, 80],
];

const DOMAIN_LINKS = [
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

const DETAIL_CONTENT = {
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
  "AI Insights": {
    title: "AI Insights metadata",
    text:
      "AI Insights surfaces summaries, comparisons, risk observations, and executive-ready outputs from the same rule set.",
  },
  Analytics: {
    title: "Analytics metadata",
    text:
      "Analytics views compare compliance, risk, control mapping, and readiness over time using interactive executive visuals.",
  },
  Traceability: {
    title: "Traceability metadata",
    text:
      "Traceability connects CMS TRA rules to derived requirements, standards, evidence, and governance decision packages.",
  },
};

const COMPLIANCE_STATUS_DATA = [
  { name: "Compliant", value: 62 },
  { name: "Monitoring", value: 28 },
  { name: "At Risk", value: 10 },
];

const RISK_BREAKDOWN_DATA = [
  { name: "Identity", value: 32 },
  { name: "Access", value: 27 },
  { name: "Data", value: 23 },
  { name: "Devices", value: 18 },
];

const COMPLIANCE_STATUS_COLORS = ["#14b8a6", "#fbbf24", "#f87171"];
const RISK_BREAKDOWN_COLORS = ["#38bdf8", "#a78bfa", "#fbbf24", "#fb7185"];

/* -----------------------------
   Components
----------------------------- */

const TopNav = memo(function TopNav({ activeTopTab, onChange }) {
  return (
    <div className="px-4 py-4 md:px-6">
      <div className="overflow-x-auto">
        <div className="flex w-max min-w-full gap-2 rounded-[22px] border border-white/15 bg-white/10 p-2 backdrop-blur-sm">
          {TOP_TABS.map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => onChange(tab)}
              className={cx(
                "min-h-[40px] shrink-0 rounded-[16px] border px-3 py-2 text-xs font-medium transition md:px-4 md:text-sm",
                activeTopTab === tab
                  ? "border-white bg-white text-blue-700 shadow-lg"
                  : "border-transparent bg-transparent text-white hover:border-white/20 hover:bg-white/10"
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

const KPI = memo(function KPI({ label, value, sub, onClick }) {
  return (
    <Card
      className="hover:border-blue-300"
      onClick={() => onClick(label)}
    >
      <CardContent>
        <div className="text-xs text-slate-500">{label}</div>
        <div className="mt-1 text-2xl font-bold text-slate-900">{value}</div>
        <div className="mt-1 text-xs text-slate-500">{sub}</div>
      </CardContent>
    </Card>
  );
});

const MiniHeatMap = memo(function MiniHeatMap() {
  const columns = ["Q1", "Q2", "Q3", "Q4"];
  const toneClass = (value) => {
    if (value >= 90) return "bg-blue-700 text-white";
    if (value >= 80) return "bg-blue-500 text-white";
    if (value >= 70) return "bg-blue-200 text-slate-900";
    return "bg-slate-200 text-slate-700";
  };

  return (
    <div className="h-full w-full rounded-2xl border border-slate-200 bg-slate-50 p-4">
      <div className="mb-3 flex items-center justify-between">
        <div>
          <div className="text-sm font-semibold text-slate-900">
            Maturity Heat Map
          </div>
          <div className="text-xs text-slate-500">Quarterly domain maturity</div>
        </div>
        <Badge>Hover</Badge>
      </div>

      <div className="overflow-auto">
        <div className="grid min-w-[420px] grid-cols-[100px_repeat(4,1fr)] gap-2 text-xs">
          <div />
          {columns.map((q) => (
            <div key={q} className="text-center font-medium text-slate-500">
              {q}
            </div>
          ))}
          {HEAT_DATA.map(([label, ...values]) => (
            <React.Fragment key={label}>
              <div className="truncate pr-1 font-medium text-slate-700">{label}</div>
              {values.map((value, index) => (
                <div
                  key={`${label}-${index}`}
                  className={cx(
                    "flex h-10 items-center justify-center rounded-lg font-semibold",
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
});

function InsightDonutCard({ title, data, centerValue, colors }) {
  const [activeSlice, setActiveSlice] = useState(null);

  return (
    <div className="rounded-2xl bg-white p-4 text-slate-800 shadow-sm">
      <div className="text-sm font-semibold">{title}</div>
      <div className="mt-3 grid grid-cols-[1fr_88px] items-center gap-3">
        <div className="space-y-2 text-[11px]">
          {data.map((item, index) => (
            <div
              key={item.name}
              className={cx(
                "grid grid-cols-[1fr_34px] items-center gap-2 rounded-lg px-2 py-1",
                activeSlice === index ? "bg-slate-100" : ""
              )}
            >
              <div className="flex items-center gap-2 overflow-hidden">
                <span
                  className="h-2.5 w-2.5 shrink-0 rounded-full"
                  style={{ backgroundColor: colors[index % colors.length] }}
                />
                <span className="truncate text-slate-700">{item.name}</span>
              </div>
              <span className="text-right font-medium text-slate-800">
                {item.value}%
              </span>
            </div>
          ))}
        </div>

        <div className="relative h-[88px] w-[88px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                dataKey="value"
                nameKey="name"
                innerRadius={24}
                outerRadius={36}
                paddingAngle={2}
                activeIndex={activeSlice ?? undefined}
                activeShape={(props) => {
                  const {
                    cx,
                    cy,
                    innerRadius,
                    outerRadius,
                    startAngle,
                    endAngle,
                    fill,
                  } = props;
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
                {data.map((_, index) => (
                  <Cell key={index} fill={colors[index % colors.length]} />
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

/* -----------------------------
   Main App
----------------------------- */

export default function App() {
  const [query, setQuery] = useState(
    "How can I securely transfer sensitive data?"
  );
  const [aiOutput, setAiOutput] = useState(
    "Use approved encryption, verify identity, and link the recommendation to TRA and NIST evidence."
  );
  const [viz, setViz] = useState("heatmap");
  const [activeTopTab, setActiveTopTab] = useState("AI Insights");
  const [activeSubTab, setActiveSubTab] = useState("insights");
  const [detailPanel, setDetailPanel] = useState(DETAIL_CONTENT["AI Insights"]);

  const activeHero = HERO_CONTENT[activeTopTab] || HERO_CONTENT["AI Insights"];

  const openDetail = (key) => {
    setDetailPanel(
      DETAIL_CONTENT[key] || {
        title: `${key} metadata`,
        text:
          "Interactive preview metadata is available for this item. In the live version, this can open a drawer, modal, or linked details panel.",
      }
    );
  };

  const handleTopTabChange = (tab) => {
    setActiveTopTab(tab);
    openDetail(tab);
    if (tab === "Heat Map") setViz("heatmap");
    if (tab === "Analytics") setViz("bubble");
  };

  const handleRunAI = (type) => {
    setAiOutput(AI_ACTIONS[type] || "Analysis completed.");
  };

  const vizPanel = useMemo(() => {
    switch (viz) {
      case "bubble":
        return (
          <ResponsiveContainer width="100%" height="100%">
            <ScatterChart>
              <CartesianGrid />
              <XAxis type="number" dataKey="x" name="Risk" />
              <YAxis type="number" dataKey="y" name="Readiness" />
              <ZAxis type="number" dataKey="z" range={[80, 600]} />
              <Tooltip />
              <Scatter data={BUBBLE_DATA} fill="#2563eb" />
            </ScatterChart>
          </ResponsiveContainer>
        );

      case "funnel":
        return (
          <ResponsiveContainer width="100%" height="100%">
            <FunnelChart>
              <Tooltip />
              <Funnel data={FUNNEL_DATA} dataKey="value" isAnimationActive>
                {FUNNEL_DATA.map((_, index) => (
                  <Cell key={index} fill={["#2563eb", "#3b82f6", "#60a5fa", "#93c5fd"][index]} />
                ))}
              </Funnel>
            </FunnelChart>
          </ResponsiveContainer>
        );

      case "cluster":
        return (
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart data={RADAR_DATA} outerRadius="68%">
              <PolarGrid />
              <PolarAngleAxis dataKey="subject" tick={{ fontSize: 11 }} />
              <PolarRadiusAxis tick={{ fontSize: 10 }} />
              <Radar
                dataKey="score"
                fill="#3b82f6"
                fillOpacity={0.4}
                stroke="#1d4ed8"
              />
              <Tooltip />
            </RadarChart>
          </ResponsiveContainer>
        );

      case "gauge":
        return (
          <div className="flex h-full flex-col justify-center gap-6">
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

      default:
        return <MiniHeatMap />;
    }
  }, [viz]);

  return (
    <div className="min-h-screen bg-slate-100 p-4 md:p-6">
      <div className="mx-auto max-w-7xl space-y-5 md:space-y-6">
        <div className="overflow-hidden rounded-[28px] bg-blue-700 text-white shadow-xl">
          <div className="border-b border-white/10 px-6 pb-4 pt-5">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <div className="flex items-center gap-2 text-sm text-blue-100">
                  <Layers3 className="h-4 w-4" />
                  CMS TRA Interactive Portal
                </div>
                <h1 className="mt-1 text-2xl font-bold">
                  Executive analytics preview
                </h1>
                <p className="mt-1 text-sm text-blue-100">
                  AI-enabled architecture, traceability, and compliance workspace
                </p>
              </div>
              <div className="flex flex-wrap gap-2">
                <Badge className="bg-white/15 text-white">Release 2025 R1</Badge>
                <Badge className="bg-white/15 text-white">Zero Trust Ready</Badge>
                <Badge className="bg-white/15 text-white">AI Copilot Enabled</Badge>
              </div>
            </div>
          </div>

          <TopNav activeTopTab={activeTopTab} onChange={handleTopTabChange} />
        </div>

        <div className="grid grid-cols-1 gap-5 lg:grid-cols-[260px_minmax(0,1.18fr)_240px] md:gap-6">
          {/* Left rail */}
          <div className="space-y-5 md:space-y-6">
            <Card className="border-blue-200 bg-gradient-to-br from-blue-50 to-white">
              <CardHeader>
                <CardTitle className="text-blue-900">Interactive metadata</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="text-sm font-semibold text-slate-900">
                  {detailPanel.title}
                </div>
                <div className="text-sm leading-6 text-slate-600">
                  {detailPanel.text}
                </div>
                <div className="rounded-xl border border-blue-100 bg-white p-3 text-xs text-slate-500">
                  Click a KPI card, rule tile, top menu tab, or analytics section to
                  update this panel.
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
                    className="h-20 flex-col gap-2 text-center text-slate-700"
                    onClick={() => openDetail(label)}
                  >
                    <Icon className="h-4 w-4" />
                    <span className="text-xs">{label}</span>
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
                    className={cx(
                      "h-20 flex-col gap-2 text-center text-slate-700",
                      label === "Security" ? "ring-2 ring-blue-500" : ""
                    )}
                    onClick={() => openDetail(label)}
                  >
                    <Icon className="h-4 w-4" />
                    <span className="text-xs">{label}</span>
                  </Button>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Live status</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-sm">
                <div className="flex justify-between">
                  <span className="text-slate-500">Rules mapped</span>
                  <span className="font-semibold">1,248</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">High risk gaps</span>
                  <span className="font-semibold">14</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">AI summaries</span>
                  <span className="font-semibold">328</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>CMS TRA source links</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {DOMAIN_LINKS.slice(0, 3).map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    target="_blank"
                    rel="noreferrer"
                    className="block rounded-2xl border border-slate-200 p-4 text-sm text-slate-700 transition hover:border-blue-400 hover:bg-blue-50"
                  >
                    <div className="font-medium leading-6">{link.label}</div>
                    <div className="mt-1 text-xs text-slate-500">
                      Open CMS TRA source page
                    </div>
                  </a>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Center */}
          <div className="space-y-5 md:space-y-6">
            <Card>
              <CardContent className="space-y-4">
                <div className="flex flex-col gap-3 md:flex-row">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                    <Input
                      value={query}
                      onChange={(e) => setQuery(e.target.value)}
                      className="pl-9"
                    />
                  </div>
                  <Button>
                    <Sparkles className="h-4 w-4" />
                    Ask TRA AI
                  </Button>
                  <Button variant="outline">Filters</Button>
                </div>

                <div className="flex flex-wrap gap-2">
                  {[
                    "Show all Zero Trust rules in identity assurance",
                    "Compare AI rule to NIST and CMS ARS mappings",
                    "Find controls with high risk and low maturity",
                    "Generate TRB-ready compliance summary",
                  ].map((suggestion) => (
                    <button
                      key={suggestion}
                      type="button"
                      onClick={() => setQuery(suggestion)}
                      className="rounded-full bg-blue-50 px-3 py-1.5 text-xs text-blue-700 transition hover:bg-blue-100"
                    >
                      {suggestion}
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
              {KPI_DATA.map((item) => (
                <KPI key={item.label} {...item} onClick={openDetail} />
              ))}
            </div>

            <Card className="overflow-hidden rounded-[28px] border-0 bg-blue-700 text-white shadow-xl">
              <CardContent className="p-5 md:p-6">
                <div className="grid grid-cols-1 gap-5 xl:grid-cols-[minmax(0,1.28fr)_minmax(320px,0.92fr)]">
                  <div className="space-y-4">
                    <div>
                      <div className="text-[11px] uppercase tracking-[0.24em] text-blue-200">
                        {activeHero.eyebrow}
                      </div>
                      <h2 className="mt-2 max-w-[13ch] text-3xl font-bold leading-tight md:text-4xl">
                        {activeHero.title}
                      </h2>
                      <p className="mt-3 max-w-xl text-sm leading-7 text-blue-100 md:text-base">
                        {activeHero.description}
                      </p>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      <Button
                        className="bg-white text-blue-700 hover:bg-blue-50"
                        onClick={() => handleRunAI("summary")}
                      >
                        Generate summary
                      </Button>
                      <Button
                        className="bg-white text-blue-700 hover:bg-blue-50"
                        onClick={() => handleRunAI("nist")}
                      >
                        Compare to NIST
                      </Button>
                      <Button
                        className="bg-white text-blue-700 hover:bg-blue-50"
                        onClick={() => handleRunAI("risk")}
                      >
                        Analyze Risk
                      </Button>
                    </div>

                    <div className="min-h-[96px] rounded-2xl border border-white/20 bg-white/15 p-4 text-sm leading-7 text-white/95">
                      {activeTopTab === "AI Insights" ? aiOutput : activeHero.detail}
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                      <div className="rounded-2xl border border-white/15 bg-white/12 p-4">
                        <div className="text-xs text-blue-200">AI Confidence</div>
                        <div className="mt-1 text-2xl font-bold">94%</div>
                        <div className="mt-1 text-xs text-blue-100">Summary quality</div>
                      </div>
                      <div className="rounded-2xl border border-white/15 bg-white/12 p-4">
                        <div className="text-xs text-blue-200">Trace Links</div>
                        <div className="mt-1 text-2xl font-bold">2,386</div>
                        <div className="mt-1 text-xs text-blue-100">Mapped records</div>
                      </div>
                    </div>

                    <div className="rounded-2xl border border-white/15 bg-gradient-to-br from-white/14 to-white/8 p-4">
                      <div className="mb-3 flex items-center justify-between">
                        <div>
                          <div className="text-sm font-semibold">Quick insights</div>
                          <div className="mt-1 text-xs text-blue-100">
                            Live signal snapshot
                          </div>
                        </div>
                        <Badge className="bg-white/90 text-blue-700">Live</Badge>
                      </div>

                      <div className="grid grid-cols-1 gap-3">
                        <InsightDonutCard
                          title="Compliance by Status"
                          data={COMPLIANCE_STATUS_DATA}
                          centerValue={62}
                          colors={COMPLIANCE_STATUS_COLORS}
                        />
                        <InsightDonutCard
                          title="Risk Factor Breakdown"
                          data={RISK_BREAKDOWN_DATA}
                          centerValue={27}
                          colors={RISK_BREAKDOWN_COLORS}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Sub tabs */}
            <div className="space-y-4">
              <div className="rounded-[24px] border border-blue-200 bg-white p-1.5 shadow-sm">
                <div className="grid grid-cols-4 gap-1 rounded-[20px] bg-slate-100/90 p-1">
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
                      className={cx(
                        "min-h-[42px] rounded-[16px] px-2 text-xs font-semibold md:px-3 md:text-sm",
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
                <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
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
                      <CardContent>
                        <div className="font-bold text-slate-900">{id}</div>
                        <div className="mt-1 text-sm text-slate-500">{title}</div>
                        <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-slate-700">
                          {bullets.map((bullet) => (
                            <li key={bullet}>{bullet}</li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}

              {activeSubTab === "heatmap" && (
                <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
                  <Card className="lg:col-span-2">
                    <CardHeader>
                      <CardTitle>Maturity heat map</CardTitle>
                    </CardHeader>
                    <CardContent className="h-[320px]">
                      <MiniHeatMap />
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Heat map filters</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4 text-sm">
                      <div>
                        <div className="mb-2 text-slate-500">Domain</div>
                        <div className="flex flex-wrap gap-2">
                          {["Identity", "Devices", "Networks", "Apps", "Data"].map((item) => (
                            <Badge key={item}>{item}</Badge>
                          ))}
                        </div>
                      </div>
                      <div>
                        <div className="mb-2 text-slate-500">View</div>
                        <div className="flex flex-wrap gap-2">
                          {["Quarterly", "Risk overlay", "Control mapping"].map((item) => (
                            <Badge key={item}>{item}</Badge>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )}

              {activeSubTab === "analytics" && (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
                    <Card>
                      <CardHeader>
                        <CardTitle>Compliance trend</CardTitle>
                      </CardHeader>
                      <CardContent className="h-[260px]">
                        <ResponsiveContainer width="100%" height="100%">
                          <AreaChart data={TREND_DATA}>
                            <defs>
                              <linearGradient id="compliance-fill" x1="0" y1="0" x2="0" y2="1">
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
                              fill="url(#compliance-fill)"
                            />
                          </AreaChart>
                        </ResponsiveContainer>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle>Dynamic visual explorer</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <select
                          value={viz}
                          onChange={(e) => setViz(e.target.value)}
                          className="w-[180px] rounded-full border border-slate-200 px-3 py-2 text-sm"
                        >
                          <option value="heatmap">Heat map</option>
                          <option value="bubble">Bubbles</option>
                          <option value="cluster">Cluster</option>
                          <option value="funnel">Funnel</option>
                          <option value="gauge">Gauge</option>
                        </select>
                        <div className="h-[260px]">{vizPanel}</div>
                      </CardContent>
                    </Card>
                  </div>

                  <Card>
                    <CardHeader>
                      <CardTitle>Mappings by month</CardTitle>
                    </CardHeader>
                    <CardContent className="h-[300px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <ComposedChart data={TREND_DATA}>
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
                    </CardContent>
                  </Card>
                </div>
              )}

              {activeSubTab === "traceability" && (
                <Card>
                  <CardContent>
                    <div className="mb-3 text-sm text-slate-500">Trace path</div>
                    <div className="grid grid-cols-1 gap-5 px-2 md:grid-cols-5">
                      {[
                        "CMS TRA Rule",
                        "Derived Requirement",
                        "NIST / ARS Control",
                        "Evidence Link",
                        "TRB Decision",
                      ].map((name, index) => (
                        <div
                          key={name}
                          className="relative flex min-h-[92px] items-center justify-center rounded-2xl border border-slate-200 bg-slate-50 p-4 text-center text-sm font-medium text-slate-700"
                        >
                          <span>{name}</span>
                          {index < 4 && (
                            <div className="absolute -right-6 top-1/2 hidden h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-slate-200 bg-white shadow-sm md:flex">
                              <ArrowRight className="h-4 w-4 text-slate-500" />
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>

          {/* Right rail */}
          <div className="space-y-5 md:space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>AI Copilot</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="rounded-2xl bg-slate-50 p-4">
                  <div className="text-xs text-slate-500">Suggested prompt</div>
                  <div className="mt-2 text-sm text-slate-700">
                    How can I securely transfer sensitive data?
                  </div>
                </div>
                <div className="rounded-2xl border border-slate-200 p-4 text-sm text-slate-700">
                  Use BR-DSS style guidance: protect data in transit with approved
                  encryption and secure transfer protocols such as TLS-protected APIs
                  or SFTP.
                </div>
                <Button className="w-full">
                  <Brain className="h-4 w-4" />
                  Run AI analysis
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>CMS TRA source links</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {DOMAIN_LINKS.slice(3).map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    target="_blank"
                    rel="noreferrer"
                    className="block rounded-2xl border border-slate-200 p-4 text-sm text-slate-700 transition hover:border-blue-400 hover:bg-blue-50"
                  >
                    <div className="font-medium leading-6">{link.label}</div>
                    <div className="mt-1 text-xs text-slate-500">
                      Open CMS TRA source page
                    </div>
                  </a>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Suggested content</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {[
                  "Data encryption best practices",
                  "Cloud compliance checklist",
                  "Recent Zero Trust updates",
                  "AI-ready TRB review template",
                ].map((item) => (
                  <div
                    key={item}
                    className="flex items-center justify-between rounded-xl border border-slate-200 px-4 py-3 text-sm text-slate-700 transition hover:bg-slate-50"
                  >
                    <span>{item}</span>
                    <ArrowRight className="h-4 w-4" />
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Latest updates</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm text-slate-700">
                {[
                  "New ARS 5.0 guidelines",
                  "TRB compliance review tips",
                  "Zero Trust framework overview",
                  "AI governance starter checklist",
                ].map((item) => (
                  <div key={item} className="rounded-xl bg-slate-50 p-3">
                    {item}
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Analyst mode</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-sm text-slate-700">
                <div className="flex items-center justify-between">
                  <span>Executive summary export</span>
                  <Badge>Ready</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span>Risk heat map view</span>
                  <Badge>Enabled</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span>TRB summary workflow</span>
                  <Badge>Mock</Badge>
                </div>
                <div className="flex items-center justify-between">
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