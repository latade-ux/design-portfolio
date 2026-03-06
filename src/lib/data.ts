/** Centralised content data for the portfolio */

import type { Project } from "./types";

export const projects: Project[] = [
  {
    slug: "permutive",
    title: "AI-Driven Cohort Recommendation Engine",
    company: "Permutive",
    summary:
      "Designed an AI-driven workflow that surfaces high-performing audience segments using predictive signals to support campaign planning across enterprise publisher accounts.",
    outcomes: [
      "Increased recommended segment adoption by 25%",
      "Reduced audience planning decision time by 35%",
    ],
    tags: ["Generative AI", "Enterprise", "Data Viz", "AdTech"],
    color: "from-indigo-500/20 to-purple-500/20",
    image: "/projects/permutive-image.png",
    caseStudy: {
      overview: {
        role: "Product Designer",
        timelineLabel: "Date",
        timeline: "Nov 2025",
        team: "1 PM, 3 Engineers, 1 Data Scientist, 1 Designer",
        tools: ["Figma", "Jira", "Notion", "Excalidraw"],
      },
      challenge: {
        heading: "Advertisers were drowning in data, not insights",
        body: [
          "Permutive's enterprise publishers manage vast inventories of audience data — billions of event-level signals processed monthly. Advertisers using the platform needed to identify high-performing audience cohorts for campaign targeting, but the existing workflow was manual, time-consuming, and relied heavily on tribal knowledge.",
          "The cohort creation process required users to sift through hundreds of audience attributes with little guidance on which combinations would yield the strongest campaign performance. This led to slow decision-making, underutilised inventory, and frequent reliance on customer success teams for recommendations.",
          "The challenge was to design an AI-driven recommendation experience that could surface high-performing segments proactively — translating complex predictive signals into clear, actionable suggestions that advertisers could trust and act on confidently.",
        ],
      },
      contentSections: [
        {
          label: "Overview",
          heading: "Elevating the dashboard experience",
          items: [
            "My role was to reimagine the customer dashboard experience, making it more value-driven and less data-heavy at first glance.",
            "Integrate AI features that automated campaign planning and activation.",
            "This initiative redefined the entry experience for customers by surfacing high-value metrics and intelligent recommendations.",
          ],
        },
        {
          label: "Problem Statement",
          heading: "Why redesign the landing page?",
          items: [
            "Prior to the redesign, customers landed on the Audience Events Page, which only displayed raw event collection data.",
            "No immediate visibility into revenue or campaign impact.",
            "As a result, customers struggled to quickly grasp business impact and often faced friction in activating new campaigns.",
          ],
        },
        {
          label: "Core Problems",
          heading: "Where users struggled",
          items: [
            "No central overview: Users lacked a single source of truth for campaign KPIs.",
            "Time-to-value delays: New users often took 2–3 weeks to understand how event data tied to revenue outcomes.",
            "Low engagement: Dashboard activity was largely stagnant, with <15% of new users engaging beyond the event data within the first session.",
            "Campaign inefficiencies: Without predictive support, 1 in 3 campaigns required manual iteration to meet reach goals.",
          ],
        },
        {
          label: "Project Goals",
          heading: "What we set out to achieve",
          items: [
            "Provide a value-driven dashboard that surfaced critical revenue and campaign metrics upfront.",
            "Introduce AI-assisted workflows that reduce friction in campaign activation.",
            "Reduce onboarding friction by improving time-to-value.",
            "Ensure scalability for enterprise clients.",
          ],
        },
      ],
      hideApproach: true,
      approach: [
        {
          heading: "Discovery & Signal Mapping",
          body: [
            "I began by conducting stakeholder interviews with product managers, data scientists, and customer success leads to understand the existing cohort creation workflow and identify pain points. I also reviewed session recordings and support tickets to map where users struggled most.",
            "A key insight emerged: advertisers trusted recommendations only when they understood the 'why' behind them. This framed the design direction — the AI layer needed to be explainable, not just accurate.",
          ],
        },
        {
          heading: "Concept Exploration & AI Explainability",
          body: [
            "I explored multiple design directions for surfacing AI recommendations — from inline suggestions within the existing builder to a dedicated recommendation dashboard. Through rapid concept testing with internal stakeholders and select enterprise clients, the team aligned on an integrated approach that embedded recommendations contextually within the cohort planning workflow.",
            "A critical design decision was making predictive confidence scores and supporting rationale visible alongside each recommendation, giving advertisers the transparency they needed to make informed decisions.",
          ],
        },
        {
          heading: "Iterative Prototyping & Validation",
          body: [
            "I created high-fidelity interactive prototypes and conducted usability testing sessions with enterprise advertising teams. Each round of testing refined the information hierarchy, the recommendation card design, and the interaction patterns for accepting, modifying, or dismissing suggestions.",
            "Close collaboration with the data science team ensured the UI accurately represented model outputs, while engineering partnership validated feasibility of real-time recommendation rendering at scale.",
          ],
        },
      ],
      approachImages: [
        "/projects/permutive-design process.png",
        "/projects/permutive-collaboration.png",
        "/projects/permutive-interviews.png",
        "/projects/permutive-strategy.png",
        "/projects/permutive-survey.png",
      ],
      gallery: [
        { image: "/projects/permutive-ai-suggestions.png", title: "Dashboard - AI Prompt Suggestions" },
        { image: "/projects/permutive-filled-prompt.png", title: "Dashboard - Filled Prompt" },
        { image: "/projects/permutive-cohort-recommendations.png", title: "Dashboard - Cohort Recommendations" },
        { image: "/projects/permutive-audience-size.png", title: "Dashboard - Total Estimated Audience Size" },
      ],
      beforeAfter: {
        before: {
          image: "/projects/permutive-before.png",
          label: "Old Landing Page",
          points: [
            "No immediate metric visibility",
            "Lack of strategic insight",
            "Struggle to grasp business impact",
          ],
        },
        after: {
          image: "/projects/permutive-after.png",
          label: "New Landing Page",
          points: [
            "Value-driven metrics",
            "Smarter campaign activation via AI-driven module",
            "Predictive suggestions",
            "Rationale for transparency",
          ],
        },
      },
      video: "/projects/permutive-prototype.mp4",
      validation: {
        label: "Validation",
        heading: "Iterative prototyping",
        body: [
          "I created high-fidelity interactive prototypes and conducted usability testing sessions. Each round of testing refined the information hierarchy, the recommendation card design, and the interaction patterns for accepting, modifying, or dismissing suggestions.",
          "Close collaboration with the data science team ensured the UI accurately represented model outputs, while engineering partnership validated feasibility of real-time recommendation rendering at scale.",
        ],
      },
      learnings: {
        label: "User Testing Learnings",
        heading: "What we learned from users",
        items: [
          "Users valued seeing revenue impact metrics first. Validated in dashboard hierarchy.",
          "Trust in AI was initially a barrier. This was solved by adding confidence scores and rationale.",
          "Users praised \"one-click cohort recommendations\", highlighting reduced workflow time.",
        ],
      },
      outcomesLabel: "Business Impact",
      outcomesHeading: "Driving Engagement & Revenue",
      outcomes: [
        {
          metric: "32.3%",
          badge: "+18%",
          description: "Increase in dashboard engagements. Measured by active session logs",
        },
        {
          metric: "+24%",
          description: "Uplift in campaign activation rates via the AI-driven cohort recommendation module",
        },
        {
          metric: "-28%",
          description: "Reduction in time-to-value for new customers (from onboarding to campaign activation)",
        },
      ],
      feedback: {
        quote: "The new dashboard gives me a clear picture of performance right when I log in, and the cohort recommendations save us hours in planning campaigns.",
        name: "Permutive Customer",
      },
    },
  },
  {
    slug: "mainstreet",
    title: "Unified Tax Credit Eligibility Workflow",
    company: "MainStreet",
    summary:
      "Designed a generative AI assistant embedded within complex tax credit workflows, simplifying regulatory-heavy processes for small business owners.",
    outcomes: [
      "Improved multi-step workflow completion rates by 22%",
      "Reduced repetitive support queries by 40%",
    ],
    tags: ["FinTech", "Enterprise", "SaaS", "UX Strategy"],
    color: "from-blue-500/20 to-cyan-500/20",
    image: "/projects/mainstreet-image.png",
    caseStudy: {
      overview: {
        role: "Senior Product Designer",
        timeline: "4 months (2023)",
        team: "1 PM, 3 Engineers, 1 Designer",
        tools: ["Figma", "Linear", "Notion", "FullStory"],
      },
      heroImage: "/projects/mst-hero-section.png",
      challenge: {
        heading: "Complex tax regulations were overwhelming small business owners",
        body: [
          "MainStreet helps small businesses claim tax credits they're eligible for — but the eligibility assessment process was dense, multi-step, and loaded with regulatory jargon. Business owners frequently abandoned the workflow midway or submitted incomplete information, generating a high volume of support tickets.",
          "The existing flow treated all tax credits as separate linear paths, forcing users to restart assessments for each credit type. There was no contextual guidance, and users had no way to gauge their progress or understand why specific questions were being asked.",
          "The goal was to unify the assessment experience, embed intelligent guidance directly into the workflow, and reduce the cognitive load of navigating complex financial regulations — all while maintaining compliance accuracy.",
        ],
      },
      approach: [
        {
          heading: "Workflow Audit & User Research",
          body: [
            "I started with a comprehensive audit of the existing assessment flows, mapping every decision point, branch, and drop-off. FullStory session analysis revealed that users were losing context between steps and struggling with financial terminology.",
            "Interviews with customer success and tax advisory teams surfaced patterns: most support queries were about the same 8-10 questions. This pointed to a clear opportunity for proactive, in-context guidance.",
          ],
        },
        {
          heading: "Unified Flow Architecture",
          body: [
            "Rather than separate linear flows, I designed a unified assessment architecture that dynamically adapted based on the user's company profile and prior responses. Shared data points were collected once and applied across multiple credit types, eliminating redundancy.",
            "I introduced a persistent progress indicator and contextual help tooltips that translated regulatory language into plain-English explanations, significantly reducing the need for external support.",
          ],
        },
        {
          heading: "AI Assistant Integration",
          body: [
            "Working closely with engineering, I designed an embedded generative AI assistant that could answer eligibility questions in real time, drawing from MainStreet's knowledge base. The assistant appeared contextually — not as a separate chatbot, but as inline guidance that felt native to the workflow.",
            "Through iterative testing, we refined the assistant's trigger points, response formatting, and escalation paths to human advisors, ensuring it augmented rather than replaced the expert guidance users valued.",
          ],
        },
      ],
      hideApproach: true,
      approachImages: [
        "/projects/mst-overview1.png",
        "/projects/mst-survey2.png",
        "/projects/mst-persona3.png",
        "/projects/mst-flow4.png",
        "/projects/mst-lofi5.png",
        "/projects/mst-hifi6.png",
        "/projects/mst-dashboard8.png",
        "/projects/mst-assessment9.png",
        "/projects/mst-review10.png",
        "/projects/mst-responsive11.png",
      ],
      video: "/projects/mst-prototype7.mp4",
      videoInsertAfterIndex: 5,
      videoWhiteBg: true,
      outcomesLabel: "Business Impact",
      outcomes: [
        {
          metric: "39.3%",
          description: "Increase in sign up rates",
        },
        {
          metric: "46.47%",
          description: "End-to-end completion rate",
        },
        {
          metric: "61.9%",
          description: "Conversion rate (Payroll connection & Tax Assessment)",
        },
      ],
      feedback: {
        quote:
          "As a customer with payroll and income type credit, I am glad MainStreet finally decided to introduce additional credits and a simpler tax claiming process. With this improvement, I will be able to maximise more savings opportunities for my business.",
        name: "MainStreet Customer",
      },
    },
  },
  {
    slug: "kinfolk",
    title: "Early-Stage MVP & Product Validation Framework",
    company: "Kinfolk Venture Capital",
    summary:
      "Led rapid product discovery and prototype design for early-stage startups, translating business ideas into validated digital experiences.",
    outcomes: [
      "Reduced concept-to-prototype cycle time by 50%",
      "De-risked product assumptions prior to engineering investment",
    ],
    tags: ["B2B Platform", "Design System", "Product Strategy"],
    color: "from-emerald-500/20 to-teal-500/20",
    image: "/projects/kinfolk-image.png",
    caseStudy: {
      overview: {
        role: "Product Designer",
        timeline: "8 months (2021–2022)",
        team: "2 PMs, 4 Engineers, 1 Designer",
        tools: ["Figma", "Notion", "Miro", "Jira"],
      },
      challenge: {
        heading: "Portfolio startups needed to move fast — but couldn't afford to build the wrong thing",
        body: [
          "Kinfolk Venture Capital supports early-stage technology startups across Africa, many of which had strong business hypotheses but lacked the design and product capability to translate ideas into testable digital experiences. Founders were jumping straight to development without validating core assumptions, leading to wasted engineering investment and missed market signals.",
          "The internal tools used by the Kinfolk team — including the user dashboard and administrative systems — were also fragmented and inefficient, creating operational friction that slowed the team's ability to support portfolio companies effectively.",
          "The challenge was twofold: establish a repeatable product validation framework for portfolio startups, and modernise Kinfolk's internal tools to improve operational efficiency and portfolio visibility.",
        ],
      },
      approach: [
        {
          heading: "Validation Framework Design",
          body: [
            "I developed a lightweight product validation framework that portfolio startups could follow — from problem definition through concept testing to prototype handoff. This included structured templates for user interviews, assumption mapping, and design sprint facilitation.",
            "For each startup engagement, I ran rapid discovery sessions to identify the riskiest assumptions, then translated those into focused prototype experiments that could be tested with real users within 1–2 week cycles.",
          ],
        },
        {
          heading: "MVP Prototyping & Testing",
          body: [
            "I designed and prototyped MVP experiences for multiple portfolio companies, focusing on the smallest testable version of each product idea. Prototypes were built in Figma with realistic interactions, enabling founders to conduct user testing sessions and gather signal before committing engineering resources.",
            "Each prototype was accompanied by a brief design rationale document, outlining key decisions, trade-offs, and recommended next steps — giving founders a clear path from validated concept to first build.",
          ],
        },
        {
          heading: "Internal Tools Modernisation",
          body: [
            "In parallel, I redesigned the Kinfolk user dashboard and internal administrative tools. The dashboard redesign focused on improving portfolio visibility and engagement metrics, while the admin overhaul streamlined internal processes around deal tracking and startup support workflows.",
            "Both redesigns were informed by direct observation of team workflows and structured feedback sessions, ensuring the solutions addressed real operational pain points rather than assumed ones.",
          ],
        },
      ],
      approachImages: [
        "/projects/kf-strategy1.png",
        "/projects/kf-persona2.png",
        "/projects/kf-style3.png",
        "/projects/kf-hifi4.png",
        "/projects/kf-diligence5.png",
        "/projects/kf-admin6.png",
      ],
      outcomes: [
        {
          metric: "-50%",
          description: "Reduction in concept-to-prototype cycle time",
        },
        {
          metric: "+19%",
          description: "Month-on-month growth driven by dashboard redesign",
        },
        {
          metric: "-31%",
          description: "Reduction in administrative overhead via internal tools",
        },
        {
          metric: "+17%",
          description: "Increase in task success rates for portfolio companies",
        },
      ],
    },
  },
  {
    slug: "swimo",
    hidden: true,
    title: "Wearable Fitness Tracking Experience",
    company: "Swimo",
    summary:
      "Designed a companion mobile experience for a swim-tracking wearable, translating biometric data into actionable performance insights.",
    outcomes: [
      "Transformed raw swim metrics into clear visual summaries",
      "Designed a streamlined post-session analysis flow",
    ],
    tags: ["Data Viz", "Mobile UX", "HealthTech", "Case Study"],
    color: "from-amber-500/20 to-orange-500/20",
    image: "/projects/swimo-image.png",
    caseStudy: {
      overview: {
        role: "Product Designer",
        timeline: "3 months (2022)",
        team: "1 PM, 2 Engineers, 1 Designer",
        tools: ["Figma", "Principle", "Notion"],
      },
      challenge: {
        heading: "Raw biometric data wasn't helping swimmers improve",
        body: [
          "Swimo is a swim-tracking wearable that captures detailed biometric and performance data during swim sessions — stroke count, lap times, heart rate, distance, and more. However, the raw data output was dense and difficult for casual and competitive swimmers alike to interpret meaningfully.",
          "Existing fitness tracking apps in the market presented data in generic, one-size-fits-all dashboards that didn't account for the unique structure of swim training. Swimmers needed a companion experience that translated their session data into clear, actionable insights they could use to track progress and adjust training.",
          "The challenge was to design a mobile companion app that made complex biometric data feel approachable, highlighted meaningful performance trends, and provided a streamlined post-session review experience tailored to the rhythms of swim training.",
        ],
      },
      approach: [
        {
          heading: "User Research & Data Prioritisation",
          body: [
            "I conducted interviews with both recreational and competitive swimmers to understand which metrics mattered most and how they currently tracked their training. A key finding was that swimmers cared less about raw numbers and more about trends, comparisons, and contextual benchmarks.",
            "This led to a data prioritisation framework that surfaced the most meaningful metrics prominently while keeping granular data accessible for power users who wanted to dive deeper.",
          ],
        },
        {
          heading: "Visual Design & Data Visualisation",
          body: [
            "I designed a visual language for presenting swim data that balanced clarity with density. Session summaries used progressive disclosure — starting with a high-level performance snapshot and allowing users to drill into per-lap breakdowns, stroke analysis, and heart rate zones.",
            "Custom chart components were designed specifically for swim metrics, replacing generic line graphs with swim-aware visualisations that mapped data to pool lengths, rest intervals, and training sets.",
          ],
        },
        {
          heading: "Post-Session Flow & Micro-Interactions",
          body: [
            "The post-session experience was designed as a guided review rather than a data dump. After syncing from the wearable, users were walked through their session highlights, personal records, and suggested focus areas for their next session.",
            "Micro-interactions and animated transitions were carefully designed in Principle to make data exploration feel fluid and engaging, reinforcing the sense of progress that motivates consistent training.",
          ],
        },
      ],
      outcomes: [
        {
          metric: "100%",
          description: "Of raw swim metrics transformed into clear visual summaries",
        },
        {
          metric: "3-tap",
          description: "Maximum depth to access any session metric from the home screen",
        },
        {
          metric: "Custom",
          description: "Swim-aware data visualisations designed specifically for pool training",
        },
        {
          metric: "Guided",
          description: "Post-session review flow replacing generic data dashboards",
        },
      ],
    },
  },
  {
    slug: "crowdyvest",
    title: "Investment & Wealth-Building Platform Redesign",
    company: "Crowdyvest",
    summary:
      "Redesigned key investment flows to improve trust, clarity, and conversion within a digital crowdfunding platform.",
    outcomes: [
      "Reduced drop-off at KYC stage by 25%",
      "Increased investment flow completion",
    ],
    tags: ["Fintech", "Optimization", "Product Strategy"],
    color: "from-rose-500/20 to-pink-500/20",
    image: "/projects/crowdyvest-image.png",
    caseStudy: {
      overview: {
        role: "Creative & UI Designer",
        timelineLabel: "Date",
        timeline: "Nov 2021",
        team: "1 PM, 3 Engineers, 1 Designer",
        tools: ["Figma", "Photoshop", "Adobe Illustrator"],
      },
      heroImage: "/projects/cv1.png",
      challenge: {
        heading: "Users trusted the brand but didn't trust the experience",
        body: [
          "Crowdyvest is a digital investment and crowdfunding platform that enables users to invest in high-yield opportunities. While the platform had strong brand recognition, the investment and onboarding flows suffered from high drop-off rates — particularly during KYC verification and the final investment confirmation steps.",
          "As the Creative & UI Designer, I was in charge of the development of Crowdyvest's mobile and web app, I was also responsible for designing and overseeing the complete overhaul of the platform. This included collaborating with internal and external developers, conducting research, conducting stakeholder interviews, creating user personas and user flows, wire-framing, prototyping, and user testing.",
          "The project's goal was to create an all-in-one financial solution for individuals and businesses to achieve their short or long-term goals while facilitating impactful growth. Through my efforts, my team and I were able to deliver a refined and streamlined platform in record time.",
        ],
      },
      approach: [
        {
          heading: "Conversion Funnel Analysis",
          body: [
            "I mapped the complete investment funnel using Hotjar data and analytics, identifying the specific steps where users abandoned the flow. The KYC verification stage had the highest single-step drop-off, followed by the investment confirmation screen.",
            "I also audited competitor investment platforms to benchmark onboarding patterns and identify best practices for building trust through transparent fee disclosure and clear progress communication.",
          ],
        },
        {
          heading: "Trust-Centred Redesign",
          body: [
            "The redesign centred on three trust principles: transparency, simplicity, and reassurance. I restructured the investment flow to front-load key information — projected returns, fees, and lock-up periods — so users had full context before committing.",
            "The KYC process was broken into smaller, progressive steps with clear explanations of why each piece of information was needed, replacing the previous wall-of-fields approach that overwhelmed users.",
          ],
        },
        {
          heading: "Iterative Testing & Refinement",
          body: [
            "I ran A/B testing on key flow variations, particularly around the investment confirmation screen and KYC step sequencing. Each iteration was measured against conversion rate, time-to-complete, and post-investment satisfaction feedback.",
            "Close collaboration with the compliance team ensured all design changes met regulatory requirements while still delivering a significantly improved user experience.",
          ],
        },
      ],
      gallery: [
        { image: "/projects/cv2.png", title: "Mobile - Home Page + Portfolio" },
        { image: "/projects/cv3.png", title: "Mobile - Create Savings" },
        { image: "/projects/cv4.png", title: "Mobile - Savings Options" },
        { image: "/projects/cv5.png", title: "Mobile - Projects" },
        { image: "/projects/cv7.png", title: "Mobile - Profile + Referral" },
        { image: "/projects/cv8.png", title: "Web - Dashboard" },
        { image: "/projects/cv9.png", title: "Web - Transactions" },
        { image: "/projects/cv10.png", title: "Web - Project Investments" },
      ],
      outcomes: [
        {
          metric: "-25%",
          description: "Reduction in drop-off at the KYC verification stage",
        },
        {
          metric: "↑",
          description: "Increase in overall investment flow completion rate",
        },
        {
          metric: "Clearer",
          description: "Fee and return transparency at every decision point",
        },
        {
          metric: "Faster",
          description: "Time to complete KYC through progressive step design",
        },
      ],
    },
  },
];

/** Visible projects (excludes hidden ones) */
export const visibleProjects = projects.filter((p) => !p.hidden);

/** Helper: find a project by its URL slug */
export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

/** Helper: get the next visible project (wraps around to first) */
export function getNextProject(slug: string): Project {
  const index = visibleProjects.findIndex((p) => p.slug === slug);
  return visibleProjects[(index + 1) % visibleProjects.length];
}

/** Helper: all slugs for static generation */
export function getAllSlugs(): string[] {
  return projects.map((p) => p.slug);
}

export const processSteps = [
  {
    phase: "Discovery",
    description:
      "Stakeholder interviews, user research synthesis, data analysis, and competitive landscape mapping to define the problem space.",
  },
  {
    phase: "Definition",
    description:
      "Aligning on success metrics, constraints, and opportunity areas. Working closely with data teams and PMs to frame the problem.",
  },
  {
    phase: "Exploration",
    description:
      "Rapid ideation, concept testing, and system-level thinking. Designing for AI explainability and trust at every touchpoint.",
  },
  {
    phase: "Validation",
    description:
      "Usability testing, prototype iteration, and cross-functional reviews. Ensuring designs hold up against real-world complexity.",
  },
  {
    phase: "Delivery",
    description:
      "Pixel-perfect handoff, design system documentation, and close partnership with engineering through implementation.",
  },
  {
    phase: "Iteration",
    description:
      "Measuring post-launch impact against success metrics. Identifying opportunities for refinement and next-phase improvements.",
  },
];

export const experiences = [
  {
    role: "Product Designer",
    company: "Permutive",
    period: "Apr. 2024 – Present",
    highlights: [
      "Led end-to-end redesign of the core publisher dashboard, consolidating fragmented campaign reporting into a unified experience, reducing time-to-insight and increasing campaign activation efficiency by 20% across key publisher accounts.",
      "Designed an AI-powered cohort recommendation system leveraging predictive audience signals, increasing recommended segment adoption by 25%.",
      "Scaled the enterprise design system by introducing tokenized components and standardized data visualization patterns, significantly reducing UI inconsistencies.",
      "Partnered with product, engineering, and data science to design high-performance, data visualization-heavy workflows processing billions of event-level signals monthly, decreasing support-related UX queries by 15% post-launch.",
    ],
  },
  {
    role: "Senior Product Designer",
    company: "MainStreet",
    period: "Jan. 2023 – Apr. 2024",
    highlights: [
      "Designed a generative AI-powered customer support assistant embedded within core workflows, reducing repetitive support queries and improving response efficiency by ~40%.",
      "Led the redesign of the unified assessment flow by streamlining the UX for claiming multiple tax credits, resulting in a 10% increase in end-to-end assessment conversion.",
      "Simplified the onboarding process to reduce time taken to create an account, resulting in a 10.37% increase in customer sign up conversion.",
    ],
  },
  {
    role: "Senior Product Designer",
    company: "Shuttlers",
    period: "Mar. 2022 – Oct. 2022",
    highlights: [
      "Oversaw the complete overhaul of the customer and driver-facing mobile applications, resulting in a 17% increase in bookings from outside usual service coverage areas.",
      "Redesigned key commuter booking and seat reservation flows, improving task clarity and reducing drop-off during peak booking periods.",
      "Bridged the gap between design and development through consistent communication with developers, resulting in a significant decrease in design-related development issues and a smoother handover process.",
      "Optimized driver and admin operational dashboards to improve fleet visibility and route coordination efficiency.",
    ],
  },
  {
    role: "Product Designer",
    company: "Kinfolk Venture Capital",
    period: "Feb. 2021 – Mar. 2022",
    highlights: [
      "Redesigned and prototyped the Kinfolk User Dashboard, which helped drive a Month-on-Month growth of 19%.",
      "Designed digital product concepts and MVP experiences for early-stage portfolio startups, helping founders translate business ideas into testable product prototypes.",
      "Collaborated with engineers to develop and implement an administrative dashboard, streamlining internal processes and reducing administrative overhead by 31%.",
      "Advocated for user-centric design practices, contributing to a decrease in user churn and a 17% increase in task success rates for portfolio companies.",
    ],
  },
];

export const testimonials = [
  {
    quote:
      "I had the pleasure of working closely with Latade on several projects where his versatility and adaptability truly shone. Latade impressed me with his ability to quickly grasp the nuances of a new industry, bringing fresh perspectives and insights to the table. Throughout our time together, Latade played a pivotal role in refining our project's vision. His eye for detail, proactive approach to problem-solving, and ability to provide the \"why\" for his recommendations were instrumental in guiding our projects toward success.\n\nI particularly appreciated Latade's willingness to offer suggestions and constructive feedback. His input consistently led to improvements in our product, demonstrating a genuine commitment to achieving excellence. Even when our visions didn't perfectly align initially, Latade remained receptive to feedback, adapting his approach and iterating on designs until we reached a consensus. He was also willing to constructively challenge my ideas, which is something I very much value since he was not blindly designing what I wanted; Latade very much thinks about the customer experience and wants it to be the best it can be.\n\nLatade is a quick learner, adapting to the unique challenges of our industry and pre-existing design systems to deliver impactful solutions. I highly recommend Latade for his exceptional talent, adaptability, and collaborative spirit. I'm confident he will be a valuable asset to any team with which he works.",
    name: "Anton Djamoos",
    role: "Director of Product Operations @ Noom",
  },
  {
    quote:
      "I highly recommend Latade Igbodipe for his exceptional skills in UI and UX development. I had the pleasure of working with Latade on several projects, including Mande, Crowdyvest, and Microvest. Latade's talent for creating visually appealing and user-friendly interfaces is outstanding. His attention to detail and ability to understand user needs allowed him to design intuitive and engaging experiences. Latade's designs consistently exceeded expectations, incorporating modern trends and best practices in UI and UX.\n\nWorking with Latade was a delight due to his strong collaboration and communication skills. He actively sought feedback, incorporated suggestions, and ensured alignment with project goals. His dedication to delivering high-quality work within project timelines was admirable.\n\nLatade's expertise in UI and UX development, combined with his professionalism and positive attitude, make him an invaluable asset to any team. I wholeheartedly recommend Latade for UI and UX roles.",
    name: "Dansteve Adekanbi",
    role: "Principal Software Engineer @ Coutts",
  },
  {
    quote:
      "I had the pleasure of managing Latade for over two years, during which he consistently demonstrated exceptional talent as a digital product designer. His ability to transform complex user requirements into intuitive, elegant design solutions was remarkable.\n\nLatade's keen eye for detail and user-centric approach resulted in significant improvements to our product usability. He was not only technically proficient but also a collaborative team player who elevated the quality of our design output. I highly recommend Latade to any organization seeking a skilled and dedicated UI/UX professional.",
    name: "Adeyemi Adedapo",
    role: "Product Manager and Startup Success Partner @ OnAfrica Angels",
  },
];

export const marqueeItems = [
  "AI Workflows",
  "Enterprise SaaS",
  "Data Visualization",
  "Design Systems",
  "Generative AI",
  "B2B Platforms",
  "Product Strategy",
  "UX Research",
  "Cross-functional Leadership",
];
