import { useParams } from "wouter";
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { 
  FileText, 
  Clock, 
  Database, 
  Users, 
  TrendingUp, 
  Shield, 
  Lightbulb,
  ExternalLink,
  Download,
  Share2,
  ChevronDown,
  ChevronUp,
  Globe,
  BarChart3,
  Target,
  Zap
} from "lucide-react";

interface ReportData {
  title: string;
  duration: string;
  sourceCount: number;
  answers: string;
  sections: ReportSection[];
  sources: Source[];
  qaQuestions: QAQuestion[];
}

interface ReportSection {
  id: string;
  title: string;
  content: string;
  subsections?: ReportSubsection[];
  tables?: TableData[];
  mindmap?: MindmapData;
}

interface ReportSubsection {
  title: string;
  content: string;
}

interface TableData {
  title: string;
  headers: string[];
  rows: string[][];
}

interface Source {
  title: string;
  url: string;
  description?: string;
}

interface QAQuestion {
  question: string;
  duration?: string;
  sourceCount?: number;
  isAnswered?: boolean;
}

interface MindmapData {
  centralTopic: string;
  branches: MindmapBranch[];
}

interface MindmapBranch {
  title: string;
  items: string[];
}

export default function ReportPage() {
  const params = useParams();
  const [reportData, setReportData] = useState<ReportData | null>(null);
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  // Mock data based on the sample report - in production this would come from FifthRow API
  useEffect(() => {
    // Simulate loading the report data
    setTimeout(() => {
      setReportData({
        title: "Opportunity Mapping & Market Insights",
        duration: "6m 41s",
        sourceCount: 26,
        answers: "To complete the task, I need to follow the planning steps: Solve Subtasks: Gather additional sources for target customer segments and their needs (Action Needed) Provide final answer by integrating the enhanced research and newly cited sources into the previous report draft First, I will tackle the first subtask by researching updated insights and sources on target customer segments, their needs, and pain points for an AI-powered domain quality scoring marketplace.",
        sections: [
          {
            id: "target-customers",
            title: "1. Target Customer Segments & Their Needs",
            content: "Below is a table summarizing the updated target customer segments for an AI-powered domain quality scoring marketplace, their specific needs, and pain points. Each segment benefits from real‑time, data‑driven evaluations that improve confidence, efficiency, and liquidity.",
            tables: [
              {
                title: "Customer Segment Analysis",
                headers: ["Customer Segment", "Description", "Key Needs", "Pain Points", "Sources"],
                rows: [
                  [
                    "Domain Investors & Investment Firms",
                    "Individuals and institutions seeking to invest in premium domains for long‑term appreciation and resale opportunities.",
                    "• Predictive Insights: Data‑driven, real‑time AI scoring to predict future liquidity and market potential.\n• Transparency: Explainable AI models that detail how quality scores are derived.\n• Risk Assessment: Tools for legal and IP background checks.",
                    "• Opaque Valuations: Traditional methods are manual and inconsistent.\n• Information Asymmetry: Limited market data creates uncertainty in asset quality.",
                    "BCG – AI Agents in Customer Experience\nCMSWire – AI in Customer Analysis\nNamePros – AI Naming Trends"
                  ],
                  [
                    "Domain Sellers & Portfolio Holders",
                    "Individuals, brokers, or agencies listing domains for sale, often managing large portfolios.",
                    "• Automated Valuations: Trusted AI scoring to set transparent, justified prices.\n• Efficiency Tools: Streamlined listing features and bulk management integrated with market analytics.\n• Rapid Liquidity: Faster transaction cycles through direct investor matching.",
                    "• Manual Evaluation: Traditional, error‑prone pricing methods.\n• Inefficiencies: High operational costs from slow or inconsistent evaluation tools.",
                    "Flippa – AI Valuation Multiples\nAfternic – 2024 TLD Rundown\nOpenProvider – Rise of AI Domain TLDs"
                  ],
                  [
                    "Brokers & Intermediaries",
                    "Specialists or firms that facilitate domain transactions and advise both buyers and sellers.",
                    "• Instant Evaluation: AI‑powered assessments for reliable negotiation insights.\n• Transaction Efficiency: Low‑overhead process automation and risk screening for IP disputes and regulatory flags.",
                    "• Scalability Issues: Manual due diligence slows operations.\n• High Administration Costs: Increased overhead due to inconsistent or delayed data.",
                    "DNIB – Domain Industry Brief Q1 2025\nAfternic – Transaction Assurance"
                  ],
                  [
                    "Digital Asset & Portfolio Managers",
                    "Firms or individuals managing large inventories of domains as digital assets.",
                    "• Dynamic Analytics: Real‑time tracking with AI‑driven reporting that supports buy/hold/sell decisions.\n• System Integration: Seamless CRM and asset management integrations.",
                    "• Data Overload: Traditional systems struggle to filter pertinent trends.\n• Operational Inefficiencies: Manual analysis leads to missed market opportunities.",
                    "Relevance AI – AI Segmentation Tools\nMedium – AI Use Case in Personalization"
                  ]
                ]
              }
            ],
            subsections: [
              {
                title: "Additional Behavioral Drivers & Expectations",
                content: "Hyper-Personalization: Customers increasingly expect platforms to offer real‑time, adaptive recommendations and personalized dashboards (AiThority – Adaptive Experiences, PYMNTS – Personalized Shopping Experiences). Transparency & Trust: There is a growing demand for clear explanations of AI scoring methods and legal/IP vetting to minimize risks (Law of the Digital Domain)."
              }
            ]
          },
          {
            id: "market-trends",
            title: "2. Market Trends, Innovations & Competitor Landscape",
            content: "Recent advancements in AI are fundamentally reshaping how marketplaces operate and how customers interact with them.",
            subsections: [
              {
                title: "Emerging Trends and Technological Advancements",
                content: "The key trends include:\n\n• AI-Powered Autonomous Agents and Adaptive Experiences: Autonomous agents are now making customer interactions highly personalized while cutting operational costs, enabling real‑time domain evaluations and flagging high‑quality domains for investors. (BCG, 2025)\n\n• Domain-Specific Generative and Multimodal AI: Leveraging domain‑specific AI models and multimodal data—including text, images, and historical sales data—enhances the precision of scoring models by incorporating factors like aesthetic appeal and market trends. (AiThority, 2025)\n\n• Real-Time Data Analytics and Adaptive Personalization: AI systems are increasingly capable of analyzing behavioral data in real time, delivering hyper‑personalized experiences and intuitive search recommendations that reduce transactional friction. (PYMNTS, 2024)\n\n• Enhanced Efficiency and Lowered Costs: Automation enabled by AI has demonstrated the ability to drastically reduce resolution times and handle routine tasks, consequently accelerating domain evaluations and expediting investor bidding processes. (BCG, 2025)"
              },
              {
                title: "Competitor Landscape",
                content: "Leading competitors in adjacent markets demonstrate strategies that align with these technological advancements:"
              }
            ],
            tables: [
              {
                title: "Competitor Analysis",
                headers: ["Competitor", "Offerings & Strengths", "Strategic Focus", "Sources"],
                rows: [
                  [
                    "Flippa",
                    "Provides marketplace analytics, AI-supported buyer/seller matching and valuation multiples driven by AI‑powered insights.",
                    "Reduction of market friction and rapid transaction cycles.",
                    "Flippa Homepage\nFlippa – AI Startup Valuation Multiples"
                  ],
                  [
                    "Acquire.com",
                    "Offers an integrated platform combining live metrics, data transparency, and robust acquisition tools, with clear verification of domain quality and performance.",
                    "Fast, transparent, and safe transactions based on real‑time data.",
                    "Acquire Homepage"
                  ]
                ]
              }
            ]
          },
          {
            id: "regulatory-impact",
            title: "3. Regulatory Impact & Technology Advancements",
            content: "Legal/IP Risks: Integrating legal vetting and IP clearance mechanisms is critical to mitigate ownership disputes and regulatory issues. (Law of the Digital Domain)\n\nAdvanced AI & Analytics: The use of autonomous AI agents and multimodal analytics is driving enhanced operational efficiency and personalized user experiences. This evolution supports continuous updates to scoring models, ensuring they remain accurate amidst dynamic market conditions. (BCG, 2025) (AiThority, 2025)\n\nSecurity Enhancements: Adoption of technologies like DNSSEC and blockchain integration is bolstering transactional security in domain marketplaces, further supporting trust and liquidity. (Business Research Insights – Domain Market)"
          },
          {
            id: "strategic-implications",
            title: "4. Strategic Market Implications",
            content: "• Enhanced Liquidity: AI scoring accelerates the identification and transfer of high‑quality domains, leading to a faster matching process between buyers and sellers.\n\n• Data-Driven Confidence: Real‑time analytics and predictive insights enable stakeholders to optimize pricing, timing, and risk mitigation strategies for domain investments.\n\n• Regulatory Assurance: Robust legal and IP vetting integrated into the platform builds trust and credibility, essential for premium domain transactions.\n\n• Competitive Differentiation: The integration of AI, blockchain, and real‑time adaptive analytics offers a disruptive advantage over traditional valuation methods, positioning the platform as a leader in the evolving domain aftermarket."
          },
          {
            id: "ai-marketplace-mindmap",
            title: "5. AI-Driven Domain Marketplace Mindmap",
            content: "Comprehensive visual mapping of the AI-driven domain marketplace ecosystem:",
            mindmap: {
              centralTopic: "AI-Driven Domain Marketplace",
              branches: [
                {
                  title: "Target Customers",
                  items: [
                    "Investors & Investment Firms",
                    "Domain Sellers & Portfolio Holders",
                    "Brokers & Intermediaries",
                    "Digital Asset Managers"
                  ]
                },
                {
                  title: "Core Features",
                  items: [
                    "AI Quality Scoring",
                    "Real-Time Analytics",
                    "Automated Evaluations"
                  ]
                },
                {
                  title: "Customer Expectations",
                  items: [
                    "Personalization",
                    "Transparency",
                    "Frictionless Transactions"
                  ]
                },
                {
                  title: "Regulatory & Legal",
                  items: [
                    "IP & Trademark Clearance",
                    "Risk Assessment"
                  ]
                },
                {
                  title: "Technological Advancements",
                  items: [
                    "Autonomous AI Agents",
                    "Domain-Specific Generative AI",
                    "Blockchain Integration"
                  ]
                },
                {
                  title: "Competitive Landscape",
                  items: [
                    "Flippa",
                    "Acquire.com"
                  ]
                }
              ]
            }
          },
          {
            id: "profitability-forecast",
            title: "Profitability Forecast & Cost Modeling",
            content: "Comprehensive information on the development and production costs, with credible sources and itemized details. Project potential revenue and profitability for an AI-driven domain marketplace.",
            subsections: [
              {
                title: "1. Development & Production Cost Estimate",
                content: "Below is an itemized breakdown of the estimated development and production costs for launching an AI-powered domain quality scoring marketplace. All monetary figures are provided in US dollars and reference current industry benchmarks and detailed cost analyses."
              },
              {
                title: "1.7 Operational Staffing",
                content: "• Technical Oversight (ML, AI, DevOps Engineers): $7,500+ per FTE/month\n• Customer Support:\n  - AI-based agent: $16–$210/month\n  - Human agent: $4,500–$4,900/month\n\nQuidget – AI Support Agent Costs"
              },
              {
                title: "1.8 Ongoing AI Model Updates",
                content: "Retraining & Drift Detection: Approximately 10–20% of the initial AI development cost per year (covering personnel, cloud compute, and monitoring infrastructure)\n\nRohan Paul – Keeping LLMs Updated"
              },
              {
                title: "2. Revenue & Profitability Projection",
                content: "Analysis of multiple revenue streams, market size assessments, and projected profitability scenarios across a 3-year timeline with realistic growth assumptions."
              },
              {
                title: "2.1 Revenue Model & Streams",
                content: "The marketplace can generate revenues from multiple streams, similar to established platforms such as Flippa:\n\n• Listing Fees: Ranging from $29 to $699 per listing, depending on package levels (Flippa Pricing Structure)\n• Success (Take) Fees: Typically up to 10% of each transaction value (Flippa Pricing Structure)\n• Premium Listing/Promotion Fees: Additional fees for enhanced placement, confidentiality, and detailed reporting\n• Investor Services: Membership-based models (e.g., VIP access for $49/month) and bundled due diligence tools\n• Featured Placement/Advertising Fees: For additional exposure\n• AI-Powered Upgrades: Offering predictive analytics and legal/IP screening as SaaS add-ons"
              },
              {
                title: "2.2 Market Size & Transaction Volume",
                content: "• Total Addressable Market (TAM): Approximately $500 million/year (Domain Name Wire Q1 2025)\n• Annual Transaction Volume: Around 6 million domain sales (NameBio Daily Market Report)"
              },
              {
                title: "2.3 Gross Margins & Profitability Considerations",
                content: "• Expected Gross Margins: Typically between 60–80%, with AI automation potentially pushing margins to the higher end\n• Take Rate Example: With a 10% fee and an average transaction value of $50, the platform captures about $5 per transaction\n• Cost Structure Factors: Operating expenses include technical staff, cloud infrastructure, and customer support—with AI tools reducing manual intervention and lowering support costs\n\nQuidget – AI Support Agent Costs"
              },
              {
                title: "2.4 Illustrative Revenue Scenario (Years 1–3)",
                content: "The following table presents a hypothetical scenario based on increasing adoption, improved sell-through rates through AI curation, and premium pricing dynamics (inspired by data from platforms like Afternic):"
              },
              {
                title: "2.5 AI Impact on Sales Velocity and Pricing",
                content: "• Enhanced Sales Velocity: AI scoring identifies high-potential domains (e.g., premium .ai names), leading to faster transaction cycles\n• Pricing Uplift: High-quality domains curated via AI can command a notable premium, thus increasing average transaction values\n\nAfternic 2024 TLD Rundown"
              },
              {
                title: "2.6 Strategic & Industry Benchmarks",
                content: "• Diversified Revenue: Platforms like Flippa combine listing, success, and premium fees to create multiple revenue streams\n• Profitability Drivers: AI-enabled automation improves matching efficiency, reduces overhead, and increases gross margins\n\nShipturtle – Exploring Revenue Models · Quidget – AI Support Agent Costs"
              },
              {
                title: "3. Sources & References",
                content: "• Trangotech – Marketplace App Development Cost\n• BytePlus – AI Model Costs\n• Codelevate – How Much Does It Cost to Build an AI\n• Shipturtle – Cost to Build an Online Marketplace Website\n• Quidget – AI Support Agent Costs\n• Rohan Paul – Keeping LLMs Updated Without Full Retraining\n• Flippa – Flippa Fees and Pricing\n• Domain Name Wire Q1 2025 Report\n• NameBio Daily Market Report\n• Afternic 2024 TLD Rundown"
              },
              {
                title: "4. Additional Considerations from Market Trends",
                content: "Target Customer Segments: Domain investors, sellers, brokers, and digital asset managers seek transparency through AI-driven, real‑time assessments, improving confidence and reducing information asymmetry (BCG – How AI Agents Are Opening the Golden Era of Customer Experience).\n\nEvolving Regulatory & Security Requirements: Increased investment in compliance, legal/IP checks, and cybersecurity is essential to mitigate regulatory risk and potential IP disputes (Law of the Digital Domain).\n\nOperational Efficiency Enhancements: AI automation reduces customer support and operational costs, while real‑time analytics enable adaptive pricing and rapid liquidity in the marketplace (PYMNTS – AI to Power Personalized Shopping Experiences in 2025).\n\nThis detailed financial analysis provides a comprehensive view of both the upfront investment and the potential revenue streams for an AI-powered domain quality scoring marketplace, establishing a framework for strategic decision-making that addresses development, operational costs, and market-driven revenue projections."
              }
            ],
            tables: [
              {
                title: "1.1 Pre-Development & Planning",
                headers: ["Item", "Cost Range", "Source"],
                rows: [
                  ["Market Research", "$3,000–$8,000", "Trangotech Marketplace App Development Cost"],
                  ["Business Model & Feature Scoping", "$1,000–$2,000", "Trangotech Marketplace App Development Cost"],
                  ["Detailed Feature Planning", "$2,000–$6,000", "Trangotech Marketplace App Development Cost"]
                ]
              },
              {
                title: "1.2 Design",
                headers: ["Item", "Cost Range", "Source"],
                rows: [
                  ["UI/UX Wireframes & Mockups (templates)", "$3,000–$6,000", "Trangotech Marketplace App Development Cost"],
                  ["Custom UI/UX Design", "$12,000–$30,000+", "Trangotech Marketplace App Development Cost"]
                ]
              },
              {
                title: "1.3 Core Platform Engineering",
                headers: ["Component", "Cost Range", "Details"],
                rows: [
                  ["Frontend & Backend Engineering", "For a simple MVP: $30,000–$50,000\nFor a fully-featured system: $70,000–$100,000+", "Trangotech Marketplace App Development Cost"],
                  ["Platform-Specific Development", "Web: $15,000–$30,000\nMobile (if required): $25,000–$45,000", ""],
                  ["Third-Party Integrations (Payments, Analytics)", "$4,000–$15,000", "Trangotech Marketplace App Development Cost"]
                ]
              },
              {
                title: "1.4 Advanced Features/Add-Ons",
                headers: ["Feature", "Cost Range", "Source"],
                rows: [
                  ["AI Domain Scoring Engine - Integration", "$5,000–$20,000", "BytePlus AI Model Costs"],
                  ["AI Domain Scoring Engine - Model training/development", "$50,000–$250,000+ (with enterprise-level models possibly exceeding $1M+)", "BytePlus AI Model Costs · Codelevate on AI Costs"],
                  ["Legal/IP Risk Tools & Compliance", "$3,000–$20,000+", "Trangotech Marketplace App Development Cost"],
                  ["Security & Compliance Features", "$5,000–$15,000", "Trangotech Marketplace App Development Cost"]
                ]
              },
              {
                title: "1.5 Testing & Quality Assurance",
                headers: ["Item", "Cost Range", "Source"],
                rows: [
                  ["Quality Testing (manual/automated)", "$5,000–$20,000", "Trangotech Marketplace App Development Cost"]
                ]
              },
              {
                title: "1.6 Launch & Post-Launch",
                headers: ["Item", "Cost Range", "Source"],
                rows: [
                  ["Beta Launch, Fees, and Marketing", "$2,000–$5,000", "Trangotech Marketplace App Development Cost"],
                  ["Ongoing Maintenance & Updates", "$5,000–$15,000/year", "Trangotech Marketplace App Development Cost"],
                  ["Infrastructure/Cloud Hosting & Scaling - Initial setup", "$15,000–$30,000", "Shipturtle – Cost to Build an Online Marketplace Website"],
                  ["Infrastructure/Cloud Hosting & Scaling - Variable monthly costs", "$500–$10,000 (depending on AI compute requirements)", "Shipturtle – Cost to Build an Online Marketplace Website"]
                ]
              },
              {
                title: "Summary Table (Initial Investment)",
                headers: ["Category", "Low-End Estimate", "High-End Estimate"],
                rows: [
                  ["Pre-Development & Planning", "$6,000", "$16,000"],
                  ["Design", "$5,000", "$30,000+"],
                  ["Core Development (MVP – Complex)", "$60,000", "$150,000+"],
                  ["Advanced Add‑Ons (AI, Legal/IP, Security)", "$13,000", "$55,000+ (can exceed $250K for AI)"],
                  ["Testing & Launch", "$7,000", "$25,000"],
                  ["Maintenance & Hosting (Annual)", "$5,000/yr", "$15,000/yr + scaling cloud costs"],
                  ["Total for a lean MVP", "Approximately $120,000", ""],
                  ["Robust, feature-rich platform", "Between $250,000 and $300,000+", "(advanced AI initiatives can drive costs above $1M)"]
                ]
              },
              {
                title: "2.4 Illustrative Revenue Scenario (Years 1–3)",
                headers: ["Metric", "Year 1", "Year 2", "Year 3"],
                rows: [
                  ["Listings", "5,000", "10,000", "25,000"],
                  ["Sell-Through Rate", "20%", "25%", "30%"],
                  ["Sales", "1,000", "2,500", "7,500"],
                  ["Average Transaction Value", "$250", "$300", "$350"],
                  ["Gross Marketplace Sales", "$250,000", "$750,000", "$2,625,000"],
                  ["10% Transaction Take Fee", "$25,000", "$75,000", "$262,500"],
                  ["Listing Fees (avg. $50)", "$250,000", "$500,000", "$1,250,000"],
                  ["Premium/Upgrade Fees", "$25,000", "$50,000", "$125,000"],
                  ["Total Revenue", "$300,000", "$625,000", "$1,637,500"],
                  ["Gross Margin Example at 75%", "Year 1: $225,000\nYear 2: $468,750\nYear 3: $1,228,125", "", ""]
                ]
              }
            ]
          },
          {
            id: "technical-feasibility",
            title: "Technical Feasibility & Resource Review",
            content: "Comprehensive information on the technical requirements, system architecture, AI models, data engineering, cloud infrastructure, scalability, and integration patterns of AI-powered domain quality scoring marketplaces.",
            subsections: [
              {
                title: "Core Technology and Architecture",
                content: "AI/ML Model Layer: Implements multimodal deep learning, natural language processing, graph neural networks, and recursive model architectures to evaluate domains on criteria such as semantic quality, brand potential, SEO metrics, and market trends. Adoption of Explainable AI (XAI) techniques (LIME, SHAP, DeepLIFT) ensures transparency to meet regulatory and investor demands (Elnion – Explainable AI 2025).\n\nData Engineering Layer: Real‑time data ingestion pipelines integrate WHOIS records, DNS data, historical sales, legal databases, and other market signals, ensuring high‑quality, de‑duplicated, and continuously updated inputs (AWS Blog – Data Quality & Drift).\n\nBlockchain and Escrow Integration: Implements smart contract escrow systems and multisig wallet setups (e.g., 2‑of‑3 schemes) to securely manage funds and automate transaction settlements. These blockchain mechanisms ensure tamper‑proof recording of asset quality and transaction finality (Lightspark Escrow Glossary).\n\nAPI and Integration Layer: Uses standardized RESTful/GraphQL interfaces to integrate with legal services, investor CRMs, and external data sources. Modular design allows for the seamless addition of new features and tech partnerships (Dittofi – Building Scalable AI Marketplace).\n\nScalability and Cloud Infrastructure: Uses GPU-optimized cloud environments with Kubernetes orchestration to support real‑time evaluations and high transaction volumes, while ensuring low latency and sub‑second responses during peak loads."
              },
              {
                title: "Technical Innovations",
                content: "• Hybrid AI Models: Recursive learning workflows and user feedback loops continuously refine scoring models and minimize misclassifications.\n\n• Visual Dashboard and Interactive Tools: User-friendly interfaces provide real‑time visualizations of scoring breakdowns and model feature importances, enhancing transparency and investor trust (Dev.to – XAI for Regulatory Compliance)."
              }
            ],
            tables: [
              {
                title: "Technical Architecture Components",
                headers: ["Layer", "Technology", "Purpose", "Implementation"],
                rows: [
                  [
                    "AI/ML Model Layer",
                    "Deep Learning, NLP, Graph Neural Networks",
                    "Evaluate quality, brand potential, SEO metrics",
                    "Multimodal analysis with XAI"
                  ],
                  [
                    "Data Engineering",
                    "Real-time pipelines, ETL processes",
                    "Integrate WHOIS, DNS, sales data",
                    "Continuous data quality assurance"
                  ],
                  [
                    "Blockchain Integration",
                    "Smart contracts, Multisig wallets",
                    "Secure transactions, escrow automation",
                    "2-of-3 schemes, tamper-proof recording"
                  ],
                  [
                    "API Layer",
                    "RESTful/GraphQL interfaces",
                    "External integrations, CRM connectivity",
                    "Modular design for partnerships"
                  ],
                  [
                    "Cloud Infrastructure",
                    "GPU-optimized, Kubernetes",
                    "Scalability, real-time processing",
                    "Sub-second response times"
                  ]
                ]
              }
            ]
          },
          {
            id: "risk-analysis",
            title: "4. Risk Analysis",
            content: "Major Risks and Mitigation Strategies",
            tables: [
              {
                title: "Risk Assessment Matrix",
                headers: ["Risk", "Impact", "Mitigation Strategy", "Sources"],
                rows: [
                  [
                    "Algorithmic Mispricing & Model Bias",
                    "Overvaluation floods bidding queues; undervaluation reduces liquidity and erodes trust.",
                    "Implement robust XAI (using SHAP, LIME); continuous model audits; human-in-the-loop reviews.",
                    "arXiv:2506.00073 – AI-mediated Dealmaking Risks"
                  ],
                  [
                    "Data Vulnerabilities & Adversarial Attacks",
                    "Manipulation could distort scores and investor decisions.",
                    "Use automated ETL with anomaly detection; deploy diverse data sources; periodic adversarial testing.",
                    "arXiv:2508.06709 – Self-bias in Evaluator Models\narXiv:2406.03589 – Adversarial Ranking Manipulation"
                  ],
                  [
                    "Regulatory, Legal, & IP Risks",
                    "Non‑compliance may lead to fines, legal disputes, and loss of investor confidence.",
                    "Integrate automated legal/IP vetting modules; update compliance documentation; employ \"human-in-the-loop\" for sensitive cases.",
                    "Alation – EU AI Act 2025 Guide\nLaw of the Digital Domain"
                  ],
                  [
                    "Transparency and Explainability",
                    "\"Black box\" outcomes reduce user confidence and may trigger regulatory scrutiny.",
                    "Deploy interactive visual XAI dashboards; publish model cards and detailed scoring rubrics to ensure full auditability.",
                    "Elnion – Explainable AI 2025"
                  ],
                  [
                    "Operational & Technical Risks",
                    "Downtime, data pipeline failures, and scaling challenges can reduce transaction velocity and investor trust.",
                    "Employ cloud-native auto‑scaling, cost‑efficient orchestration with Kubernetes, and robust redundancy in processing pipelines.",
                    "Dittofi – Building Scalable AI Marketplace"
                  ],
                  [
                    "Liquidity & Investor Confidence Risk",
                    "Misaligned valuations and system errors lead to reduced liquidity and market participation.",
                    "Combine constant feedback loops, rapid anomaly detection, and corrective measures in AI scoring models.",
                    "arXiv:2505.10590 – Market Valuation Misalignment"
                  ]
                ]
              }
            ],
            subsections: [
              {
                title: "Risk Mitigation Key Measures",
                content: "• Robust Governance: Establish cross‑functional boards and incorporate human oversight for high‑impact decisions (Medium – The Copilot Doctrine).\n\n• Data Quality Assurance: Use advanced ETL pipelines, automated anomaly detection, and continuous model retraining (AWS Blog – Data Quality & Drift).\n\n• Blockchain-based Transaction Integrity: Deploy multisig and smart contract escrow systems to ensure transparent, tamper‑proof transfers (Lightspark Escrow Glossary)."
              }
            ]
          },
          {
            id: "final-recommendations",
            title: "5. Final Recommendations",
            content: "Proceed with Launching the Marketplace: The feasibility study shows a strong market demand, viable revenue models, and technically proven solutions. The integration of advanced AI scoring, blockchain escrow, and compliance frameworks lays a solid foundation for high‐velocity domain sales.",
            subsections: [
              {
                title: "Key Strategic Actions",
                content: "• Prioritize Transparency and Explainability: Ensure every domain score is fully traceable by leveraging state‑of‑the‑art XAI techniques and interactive dashboards. This increases investor trust and meets stringent regulatory requirements (Elnion – Explainable AI 2025).\n\n• Deploy Smart Escrow and Blockchain Integration: Use robust blockchain solutions (multisig and smart contracts) to handle high‑value transactions, reducing counterparty risk and expediting settlements (Secured Trust Escrow – Smart Contract Escrow).\n\n• Monitor and Adapt Fee Structures: Benchmark against platforms like Flippa and Acquire.com while remaining agile. Consider fee‑friendly models with low seller commissions and competitive buyer subscription rates to attract both cost‑sensitive sellers and premium investors (Investors Club – Flippa vs. Acquire).\n\n• Invest in Continuous Compliance and Security: As regulations evolve (e.g., EU AI Act, state‑level US laws), maintain a modular compliance architecture that can be updated rapidly. Regular legal reviews and bias audits are essential to sustain trust and market integrity (Alation – EU AI Act 2025 Guide).\n\n• Iterate Using Feedback Loops: Implement recursive AI feedback systems so that scoring models are continuously refined based on market outcomes and investor input. This dynamic refinement will ensure long‑term model accuracy and adaptability."
              },
              {
                title: "Summary",
                content: "By tightly integrating explainable AI, blockchain‑based escrow, diversified revenue models, and resilient compliance mechanisms, the new AI‑powered domain scoring marketplace is well positioned to enhance liquidity and deliver a dynamic, trustworthy asset trading ecosystem."
              }
            ]
          }
        ],
        sources: [
          {
            title: "BCG – How AI Agents Are Opening the Golden Era of Customer Experience",
            url: "https://www.bcg.com/publications/2025/how-ai-agents-opening-golden-era-customer-experience"
          },
          {
            title: "PYMNTS – AI to Power Personalized Shopping Experiences in 2025",
            url: "https://www.pymnts.com/artificial-intelligence-2/2024/ai-to-power-personalized-shopping-experiences-in-2025/"
          },
          {
            title: "AiThority – AI Trends for 2025: The Rise of Agents and Adaptive Experiences",
            url: "https://aithority.com/machine-learning/ai-trends-for-2025-the-rise-of-agents-and-adaptive-experiences/"
          },
          {
            title: "DNIB – The Domain Name Industry Brief Q1 2025",
            url: "https://www.dnib.com/articles/the-domain-name-industry-brief-q1-2025"
          },
          {
            title: "Afternic – 2024 TLD Rundown",
            url: "https://blog.afternic.com/2024-tlds/"
          },
          {
            title: "NamePros – Naming Trends for AI Companies",
            url: "https://www.namepros.com/blog/names-chosen-by-rapidly-growing-artificial-intelligence-companies.1332112/"
          },
          {
            title: "Flippa – AI Startups Valuation Multiples: Key Considerations for 2025",
            url: "https://flippa.com/blog/ai-startups-valuation-multiples-key-considerations-for-2025/"
          },
          {
            title: "CMSWire – AI in Customer Analysis",
            url: "https://www.cmswire.com/customer-experience/ai-in-customer-analysis-real-use-cases-that-improved-targeting-and-cx/"
          },
          {
            title: "Relevance AI – AI Segmentation Tools",
            url: "https://relevanceai.com/agent-templates-tasks/customer-segmentation-ai-agents"
          },
          {
            title: "Medium – AI Use Case in Personalization",
            url: "https://medium.com/@adnanmasood/ai-use-case-compass-retail-e-commerce-personalization-at-planet-scale-711f78bc5049"
          },
          {
            title: "OpenProvider – Rise of AI Domain TLDs",
            url: "https://openProvider.com"
          },
          {
            title: "Elnion – Explainable AI 2025",
            url: "https://elnion.com"
          },
          {
            title: "Secured Trust Escrow – Smart Contract Escrow",
            url: "https://securedtrust.com"
          },
          {
            title: "Investors Club – Flippa vs. Acquire",
            url: "https://investors.club/flippa-vs-acquire/"
          },
          {
            title: "DNJournal January 2025 Cover Story",
            url: "https://www.dnjournal.com/cover/2015/january-february.htm"
          },
          {
            title: "AWS Blog – Data Quality & Drift",
            url: "https://aws.amazon.com"
          },
          {
            title: "Dittofi – Building Scalable AI Marketplace",
            url: "https://dittofi.com"
          },
          {
            title: "Lightspark Escrow Glossary",
            url: "https://lightspark.com"
          },
          {
            title: "Alation – EU AI Act 2025 Guide",
            url: "https://www.alation.com/blog/eu-ai-act-2025-data-strategy/"
          },
          {
            title: "Medium – The Copilot Doctrine",
            url: "https://medium.com"
          },
          {
            title: "Trangotech – Marketplace App Development Cost",
            url: "https://trangotech.com"
          },
          {
            title: "BytePlus – AI Model Costs",
            url: "https://byteplus.com"
          },
          {
            title: "Codelevate – How Much Does It Cost to Build an AI",
            url: "https://codelevate.com"
          },
          {
            title: "Shipturtle – Cost to Build an Online Marketplace Website",
            url: "https://shipturtle.com"
          },
          {
            title: "Quidget – AI Support Agent Costs",
            url: "https://quidget.com"
          },
          {
            title: "Rohan Paul – Keeping LLMs Updated Without Full Retraining",
            url: "https://rohanpaul.com"
          },
          {
            title: "Law of the Digital Domain",
            url: "https://lawofdigitaldomain.com"
          }
        ],
        qaQuestions: [
          {
            question: "In what ways can AI-driven personalization and adaptive experiences be further enhanced to meet the evolving expectations of domain investors, sellers, and brokers, and what role do emerging technologies play in this evolution?",
            isAnswered: false
          },
          {
            question: "What are the latest trends, innovations, and challenges shaping the domain name aftermarket in 2024-2025?",
            duration: "3 sources",
            isAnswered: false
          },
          {
            question: "How are AI-driven quality scoring tools affecting the competitive landscape of the domain aftermarket, and what strategies are leading companies employing to enhance liquidity and capitalize on these tools? Include recent sources with hyperlinks.",
            duration: "5 sources",
            isAnswered: false
          },
          {
            question: "What are the emerging trends and technological advancements impacting the AI-powered domain marketplace in 2025 and beyond?",
            duration: "1 source",
            isAnswered: false
          },
          {
            question: "What are the projected growth rates and potential market disruptions in the domain name aftermarket for 2025-2027?",
            duration: "2 sources",
            isAnswered: false
          }
        ]
      });
      setLoading(false);
    }, 1000);
  }, [params]);

  const toggleSection = (sectionId: string) => {
    const newExpanded = new Set(expandedSections);
    if (newExpanded.has(sectionId)) {
      newExpanded.delete(sectionId);
    } else {
      newExpanded.add(sectionId);
    }
    setExpandedSections(newExpanded);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="text-lg text-muted-foreground">Loading your research report...</p>
        </div>
      </div>
    );
  }

  if (!reportData) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center space-y-4">
          <FileText className="h-16 w-16 text-muted-foreground mx-auto" />
          <h1 className="text-2xl font-bold">Report Not Found</h1>
          <p className="text-muted-foreground">The requested report could not be loaded.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/5 to-background">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Report Header */}
        <Card className="mb-8 border-2 border-primary/20 shadow-lg">
          <CardHeader className="pb-4">
            <div className="flex items-start justify-between">
              <div className="space-y-2">
                <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20">
                  <FileText className="w-4 h-4 mr-2" />
                  Research Report
                </Badge>
                <CardTitle className="text-3xl font-bold text-foreground">
                  {reportData.title}
                </CardTitle>
                <div className="flex items-center space-x-6 text-sm text-muted-foreground">
                  <div className="flex items-center space-x-2">
                    <Clock className="w-4 h-4" />
                    <span>{reportData.duration}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Database className="w-4 h-4" />
                    <span>{reportData.sourceCount} sources</span>
                  </div>
                </div>
              </div>
              <div className="flex space-x-2">
                <Button variant="outline" size="sm" data-testid="button-download-report">
                  <Download className="w-4 h-4 mr-2" />
                  Download PDF
                </Button>
                <Button variant="outline" size="sm" data-testid="button-share-report">
                  <Share2 className="w-4 h-4 mr-2" />
                  Share
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-lg text-muted-foreground leading-relaxed">
              {reportData.answers}
            </p>
          </CardContent>
        </Card>

        {/* Report Sections */}
        <div className="space-y-6">
          {reportData.sections.map((section) => (
            <Card key={section.id} className="border border-muted shadow-sm">
              <CardHeader 
                className="cursor-pointer hover:bg-muted/50 transition-colors"
                onClick={() => toggleSection(section.id)}
              >
                <div className="flex items-center justify-between">
                  <CardTitle className="text-xl font-semibold flex items-center">
                    {section.id === 'target-customers' && <Users className="w-5 h-5 mr-3 text-primary" />}
                    {section.id === 'market-trends' && <TrendingUp className="w-5 h-5 mr-3 text-primary" />}
                    {section.id === 'regulatory-impact' && <Shield className="w-5 h-5 mr-3 text-primary" />}
                    {section.id === 'strategic-implications' && <Target className="w-5 h-5 mr-3 text-primary" />}
                    {section.id === 'ai-marketplace-mindmap' && <Globe className="w-5 h-5 mr-3 text-primary" />}
                    {section.id === 'profitability-forecast' && <BarChart3 className="w-5 h-5 mr-3 text-primary" />}
                    {section.id === 'technical-feasibility' && <Zap className="w-5 h-5 mr-3 text-primary" />}
                    {section.id === 'risk-analysis' && <Shield className="w-5 h-5 mr-3 text-primary" />}
                    {section.id === 'final-recommendations' && <Lightbulb className="w-5 h-5 mr-3 text-primary" />}
                    {section.title}
                  </CardTitle>
                  {expandedSections.has(section.id) ? 
                    <ChevronUp className="w-5 h-5 text-muted-foreground" /> : 
                    <ChevronDown className="w-5 h-5 text-muted-foreground" />
                  }
                </div>
              </CardHeader>
              
              {expandedSections.has(section.id) && (
                <CardContent className="space-y-6">
                  <div className="prose prose-sm max-w-none dark:prose-invert">
                    {section.content.split('\n\n').map((paragraph, index) => (
                      <p key={index} className="text-muted-foreground leading-relaxed mb-4">
                        {paragraph.split('\n').map((line, lineIndex) => (
                          <span key={lineIndex}>
                            {line}
                            {lineIndex < paragraph.split('\n').length - 1 && <br />}
                          </span>
                        ))}
                      </p>
                    ))}
                  </div>
                  
                  {/* Subsections */}
                  {section.subsections?.map((subsection, subsectionIndex) => (
                    <div key={subsectionIndex} className="space-y-3">
                      <h4 className="font-semibold text-lg text-foreground">{subsection.title}</h4>
                      <div className="prose prose-sm max-w-none dark:prose-invert">
                        {subsection.content.split('\n\n').map((paragraph, paragraphIndex) => (
                          <p key={paragraphIndex} className="text-muted-foreground leading-relaxed mb-4">
                            {paragraph.split('\n').map((line, lineIndex) => (
                              <span key={lineIndex}>
                                {line}
                                {lineIndex < paragraph.split('\n').length - 1 && <br />}
                              </span>
                            ))}
                          </p>
                        ))}
                      </div>
                    </div>
                  ))}
                  
                  {/* Tables */}
                  {section.tables?.map((table, tableIndex) => (
                    <div key={tableIndex} className="space-y-3">
                      <h4 className="font-semibold text-lg text-foreground">{table.title}</h4>
                      <div className="overflow-x-auto">
                        <table className="w-full border border-muted rounded-lg overflow-hidden">
                          <thead className="bg-muted/50">
                            <tr>
                              {table.headers.map((header, headerIndex) => (
                                <th key={headerIndex} className="px-4 py-3 text-left font-semibold text-sm text-foreground">
                                  {header}
                                </th>
                              ))}
                            </tr>
                          </thead>
                          <tbody>
                            {table.rows.map((row, rowIndex) => (
                              <tr key={rowIndex} className="border-t border-muted hover:bg-muted/20">
                                {row.map((cell, cellIndex) => (
                                  <td key={cellIndex} className="px-4 py-3 text-sm leading-relaxed align-top">
                                    {cell.split('\n').map((line, lineIndex) => (
                                      <div key={lineIndex} className={lineIndex > 0 ? 'mt-2' : ''}>
                                        {line.startsWith('•') ? (
                                          <div className="flex items-start space-x-2">
                                            <span className="text-primary mt-1">•</span>
                                            <span>{line.substring(1).trim()}</span>
                                          </div>
                                        ) : (
                                          line
                                        )}
                                      </div>
                                    ))}
                                  </td>
                                ))}
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  ))}

                  {/* Mindmap */}
                  {section.mindmap && (
                    <div className="space-y-4">
                      <h4 className="font-semibold text-lg text-center text-foreground">{section.mindmap.centralTopic}</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {section.mindmap.branches.map((branch, branchIndex) => (
                          <Card key={branchIndex} className="border border-primary/20">
                            <CardHeader className="pb-2">
                              <CardTitle className="text-sm font-semibold text-primary">{branch.title}</CardTitle>
                            </CardHeader>
                            <CardContent>
                              <ul className="space-y-1">
                                {branch.items.map((item, itemIndex) => (
                                  <li key={itemIndex} className="text-sm text-muted-foreground flex items-start">
                                    <span className="text-primary mr-2">•</span>
                                    {item}
                                  </li>
                                ))}
                              </ul>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </div>
                  )}
                </CardContent>
              )}
            </Card>
          ))}
        </div>

        {/* Key Industry Sources */}
        <Card className="mt-8 border border-muted shadow-sm">
          <CardHeader>
            <CardTitle className="text-xl font-semibold flex items-center">
              <Database className="w-5 h-5 mr-3 text-primary" />
              Key Industry Sources
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {reportData.sources.map((source, index) => (
                <div key={index} className="flex items-start space-x-3 p-3 rounded-lg border border-muted/50 hover:border-primary/50 transition-colors">
                  <ExternalLink className="w-4 h-4 text-primary mt-1 flex-shrink-0" />
                  <div>
                    <h5 className="font-medium text-sm text-foreground">{source.title}</h5>
                    {source.description && (
                      <p className="text-xs text-muted-foreground mt-1">{source.description}</p>
                    )}
                    <a 
                      href={source.url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-xs text-primary hover:underline mt-1 inline-block"
                      data-testid={`link-source-${index}`}
                    >
                      View Source
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Additional Questions */}
        <Card className="mt-8 border border-muted shadow-sm">
          <CardHeader>
            <CardTitle className="text-xl font-semibold flex items-center">
              <Lightbulb className="w-5 h-5 mr-3 text-primary" />
              Additional Research Questions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {reportData.qaQuestions.map((question, index) => (
                <div key={index} className="p-4 rounded-lg border border-muted/50 hover:border-primary/50 transition-colors">
                  <p className="text-sm font-medium text-foreground mb-2">{question.question}</p>
                  <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                    {question.duration && (
                      <span className="flex items-center space-x-1">
                        <Clock className="w-3 h-3" />
                        <span>{question.duration}</span>
                      </span>
                    )}
                    {question.sourceCount && (
                      <span className="flex items-center space-x-1">
                        <Database className="w-3 h-3" />
                        <span>{question.sourceCount} sources</span>
                      </span>
                    )}
                    <Badge variant={question.isAnswered ? "default" : "secondary"} className="text-xs">
                      {question.isAnswered ? "Answered" : "Available"}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}