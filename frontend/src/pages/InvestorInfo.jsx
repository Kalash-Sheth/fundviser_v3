import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import {
  ChevronRight, FileText, Download,
  Mail, Phone, MapPin, User, Building2, ArrowRight,
  BarChart3, Shield, Globe2, Bell, TrendingUp, Star,
  BookOpen, Users, CheckSquare, RefreshCw, Lock,
  AlertCircle, ExternalLink,
} from 'lucide-react';

/* ══════════════════════════════════════════
   SIDEBAR NAVIGATION — 14 sections
══════════════════════════════════════════ */
const NAV = [
  { id: 'moa',               label: 'MOA and AOA', icon: FileText,    color: '#a78bfa', count: 2   },
  { id: 'corporate',         label: 'Corporate Announcement',                  icon: Bell,        color: '#f59e0b', count: 6   },
  { id: 'results',           label: 'Results',                                  icon: TrendingUp,  color: '#10b981', count: 9   },
  { id: 'preferential',      label: 'Preferential Issue',                       icon: Star,        color: '#f59e0b', count: 3   },
  { id: 'annual-report',     label: 'Annual Report',                            icon: BookOpen,    color: '#3b82f6', count: 7   },
  { id: 'shareholding',      label: 'Share Holding Pattern',                    icon: Users,       color: '#8b5cf6', count: 6   },
  { id: 'evoting',           label: 'E-Voting',                                 icon: CheckSquare, color: '#06b6d4', count: 5   },
  { id: 'annual-return',     label: 'Annual Return',                            icon: RefreshCw,   color: '#f97316', count: 6   },
  { id: 'compliance',        label: 'Compliance – Other Documents',             icon: Shield,      color: '#ec4899', count: 5   },
  { id: 'newspaper',         label: 'Newspaper Publications',                   icon: FileText,    color: '#6b7280', count: 5   },
  { id: 'company-secretary', label: 'Company Secretary & Compliance Officer',   icon: User,        color: '#3b82f6', count: null },
  { id: 'transfer-agent',    label: 'Share Transfer Agent',                     icon: Building2,   color: '#10b981', count: null },
  { id: 'policies',          label: 'Policies',                                 icon: Lock,        color: '#8b5cf6', count: 11  },
  { id: 'deviation',         label: 'Statement of Deviation',                   icon: AlertCircle, color: '#ef4444', count: 4   },
];

/* ══════════════════════════════════════════
   SECTION META — colors, descriptions, number
══════════════════════════════════════════ */
const SECTION_META = {
  moa:               { from: '#360153', to: '#5a0280',  num: '01', desc: "Foundational legal documents governing the company's constitution" },
  corporate:         { from: '#92400e', to: '#78350f',  num: '02', desc: 'Official board meeting notices and regulatory announcements' },
  results:           { from: '#065f46', to: '#064e3b',  num: '03', desc: 'Quarterly and annual financial results filed with BSE' },
  preferential:      { from: '#92400e', to: '#78350f',  num: '04', desc: 'Details of preferential allotment of equity shares' },
  'annual-report':   { from: '#1e3a8a', to: '#1e40af',  num: '05', desc: 'Comprehensive yearly reports on financials and operations' },
  shareholding:      { from: '#4c1d95', to: '#5b21b6',  num: '06', desc: 'Quarterly shareholding pattern as required by SEBI' },
  evoting:           { from: '#164e63', to: '#155e75',  num: '07', desc: 'E-voting notices, results, and scrutinizer reports for AGMs' },
  'annual-return':   { from: '#7c2d12', to: '#9a3412',  num: '08', desc: 'Statutory annual returns filed with Ministry of Corporate Affairs' },
  compliance:        { from: '#831843', to: '#9d174d',  num: '09', desc: 'Compliance certificates, investor complaints and governance reports' },
  newspaper:         { from: '#1f2937', to: '#374151',  num: '10', desc: 'Published newspaper clippings of results and public notices' },
  'company-secretary': { from: '#1e3a8a', to: '#1e40af', num: '11', desc: 'Contact the Company Secretary for investor queries and compliance' },
  'transfer-agent':  { from: '#064e3b', to: '#065f46',  num: '12', desc: 'Registrar and Share Transfer Agent for share-related services' },
  policies:          { from: '#4c1d95', to: '#5b21b6',  num: '13', desc: 'Board-approved governance and compliance policies' },
  deviation:         { from: '#7f1d1d', to: '#991b1b',  num: '14', desc: 'Statement of deviation/variation in utilisation of funds' },
};

/* ══════════════════════════════════════════
   CONTENT DATA — all 14 sections
══════════════════════════════════════════ */
const CONTENT = {
  moa: {
    title: 'Memorandum and Articles of Association',
    type: 'links',
    items: [
      { label: 'Memorandum of Association (MOA)' },
      { label: 'Articles of Association (AOA)' },
    ],
  },

  corporate: {
    title: 'Corporate Announcement',
    type: 'accordion',
    groups: [
      {
        label: 'FINANCIAL YEAR 2025-26',
        items: [
          'Board Meeting Notice – Q1 FY 2025-26',
          'Outcome of Board Meeting – Q1 FY 2025-26',
          'Board Meeting Notice – Q2 FY 2025-26',
          'Outcome of Board Meeting – Q2 FY 2025-26',
        ],
      },
      {
        label: '2024-25 MEETINGS NOTICES',
        items: [
          'Notice of Annual General Meeting (AGM) – 2024-25',
          'Postal Ballot Notice – 2024-25',
          'Board Meeting Notice – Q4 FY 2024-25',
          'Outcome of Board Meeting – Q4 FY 2024-25',
          'Board Meeting Notice – Q3 FY 2024-25',
          'Outcome of Board Meeting – Q3 FY 2024-25',
          'Board Meeting Notice – Q2 FY 2024-25',
          'Outcome of Board Meeting – Q2 FY 2024-25',
          'Board Meeting Notice – Q1 FY 2024-25',
          'Outcome of Board Meeting – Q1 FY 2024-25',
        ],
      },
      {
        label: '2023-24 MEETINGS NOTICES',
        items: [
          'Notice of Annual General Meeting (AGM) – 2023-24',
          'Board Meeting Notice – Q4 FY 2023-24',
          'Outcome of Board Meeting – Q4 FY 2023-24',
          'Board Meeting Notice – Q3 FY 2023-24',
          'Outcome of Board Meeting – Q3 FY 2023-24',
          'Board Meeting Notice – Q2 FY 2023-24',
          'Board Meeting Notice – Q1 FY 2023-24',
          'Outcome of Board Meeting – Q1 FY 2023-24',
        ],
      },
      {
        label: '2022-23 MEETINGS NOTICES',
        items: [
          'Notice of Annual General Meeting (AGM) – 2022-23',
          'Board Meeting Notice – Q4 FY 2022-23',
          'Outcome of Board Meeting – Q4 FY 2022-23',
          'Board Meeting Notice – Q3 FY 2022-23',
          'Board Meeting Notice – Q2 FY 2022-23',
          'Board Meeting Notice – Q1 FY 2022-23',
        ],
      },
      {
        label: '2021-22 MEETINGS NOTICES',
        items: [
          'Notice of Annual General Meeting (AGM) – 2021-22',
          'Board Meeting Notice – Q4 FY 2021-22',
          'Outcome of Board Meeting – Q4 FY 2021-22',
          'Board Meeting Notice – Q3 FY 2021-22',
          'Board Meeting Notice – Q2 FY 2021-22',
        ],
      },
      {
        label: '2020-21 MEETINGS NOTICES',
        items: [
          'Notice of Annual General Meeting (AGM) – 2020-21',
          'Board Meeting Notice – Q4 FY 2020-21',
          'Board Meeting Notice – Q3 FY 2020-21',
          'Board Meeting Notice – Q2 FY 2020-21',
        ],
      },
    ],
  },

  results: {
    title: 'Results',
    type: 'accordion',
    groups: [
      {
        label: '2025-26',
        items: [
          'Unaudited Financial Results – June 2025 (Q1)',
          'Unaudited Financial Results – September 2025 (Q2)',
          'Unaudited Financial Results – December 2025 (Q3)',
        ],
      },
      {
        label: '2024-25',
        items: [
          'Unaudited Financial Results – June 2024 (Q1)',
          'Unaudited Financial Results – September 2024 (Q2)',
          'Unaudited Financial Results – December 2024 (Q3)',
          'Audited Financial Results – March 2025 (Q4 & Full Year)',
        ],
      },
      {
        label: '2023-24',
        items: [
          'Unaudited Financial Results – June 2023 (Q1)',
          'Unaudited Financial Results – September 2023 (Q2)',
          'Unaudited Financial Results – December 2023 (Q3)',
          'Audited Financial Results – March 2024 (Q4 & Full Year)',
        ],
      },
      {
        label: '2022-23',
        items: [
          'Unaudited Financial Results – June 2022 (Q1)',
          'Unaudited Financial Results – September 2022 (Q2)',
          'Unaudited Financial Results – December 2022 (Q3)',
          'Audited Financial Results – March 2023 (Q4 & Full Year)',
        ],
      },
      {
        label: '2021-22',
        items: [
          'Unaudited Financial Results – June 2021 (Q1)',
          'Unaudited Financial Results – September 2021 (Q2)',
          'Unaudited Financial Results – December 2021 (Q3)',
          'Audited Financial Results – March 2022 (Q4 & Full Year)',
        ],
      },
      {
        label: '2020-21',
        items: [
          'Unaudited Financial Results – June 2020 (Q1)',
          'Unaudited Financial Results – September 2020 (Q2)',
          'Unaudited Financial Results – December 2020 (Q3)',
          'Audited Financial Results – March 2021 (Q4 & Full Year)',
        ],
      },
      {
        label: '2019-20',
        items: [
          'Unaudited Financial Results – June 2019 (Q1)',
          'Unaudited Financial Results – September 2019 (Q2)',
          'Unaudited Financial Results – December 2019 (Q3)',
          'Audited Financial Results – March 2020 (Q4 & Full Year)',
        ],
      },
      {
        label: '2018-19',
        items: [
          'Unaudited Financial Results – June 2018 (Q1)',
          'Unaudited Financial Results – September 2018 (Q2)',
          'Unaudited Financial Results – December 2018 (Q3)',
          'Audited Financial Results – March 2019 (Q4 & Full Year)',
        ],
      },
      {
        label: '2017-18',
        items: [
          'Unaudited Financial Results – June 2017 (Q1)',
          'Unaudited Financial Results – September 2017 (Q2)',
          'Unaudited Financial Results – December 2017 (Q3)',
          'Audited Financial Results – March 2018 (Q4 & Full Year)',
        ],
      },
    ],
  },

  preferential: {
    title: 'Preferential Issue',
    type: 'accordion',
    groups: [
      {
        label: 'Preferential Issue 2023-24',
        items: [
          'Board Resolution – Preferential Allotment 2023-24',
          'In-Principle Approval from BSE – 2023-24',
          'Special Resolution by Shareholders – 2023-24',
          'Letter of Offer – Preferential Issue 2023-24',
          'Certificate of Allotment – 2023-24',
          'Listing Approval from BSE – 2023-24',
        ],
      },
      {
        label: 'Preferential Issue 2022-23',
        items: [
          'Board Resolution – Preferential Allotment 2022-23',
          'In-Principle Approval from BSE – 2022-23',
          'Certificate of Allotment – 2022-23',
        ],
      },
      {
        label: 'Preferential Issue 2021-22',
        items: [
          'Board Resolution – Preferential Allotment 2021-22',
          'In-Principle Approval from BSE – 2021-22',
          'Certificate of Allotment – 2021-22',
        ],
      },
    ],
  },

  'annual-report': {
    title: 'Annual Report',
    type: 'links',
    items: [
      { label: 'Annual Report – FY 2023-24' },
      { label: 'Annual Report – FY 2022-23' },
      { label: 'Annual Report – FY 2021-22' },
      { label: 'Annual Report – FY 2020-21' },
      { label: 'Annual Report – FY 2019-20' },
      { label: 'Annual Report – FY 2018-19' },
      { label: 'Annual Report – FY 2017-18' },
    ],
  },

  shareholding: {
    title: 'Share Holding Pattern',
    type: 'accordion',
    groups: [
      {
        label: '2025-26',
        items: [
          'Share Holding Pattern – June 2025 (Q1 FY 2025-26)',
          'Share Holding Pattern – September 2025 (Q2 FY 2025-26)',
          'Share Holding Pattern – December 2025 (Q3 FY 2025-26)',
        ],
      },
      {
        label: '2024-25',
        items: [
          'Share Holding Pattern – June 2024 (Q1 FY 2024-25)',
          'Share Holding Pattern – September 2024 (Q2 FY 2024-25)',
          'Share Holding Pattern – December 2024 (Q3 FY 2024-25)',
          'Share Holding Pattern – March 2025 (Q4 FY 2024-25)',
        ],
      },
      {
        label: '2023-24',
        items: [
          'Share Holding Pattern – June 2023 (Q1 FY 2023-24)',
          'Share Holding Pattern – September 2023 (Q2 FY 2023-24)',
          'Share Holding Pattern – December 2023 (Q3 FY 2023-24)',
          'Share Holding Pattern – March 2024 (Q4 FY 2023-24)',
        ],
      },
      {
        label: '2022-23',
        items: [
          'Share Holding Pattern – June 2022 (Q1 FY 2022-23)',
          'Share Holding Pattern – September 2022 (Q2 FY 2022-23)',
          'Share Holding Pattern – December 2022 (Q3 FY 2022-23)',
          'Share Holding Pattern – March 2023 (Q4 FY 2022-23)',
        ],
      },
      {
        label: '2021-22',
        items: [
          'Share Holding Pattern – June 2021 (Q1 FY 2021-22)',
          'Share Holding Pattern – September 2021 (Q2 FY 2021-22)',
          'Share Holding Pattern – December 2021 (Q3 FY 2021-22)',
          'Share Holding Pattern – March 2022 (Q4 FY 2021-22)',
        ],
      },
      {
        label: '2020-21',
        items: [
          'Share Holding Pattern – June 2020 (Q1 FY 2020-21)',
          'Share Holding Pattern – September 2020 (Q2 FY 2020-21)',
          'Share Holding Pattern – December 2020 (Q3 FY 2020-21)',
          'Share Holding Pattern – March 2021 (Q4 FY 2020-21)',
        ],
      },
    ],
  },

  evoting: {
    title: 'E-Voting',
    type: 'accordion',
    groups: [
      {
        label: 'AGM 2024-25',
        items: [
          'E-Voting Notice – Annual General Meeting 2024-25',
          'E-Voting Results – AGM 2024-25',
          'Scrutinizer Report – AGM 2024-25',
          'Remote E-Voting Instructions – AGM 2024-25',
        ],
      },
      {
        label: 'AGM 2023-24',
        items: [
          'E-Voting Notice – Annual General Meeting 2023-24',
          'E-Voting Results – AGM 2023-24',
          'Scrutinizer Report – AGM 2023-24',
          'Remote E-Voting Instructions – AGM 2023-24',
        ],
      },
      {
        label: 'AGM 2022-23',
        items: [
          'E-Voting Notice – Annual General Meeting 2022-23',
          'E-Voting Results – AGM 2022-23',
          'Scrutinizer Report – AGM 2022-23',
        ],
      },
      {
        label: 'AGM 2021-22',
        items: [
          'E-Voting Notice – Annual General Meeting 2021-22',
          'E-Voting Results – AGM 2021-22',
          'Scrutinizer Report – AGM 2021-22',
        ],
      },
      {
        label: 'AGM 2020-21',
        items: [
          'E-Voting Notice – Annual General Meeting 2020-21',
          'E-Voting Results – AGM 2020-21',
          'Scrutinizer Report – AGM 2020-21',
        ],
      },
    ],
  },

  'annual-return': {
    title: 'Annual Return',
    type: 'links',
    items: [
      { label: 'Annual Return – FY 2023-24 (Form MGT-7 / MGT-7A)' },
      { label: 'Annual Return – FY 2022-23 (Form MGT-7 / MGT-7A)' },
      { label: 'Annual Return – FY 2021-22 (Form MGT-7 / MGT-7A)' },
      { label: 'Annual Return – FY 2020-21 (Form MGT-7)' },
      { label: 'Annual Return – FY 2019-20 (Form MGT-7)' },
      { label: 'Annual Return – FY 2018-19 (Form MGT-7)' },
    ],
  },

  compliance: {
    title: 'Compliance – Other Documents',
    type: 'accordion',
    groups: [
      {
        label: '2025-26',
        items: [
          'Statement of Investor Complaints – Q1 FY 2025-26',
          'Compliance Certificate under SEBI Listing Regulations – Q1 2025-26',
          'Corporate Governance Report – Q1 FY 2025-26',
          'Statement of Investor Complaints – Q2 FY 2025-26',
          'Corporate Governance Report – Q2 FY 2025-26',
        ],
      },
      {
        label: '2024-25',
        items: [
          'Statement of Investor Complaints – Q1 FY 2024-25',
          'Corporate Governance Report – Q1 FY 2024-25',
          'Statement of Investor Complaints – Q2 FY 2024-25',
          'Corporate Governance Report – Q2 FY 2024-25',
          'Statement of Investor Complaints – Q3 FY 2024-25',
          'Corporate Governance Report – Q3 FY 2024-25',
          'Statement of Investor Complaints – Q4 FY 2024-25',
          'Corporate Governance Report – Q4 FY 2024-25',
          'Compliance Certificate under SEBI Listing Regulations – FY 2024-25',
          'Certificate from PCS – Non-Disqualification of Directors',
          'Annual Compliance Report on Related Party Transactions',
        ],
      },
      {
        label: '2023-24',
        items: [
          'Statement of Investor Complaints – Q1 FY 2023-24',
          'Corporate Governance Report – Q1 FY 2023-24',
          'Statement of Investor Complaints – Q2 FY 2023-24',
          'Statement of Investor Complaints – Q3 FY 2023-24',
          'Statement of Investor Complaints – Q4 FY 2023-24',
          'Corporate Governance Report – Q4 FY 2023-24',
          'Compliance Certificate under SEBI Listing Regulations – FY 2023-24',
        ],
      },
      {
        label: '2022-23',
        items: [
          'Statement of Investor Complaints – Q1 FY 2022-23',
          'Statement of Investor Complaints – Q2 FY 2022-23',
          'Statement of Investor Complaints – Q3 FY 2022-23',
          'Statement of Investor Complaints – Q4 FY 2022-23',
          'Compliance Certificate under SEBI Listing Regulations – FY 2022-23',
          'Certificate under Regulation 40(9) of SEBI Listing Regulations',
        ],
      },
      {
        label: '2021-22',
        items: [
          'Statement of Investor Complaints – Q1 FY 2021-22',
          'Statement of Investor Complaints – Q2 FY 2021-22',
          'Statement of Investor Complaints – Q3 FY 2021-22',
          'Statement of Investor Complaints – Q4 FY 2021-22',
          'Compliance Certificate under SEBI Listing Regulations – FY 2021-22',
        ],
      },
    ],
  },

  newspaper: {
    title: 'Newspaper Publications',
    type: 'accordion',
    groups: [
      {
        label: '2025-26',
        items: [
          'Q1 Financial Results (June 2025) – Newspaper Publication',
          'Q2 Financial Results (September 2025) – Newspaper Publication',
          'Q3 Financial Results (December 2025) – Newspaper Publication',
        ],
      },
      {
        label: '2024-25',
        items: [
          'Q1 Financial Results (June 2024) – Newspaper Publication',
          'Q2 Financial Results (September 2024) – Newspaper Publication',
          'Q3 Financial Results (December 2024) – Newspaper Publication',
          'Q4 Financial Results (March 2025) – Newspaper Publication',
          'AGM Notice Publication – 2024-25',
        ],
      },
      {
        label: '2023-24',
        items: [
          'Q1 Financial Results (June 2023) – Newspaper Publication',
          'Q2 Financial Results (September 2023) – Newspaper Publication',
          'Q3 Financial Results (December 2023) – Newspaper Publication',
          'Q4 Financial Results (March 2024) – Newspaper Publication',
          'AGM Notice Publication – 2023-24',
        ],
      },
      {
        label: '2022-23',
        items: [
          'Q1 Financial Results (June 2022) – Newspaper Publication',
          'Q2 Financial Results (September 2022) – Newspaper Publication',
          'Q3 Financial Results (December 2022) – Newspaper Publication',
          'Q4 Financial Results (March 2023) – Newspaper Publication',
        ],
      },
      {
        label: '2021-22',
        items: [
          'Q1 Financial Results (June 2021) – Newspaper Publication',
          'Q2 Financial Results (September 2021) – Newspaper Publication',
          'Q3 Financial Results (December 2021) – Newspaper Publication',
          'Q4 Financial Results (March 2022) – Newspaper Publication',
        ],
      },
    ],
  },

  'company-secretary': {
    title: 'Company Secretary & Compliance Officer',
    type: 'contact',
    cards: [
      {
        icon: 'person',
        name: '[Company Secretary Name]',
        designation: 'Company Secretary & Compliance Officer',
        fields: [
          { icon: 'mail',  label: 'Email',   value: 'cs@fundvisercapital.in' },
          { icon: 'phone', label: 'Phone',   value: '+91-22-31236586' },
          { icon: 'map',   label: 'Address', value: '22/7 Manek Mahal, 90 Veer Nariman Road, Churchgate, Mumbai – 400020' },
        ],
      },
    ],
  },

  'transfer-agent': {
    title: 'Share Transfer Agent',
    type: 'contact',
    cards: [
      {
        icon: 'building',
        name: 'Bigshare Services Pvt. Ltd.',
        designation: 'Registrar & Share Transfer Agent (RTA)',
        fields: [
          { icon: 'map',   label: 'Address', value: 'Office No S6-2, 6th Floor, Pinnacle Business Park, Next to Ahura Centre, Mahakali Caves Road, Andheri (East), Mumbai – 400093' },
          { icon: 'phone', label: 'Phone',   value: '+91-22-6263-8200' },
          { icon: 'mail',  label: 'Email',   value: 'investor@bigshareonline.com' },
          { icon: 'globe', label: 'Website', value: 'www.bigshareonline.com' },
        ],
      },
    ],
  },

  policies: {
    title: 'Policies',
    type: 'links',
    items: [
      { label: 'Code of Conduct for Prevention of Insider Trading' },
      { label: 'Related Party Transaction Policy' },
      { label: 'Nomination and Remuneration Policy' },
      { label: 'Whistle Blower Policy (Vigil Mechanism)' },
      { label: 'Risk Management Policy' },
      { label: 'Corporate Social Responsibility (CSR) Policy' },
      { label: 'Policy on Materiality of Information / Events' },
      { label: 'Code of Conduct for Board Members and Senior Management' },
      { label: 'Terms and Conditions for Appointment of Independent Directors' },
      { label: 'Familiarization Programme for Independent Directors' },
      { label: 'Document Retention and Archival Policy' },
    ],
  },

  deviation: {
    title: 'Statement of Deviation',
    type: 'accordion',
    groups: [
      {
        label: '2024-25',
        items: [
          'Statement of Deviation / Variation – Q1 FY 2024-25',
          'Statement of Deviation / Variation – Q2 FY 2024-25',
          'Statement of Deviation / Variation – Q3 FY 2024-25',
          'Statement of Deviation / Variation – Q4 FY 2024-25',
        ],
      },
      {
        label: '2023-24',
        items: [
          'Statement of Deviation / Variation – Q1 FY 2023-24',
          'Statement of Deviation / Variation – Q2 FY 2023-24',
          'Statement of Deviation / Variation – Q3 FY 2023-24',
          'Statement of Deviation / Variation – Q4 FY 2023-24',
        ],
      },
      {
        label: '2022-23',
        items: [
          'Statement of Deviation / Variation – Q1 FY 2022-23',
          'Statement of Deviation / Variation – Q2 FY 2022-23',
          'Statement of Deviation / Variation – Q3 FY 2022-23',
          'Statement of Deviation / Variation – Q4 FY 2022-23',
        ],
      },
      {
        label: '2021-22',
        items: [
          'Statement of Deviation / Variation – Q3 FY 2021-22',
          'Statement of Deviation / Variation – Q4 FY 2021-22',
        ],
      },
    ],
  },
};

/* ══════════════════════════════════════════
   ACCORDION GROUP (redesigned)
══════════════════════════════════════════ */
const AccordionGroup = ({ group, accentColor }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-b border-gray-100 last:border-b-0">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between py-4 sm:py-5 px-4 sm:px-6 hover:bg-gray-50 text-left transition-all duration-200"
      >
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: accentColor }} />
          <span className="text-[13px] sm:text-[16px] font-bold text-gray-800 uppercase tracking-wide leading-tight">
            {group.label}
          </span>
        </div>
        <div
          className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-200"
          style={{
            background: open ? accentColor : 'transparent',
            border: `1px solid ${open ? accentColor : '#e5e7eb'}`,
          }}
        >
          <ChevronRight
            className="w-4 h-4 transition-transform duration-200"
            style={{
              color: open ? '#fff' : '#9ca3af',
              transform: open ? 'rotate(90deg)' : 'rotate(0deg)',
            }}
          />
        </div>
      </button>

      {open && (
        <div style={{ background: '#fafbff' }}>
          {group.items.map((item, i) => (
            <a
              key={i}
              href="#"
              className="flex items-center justify-between px-4 sm:px-8 py-3.5 sm:py-4 border-b border-gray-100 last:border-b-0 transition-colors group/row item-enter"
              style={{ animationDelay: `${i * 0.04}s` }}
              onMouseEnter={e => { e.currentTarget.style.background = `${accentColor}12`; }}
              onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; }}
              onClick={e => e.preventDefault()}
            >
              <div className="flex items-center gap-3 min-w-0">
                <div
                  className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0"
                  style={{ background: `${accentColor}20` }}
                >
                  <FileText className="w-3.5 h-3.5" style={{ color: accentColor }} />
                </div>
                <span className="text-[13px] sm:text-[15px] text-gray-700 leading-snug">{item}</span>
              </div>
              {/* Always visible on mobile */}
              <div className="flex items-center gap-1.5 flex-shrink-0 ml-3 sm:opacity-0 sm:group-hover/row:opacity-100 transition-opacity">
                <span
                  className="text-[10px] sm:text-[11px] font-black tracking-wider px-2 sm:px-2.5 py-1 rounded border"
                  style={{ color: accentColor, borderColor: accentColor, background: `${accentColor}10` }}
                >
                  PDF
                </span>
                <Download className="w-3 h-3 sm:w-3.5 sm:h-3.5" style={{ color: accentColor }} />
              </div>
            </a>
          ))}
        </div>
      )}
    </div>
  );
};

/* ══════════════════════════════════════════
   CONTENT PANEL (redesigned)
══════════════════════════════════════════ */
const ContentPanel = ({ sectionId }) => {
  const content = CONTENT[sectionId];
  const navItem = NAV.find(n => n.id === sectionId);
  const meta = SECTION_META[sectionId];
  if (!content || !navItem || !meta) return null;

  const Icon = navItem.icon;
  const accentColor = navItem.color;

  return (
    <div key={sectionId} className="section-enter flex flex-col">
      {/* Panel header */}
      <div
        className="px-5 py-5 sm:px-8 sm:py-7 flex-shrink-0 relative overflow-hidden"
        style={{ background: `linear-gradient(135deg, ${meta.from} 0%, ${meta.to} 100%)` }}
      >
        <div className="flex items-start justify-between gap-3 relative z-10">
          <div className="flex items-start gap-3 sm:gap-5 min-w-0">
            <div
              className="w-11 h-11 sm:w-14 sm:h-14 rounded-2xl flex items-center justify-center flex-shrink-0"
              style={{ background: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(8px)' }}
            >
              <Icon className="w-5 h-5 sm:w-7 sm:h-7 text-white" />
            </div>
            <div className="min-w-0">
              <h2 className="text-lg sm:text-2xl font-black text-white leading-tight mb-1">
                {content.title}
              </h2>
              <p className="text-xs sm:text-sm text-white/60 leading-relaxed">
                {meta.desc}
              </p>
            </div>
          </div>
          <div
            className="hidden sm:block text-7xl font-black flex-shrink-0 leading-none select-none"
            style={{ color: 'rgba(255,255,255,0.12)' }}
          >
            {meta.num}
          </div>
        </div>
      </div>

      {/* Panel body */}
      <div className="flex-1 bg-white">

        {/* ACCORDION type */}
        {content.type === 'accordion' && (
          <div>
            {content.groups.map((group, i) => (
              <AccordionGroup key={i} group={group} accentColor={accentColor} />
            ))}
          </div>
        )}

        {/* LINKS type */}
        {content.type === 'links' && (
          <div>
            {content.items.map((item, i) => (
              <a
                key={i}
                href="#"
                className="flex items-center justify-between px-4 sm:px-6 py-4 sm:py-5 border-b border-gray-100 last:border-b-0 transition-colors group"
                onMouseEnter={e => { e.currentTarget.style.background = `${accentColor}08`; }}
                onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; }}
                onClick={e => e.preventDefault()}
              >
                <div className="flex items-center gap-3 sm:gap-4 min-w-0">
                  <div
                    className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ background: `${accentColor}20` }}
                  >
                    <FileText className="w-4 h-4 sm:w-5 sm:h-5" style={{ color: accentColor }} />
                  </div>
                  <span className="text-[13px] sm:text-[16px] font-medium text-gray-800 leading-snug">{item.label}</span>
                </div>
                {/* Always visible on mobile; hover-only on desktop */}
                <div className="flex items-center gap-1.5 sm:gap-2 flex-shrink-0 ml-3 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity">
                  <span className="hidden sm:inline text-sm font-bold" style={{ color: accentColor }}>Download PDF</span>
                  <Download className="w-4 h-4" style={{ color: accentColor }} />
                </div>
              </a>
            ))}
          </div>
        )}

        {/* CONTACT type */}
        {content.type === 'contact' && (
          <div className="p-4 sm:p-8 space-y-5 sm:space-y-6">
            {content.cards.map((card, i) => (
              <div key={i} className="rounded-2xl overflow-hidden border border-gray-200 shadow-sm">
                {/* Card header */}
                <div
                  className="px-4 sm:px-6 py-5 sm:py-6 flex items-start gap-4 sm:gap-5"
                  style={{ background: `linear-gradient(135deg, ${meta.from} 0%, ${meta.to} 100%)` }}
                >
                  <div
                    className="w-11 h-11 sm:w-14 sm:h-14 rounded-2xl flex items-center justify-center flex-shrink-0"
                    style={{ background: 'rgba(255,255,255,0.18)' }}
                  >
                    {card.icon === 'person'
                      ? <User className="w-5 h-5 sm:w-7 sm:h-7 text-white" />
                      : <Building2 className="w-5 h-5 sm:w-7 sm:h-7 text-white" />}
                  </div>
                  <div>
                    <p className="text-white font-black text-lg sm:text-xl leading-tight">{card.name}</p>
                    <p className="text-white/60 text-xs sm:text-sm mt-1">{card.designation}</p>
                  </div>
                </div>

                {/* Card fields */}
                <div className="divide-y divide-gray-100 bg-white">
                  {card.fields.map((field, j) => (
                    <div key={j} className="flex items-start gap-3 sm:gap-5 py-4 sm:py-5 px-4 sm:px-6">
                      <div
                        className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5"
                        style={{ background: `${accentColor}15` }}
                      >
                        {field.icon === 'mail'  && <Mail  className="w-4 h-4 sm:w-5 sm:h-5" style={{ color: accentColor }} />}
                        {field.icon === 'phone' && <Phone className="w-4 h-4 sm:w-5 sm:h-5" style={{ color: accentColor }} />}
                        {field.icon === 'map'   && <MapPin className="w-4 h-4 sm:w-5 sm:h-5" style={{ color: accentColor }} />}
                        {field.icon === 'globe' && <Globe2 className="w-4 h-4 sm:w-5 sm:h-5" style={{ color: accentColor }} />}
                      </div>
                      <div className="min-w-0">
                        <p className="text-[11px] sm:text-[13px] font-bold text-gray-400 uppercase tracking-wider mb-1">{field.label}</p>
                        {field.icon === 'mail' ? (
                          <a href={`mailto:${field.value}`} className="text-[13px] sm:text-[16px] font-medium hover:underline break-all" style={{ color: accentColor }}>
                            {field.value}
                          </a>
                        ) : field.icon === 'phone' ? (
                          <a href={`tel:${field.value}`} className="text-[13px] sm:text-[16px] font-medium hover:underline" style={{ color: accentColor }}>
                            {field.value}
                          </a>
                        ) : (
                          <p className="text-[13px] sm:text-[16px] font-medium text-gray-700 leading-relaxed">{field.value}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}

            {/* Note */}
            <div className="flex items-start gap-4 p-5 rounded-2xl border border-yellow-200 bg-yellow-50">
              <div className="w-10 h-10 rounded-xl bg-yellow-100 flex items-center justify-center flex-shrink-0">
                <Shield className="w-5 h-5 text-yellow-600" />
              </div>
              <p className="text-yellow-800 text-sm leading-relaxed">
                For any investor grievances, please contact the Company Secretary or reach out to our Registrar &amp; Share Transfer Agent.
                You may also register your complaint on SEBI SCORES portal.
              </p>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

/* ══════════════════════════════════════════
   MAIN PAGE
══════════════════════════════════════════ */
const InvestorInfo = () => {
  const [activeSection, setActiveSection] = useState('corporate');

  return (
    <div className="min-h-screen" style={{ background: '#f4f6fb' }}>
      <style>{`
        @keyframes sectionEnter {
          from { opacity: 0; transform: translateX(20px); }
          to   { opacity: 1; transform: translateX(0); }
        }
        @keyframes itemFadeIn {
          from { opacity: 0; transform: translateY(6px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes slowZoom {
          from { transform: scale(1); }
          to   { transform: scale(1.08); }
        }
        @keyframes floatA {
          0%, 100% { transform: translateY(0px); }
          50%       { transform: translateY(-16px); }
        }
        @keyframes floatB {
          0%, 100% { transform: translateY(0px); }
          50%       { transform: translateY(-24px); }
        }
        .section-enter { animation: sectionEnter 0.35s cubic-bezier(0.16,1,0.3,1) both; }
        .item-enter    { animation: itemFadeIn 0.2s ease both; }
        .slow-zoom     { animation: slowZoom 18s ease-in-out alternate infinite; }
        .float-a       { animation: floatA 7s ease-in-out infinite; }
        .float-b       { animation: floatB 9s ease-in-out infinite; }
      `}</style>

      <Navbar />

      {/* ── HERO ── */}
      <div className="relative pt-20 overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #0a0015 0%, #1a002b 50%, #0a0015 100%)' }}>

        {/* Background image */}
        <div className="absolute inset-0 overflow-hidden">
          <img
            src="/capital_markets.jpg"
            alt=""
            className="w-full h-full object-cover slow-zoom"
            style={{ opacity: 0.08 }}
          />
        </div>

        {/* Grid overlay */}
        <div className="absolute inset-0 opacity-[0.04]" style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,1) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,1) 1px,transparent 1px)',
          backgroundSize: '60px 60px',
        }} />

        {/* Floating orbs */}
        <div className="float-a absolute top-16 left-20 w-80 h-80 rounded-full pointer-events-none"
          style={{ background: 'radial-gradient(circle,rgba(168,85,247,0.2) 0%,transparent 70%)', filter: 'blur(60px)' }} />
        <div className="float-b absolute bottom-8 right-24 w-72 h-72 rounded-full pointer-events-none"
          style={{ background: 'radial-gradient(circle,rgba(245,158,11,0.16) 0%,transparent 70%)', filter: 'blur(50px)' }} />
        <div className="float-a absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full pointer-events-none"
          style={{ background: 'radial-gradient(circle,rgba(96,165,250,0.08) 0%,transparent 70%)', filter: 'blur(80px)', animationDelay: '3s' }} />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
          <span className="inline-block px-5 py-2 bg-white/5 backdrop-blur-md text-yellow-400 rounded-full text-xs font-black tracking-widest uppercase mb-8 border border-white/10">
            BSE Listed · 530197
          </span>
          <h1 className="text-6xl md:text-7xl font-black text-white leading-tight mb-6">
            Investor{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-200">
              Information
            </span>
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed mb-14">
            Comprehensive investor resources, regulatory filings, and financial disclosures for Fundviser Capital (India) Ltd.
          </p>

          {/* Quick stats */}
          <div className="flex flex-wrap justify-center gap-3 mb-8 sm:mb-10">
            {[
              { icon: BarChart3, label: 'BSE Code',  value: '530197' },
              { icon: Shield,    label: 'Listed On', value: 'BSE Limited' },
              { icon: Globe2,    label: 'ISIN',      value: 'INE259D01012' },
            ].map((s, i) => {
              const Icon = s.icon;
              return (
                <div
                  key={i}
                  className="flex items-center gap-3 px-4 sm:px-6 rounded-2xl backdrop-blur-md"
                  style={{
                    background: 'rgba(255,255,255,0.07)',
                    border: '1px solid rgba(255,255,255,0.12)',
                    height: 56,
                  }}
                >
                  <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-yellow-400/10 flex items-center justify-center">
                    <Icon className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-400" />
                  </div>
                  <div className="text-left">
                    <p className="text-gray-400 text-[10px] sm:text-xs">{s.label}</p>
                    <p className="text-white font-black text-sm sm:text-base">{s.value}</p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* BSE live link button */}
          <a
            href="https://www.bseindia.com/stock-share-price/fundviser-capital-(india)-ltd/fundviser/530197/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-8 py-4 rounded-2xl text-white font-black text-base transition-all hover:scale-105 hover:-translate-y-0.5"
            style={{ background: 'linear-gradient(135deg, #f59e0b, #d97706)', boxShadow: '0 8px 24px rgba(245,158,11,0.35)' }}
          >
            <BarChart3 className="w-5 h-5" />
            View Live on BSE
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>

        <div className="relative h-12">
          <svg viewBox="0 0 1440 48" className="absolute bottom-0 w-full" preserveAspectRatio="none">
            <path d="M0,48 L1440,48 L1440,0 Q720,48 0,0 Z" fill="#f4f6fb" />
          </svg>
        </div>
      </div>

      {/* ── MAIN LAYOUT ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 pb-20">
        <div
          className="hidden lg:flex rounded-2xl overflow-hidden shadow-2xl border border-gray-200"
        >
          {/* ── LEFT SIDEBAR ── */}
          <div
            className="flex-shrink-0 flex flex-col"
            style={{ width: 340, background: '#ffffff', borderRight: '1px solid #e5e7eb' }}
          >
            {/* Sidebar header */}
            <div
              className="flex items-center gap-3 py-5 px-6 flex-shrink-0"
              style={{ borderBottom: '1px solid #e5e7eb', background: '#f8f9ff' }}
            >
              <div className="w-2 h-2 rounded-full animate-pulse" style={{ background: '#7c3aed' }} />
              <span className="font-black tracking-widest text-xs uppercase" style={{ color: '#4b5563' }}>
                Investor Information
              </span>
            </div>

            {/* Nav items */}
            <nav className="flex-1">
              {NAV.map(item => {
                const isActive = activeSection === item.id;
                const NavIcon = item.icon;
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveSection(item.id)}
                    className="w-full text-left flex items-center gap-3 py-4 px-5 transition-all duration-200 group"
                    style={{
                      borderBottom: '1px solid #f3f4f6',
                      borderLeft: `3px solid ${isActive ? item.color : 'transparent'}`,
                      background: isActive ? `${item.color}12` : 'transparent',
                    }}
                    onMouseEnter={e => {
                      if (!isActive) e.currentTarget.style.background = '#f9fafb';
                    }}
                    onMouseLeave={e => {
                      if (!isActive) e.currentTarget.style.background = 'transparent';
                    }}
                  >
                    {/* Icon box */}
                    <div
                      className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                      style={{
                        background: isActive ? `${item.color}20` : '#f3f4f6',
                      }}
                    >
                      <NavIcon
                        className="w-4 h-4"
                        style={{ color: isActive ? item.color : '#9ca3af' }}
                      />
                    </div>

                    {/* Label */}
                    <span
                      className="text-[15.5px] leading-snug flex-1 min-w-0 truncate"
                      style={{
                        color: isActive ? '#111827' : '#6b7280',
                        fontWeight: isActive ? 700 : 400,
                      }}
                    >
                      {item.label}
                    </span>

                    {/* Count badge */}
                    {item.count !== null && (
                      <span
                        className="text-[11px] font-black px-2 py-0.5 rounded-full flex-shrink-0"
                        style={{
                          background: isActive ? `${item.color}20` : '#f3f4f6',
                          color: isActive ? item.color : '#9ca3af',
                        }}
                      >
                        {item.count}
                      </span>
                    )}

                    {/* Chevron */}
                    <ChevronRight
                      className="w-3.5 h-3.5 flex-shrink-0 transition-colors"
                      style={{ color: isActive ? item.color : '#d1d5db' }}
                    />
                  </button>
                );
              })}
            </nav>
          </div>

          {/* ── RIGHT CONTENT ── */}
          <div className="flex-1 min-w-0 bg-white">
            <ContentPanel sectionId={activeSection} />
          </div>
        </div>

        {/* ── MOBILE / TABLET layout ── */}
        <div className="lg:hidden">

          {/* Dropdown nav */}
          <div className="mb-4">
            <label className="block text-xs font-black tracking-widest uppercase text-gray-500 mb-2 px-1">
              Browse Section
            </label>
            <select
              value={activeSection}
              onChange={e => setActiveSection(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border bg-white text-gray-700 font-medium text-sm focus:outline-none focus:ring-2"
              style={{ borderColor: '#360153', focusRingColor: '#360153' }}
            >
              {NAV.map(item => (
                <option key={item.id} value={item.id}>{item.label}</option>
              ))}
            </select>
          </div>

          {/* Content panel */}
          <div className="rounded-2xl overflow-hidden shadow-lg border border-gray-200">
            <ContentPanel sectionId={activeSection} />
          </div>
        </div>

        {/* ── BSE STRIP ── */}
        <div
          className="mt-8 rounded-2xl overflow-hidden shadow-lg"
          style={{ background: 'linear-gradient(135deg, #0a0015 0%, #1a002b 100%)', border: '1px solid rgba(255,255,255,0.08)' }}
        >
          <div className="flex flex-col sm:flex-row items-center justify-between gap-5 px-5 sm:px-10 py-6 sm:py-7">
            <div className="flex items-center gap-5">
              <div
                className="w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0"
                style={{ background: 'rgba(245,158,11,0.15)' }}
              >
                <BarChart3 className="w-7 h-7 text-yellow-400" />
              </div>
              <div>
                <p className="font-black text-white text-lg">Live Stock Price on BSE</p>
                <p className="text-gray-400 text-sm mt-0.5">Fundviser Capital (India) Ltd · BSE: 530197 · ISIN: INE259D01012</p>
              </div>
            </div>
            <a
              href="https://www.bseindia.com/stock-share-price/fundviser-capital-(india)-ltd/fundviser/530197/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-7 py-3.5 rounded-2xl text-white font-black text-base transition-all hover:scale-105 hover:-translate-y-0.5 flex-shrink-0"
              style={{ background: 'linear-gradient(135deg, #f59e0b, #d97706)', boxShadow: '0 6px 20px rgba(245,158,11,0.4)' }}
            >
              View on BSE
              <ArrowRight className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default InvestorInfo;
