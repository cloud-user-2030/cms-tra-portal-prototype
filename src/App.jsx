import React, { createContext, memo, useCallback, useContext, useMemo, useState } from 'react';

const Icon = ({ label = '•', className = 'w-4 h-4' }) => (
  <span className={`inline-flex items-center justify-center ${className}`} aria-hidden="true">
    {label}
  </span>
);

const ArrowRight = ({ className }) => <Icon label="→" className={className} />;
const BarChart3 = ({ className }) => <Icon label="▦" className={className} />;
const Brain = ({ className }) => <Icon label="AI" className={className} />;
const Database = ({ className }) => <Icon label="DB" className={className} />;
const FileText = ({ className }) => <Icon label="▤" className={className} />;
const GitBranch = ({ className }) => <Icon label="↔" className={className} />;
const Grid3X3 = ({ className }) => <Icon label="▦" className={className} />;
const Info = ({ className }) => <Icon label="i" className={className} />;
const Layers3 = ({ className }) => <Icon label="▧" className={className} />;
const Map = ({ className }) => <Icon label="◇" className={className} />;
const Network = ({ className }) => <Icon label="⌘" className={className} />;
const Search = ({ className }) => <Icon label="⌕" className={className} />;
const Shield = ({ className }) => <Icon label="▣" className={className} />;
const Sparkles = ({ className }) => <Icon label="✦" className={className} />;
const Workflow = ({ className }) => <Icon label="⇄" className={className} />;
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
} from 'recharts';

const cn = (...classes) => classes.filter(Boolean).join(' ');

const Card = ({ className = '', children, ...props }) => {
  const hasCustomBg = /(^| )(bg-|from-|to-|via-|gradient)/.test(className);
  return (
    <div className={cn(hasCustomBg ? 'border rounded-xl' : 'bg-white border rounded-xl', className)} {...props}>
      {children}
    </div>
  );
};

const CardHeader = ({ className = '', children }) => (
  <div className={cn('p-4', className)}>{children}</div>
);

const CardTitle = ({ className = '', children }) => (
  <div className={cn('font-semibold', className)}>{children}</div>
);

const CardContent = ({ className = '', children }) => (
  <div className={cn('p-4', className)}>{children}</div>
);

const Button = ({ className = '', variant = 'default', size, children, ...props }) => {
  const base = 'inline-flex items-center justify-center gap-2 rounded-md font-medium transition-colors disabled:opacity-50 disabled:pointer-events-none cursor-pointer touch-manipulation select-none focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400';
  const variants = {
    default: 'bg-blue-600 text-white hover:bg-blue-700',
    secondary: 'bg-slate-100 text-slate-900 hover:bg-slate-200',
    outline: 'border border-slate-200 bg-white text-slate-700 hover:bg-slate-50',
    ghost: 'hover:bg-slate-100 text-slate-700',
  };
  const hasCustomColor = /(^| )(bg-|text-|border-|hover:bg-|hover:text-)/.test(className);
  const sizes = size === 'sm' ? 'px-3 py-1.5 text-sm' : 'px-4 py-2 text-sm';
  return (
    <button type="button" className={cn(base, hasCustomColor ? '' : variants[variant] || variants.default, sizes, className)} {...props}>
      {children}
    </button>
  );
};

const Input = ({ className = '', ...props }) => (
  <input className={cn('w-full border border-slate-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-200', className)} {...props} />
);

const Badge = ({ className = '', variant, children }) => (
  <span
    className={cn(
      'inline-flex shrink-0 items-center justify-center rounded-full min-h-[24px] px-2.5 py-1 text-[11px] font-semibold leading-none whitespace-nowrap align-middle transition-colors',
      variant === 'secondary' ? 'bg-slate-100 text-slate-700' : 'bg-blue-600 text-white',
      className,
    )}
  >
    <span className="leading-none whitespace-nowrap">{children}</span>
  </span>
);

const Progress = ({ value = 0, className = '' }) => (
  <div className={cn('w-full overflow-hidden rounded-full bg-slate-200', className)}>
    <div className="h-full rounded-full bg-blue-600" style={{ width: `${Math.max(0, Math.min(100, value))}%` }} />
  </div>
);

const TabsContext = createContext({ value: '', onValueChange: () => {} });

const Tabs = ({ value, onValueChange, className = '', children }) => (
  <TabsContext.Provider value={{ value, onValueChange }}>
    <div className={className}>{children}</div>
  </TabsContext.Provider>
);

const TabsList = ({ className = '', children }) => (
  <div className={className}>{children}</div>
);

const TabsTrigger = ({ value, className = '', children }) => {
  const tabs = useContext(TabsContext);
  const active = tabs.value === value;
  return (
    <button type="button" onPointerUp={() => tabs.onValueChange?.(value)} data-state={active ? 'active' : 'inactive'} className={cn('cursor-pointer touch-manipulation select-none focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400', className)}>
      {children}
    </button>
  );
};

const TabsContent = ({ value, children, className = '' }) => {
  const tabs = useContext(TabsContext);
  return tabs.value === value ? <div className={className}>{children}</div> : null;
};

const TOP_TABS = [
  'Business Rules',
  'Recommended Practices',
  'AI Insights',
  'Heat Map',
  'Analytics',
  'Traceability',
  'Reference Library',
  'Acronym Guide',
];

const HERO_CONTENT = {
  'Business Rules': {
    eyebrow: 'Business Rules',
    title: 'Explore enforceable CMS TRA rules',
    description: 'Review rule intent, supporting standards, and governance-ready details for faster architecture and TRB decisions.',
    actions: [
      ['Open rules', 'summary'],
      ['View mappings', 'trace'],
      ['Check risk', 'risk'],
      ['Compare standards', 'nist'],
    ],
    detail: 'Business rule view is active. Focus is on enforceable guidance, mappings, and review readiness.',
  },
  'Recommended Practices': {
    eyebrow: 'Recommended Practices',
    title: 'Implementation patterns made easier',
    description: 'Browse supporting practices, examples, and operational guidance that complement the CMS TRA rule set.',
    actions: [
      ['Browse practices', 'summary'],
      ['Map to NIST', 'nist'],
      ['Open trace', 'trace'],
      ['Analyze impact', 'risk'],
    ],
    detail: 'Recommended practices view is active. Focus is on supporting implementation guidance and design patterns.',
  },
  'AI Insights': {
    eyebrow: 'AI Insights',
    title: 'Smarter, faster TRA decisions',
    description: 'Explore business rules, compare to NIST, identify risk, and generate executive-ready summaries with AI guidance built for CMS TRA reviews.',
    actions: [
      ['Generate summary', 'summary'],
      ['Compare to NIST', 'nist'],
      ['Open trace', 'trace'],
      ['Analyze risk', 'risk'],
    ],
    detail: 'AI insight view is active. Focus is on summaries, risk observations, and executive-ready outputs.',
  },
  'Heat Map': {
    eyebrow: 'Heat Map',
    title: 'See maturity and risk at a glance',
    description: 'Switch from narrative guidance to visual maturity patterns across domains, quarters, and control coverage.',
    actions: [
      ['Open heat map', 'summary'],
      ['View risk overlay', 'risk'],
      ['Show controls', 'trace'],
      ['Compare maturity', 'nist'],
    ],
    detail: 'Heat map view is active. Focus is on maturity visualization, risk overlay, and control coverage.',
  },
  Analytics: {
    eyebrow: 'Analytics',
    title: 'Executive metrics with live signals',
    description: 'Track compliance, readiness, mappings, and operational trends using interactive charts and compact executive analytics.',
    actions: [
      ['Open analytics', 'summary'],
      ['Show trends', 'trace'],
      ['Analyze risk', 'risk'],
      ['Compare standards', 'nist'],
    ],
    detail: 'Analytics view is active. Focus is on trends, live signals, and executive metrics.',
  },
  Traceability: {
    eyebrow: 'Traceability',
    title: 'Follow the path from rule to evidence',
    description: 'Connect CMS TRA rules to derived requirements, standards, evidence, and governance workflows in one view.',
    actions: [
      ['Open trace', 'trace'],
      ['Show evidence', 'summary'],
      ['Check controls', 'nist'],
      ['Scan gaps', 'risk'],
    ],
    detail: 'Traceability view is active. Focus is on rule-to-requirement-to-evidence linkage.',
  },
  'Reference Library': {
    eyebrow: 'Reference Library',
    title: 'Reference material in one place',
    description: 'Open linked guidance, standards, and CMS TRA source pages directly from the executive experience layer.',
    actions: [
      ['Open sources', 'summary'],
      ['View links', 'trace'],
      ['Compare standards', 'nist'],
      ['Analyze gaps', 'risk'],
    ],
    detail: 'Reference Library view is active. Focus is on linked guidance, standards, and source pages.',
  },
  'Acronym Guide': {
    eyebrow: 'Acronym Guide',
    title: 'Decode enterprise architecture language',
    description: 'Keep CMS TRA, ARS, NIST, and governance terms easy to scan for executives, analysts, and review teams.',
    actions: [
      ['Open guide', 'summary'],
      ['Show mappings', 'trace'],
      ['Compare terms', 'nist'],
      ['Flag confusion', 'risk'],
    ],
    detail: 'Acronym Guide view is active. Focus is on terminology and executive readability.',
  },
};

const AI_ACTIONS = {
  summary: '✔ This rule aligns with CMS TRA standards. Recommended for TRB approval with minor adjustments.',
  nist: '✔ Mapped to NIST SP 800-53 AC-2, IA-5. Full compliance coverage achieved.',
  risk: '⚠ Medium risk detected due to missing encryption enforcement.',
  trace: 'Trace view generated: CMS TRA rule → derived requirement → control mapping → evidence → TRB package.',
};

const KPI_DATA = [
  { label: 'Compliance Score', value: '92%', sub: 'Up 6% this quarter' },
  { label: 'Mapped Controls', value: '2,386', sub: 'Linked to evidence' },
  { label: 'Open Risks', value: '14', sub: '3 need immediate action' },
  { label: 'AI Summaries', value: '328', sub: 'Generated for reviews' },
];

const TREND_DATA = [
  { month: 'Jan', compliance: 72, risk: 28, mappings: 920 },
  { month: 'Feb', compliance: 76, risk: 24, mappings: 1120 },
  { month: 'Mar', compliance: 79, risk: 20, mappings: 1380 },
  { month: 'Apr', compliance: 84, risk: 18, mappings: 1760 },
  { month: 'May', compliance: 89, risk: 16, mappings: 2140 },
  { month: 'Jun', compliance: 92, risk: 14, mappings: 2386 },
];

const BUBBLE_DATA = [
  { x: 18, y: 82, z: 240, name: 'Identity' },
  { x: 28, y: 76, z: 180, name: 'Devices' },
  { x: 35, y: 68, z: 220, name: 'Networks' },
  { x: 22, y: 88, z: 200, name: 'Applications' },
  { x: 14, y: 91, z: 260, name: 'Data' },
];

const STATE_BUBBLE_DATA = [
  { name: 'Devices', state: 'FL', left: '18%', top: '55%', size: 72, risk: 28, readiness: 78, mapped: 186 },
  { name: 'Identity', state: 'VA', left: '38%', top: '34%', size: 54, risk: 18, readiness: 86, mapped: 224 },
  { name: 'Networks', state: 'MD', left: '62%', top: '28%', size: 62, risk: 35, readiness: 70, mapped: 171 },
  { name: 'Applications', state: 'DC', left: '78%', top: '48%', size: 84, risk: 22, readiness: 88, mapped: 260 },
  { name: 'Data', state: 'TX', left: '50%', top: '68%', size: 60, risk: 14, readiness: 91, mapped: 205 },
];

const FUNNEL_DATA = [
  { value: 428, name: 'TRA Rules' },
  { value: 241, name: 'Mapped to Controls' },
  { value: 123, name: 'AI Reviewed' },
  { value: 54, name: 'TRB Ready' },
];

const RADAR_DATA = [
  { subject: 'Identity', score: 86 },
  { subject: 'Devices', score: 72 },
  { subject: 'Networks', score: 78 },
  { subject: 'Apps', score: 84 },
  { subject: 'Data', score: 92 },
  { subject: 'Governance', score: 81 },
];

const HEAT_DATA = [
  ['Identity', 92, 84, 80, 74],
  ['Devices', 78, 69, 64, 58],
  ['Networks', 88, 80, 76, 71],
  ['Apps', 90, 85, 79, 72],
  ['Data', 95, 92, 86, 80],
];

const GANTT_ITEMS = [
  { name: 'Rule Intake', start: 8, end: 22 },
  { name: 'AI Mapping', start: 16, end: 38 },
  { name: 'Analyst Review', start: 30, end: 54 },
  { name: 'TRB Summary', start: 48, end: 72 },
  { name: 'EA Sync', start: 66, end: 92 },
];

const DOMAIN_LINKS = [
  { label: 'Foundation', href: 'https://www.cms.gov/tra/Foundation/FD_0010_Foundation_Introduction.htm' },
  { label: 'Infrastructure / Virtualization', href: 'https://www.cms.gov/tra/Infrastructure_Services/IS_0010_Virtualization_Introduction.htm' },
  { label: 'Application Development', href: 'https://www.cms.gov/tra/Application_Development/AD_0010_Application_Introduction.htm' },
  { label: 'Data Management', href: 'https://www.cms.gov/tra/Data_Management/DM_0010_Introduction.htm' },
  { label: 'Data Storage Services', href: 'https://www.cms.gov/tra/Data_Management/DM_0160_Data_Storage_Services_Introduction.htm' },
  { label: 'Business Intelligence', href: 'https://www.cms.gov/tra/Data_Management/DM_0210_Business_Intelligence_Introduction.htm' },
];

const LEFT_DOMAIN_LINKS = DOMAIN_LINKS.slice(0, 3);
const RIGHT_DOMAIN_LINKS = DOMAIN_LINKS.slice(3);

const DETAIL_CONTENT = {
  'Compliance Score': { title: 'Compliance Score metadata', text: 'Current compliance is 92%, up 6% this quarter. Primary gains came from stronger control mapping, clearer evidence linkage, and improved review readiness.' },
  'Mapped Controls': { title: 'Mapped Controls metadata', text: '2,386 controls are linked to rules, requirements, and evidence paths. This supports faster analyst review and traceability into governance workflows.' },
  'Open Risks': { title: 'Open Risks metadata', text: '14 open risks remain. Three are flagged as priority items tied to missing evidence, weak encryption enforcement, or incomplete readiness artifacts.' },
  'AI Summaries': { title: 'AI Summaries metadata', text: '328 AI summaries have been generated for working sessions, leadership reviews, and draft TRB packages.' },
  'BR-AUTH-1': { title: 'BR-AUTH-1 metadata', text: 'Rule focus: strong authentication, identity assurance, and better access confidence across services. This tile is intended to open summary, mapping, and risk context.' },
  'REQ-123': { title: 'REQ-123 metadata', text: 'Derived requirement sample showing how a TRA rule can become an implementable requirement with verification and audit support.' },
  'NIST SP 800-63B': { title: 'NIST SP 800-63B metadata', text: 'This mapping card represents standards traceability. It shows where rule intent connects to external guidance and supporting evidence.' },
  'Heat Map': { title: 'Heat Map metadata', text: 'Heat map cells can represent maturity, risk, or control coverage by domain and quarter. Hover or click should reveal counts, confidence, and supporting links.' },
  Analytics: { title: 'Analytics metadata', text: 'Analytics views compare compliance, risk, control mapping, and readiness over time using interactive executive visuals.' },
  Traceability: { title: 'Traceability metadata', text: 'Traceability connects CMS TRA rules to derived requirements, standards, evidence, and governance decision packages.' },
  'Business Rules': { title: 'Business Rules metadata', text: 'This section is designed for rule-level exploration, summaries, mappings, and governance status.' },
  'Recommended Practices': { title: 'Recommended Practices metadata', text: 'Recommended Practices provide supporting guidance and implementation patterns that complement the enforceable rules.' },
  'AI Insights': { title: 'AI Insights metadata', text: 'AI Insights surfaces summaries, comparisons, risk observations, and executive-ready outputs from the same rule set.' },
};

const SPARKLINE_SERIES = {
  Trust: [58, 62, 61, 66, 70, 72],
  Controls: [63, 66, 71, 76, 81, 84],
  Risk: [74, 78, 83, 86, 89, 91],
  Evidence: [65, 69, 73, 79, 84, 88],
};

const COMPLIANCE_STATUS_DATA = [
  { name: 'Compliant', value: 62 },
  { name: 'Monitoring', value: 28 },
  { name: 'At Risk', value: 10 },
];

const RISK_BREAKDOWN_DATA = [
  { name: 'Identity', value: 32 },
  { name: 'Access', value: 27 },
  { name: 'Data', value: 23 },
  { name: 'Devices', value: 18 },
];

const COMPLIANCE_STATUS_COLORS = ['#14b8a6', '#fbbf24', '#f87171'];
const RISK_BREAKDOWN_COLORS = ['#38bdf8', '#a78bfa', '#fbbf24', '#fb7185'];

const QUICK_ACTION_ITEMS = [
  ['Business Rules', FileText, 'from-blue-50 to-cyan-50 border-blue-200 text-blue-800 hover:border-blue-400 hover:shadow-blue-100'],
  ['AI Copilot', Brain, 'from-violet-50 to-fuchsia-50 border-violet-200 text-violet-800 hover:border-violet-400 hover:shadow-violet-100'],
  ['Heat Map', Map, 'from-emerald-50 to-teal-50 border-emerald-200 text-emerald-800 hover:border-emerald-400 hover:shadow-emerald-100'],
  ['Analytics', BarChart3, 'from-amber-50 to-orange-50 border-amber-200 text-amber-800 hover:border-amber-400 hover:shadow-amber-100'],
  ['Grid View', Grid3X3, 'from-sky-50 to-blue-50 border-sky-200 text-sky-800 hover:border-sky-400 hover:shadow-sky-100'],
  ['Trace Links', GitBranch, 'from-rose-50 to-pink-50 border-rose-200 text-rose-800 hover:border-rose-400 hover:shadow-rose-100'],
];

const DOMAIN_ITEMS = [
  ['Application', Workflow, 'from-indigo-50 to-blue-50 border-indigo-200 text-indigo-800'],
  ['Data', Database, 'from-cyan-50 to-sky-50 border-cyan-200 text-cyan-800'],
  ['Security', Shield, 'from-blue-50 to-indigo-50 border-blue-300 text-blue-800 ring-2 ring-blue-500'],
  ['Infrastructure', Network, 'from-slate-50 to-zinc-50 border-slate-300 text-slate-800'],
  ['Cloud', Sparkles, 'from-purple-50 to-violet-50 border-purple-200 text-purple-800'],
  ['Integration', ArrowRight, 'from-green-50 to-emerald-50 border-green-200 text-green-800'],
];

const FUNNEL_COLORS = ['#2563eb', '#14b8a6', '#f59e0b', '#f43f5e'];

const TopNav = memo(function TopNav({ activeTopTab, onChange }) {
  return (
    <div className="px-4 md:px-6 py-4">
      <div className="overflow-x-auto overflow-y-hidden pb-1 scroll-smooth [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        <div className="flex w-max min-w-full gap-2 rounded-[22px] border border-white/12 bg-white/10 p-2 backdrop-blur-sm md:flex-wrap md:w-full md:min-w-0">
          {TOP_TABS.map((tab) => {
            const isActive = activeTopTab === tab;
            return (
              <button
                key={tab}
                type="button"
                aria-pressed={isActive}
                onClick={() => onChange(tab)}
                className={`min-h-[42px] shrink-0 rounded-[16px] px-3 md:px-4 py-2 transition-colors duration-100 border text-xs md:text-sm font-medium leading-none whitespace-nowrap cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-white/70 ${
                  isActive
                    ? 'bg-white text-blue-700 border-white shadow-lg shadow-blue-950/15'
                    : 'bg-transparent hover:bg-white/14 text-white border-transparent hover:border-white/20 active:bg-white/16'
                }`}
              >
                {tab}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
});

const KPI = memo(function KPI({ label, value, sub, onClick }) {
  return (
    <Card className="rounded-2xl shadow-sm border-slate-200 cursor-pointer hover:shadow-md hover:border-blue-300 transition" onClick={() => onClick(label)}>
      <CardContent className="p-4">
        <div className="text-xs text-slate-500">{label}</div>
        <div className="text-2xl font-bold text-slate-900 mt-1">{value}</div>
        <div className="text-xs text-slate-500 mt-1">{sub}</div>
      </CardContent>
    </Card>
  );
});

const MetricShell = memo(function MetricShell({ title, action, children, contentClassName = 'h-[260px]' }) {
  return (
    <Card className="rounded-2xl shadow-sm border-slate-200 h-full overflow-hidden">
      <CardHeader className="pb-2 flex flex-row items-center justify-between gap-3 space-y-0">
        <CardTitle className="text-sm font-semibold text-slate-900 truncate min-w-0">{title}</CardTitle>
        <div className="shrink-0">{action}</div>
      </CardHeader>
      <CardContent className={`${contentClassName} overflow-hidden min-w-0`}>{children}</CardContent>
    </Card>
  );
});

const MiniHeatMap = memo(function MiniHeatMap() {
  const columns = ['Q1', 'Q2', 'Q3', 'Q4'];
  const toneClass = (value) => {
    if (value >= 90) return 'bg-blue-700 text-white';
    if (value >= 80) return 'bg-blue-500 text-white';
    if (value >= 70) return 'bg-blue-300 text-slate-900';
    return 'bg-slate-200 text-slate-700';
  };

  return (
    <div className="w-full h-full flex flex-col rounded-2xl border border-slate-200 bg-slate-50 p-4 overflow-hidden">
      <div className="flex items-center justify-between mb-3">
        <div>
          <h3 className="text-sm font-semibold text-slate-900">Maturity Heat Map</h3>
          <p className="text-xs text-slate-500">Quarterly domain maturity</p>
        </div>
        <span className="text-xs bg-slate-200 px-2 py-1 rounded-full">Hover</span>
      </div>
      <div className="flex-1 overflow-auto">
        <div className="grid grid-cols-[100px_repeat(4,1fr)] gap-2 text-xs min-w-[420px]">
          <div />
          {columns.map((quarter) => (
            <div key={quarter} className="text-center text-slate-500 font-medium">{quarter}</div>
          ))}
          {HEAT_DATA.map(([label, ...values]) => (
            <React.Fragment key={label}>
              <div className="text-slate-700 font-medium truncate pr-1">{label}</div>
              {values.map((value, index) => (
                <div key={`${label}-${index}`} className={`flex items-center justify-center rounded-lg h-10 text-xs font-semibold ${toneClass(value)}`}>
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

const GanttMock = memo(function GanttMock() {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-12 text-xs text-slate-400 pl-28">
        {['W1', 'W2', 'W3', 'W4', 'W5', 'W6', 'W7', 'W8', 'W9', 'W10', 'W11', 'W12'].map((week) => (
          <div key={week}>{week}</div>
        ))}
      </div>
      {GANTT_ITEMS.map((item) => (
        <div key={item.name} className="grid grid-cols-[110px_1fr] gap-4 items-center">
          <div className="text-sm font-medium text-slate-700">{item.name}</div>
          <div className="relative h-7 rounded-xl bg-slate-100 overflow-hidden">
            <div className="absolute top-0 h-7 rounded-xl bg-blue-600" style={{ left: `${item.start}%`, width: `${item.end - item.start}%` }} />
          </div>
        </div>
      ))}
    </div>
  );
});

const InteractiveBubbleChart = memo(function InteractiveBubbleChart({ onSelect, mode = 'executive' }) {
  const isInvestigation = mode === 'investigation';
  const [selected, setSelected] = useState(isInvestigation ? STATE_BUBBLE_DATA[0] : BUBBLE_DATA[0]);

  const handleSelect = useCallback((item) => {
    setSelected(item);
    onSelect?.(item.name);
  }, [onSelect]);

  const BubbleTooltip = ({ active, payload }) => {
    if (!active || !payload || !payload.length) return null;
    const item = payload[0].payload;
    return (
      <div className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs text-slate-700 shadow-xl">
        <div className="font-semibold text-slate-900">{item.name}</div>
        <div className="mt-1">Risk score: <span className="font-semibold">{item.x}</span></div>
        <div>Readiness: <span className="font-semibold">{item.y}%</span></div>
        <div>Mapped records: <span className="font-semibold">{item.z}</span></div>
      </div>
    );
  };

  if (isInvestigation) {
    return (
      <div className="h-full min-h-0 grid grid-rows-[minmax(0,1fr)_auto] gap-3">
        <div className="relative min-h-0 rounded-2xl border border-slate-200 bg-gradient-to-br from-slate-50 via-blue-50 to-cyan-50 overflow-hidden">
          <div className="absolute inset-0 opacity-50" style={{ backgroundImage: 'linear-gradient(to right, rgba(148,163,184,.25) 1px, transparent 1px), linear-gradient(to bottom, rgba(148,163,184,.25) 1px, transparent 1px)', backgroundSize: '28px 28px' }} />
          <div className="absolute top-3 left-3 rounded-full bg-white/90 px-3 py-1 text-[11px] font-semibold text-slate-600 shadow-sm">State bubble investigation</div>
          {STATE_BUBBLE_DATA.map((item) => {
            const isSelected = selected?.state === item.state;
            return (
              <button
                key={item.state}
                type="button"
                onClick={() => handleSelect(item)}
                title={`${item.state} • ${item.name} • Risk ${item.risk}`}
                className={`absolute -translate-x-1/2 -translate-y-1/2 rounded-full border-4 flex items-center justify-center text-white font-bold shadow-lg transition-all duration-200 hover:ring-4 hover:ring-blue-200 focus:outline-none focus-visible:ring-4 focus-visible:ring-blue-300 ${isSelected ? 'bg-blue-700 border-slate-900 ring-4 ring-blue-300 z-20' : 'bg-blue-500/85 border-white z-10'}`}
                style={{ left: item.left, top: item.top, width: item.size, height: item.size }}
              >
                <span className="text-sm leading-none">{item.state}</span>
              </button>
            );
          })}
          <div className="absolute bottom-3 left-3 right-3 rounded-2xl bg-white/90 p-3 text-xs text-slate-700 shadow-sm">
            <div className="font-semibold text-slate-900">Click a state bubble to drill into domain risk and readiness.</div>
            <div className="mt-1 text-slate-500">Bubble size represents mapped records volume.</div>
          </div>
        </div>

        <div className="rounded-2xl border border-blue-100 bg-white p-3 text-xs text-slate-700">
          <div className="flex items-center justify-between gap-3">
            <span className="font-semibold text-slate-900 truncate">Investigating: {selected.state} • {selected.name}</span>
            <Badge variant="secondary">Drilldown</Badge>
          </div>
          <div className="mt-2 grid grid-cols-3 gap-2">
            <button type="button" onClick={() => handleSelect(selected)} className="rounded-xl bg-slate-50 p-2 text-left hover:bg-blue-50 transition">
              <div className="text-slate-500">Risk</div>
              <div className="font-bold">{selected.risk}</div>
            </button>
            <button type="button" onClick={() => handleSelect(selected)} className="rounded-xl bg-slate-50 p-2 text-left hover:bg-blue-50 transition">
              <div className="text-slate-500">Ready</div>
              <div className="font-bold">{selected.readiness}%</div>
            </button>
            <button type="button" onClick={() => handleSelect(selected)} className="rounded-xl bg-slate-50 p-2 text-left hover:bg-blue-50 transition">
              <div className="text-slate-500">Mapped</div>
              <div className="font-bold">{selected.mapped}</div>
            </button>
          </div>
          <div className="mt-2 rounded-xl bg-blue-50 p-2 text-[11px] leading-5 text-blue-900">
            Drilldown mode: state bubbles show domain concentration by location, with clickable metadata updates.
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full min-h-0 grid grid-rows-[minmax(0,1fr)_auto] gap-3">
      <div className="min-h-0 rounded-2xl border border-slate-200 bg-gradient-to-br from-slate-50 to-blue-50 p-2 overflow-hidden">
        <ResponsiveContainer width="100%" height="100%">
          <ScatterChart margin={{ top: 14, right: 18, bottom: 8, left: 4 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(148,163,184,0.45)" />
            <XAxis type="number" dataKey="x" name="Risk" tick={{ fontSize: 11 }} tickLine={false} axisLine={false} />
            <YAxis type="number" dataKey="y" name="Readiness" tick={{ fontSize: 11 }} tickLine={false} axisLine={false} />
            <ZAxis type="number" dataKey="z" range={[120, 720]} />
            <Tooltip content={<BubbleTooltip />} cursor={{ strokeDasharray: '3 3' }} />
            <Scatter data={BUBBLE_DATA} onClick={(point) => handleSelect(point)} isAnimationActive={false}>
              {BUBBLE_DATA.map((item) => (
                <Cell
                  key={item.name}
                  fill={selected?.name === item.name ? '#1d4ed8' : '#60a5fa'}
                  stroke={selected?.name === item.name ? '#0f172a' : '#ffffff'}
                  strokeWidth={selected?.name === item.name ? 2 : 1}
                  className="cursor-pointer"
                />
              ))}
            </Scatter>
          </ScatterChart>
        </ResponsiveContainer>
      </div>

      <div className="rounded-2xl border border-blue-100 bg-white p-3 text-xs text-slate-700">
        <div className="flex items-center justify-between gap-3">
          <span className="font-semibold text-slate-900 truncate">Executive focus: {selected.name}</span>
          <Badge variant="secondary">Snapshot</Badge>
        </div>
        <div className="mt-2 grid grid-cols-3 gap-2">
          <button type="button" onClick={() => handleSelect(selected)} className="rounded-xl bg-slate-50 p-2 text-left hover:bg-blue-50 transition">
            <div className="text-slate-500">Risk</div>
            <div className="font-bold">{selected.x}</div>
          </button>
          <button type="button" onClick={() => handleSelect(selected)} className="rounded-xl bg-slate-50 p-2 text-left hover:bg-blue-50 transition">
            <div className="text-slate-500">Ready</div>
            <div className="font-bold">{selected.y}%</div>
          </button>
          <button type="button" onClick={() => handleSelect(selected)} className="rounded-xl bg-slate-50 p-2 text-left hover:bg-blue-50 transition">
            <div className="text-slate-500">Mapped</div>
            <div className="font-bold">{selected.z}</div>
          </button>
        </div>
      </div>
    </div>
  );
});

const SparkMini = memo(function SparkMini({ label, value, series }) {
  const max = Math.max(...series);
  const min = Math.min(...series);
  const points = series
    .map((point, index) => {
      const x = (index / (series.length - 1)) * 100;
      const y = max === min ? 50 : 100 - ((point - min) / (max - min)) * 100;
      return `${x},${y}`;
    })
    .join(' ');

  return (
    <div className="rounded-xl bg-white/10 border border-white/10 px-2.5 py-2">
      <div className="flex items-center justify-between gap-2 text-[11px] text-blue-100">
        <span className="truncate">{label}</span>
        <span className="shrink-0">{value}%</span>
      </div>
      <div className="mt-2 grid grid-cols-[56px_1fr] items-center gap-2">
        <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="h-7 w-full overflow-visible">
          <polyline fill="none" stroke="rgba(255,255,255,0.95)" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" points={points} />
        </svg>
        <div className="h-2 rounded-full bg-white/10 overflow-hidden">
          <div className="h-2 rounded-full bg-white/90" style={{ width: `${value}%` }} />
        </div>
      </div>
    </div>
  );
});

function InsightDonutCard({ title, data, centerValue, colors }) {
  const [activeSlice, setActiveSlice] = useState(null);

  return (
    <div className="rounded-2xl bg-white text-slate-800 p-4 shadow-sm overflow-hidden">
      <div className="text-sm font-semibold leading-5">{title}</div>
      <div className="mt-3 grid grid-cols-[minmax(0,1fr)_88px] gap-3 items-center">
        <div className="space-y-2 text-[11px] min-w-0 pr-1">
          {data.map((item, index) => {
            const isActive = activeSlice === index;
            return (
              <div key={item.name} className={`grid grid-cols-[minmax(0,1fr)_34px] items-center gap-2 min-w-0 rounded-lg px-2 py-1 transition ${isActive ? 'bg-slate-100' : ''}`}>
                <div className="flex items-center gap-2 min-w-0 overflow-hidden">
                  <span className="h-2.5 w-2.5 rounded-full shrink-0" style={{ backgroundColor: colors[index % colors.length] }} />
                  <span className="truncate text-slate-700">{item.name}</span>
                </div>
                <span className="font-medium shrink-0 text-right text-slate-800">{item.value}%</span>
              </div>
            );
          })}
        </div>
        <div className="h-[88px] w-[88px] relative justify-self-end">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                dataKey="value"
                nameKey="name"
                innerRadius={24}
                outerRadius={36}
                paddingAngle={2}
                isAnimationActive={false}
                animationDuration={0}
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
                {data.map((_, index) => (
                  <Cell key={index} fill={colors[index % colors.length]} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
          <div className="absolute inset-0 flex items-center justify-center text-lg font-bold text-slate-700 pointer-events-none">
            {activeSlice !== null ? `${data[activeSlice].value}%` : `${centerValue}%`}
          </div>
        </div>
      </div>
    </div>
  );
}

const SignalTimelineCard = memo(function SignalTimelineCard() {
  const SignalTooltip = ({ active, payload, label }) => {
    if (!active || !payload || !payload.length) return null;
    return (
      <div className="rounded-xl border border-white/20 bg-slate-900/95 px-3 py-2 text-xs text-white shadow-xl backdrop-blur-sm">
        <div className="font-semibold text-slate-100">{label}</div>
        <div className="mt-1 flex items-center justify-between gap-3 text-slate-200">
          <span>AI readiness</span>
          <span className="font-semibold text-white">{payload[0].value}%</span>
        </div>
      </div>
    );
  };

  return (
    <div className="rounded-2xl border border-white/15 bg-gradient-to-br from-white/12 to-white/6 p-4 overflow-hidden min-w-0">
      <div className="flex items-center justify-between gap-3">
        <div>
          <div className="text-sm font-semibold leading-5 text-white">Signal timeline</div>
          <div className="text-xs text-blue-100 mt-1">6-month AI readiness trend</div>
        </div>
        <Badge className="!bg-white/90 !text-blue-700 shrink-0 text-[10px] px-2 py-0.5">Live</Badge>
      </div>
      <div className="mt-3 h-28">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={TREND_DATA} margin={{ top: 12, right: 12, left: 12, bottom: 4 }}>
            <defs>
              <linearGradient id="signal-fill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="rgba(255,255,255,0.95)" stopOpacity={0.45} />
                <stop offset="95%" stopColor="rgba(255,255,255,0.15)" stopOpacity={0.05} />
              </linearGradient>
            </defs>
            <CartesianGrid stroke="rgba(255,255,255,0.2)" strokeDasharray="3 3" />
            <XAxis dataKey="month" interval={0} tick={{ fontSize: 11, fill: '#e0f2fe' }} axisLine={{ stroke: 'rgba(255,255,255,0.4)' }} tickLine={false} />
            <YAxis tick={{ fontSize: 11, fill: '#e0f2fe' }} axisLine={{ stroke: 'rgba(255,255,255,0.4)' }} tickLine={false} />
            <Tooltip content={<SignalTooltip />} cursor={{ stroke: 'rgba(255,255,255,0.35)', strokeWidth: 1 }} />
            <Area type="monotone" dataKey="compliance" stroke="rgba(255,255,255,0.95)" strokeWidth={2} fill="url(#signal-fill)" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
});

function CmsTraAnalyticsPreview() {
  const [query, setQuery] = useState('How can I securely transfer sensitive data?');
  const [aiOutput, setAiOutput] = useState('Use approved encryption, verify identity, and link the recommendation to TRA and NIST evidence.');
  const [viz, setViz] = useState('heatmap');
  const [activeTopTab, setActiveTopTab] = useState('AI Insights');
  const [activeSubTab, setActiveSubTab] = useState('insights');
  const [detailPanel, setDetailPanel] = useState(DETAIL_CONTENT['AI Insights']);

  const activeHero = HERO_CONTENT[activeTopTab] || HERO_CONTENT['AI Insights'];

  const openDetail = useCallback((key) => {
    setDetailPanel(
      DETAIL_CONTENT[key] || {
        title: `${key} metadata`,
        text: 'Interactive preview metadata is available for this item. In the Vercel version, this can open a drawer, modal, or linked details panel.',
      },
    );
  }, []);

  const handleTopTabChange = useCallback((tab) => {
    if (tab === activeTopTab) return;
    setActiveTopTab(tab);
    openDetail(tab);

    if (tab === 'Heat Map') {
      setViz('heatmap');
      setActiveSubTab('heatmap');
      return;
    }

    if (tab === 'Analytics') {
      setViz('bubble');
      setActiveSubTab('analytics');
      return;
    }

    if (tab === 'Traceability') {
      setActiveSubTab('traceability');
      return;
    }

    setActiveSubTab('insights');
  }, [activeTopTab, openDetail]);

  const handleRunAI = useCallback((type) => {
    setAiOutput(AI_ACTIONS[type] || 'Analysis completed.');
  }, []);

  const handleSubTabChange = useCallback((value) => {
    setActiveSubTab(value);
    if (value === 'heatmap') openDetail('Heat Map');
    if (value === 'analytics') openDetail('Analytics');
    if (value === 'traceability') openDetail('Traceability');
    if (value === 'insights') openDetail('AI Insights');
  }, [openDetail]);

  const handleQuickAction = useCallback((label) => {
    if (label === 'Business Rules') {
      handleTopTabChange('Business Rules');
      return;
    }

    if (label === 'AI Copilot') {
      handleTopTabChange('AI Insights');
      setQuery('Generate an executive-ready TRA summary with risks and mapped evidence.');
      handleRunAI('summary');
      return;
    }

    if (label === 'Heat Map') {
      setActiveTopTab('Heat Map');
      setActiveSubTab('heatmap');
      setViz('heatmap');
      openDetail('Heat Map');
      return;
    }

    if (label === 'Analytics') {
      setActiveTopTab('Analytics');
      setActiveSubTab('analytics');
      setViz('bubble');
      openDetail('Analytics');
      return;
    }

    if (label === 'Grid View') {
      setActiveTopTab('Analytics');
      setActiveSubTab('analytics');
      setViz('grid');
      openDetail('Heat Map');
      return;
    }

    if (label === 'Trace Links') {
      handleTopTabChange('Traceability');
    }
  }, [handleTopTabChange, handleRunAI, openDetail]);

  const vizPanel = useMemo(() => {
    switch (viz) {
      case 'bubble':
        return <InteractiveBubbleChart onSelect={openDetail} mode="investigation" />;
      case 'funnel':
        return (
          <ResponsiveContainer width="100%" height="100%">
            <FunnelChart>
              <Tooltip />
              <Funnel dataKey="value" data={FUNNEL_DATA} isAnimationActive={false}>
                {FUNNEL_DATA.map((_, index) => (
                  <Cell key={index} fill={FUNNEL_COLORS[index % FUNNEL_COLORS.length]} />
                ))}
              </Funnel>
            </FunnelChart>
          </ResponsiveContainer>
        );
      case 'gauge':
        return (
          <div className="h-full flex flex-col justify-center gap-6">
            {[
              ['Zero Trust maturity', 84],
              ['Evidence completeness', 71],
              ['TRB readiness', 63],
            ].map(([label, value]) => (
              <div key={label}>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-600">{label}</span>
                  <span className="font-semibold">{value}%</span>
                </div>
                <Progress value={value} className="mt-2 h-4" />
              </div>
            ))}
          </div>
        );
      case 'gantt':
        return <GanttMock />;
      case 'cluster':
        return (
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart data={RADAR_DATA} margin={{ top: 24, right: 44, left: 44, bottom: 24 }} outerRadius="68%">
              <PolarGrid />
              <PolarAngleAxis dataKey="subject" tick={{ fontSize: 11, fill: '#475569' }} tickFormatter={(value) => (value === 'Governance' ? 'Govern.' : value)} tickLine={false} axisLine={false} />
              <PolarRadiusAxis tick={{ fontSize: 10 }} />
              <Radar dataKey="score" fill="#3b82f6" fillOpacity={0.5} stroke="#1d4ed8" />
              <Tooltip />
            </RadarChart>
          </ResponsiveContainer>
        );
      case 'grid':
      case 'heatmap':
        return <MiniHeatMap />;
      case 'choropleth':
        return (
          <div className="grid grid-cols-5 gap-3 h-full items-center">
            {[88, 64, 78, 92, 55, 60, 81, 74, 95, 69].map((value, index) => (
              <div key={index} className="rounded-2xl h-20 flex items-center justify-center text-sm font-bold text-white" style={{ background: `rgba(37,99,235,${Math.max(0.25, value / 100)})` }}>
                {value}
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
      <div className="max-w-7xl mx-auto space-y-5 md:space-y-6">
        <div className="rounded-[28px] bg-blue-700 text-white shadow-xl overflow-hidden">
          <div className="px-6 pt-5 pb-4 border-b border-white/10">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 text-sm text-blue-100"><Layers3 className="w-4 h-4" /> CMS TRA Interactive Portal</div>
                <h1 className="text-2xl font-bold mt-1">Executive analytics preview</h1>
                <p className="text-blue-100 text-sm mt-1">AI-enabled architecture, traceability, and compliance workspace</p>
              </div>
              <div className="flex flex-wrap gap-2">
                <Badge className="!bg-white/15 hover:!bg-white/20 !text-white rounded-full">Release 2025 R1</Badge>
                <Badge className="!bg-white/15 hover:!bg-white/20 !text-white rounded-full">Zero Trust Ready</Badge>
                <Badge className="!bg-white/15 hover:!bg-white/20 !text-white rounded-full">AI Copilot Enabled</Badge>
              </div>
            </div>
          </div>
          <TopNav activeTopTab={activeTopTab} onChange={handleTopTabChange} />
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-[280px_minmax(0,1.25fr)_280px] gap-5 md:gap-6 items-start">
          <div className="space-y-5 md:space-y-6">
            <Card className="rounded-2xl shadow-sm border-blue-200 bg-gradient-to-br from-blue-50 to-white">
              <CardHeader className="pb-3"><CardTitle className="text-base text-blue-900">Interactive metadata</CardTitle></CardHeader>
              <CardContent className="space-y-3">
                <div className="text-sm font-semibold text-slate-900">{detailPanel.title}</div>
                <div className="text-sm text-slate-600 leading-6">{detailPanel.text}</div>
                <div className="rounded-xl bg-white border border-blue-100 p-3 text-xs text-slate-500">Click a KPI card, rule tile, top menu tab, or analytics section to update this panel.</div>
              </CardContent>
            </Card>

            <Card className="rounded-2xl shadow-sm border-slate-200 overflow-hidden">
              <CardHeader className="pb-3"><CardTitle className="text-base">Quick actions</CardTitle></CardHeader>
              <CardContent className="grid grid-cols-2 gap-3">
                {QUICK_ACTION_ITEMS.map(([label, Icon, tone]) => (
                  <Button
                    key={label}
                    variant="outline"
                    aria-label={`Open ${label}`}
                    title={`Open ${label}`}
                    onClick={() => handleQuickAction(label)}
                    className={`h-20 rounded-2xl flex-col gap-2 whitespace-normal text-center min-w-0 border bg-gradient-to-br ${tone} hover:shadow-md active:opacity-90 focus-visible:ring-2 focus-visible:ring-blue-400`}
                  >
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white/85 shadow-sm ring-1 ring-white/70">
                      <Icon className="w-4 h-4" />
                    </span>
                    <span className="text-xs leading-tight font-semibold">{label}</span>
                  </Button>
                ))}
              </CardContent>
            </Card>

            <Card className="rounded-2xl shadow-sm border-slate-200 overflow-hidden">
              <CardHeader className="pb-3"><CardTitle className="text-base">Browse by domain</CardTitle></CardHeader>
              <CardContent className="grid grid-cols-2 gap-3">
                {DOMAIN_ITEMS.map(([label, Icon, tone]) => (
                  <Button
                    key={label}
                    variant="outline"
                    onClick={() => openDetail(label)}
                    className={`h-20 rounded-2xl flex-col gap-2 whitespace-normal text-center min-w-0 border bg-gradient-to-br ${tone} hover:shadow-md active:opacity-90`}
                  >
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white/85 shadow-sm ring-1 ring-white/70">
                      <Icon className="w-4 h-4" />
                    </span>
                    <span className="text-xs leading-tight font-semibold">{label}</span>
                  </Button>
                ))}
              </CardContent>
            </Card>

            <Card className="rounded-2xl shadow-sm border-slate-200 overflow-hidden">
              <CardHeader className="pb-3"><CardTitle className="text-base">Live status</CardTitle></CardHeader>
              <CardContent className="space-y-4 text-sm">
                <div className="flex justify-between"><span className="text-slate-500">Rules mapped</span><span className="font-semibold">1,248</span></div>
                <div className="flex justify-between"><span className="text-slate-500">High risk gaps</span><span className="font-semibold">14</span></div>
                <div className="flex justify-between"><span className="text-slate-500">AI summaries</span><span className="font-semibold">328</span></div>
              </CardContent>
            </Card>

            <Card className="rounded-2xl shadow-sm border-slate-200 overflow-hidden">
              <CardHeader className="pb-3"><CardTitle className="text-base">CMS TRA source links</CardTitle></CardHeader>
              <CardContent className="space-y-3">
                {LEFT_DOMAIN_LINKS.map((link) => (
                  <a key={link.href} href={link.href} target="_blank" rel="noreferrer" className="block rounded-2xl border border-slate-200 p-4 hover:border-blue-400 hover:bg-blue-50 transition text-sm text-slate-700 overflow-hidden min-w-0">
                    <div className="font-medium break-words leading-6">{link.label}</div>
                    <div className="text-xs text-slate-500 mt-1">Open CMS TRA source page</div>
                  </a>
                ))}
              </CardContent>
            </Card>
          </div>

          <div className="space-y-5 md:space-y-6">
            <Card className="rounded-2xl shadow-sm border-slate-200 overflow-hidden">
              <CardContent className="p-4 space-y-4">
                <div className="flex flex-col md:flex-row gap-3">
                  <div className="relative flex-1">
                    <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                    <Input value={query} onChange={(event) => setQuery(event.target.value)} className="pl-9 rounded-xl" />
                  </div>
                  <Button className="rounded-xl gap-2"><Sparkles className="w-4 h-4" /> Ask TRA AI</Button>
                  <Button variant="outline" className="rounded-xl">Filters</Button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {[
                    'Show all Zero Trust rules in identity assurance',
                    'Compare AI rule to NIST and CMS ARS mappings',
                    'Find controls with high risk and low maturity',
                    'Generate TRB-ready compliance summary',
                  ].map((suggestion) => (
                    <button key={suggestion} type="button" onClick={() => setQuery(suggestion)} className="text-xs rounded-full bg-blue-50 text-blue-700 px-3 py-1.5 hover:bg-blue-100 transition">
                      {suggestion}
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {KPI_DATA.map((item) => (
                <KPI key={item.label} {...item} onClick={openDetail} />
              ))}
            </div>

            <Card className="rounded-[28px] !bg-blue-700 !text-white shadow-xl border-0 overflow-hidden">
              <CardContent className="p-5 md:p-6">
                <div className="grid grid-cols-1 xl:grid-cols-[minmax(0,1.28fr)_minmax(320px,0.92fr)] gap-5 items-start">
                  <div className="min-w-0 space-y-4">
                    <div>
                      <div className="text-[11px] uppercase tracking-[0.24em] !text-blue-100">{activeHero.eyebrow}</div>
                      <h2 className="text-3xl md:text-4xl font-bold leading-tight mt-2 max-w-[13ch] text-balance">{activeHero.title}</h2>
                      <p className="!text-blue-50 mt-3 max-w-xl leading-7 text-sm md:text-base">{activeHero.description}</p>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {activeHero.actions.map(([label, key]) => (
                        <Button key={label} variant="secondary" size="sm" className="rounded-full !bg-white !text-blue-700 hover:!bg-blue-50 whitespace-nowrap px-4" onClick={() => handleRunAI(key)}>
                          {label}
                        </Button>
                      ))}
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <Button variant="secondary" className="min-h-[54px] rounded-2xl !bg-white/95 !text-slate-900 hover:!bg-white whitespace-normal break-words text-center leading-tight px-3 py-3" onClick={() => handleRunAI('summary')}>Generate TRB Summary</Button>
                      <Button variant="secondary" className="min-h-[54px] rounded-2xl !bg-white/95 !text-slate-900 hover:!bg-white whitespace-normal break-words text-center leading-tight px-3 py-3" onClick={() => handleRunAI('nist')}>Compare to NIST</Button>
                      <Button variant="secondary" className="min-h-[54px] rounded-2xl !bg-white/95 !text-slate-900 hover:!bg-white whitespace-normal break-words text-center leading-tight px-3 py-3" onClick={() => handleRunAI('risk')}>Analyze Risk</Button>
                    </div>

                    <div className="!bg-white/15 border border-white/20 rounded-2xl p-4 text-sm !text-white leading-7 min-h-[96px] break-words">
                      {activeTopTab === 'AI Insights' ? aiOutput : activeHero.detail}
                    </div>

                    <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
                      <button type="button" onClick={() => openDetail('AI Insights')} className="rounded-2xl border border-white/15 bg-gradient-to-br from-white/12 to-white/6 p-4 text-left overflow-hidden min-w-0 transition hover:bg-white/15 active:scale-[0.99]">
                        <div className="flex items-start justify-between gap-2">
                          <div className="min-w-0">
                            <div className="text-sm font-semibold leading-5">Decision signals</div>
                            <div className="text-sm text-blue-100 mt-1 leading-snug max-w-[28ch]">Live recommendation indicators</div>
                          </div>
                          <Badge className="!bg-white/90 !text-blue-700 shrink-0 text-[10px] px-2 py-0.5">Live</Badge>
                        </div>
                        <div className="mt-4 grid grid-cols-3 gap-2">
                          {[
                            ['Ready', '18'],
                            ['Review', '7'],
                            ['Risk', '3'],
                          ].map(([label, value]) => (
                            <div key={label} className="rounded-xl bg-white/12 border border-white/15 px-2 py-2.5 flex flex-col items-center justify-center min-w-0 shadow-sm">
                              <div className="text-lg font-bold leading-none">{value}</div>
                              <div className="text-[11px] text-blue-100 mt-1 leading-tight text-center whitespace-nowrap">{label}</div>
                            </div>
                          ))}
                        </div>
                      </button>

                      <button type="button" onClick={() => openDetail('Analytics')} className="rounded-2xl border border-white/15 bg-gradient-to-br from-white/12 to-white/6 p-4 text-left overflow-hidden min-w-0 transition hover:bg-white/15 active:scale-[0.99]">
                        <div className="flex items-start justify-between gap-2">
                          <div className="min-w-0">
                            <div className="text-sm font-semibold leading-5">Floating analytics</div>
                            <div className="text-sm text-blue-100 mt-1 leading-snug max-w-[28ch]">Mini performance trends</div>
                          </div>
                          <Badge className="!bg-white/90 !text-blue-700 shrink-0 text-[10px] px-2 py-0.5">Live</Badge>
                        </div>
                        <div className="mt-3 space-y-2">
                          {[
                            ['Trust', 72],
                            ['Controls', 84],
                            ['Risk', 91],
                            ['Evidence', 88],
                          ].map(([label, value]) => (
                            <SparkMini key={label} label={label} value={value} series={SPARKLINE_SERIES[label]} />
                          ))}
                        </div>
                      </button>
                    </div>
                  </div>

                  <div className="space-y-4 min-w-0">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <button type="button" onClick={() => openDetail('AI Insights')} className="rounded-2xl bg-white/12 hover:bg-white/18 border border-white/15 p-4 text-left transition overflow-hidden min-w-0">
                        <div className="text-blue-200 text-xs leading-4">AI Confidence</div>
                        <div className="text-2xl font-bold mt-1 leading-none">94%</div>
                        <div className="text-xs text-blue-100 mt-1 leading-4">Summary quality</div>
                      </button>
                      <button type="button" onClick={() => openDetail('Traceability')} className="rounded-2xl bg-white/12 hover:bg-white/18 border border-white/15 p-4 text-left transition overflow-hidden min-w-0">
                        <div className="text-blue-200 text-xs leading-4">Trace Links</div>
                        <div className="text-2xl font-bold mt-1 leading-none">2,386</div>
                        <div className="text-xs text-blue-100 mt-1 leading-4">Mapped records</div>
                      </button>
                    </div>

                    <div className="rounded-2xl bg-white/12 border border-white/15 p-4 overflow-hidden min-w-0">
                      <div className="flex items-center justify-between gap-3">
                        <div className="min-w-0">
                          <div className="text-sm font-semibold leading-5">Active workflow</div>
                          <div className="text-xs text-blue-100 mt-1 leading-5 break-words">AI summary → standards mapping → TRB package</div>
                        </div>
                        <Badge className="!bg-white !text-blue-700 shrink-0">Live</Badge>
                      </div>
                      <div className="mt-4 space-y-3">
                        {[
                          ['Rule summary', 'Ready'],
                          ['NIST comparison', 'Ready'],
                          ['Risk scan', 'Medium'],
                        ].map(([label, status]) => (
                          <button key={label} type="button" onClick={() => openDetail('AI Insights')} className="w-full rounded-xl bg-white/10 hover:bg-white/15 border border-white/10 px-3 py-2.5 flex items-center justify-between gap-3 text-sm transition min-w-0 overflow-hidden">
                            <span className="min-w-0 truncate text-left">{label}</span>
                            <span className="text-blue-100 shrink-0">{status}</span>
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="rounded-2xl bg-gradient-to-br from-white/14 to-white/8 border border-white/15 p-4 overflow-hidden min-w-0">
                      <div className="flex items-center justify-between gap-3">
                        <div>
                          <div className="text-sm font-semibold leading-5">Quick insights</div>
                          <div className="text-xs text-blue-100 mt-1">Live signal snapshot</div>
                        </div>
                        <Badge className="!bg-white/90 !text-blue-700 shrink-0 text-[10px] px-2 py-0.5">Live</Badge>
                      </div>
                      <div className="mt-4 grid grid-cols-1 gap-3">
                        <InsightDonutCard title="Compliance by Status" data={COMPLIANCE_STATUS_DATA} centerValue={62} colors={COMPLIANCE_STATUS_COLORS} />
                        <InsightDonutCard title="Risk Factor Breakdown" data={RISK_BREAKDOWN_DATA} centerValue={27} colors={RISK_BREAKDOWN_COLORS} />
                      </div>
                    </div>

                    <SignalTimelineCard />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Tabs value={activeSubTab} onValueChange={handleSubTabChange} className="space-y-4 overflow-hidden">
              <div className="rounded-[24px] border border-blue-200 bg-white p-1.5 shadow-sm">
                <TabsList className="grid w-full grid-cols-4 rounded-[20px] bg-slate-100/90 p-1 gap-1 h-auto">
                  <TabsTrigger value="insights" className="rounded-[16px] min-h-[42px] px-2 md:px-3 text-xs md:text-sm font-semibold text-slate-600 data-[state=active]:bg-blue-600 data-[state=active]:text-white data-[state=active]:shadow-md whitespace-nowrap overflow-hidden">Insights</TabsTrigger>
                  <TabsTrigger value="heatmap" className="rounded-[16px] min-h-[42px] px-2 md:px-3 text-xs md:text-sm font-semibold text-slate-600 data-[state=active]:bg-blue-600 data-[state=active]:text-white data-[state=active]:shadow-md whitespace-nowrap overflow-hidden">Heat Map</TabsTrigger>
                  <TabsTrigger value="analytics" className="rounded-[16px] min-h-[42px] px-2 md:px-3 text-xs md:text-sm font-semibold text-slate-600 data-[state=active]:bg-blue-600 data-[state=active]:text-white data-[state=active]:shadow-md whitespace-nowrap overflow-hidden">Analytics</TabsTrigger>
                  <TabsTrigger value="traceability" className="rounded-[16px] min-h-[42px] px-2 md:px-3 text-xs md:text-sm font-semibold text-slate-600 data-[state=active]:bg-blue-600 data-[state=active]:text-white data-[state=active]:shadow-md whitespace-nowrap overflow-hidden">Traceability</TabsTrigger>
                </TabsList>
              </div>

              <TabsContent value="insights" className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                  ['BR-AUTH-1', 'Strong authentication', ['Require MFA for privileged and user access', 'Support stronger identity assurance', 'Improve access confidence across services']],
                  ['REQ-123', 'Identity verification requirement', ['Implement identity proofing', 'Verify access before service use', 'Support auditable trust decisions']],
                  ['NIST SP 800-63B', 'Control mapping', ['Map to identity assurance controls', 'Support traceable governance', 'Link rule intent to standard evidence']],
                ].map(([id, title, bullets]) => (
                  <Card key={id} className="rounded-2xl shadow-sm border-slate-200 cursor-pointer hover:shadow-md hover:border-blue-300 transition overflow-hidden" onClick={() => openDetail(id)}>
                    <CardContent className="p-4">
                      <div className="font-bold text-slate-900 break-words leading-6">{id}</div>
                      <div className="text-sm text-slate-500 mt-1 break-words leading-6">{title}</div>
                      <ul className="mt-3 space-y-2 text-sm text-slate-700 list-disc pl-5">
                        {bullets.map((bullet) => (
                          <li key={bullet}>{bullet}</li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                ))}
              </TabsContent>

              <TabsContent value="heatmap" className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                <div className="lg:col-span-2">
                  <MetricShell title="Maturity heat map" action={<Badge variant="secondary" className="rounded-full whitespace-nowrap">Hover-ready</Badge>} contentClassName="h-[300px]">
                    <MiniHeatMap />
                  </MetricShell>
                </div>
                <MetricShell title="Heat map filters" contentClassName="h-[300px]">
                  <div className="space-y-4 text-sm">
                    <div>
                      <div className="text-slate-500 mb-2">Domain</div>
                      <div className="flex flex-wrap gap-2">
                        {['Identity', 'Devices', 'Networks', 'Apps', 'Data'].map((item) => (
                          <Badge key={item} variant="secondary" className="rounded-full">{item}</Badge>
                        ))}
                      </div>
                    </div>
                    <div>
                      <div className="text-slate-500 mb-2">View</div>
                      <div className="flex flex-wrap gap-2">
                        {['Quarterly', 'Risk overlay', 'Control mapping'].map((item) => (
                          <Badge key={item} className="rounded-full">{item}</Badge>
                        ))}
                      </div>
                    </div>
                    <div className="rounded-2xl bg-slate-50 p-4 text-slate-600">Hover on a cell to show rule count, maturity level, and linked evidence.</div>
                  </div>
                </MetricShell>
              </TabsContent>

              <TabsContent value="analytics" className="space-y-4">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  <MetricShell title="Compliance trend">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={TREND_DATA}>
                        <defs>
                          <linearGradient id="compliance-fill" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopOpacity={0.45} />
                            <stop offset="95%" stopOpacity={0.05} />
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" interval={0} tick={{ fontSize: 11 }} />
                        <YAxis />
                        <Tooltip />
                        <Area type="monotone" dataKey="compliance" strokeWidth={2} fill="url(#compliance-fill)" />
                      </AreaChart>
                    </ResponsiveContainer>
                  </MetricShell>

                  <MetricShell title="Executive Snapshot">
                    <InteractiveBubbleChart onSelect={openDetail} mode="executive" />
                  </MetricShell>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  <MetricShell
                    title="Interactive Investigation Mode"
                    contentClassName="h-[300px]"
                    action={
                      <select
                        value={viz}
                        onChange={(event) => {
                          const value = event.target.value;
                          setViz(value);
                          openDetail(value === 'heatmap' || value === 'grid' ? 'Heat Map' : 'Analytics');
                        }}
                        className="w-[140px] md:w-[170px] rounded-full border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-200"
                      >
                        <option value="heatmap">Heat map</option>
                        <option value="bubble">Bubbles</option>
                        <option value="choropleth">Choropleth</option>
                        <option value="cluster">Cluster</option>
                        <option value="funnel">Funnel</option>
                        <option value="gantt">Gantt</option>
                        <option value="gauge">Gauge</option>
                        <option value="grid">Grid</option>
                      </select>
                    }
                  >
                    {vizPanel}
                  </MetricShell>

                  <MetricShell title="Mappings by month" contentClassName="h-[300px]" action={<Button variant="ghost" size="sm" className="rounded-full" onClick={() => openDetail('Analytics')}><Info className="w-4 h-4 mr-1" />Meta</Button>}>
                    <ResponsiveContainer width="100%" height="100%">
                      <ComposedChart data={TREND_DATA}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" interval={0} tick={{ fontSize: 11 }} />
                        <YAxis yAxisId="left" />
                        <YAxis yAxisId="right" orientation="right" />
                        <Tooltip />
                        <Bar yAxisId="left" dataKey="mappings" barSize={28} />
                        <Line yAxisId="right" type="monotone" dataKey="risk" strokeWidth={2} />
                      </ComposedChart>
                    </ResponsiveContainer>
                  </MetricShell>
                </div>
              </TabsContent>

              <TabsContent value="traceability" className="space-y-4">
                <Card className="rounded-2xl shadow-sm border-slate-200 overflow-hidden">
                  <CardContent className="p-5">
                    <div className="text-sm text-slate-500 mb-3">Trace path</div>
                    <div className="grid grid-cols-1 md:grid-cols-5 gap-5 items-stretch overflow-visible px-2">
                      {['CMS TRA Rule', 'Derived Requirement', 'NIST / ARS Control', 'Evidence Link', 'TRB Decision'].map((name, index) => (
                        <div key={name} className="relative rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm font-medium text-slate-700 min-h-[92px] flex items-center justify-center text-center overflow-visible">
                          <span className="relative z-10 leading-6 break-words max-w-[12ch]">{name}</span>
                          {index < 4 && (
                            <div className="hidden md:flex absolute -right-6 top-1/2 -translate-y-1/2 h-9 w-9 items-center justify-center rounded-full bg-white border border-slate-200 shadow-sm z-20">
                              <ArrowRight className="w-4 h-4 text-slate-500" />
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                    <div className="mt-5 grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="rounded-2xl bg-blue-50 p-4 text-sm text-slate-700 leading-6">AI can summarize the gap, explain the mapping, and generate a TRB-ready summary from the same trace path.</div>
                      <div className="rounded-2xl bg-slate-50 p-4 text-sm text-slate-700 leading-6">This preview positions the portal as an experience layer above CMS TRA and Sparx EA, not as a replacement.</div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          <div className="space-y-5 md:space-y-6">
            <Card className="rounded-2xl shadow-sm border-slate-200 overflow-hidden">
              <CardHeader className="pb-3"><CardTitle className="text-base">AI Copilot</CardTitle></CardHeader>
              <CardContent className="space-y-4">
                <div className="rounded-2xl bg-slate-50 p-4">
                  <div className="text-xs text-slate-500">Suggested prompt</div>
                  <div className="text-sm text-slate-700 mt-2">How can I securely transfer sensitive data?</div>
                </div>
                <div className="rounded-2xl border border-slate-200 p-4 text-sm text-slate-700">Use BR-DSS style guidance: protect data in transit with approved encryption and secure transfer protocols such as TLS-protected APIs or SFTP.</div>
                <Button className="w-full rounded-xl gap-2"><Brain className="w-4 h-4" /> Run AI analysis</Button>
              </CardContent>
            </Card>

            <Card className="rounded-2xl shadow-sm border-slate-200 overflow-hidden">
              <CardHeader className="pb-3"><CardTitle className="text-base">CMS TRA source links</CardTitle></CardHeader>
              <CardContent className="space-y-3">
                {RIGHT_DOMAIN_LINKS.map((link) => (
                  <a key={link.href} href={link.href} target="_blank" rel="noreferrer" className="block rounded-2xl border border-slate-200 p-4 hover:border-blue-400 hover:bg-blue-50 transition text-sm text-slate-700 overflow-hidden min-w-0">
                    <div className="font-medium break-words leading-6">{link.label}</div>
                    <div className="text-xs text-slate-500 mt-1">Open CMS TRA source page</div>
                  </a>
                ))}
              </CardContent>
            </Card>

            <Card className="rounded-2xl shadow-sm border-slate-200 overflow-hidden">
              <CardHeader className="pb-3"><CardTitle className="text-base">Suggested content</CardTitle></CardHeader>
              <CardContent className="space-y-3">
                {['Data encryption best practices', 'Cloud compliance checklist', 'Recent Zero Trust updates', 'AI-ready TRB review template'].map((item) => (
                  <div key={item} className="rounded-xl border border-slate-200 px-4 py-3 text-sm text-slate-700 flex items-center justify-between hover:bg-slate-50 transition">
                    <span>{item}</span>
                    <ArrowRight className="w-4 h-4" />
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card className="rounded-2xl shadow-sm border-slate-200 overflow-hidden">
              <CardHeader className="pb-3"><CardTitle className="text-base">Latest updates</CardTitle></CardHeader>
              <CardContent className="space-y-3 text-sm text-slate-700">
                {['New ARS 5.0 guidelines', 'TRB compliance review tips', 'Zero Trust framework overview', 'AI governance starter checklist'].map((item) => (
                  <div key={item} className="rounded-xl bg-slate-50 p-3">{item}</div>
                ))}
              </CardContent>
            </Card>

            <Card className="rounded-2xl shadow-sm border-slate-200 overflow-hidden">
              <CardHeader className="pb-3"><CardTitle className="text-base">Analyst mode</CardTitle></CardHeader>
              <CardContent className="space-y-4 text-sm text-slate-700">
                <div className="flex items-center justify-between"><span>Executive summary export</span><Badge>Ready</Badge></div>
                <div className="flex items-center justify-between"><span>Risk heat map view</span><Badge variant="secondary">Enabled</Badge></div>
                <div className="flex items-center justify-between"><span>TRB summary workflow</span><Badge variant="secondary">Mock</Badge></div>
                <div className="flex items-center justify-between"><span>Sparx EA sync preview</span><Badge variant="secondary">Concept</Badge></div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

export default memo(CmsTraAnalyticsPreview);
