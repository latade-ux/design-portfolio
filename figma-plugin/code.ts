/// <reference path="../node_modules/@figma/plugin-typings/index.d.ts" />
// =============================================================================
// Latade — Portfolio Design Generator (Figma Plugin)
// =============================================================================
// Generates a complete high-fidelity dark-themed portfolio design on the
// current Figma page. Run as a Figma plugin (compile to code.js first).
// =============================================================================

// ---------------------------------------------------------------------------
// 1. DESIGN TOKENS
// ---------------------------------------------------------------------------
function hex(h: string): RGB {
  const r = parseInt(h.slice(1, 3), 16) / 255;
  const g = parseInt(h.slice(3, 5), 16) / 255;
  const b = parseInt(h.slice(5, 7), 16) / 255;
  return { r, g, b };
}

const T = {
  bg:            hex("#09090B"),
  surface:       hex("#111113"),
  card:          hex("#0F0F12"),
  cardBorder:    hex("#1E1E23"),
  border:        hex("#27272A"),
  fg:            hex("#FAFAFA"),
  muted:         hex("#A1A1AA"),
  mutedFg:       hex("#71717A"),
  accent:        hex("#6366F1"),
  accentLight:   hex("#818CF8"),
  gradStart:     hex("#6366F1"),
  gradEnd:       hex("#A855F7"),
  green:         hex("#10B981"),
  white:         hex("#FFFFFF"),
  black:         hex("#000000"),
  transparent:   hex("#000000"), // placeholder, used with opacity tricks
};

// Gradient helpers
const GRAD_INDIGO_PURPLE: GradientPaint = {
  type: "GRADIENT_LINEAR",
  gradientStops: [
    { color: { ...hex("#6366F1"), a: 1 }, position: 0 },
    { color: { ...hex("#A855F7"), a: 1 }, position: 1 },
  ],
  gradientTransform: [[1, 0, 0], [0, 1, 0]],
};

const GRAD_BLUE_CYAN: GradientPaint = {
  type: "GRADIENT_LINEAR",
  gradientStops: [
    { color: { ...hex("#3B82F6"), a: 1 }, position: 0 },
    { color: { ...hex("#06B6D4"), a: 1 }, position: 1 },
  ],
  gradientTransform: [[1, 0, 0], [0, 1, 0]],
};

const GRAD_EMERALD_TEAL: GradientPaint = {
  type: "GRADIENT_LINEAR",
  gradientStops: [
    { color: { ...hex("#10B981"), a: 1 }, position: 0 },
    { color: { ...hex("#14B8A6"), a: 1 }, position: 1 },
  ],
  gradientTransform: [[1, 0, 0], [0, 1, 0]],
};

const GRAD_AMBER_ORANGE: GradientPaint = {
  type: "GRADIENT_LINEAR",
  gradientStops: [
    { color: { ...hex("#F59E0B"), a: 1 }, position: 0 },
    { color: { ...hex("#F97316"), a: 1 }, position: 1 },
  ],
  gradientTransform: [[1, 0, 0], [0, 1, 0]],
};

const GRAD_ROSE_PINK: GradientPaint = {
  type: "GRADIENT_LINEAR",
  gradientStops: [
    { color: { ...hex("#F43F5E"), a: 1 }, position: 0 },
    { color: { ...hex("#EC4899"), a: 1 }, position: 1 },
  ],
  gradientTransform: [[1, 0, 0], [0, 1, 0]],
};

// ---------------------------------------------------------------------------
// 2. FONT LOADING
// ---------------------------------------------------------------------------
type InterFontStyle = "Regular" | "Medium" | "Semi Bold" | "Bold";

async function loadFonts(): Promise<void> {
  const styles: InterFontStyle[] = ["Regular", "Medium", "Semi Bold", "Bold"];
  for (const style of styles) {
    await figma.loadFontAsync({ family: "Inter", style });
  }
}

// ---------------------------------------------------------------------------
// 3. UTILITY HELPERS
// ---------------------------------------------------------------------------

/** Solid fill paint */
function solid(c: RGB, opacity: number = 1): SolidPaint[] {
  return [{ type: "SOLID", color: c, opacity }];
}

/** Create a text node with common defaults */
function createText(
  content: string,
  size: number,
  color: RGB,
  style: InterFontStyle = "Regular",
  lineHeight?: number
): TextNode {
  const t = figma.createText();
  t.fontName = { family: "Inter", style };
  t.fontSize = size;
  t.characters = content;
  t.fills = solid(color);
  if (lineHeight) {
    t.lineHeight = { value: lineHeight, unit: "PIXELS" };
  }
  return t;
}

/** Create a rectangle with fill */
function createRect(
  w: number,
  h: number,
  fills: Paint[],
  radius: number = 0
): RectangleNode {
  const r = figma.createRectangle();
  r.resize(w, h);
  r.fills = fills;
  if (radius > 0) r.cornerRadius = radius;
  return r;
}

/** Create an auto-layout frame */
function autoFrame(
  name: string,
  direction: "VERTICAL" | "HORIZONTAL",
  width?: number,
  height?: number
): FrameNode {
  const f = figma.createFrame();
  f.name = name;
  f.layoutMode = direction;
  f.fills = [];
  f.clipsContent = false;
  if (width) f.resize(width, f.height);
  if (height) f.resize(f.width, height);
  return f;
}

/** Wrapper: full-width section frame at 1440 wide */
function sectionFrame(name: string, height: number, bgColor?: RGB, bgOpacity?: number): FrameNode {
  const f = figma.createFrame();
  f.name = name;
  f.layoutMode = "VERTICAL";
  f.resize(1440, height);
  f.primaryAxisAlignItems = "CENTER";
  f.counterAxisAlignItems = "CENTER";
  f.clipsContent = true;
  if (bgColor) {
    f.fills = solid(bgColor, bgOpacity ?? 1);
  } else {
    f.fills = [];
  }
  return f;
}

/** Inner container at 1200px max-width */
function container(name: string): FrameNode {
  const f = figma.createFrame();
  f.name = name;
  f.layoutMode = "VERTICAL";
  f.resize(1200, 1);
  f.primaryAxisSizingMode = "AUTO";
  f.counterAxisSizingMode = "FIXED";
  f.fills = [];
  f.clipsContent = false;
  return f;
}

/** Section header block (label + title + optional description) */
function sectionHeader(
  label: string,
  title: string,
  description?: string
): FrameNode {
  const f = autoFrame("Section Header", "VERTICAL");
  f.itemSpacing = 16;
  f.counterAxisSizingMode = "AUTO";
  f.primaryAxisSizingMode = "AUTO";

  const lbl = createText(label, 12, T.accentLight, "Medium");
  lbl.letterSpacing = { value: 4, unit: "PIXELS" };
  f.appendChild(lbl);

  const ttl = createText(title, 36, T.fg, "Bold");
  ttl.lineHeight = { value: 44, unit: "PIXELS" };
  f.appendChild(ttl);

  if (description) {
    const desc = createText(description, 16, T.muted, "Regular", 26);
    desc.resize(700, desc.height);
    desc.textAutoResize = "HEIGHT";
    f.appendChild(desc);
  }

  return f;
}

/** Create a card frame with dark bg and border */
function cardFrame(name: string, w: number): FrameNode {
  const f = figma.createFrame();
  f.name = name;
  f.layoutMode = "VERTICAL";
  f.resize(w, 1);
  f.primaryAxisSizingMode = "AUTO";
  f.counterAxisSizingMode = "FIXED";
  f.fills = solid(T.card);
  f.strokes = [{ type: "SOLID", color: T.cardBorder }];
  f.strokeWeight = 1;
  f.cornerRadius = 12;
  f.clipsContent = true;
  return f;
}

/** A pill/tag component */
function pill(text: string, fg: RGB = T.mutedFg, bg: RGB = T.surface, border?: RGB): FrameNode {
  const f = autoFrame("Pill", "HORIZONTAL");
  f.paddingLeft = 12;
  f.paddingRight = 12;
  f.paddingTop = 4;
  f.paddingBottom = 4;
  f.cornerRadius = 6;
  f.fills = solid(bg);
  f.primaryAxisSizingMode = "AUTO";
  f.counterAxisSizingMode = "AUTO";
  f.primaryAxisAlignItems = "CENTER";
  f.counterAxisAlignItems = "CENTER";
  if (border) {
    f.strokes = [{ type: "SOLID", color: border }];
    f.strokeWeight = 1;
  }
  const t = createText(text, 12, fg, "Medium");
  f.appendChild(t);
  return f;
}

/** Horizontal divider */
function divider(width: number): RectangleNode {
  return createRect(width, 1, solid(T.border));
}

// ---------------------------------------------------------------------------
// 4. SECTION BUILDERS
// ---------------------------------------------------------------------------

// === NAVBAR ===
function buildNavbar(): FrameNode {
  const nav = sectionFrame("Navbar", 64);
  nav.layoutMode = "VERTICAL";
  nav.primaryAxisAlignItems = "CENTER";
  nav.counterAxisAlignItems = "CENTER";

  const inner = autoFrame("Navbar Inner", "HORIZONTAL");
  inner.resize(1200, 64);
  inner.counterAxisSizingMode = "FIXED";
  inner.primaryAxisSizingMode = "FIXED";
  inner.primaryAxisAlignItems = "SPACE_BETWEEN";
  inner.counterAxisAlignItems = "CENTER";
  inner.paddingLeft = 0;
  inner.paddingRight = 0;

  // Left: logo
  const logoFrame = autoFrame("Logo", "HORIZONTAL");
  logoFrame.primaryAxisSizingMode = "AUTO";
  logoFrame.counterAxisSizingMode = "AUTO";
  logoFrame.counterAxisAlignItems = "CENTER";

  const logoText = createText("Latade", 18, T.fg, "Bold");
  const logoDot = createText(".", 18, T.accent, "Bold");
  logoFrame.appendChild(logoText);
  logoFrame.appendChild(logoDot);
  inner.appendChild(logoFrame);

  // Center: nav links
  const links = autoFrame("Nav Links", "HORIZONTAL");
  links.itemSpacing = 32;
  links.primaryAxisSizingMode = "AUTO";
  links.counterAxisSizingMode = "AUTO";
  links.counterAxisAlignItems = "CENTER";

  const navItems = ["Work", "Process", "Experience", "About", "Contact"];
  for (const item of navItems) {
    const t = createText(item, 14, T.muted, "Regular");
    links.appendChild(t);
  }
  inner.appendChild(links);

  // Right: CTA button
  const cta = autoFrame("CTA Button", "HORIZONTAL");
  cta.paddingLeft = 16;
  cta.paddingRight = 16;
  cta.paddingTop = 8;
  cta.paddingBottom = 8;
  cta.cornerRadius = 8;
  cta.fills = solid(T.accent, 0.1);
  cta.primaryAxisSizingMode = "AUTO";
  cta.counterAxisSizingMode = "AUTO";
  cta.counterAxisAlignItems = "CENTER";
  const ctaText = createText("Get in touch", 14, T.accentLight, "Medium");
  cta.appendChild(ctaText);
  inner.appendChild(cta);

  nav.appendChild(inner);
  return nav;
}

// === HERO SECTION ===
function buildHero(): FrameNode {
  const hero = sectionFrame("Hero Section", 800, T.bg);
  hero.primaryAxisAlignItems = "CENTER";
  hero.counterAxisAlignItems = "CENTER";

  // Grid pattern background (subtle)
  const gridBg = figma.createFrame();
  gridBg.name = "Grid Background";
  gridBg.resize(1440, 800);
  gridBg.fills = [];
  gridBg.layoutPositioning = "ABSOLUTE";
  gridBg.x = 0;
  gridBg.y = 0;
  // draw grid lines
  for (let x = 0; x <= 1440; x += 60) {
    const line = createRect(1, 800, solid(T.border, 0.3));
    line.x = x;
    line.y = 0;
    gridBg.appendChild(line);
  }
  for (let y = 0; y <= 800; y += 60) {
    const line = createRect(1440, 1, solid(T.border, 0.3));
    line.x = 0;
    line.y = y;
    gridBg.appendChild(line);
  }
  hero.appendChild(gridBg);

  // Content wrapper
  const content = autoFrame("Hero Content", "VERTICAL");
  content.itemSpacing = 32;
  content.primaryAxisSizingMode = "AUTO";
  content.counterAxisSizingMode = "AUTO";
  content.counterAxisAlignItems = "CENTER";
  content.primaryAxisAlignItems = "CENTER";

  // Availability badge
  const badge = autoFrame("Availability Badge", "HORIZONTAL");
  badge.itemSpacing = 8;
  badge.paddingLeft = 16;
  badge.paddingRight = 16;
  badge.paddingTop = 8;
  badge.paddingBottom = 8;
  badge.cornerRadius = 100;
  badge.fills = [];
  badge.strokes = [{ type: "SOLID", color: T.border }];
  badge.strokeWeight = 1;
  badge.primaryAxisSizingMode = "AUTO";
  badge.counterAxisSizingMode = "AUTO";
  badge.counterAxisAlignItems = "CENTER";

  // Green dot
  const dot = figma.createEllipse();
  dot.resize(8, 8);
  dot.fills = solid(T.green);
  badge.appendChild(dot);

  const badgeText = createText("Available for new opportunities", 12, T.muted, "Medium");
  badge.appendChild(badgeText);

  content.appendChild(badge);

  // Headline
  const headlineFrame = autoFrame("Headline", "VERTICAL");
  headlineFrame.itemSpacing = 4;
  headlineFrame.primaryAxisSizingMode = "AUTO";
  headlineFrame.counterAxisSizingMode = "AUTO";
  headlineFrame.counterAxisAlignItems = "CENTER";

  const line1 = createText("Designing AI-powered", 64, T.fg, "Bold", 72);
  line1.textAlignHorizontal = "CENTER";
  headlineFrame.appendChild(line1);

  const line2 = createText("systems that turn", 64, T.fg, "Bold", 72);
  line2.textAlignHorizontal = "CENTER";
  headlineFrame.appendChild(line2);

  // Gradient text line (use gradient fill on text)
  const line3 = createText("complexity into clarity", 64, T.fg, "Bold", 72);
  line3.textAlignHorizontal = "CENTER";
  line3.fills = [GRAD_INDIGO_PURPLE];
  headlineFrame.appendChild(line3);

  content.appendChild(headlineFrame);

  // Subparagraph
  const sub = createText(
    "I'm Latade, a Senior Product Designer with 7+ years shaping\nenterprise SaaS, AI workflows, and data-rich platforms. I curate\npurposeful experiences that solve real problems, and feel delightful\nto use every single day.",
    18,
    T.muted,
    "Regular",
    28
  );
  sub.textAlignHorizontal = "CENTER";
  content.appendChild(sub);

  // CTA buttons
  const btns = autoFrame("Hero CTAs", "HORIZONTAL");
  btns.itemSpacing = 16;
  btns.primaryAxisSizingMode = "AUTO";
  btns.counterAxisSizingMode = "AUTO";
  btns.counterAxisAlignItems = "CENTER";

  // View Work button (filled)
  const btn1 = autoFrame("View Work Btn", "HORIZONTAL");
  btn1.paddingLeft = 24;
  btn1.paddingRight = 24;
  btn1.paddingTop = 12;
  btn1.paddingBottom = 12;
  btn1.cornerRadius = 8;
  btn1.fills = solid(T.white);
  btn1.primaryAxisSizingMode = "AUTO";
  btn1.counterAxisSizingMode = "AUTO";
  btn1.counterAxisAlignItems = "CENTER";
  btn1.itemSpacing = 8;
  const btn1Text = createText("View Work", 14, T.black, "Medium");
  const btn1Arrow = createText("\u2193", 14, T.black, "Medium");
  btn1.appendChild(btn1Text);
  btn1.appendChild(btn1Arrow);
  btns.appendChild(btn1);

  // Contact button (outlined)
  const btn2 = autoFrame("Contact Btn", "HORIZONTAL");
  btn2.paddingLeft = 24;
  btn2.paddingRight = 24;
  btn2.paddingTop = 12;
  btn2.paddingBottom = 12;
  btn2.cornerRadius = 8;
  btn2.fills = [];
  btn2.strokes = [{ type: "SOLID", color: T.border }];
  btn2.strokeWeight = 1;
  btn2.primaryAxisSizingMode = "AUTO";
  btn2.counterAxisSizingMode = "AUTO";
  btn2.counterAxisAlignItems = "CENTER";
  const btn2Text = createText("Contact", 14, T.fg, "Medium");
  btn2.appendChild(btn2Text);
  btns.appendChild(btn2);

  content.appendChild(btns);
  hero.appendChild(content);

  return hero;
}

// === MARQUEE SECTION ===
function buildMarquee(): FrameNode {
  const section = sectionFrame("Marquee Section", 80, T.bg);
  section.strokes = [{ type: "SOLID", color: T.border }];
  section.strokeWeight = 1;
  section.primaryAxisAlignItems = "CENTER";
  section.counterAxisAlignItems = "CENTER";

  const inner = autoFrame("Marquee Inner", "HORIZONTAL");
  inner.itemSpacing = 24;
  inner.primaryAxisSizingMode = "AUTO";
  inner.counterAxisSizingMode = "AUTO";
  inner.counterAxisAlignItems = "CENTER";

  const items = [
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

  for (let i = 0; i < items.length; i++) {
    const t = createText(items[i], 20, T.mutedFg, "Medium");
    inner.appendChild(t);
    if (i < items.length - 1) {
      const sep = createText("\u00B7", 20, T.mutedFg, "Medium");
      inner.appendChild(sep);
    }
  }

  section.appendChild(inner);
  return section;
}

// === PROJECTS SECTION ===
function buildProjects(): FrameNode {
  const section = sectionFrame("Projects Section", 10, T.bg);
  section.primaryAxisSizingMode = "AUTO";
  section.paddingTop = 96;
  section.paddingBottom = 96;

  const inner = container("Projects Container");
  inner.itemSpacing = 48;

  // Header
  const header = sectionHeader(
    "SELECTED WORK",
    "Projects that moved metrics",
    "A selection of enterprise-scale design work spanning AI systems, data platforms, and complex workflows."
  );
  inner.appendChild(header);

  // Project data
  const projects = [
    {
      company: "PERMUTIVE",
      title: "AI Cohort Recommendation Engine",
      desc: "Designed an AI-powered recommendation system that helps publishers and advertisers build high-performing audience cohorts from complex behavioral data.",
      outcomes: ["Reduced cohort creation time by 60%", "Increased advertiser activation rate by 35%"],
      tags: ["AI", "Enterprise", "Data Viz", "AdTech"],
      gradient: GRAD_INDIGO_PURPLE,
    },
    {
      company: "PERMUTIVE",
      title: "Enterprise Dashboard Redesign",
      desc: "Reimagined the core analytics dashboard to surface actionable insights faster for enterprise customers managing millions of data points.",
      outcomes: ["Improved time-to-insight by 45%", "Reduced support tickets by 30%"],
      tags: ["Enterprise", "Data Viz", "Design System"],
      gradient: GRAD_BLUE_CYAN,
    },
    {
      company: "MAINSTREET",
      title: "AI Support Assistant",
      desc: "Built a conversational AI assistant that helps small businesses navigate complex tax credit eligibility and filing workflows.",
      outcomes: ["Reduced support time by 40%", "Increased self-service completion by 55%"],
      tags: ["Generative AI", "FinTech", "Conversational UX"],
      gradient: GRAD_EMERALD_TEAL,
    },
    {
      company: "MAINSTREET",
      title: "Tax Credit Eligibility Workflow",
      desc: "Redesigned the multi-step tax credit eligibility flow to reduce friction and guide users through complex financial decisions with clarity.",
      outcomes: ["Improved workflow completion by 38%", "Reduced drop-off rate by 25%"],
      tags: ["FinTech", "Workflow Design", "UX Research"],
      gradient: GRAD_AMBER_ORANGE,
    },
    {
      company: "PERMUTIVE",
      title: "Audience Explorer",
      desc: "Created a powerful discovery tool that enables publishers to explore, compare, and package audience segments for cross-publisher deals.",
      outcomes: ["Enabled 3x more cross-publisher deals", "Improved discovery workflow clarity"],
      tags: ["AI", "B2B Platform", "Product Strategy"],
      gradient: GRAD_ROSE_PINK,
    },
  ];

  // Grid: 3 columns, row-based
  const cardWidth = Math.floor((1200 - 32) / 3); // ~389px with 16px gaps

  const row1 = autoFrame("Projects Row 1", "HORIZONTAL");
  row1.itemSpacing = 16;
  row1.primaryAxisSizingMode = "AUTO";
  row1.counterAxisSizingMode = "AUTO";
  row1.resize(1200, row1.height);
  row1.counterAxisSizingMode = "FIXED";

  const row2 = autoFrame("Projects Row 2", "HORIZONTAL");
  row2.itemSpacing = 16;
  row2.primaryAxisSizingMode = "AUTO";
  row2.counterAxisSizingMode = "AUTO";
  row2.resize(1200, row2.height);
  row2.counterAxisSizingMode = "FIXED";

  for (let i = 0; i < projects.length; i++) {
    const p = projects[i];
    const card = cardFrame(`Project Card - ${p.title}`, cardWidth);

    // Gradient block
    const gradBlock = figma.createFrame();
    gradBlock.name = "Gradient Block";
    gradBlock.resize(cardWidth, 192);
    gradBlock.fills = [p.gradient];
    gradBlock.layoutSizingHorizontal = "FILL";
    card.appendChild(gradBlock);

    // Card content
    const cardContent = autoFrame("Card Content", "VERTICAL");
    cardContent.paddingLeft = 24;
    cardContent.paddingRight = 24;
    cardContent.paddingTop = 20;
    cardContent.paddingBottom = 24;
    cardContent.itemSpacing = 12;
    cardContent.resize(cardWidth, 1);
    cardContent.primaryAxisSizingMode = "AUTO";
    cardContent.counterAxisSizingMode = "FIXED";
    cardContent.layoutSizingHorizontal = "FILL";
    cardContent.fills = [];

    // Company
    const compLabel = createText(p.company, 12, T.accentLight, "Medium");
    compLabel.letterSpacing = { value: 2, unit: "PIXELS" };
    cardContent.appendChild(compLabel);

    // Title
    const titleText = createText(p.title, 18, T.fg, "Bold", 24);
    titleText.resize(cardWidth - 48, titleText.height);
    titleText.textAutoResize = "HEIGHT";
    cardContent.appendChild(titleText);

    // Description
    const descText = createText(p.desc, 14, T.muted, "Regular", 22);
    descText.resize(cardWidth - 48, descText.height);
    descText.textAutoResize = "HEIGHT";
    cardContent.appendChild(descText);

    // Outcomes
    const outcomesFrame = autoFrame("Outcomes", "VERTICAL");
    outcomesFrame.itemSpacing = 6;
    outcomesFrame.primaryAxisSizingMode = "AUTO";
    outcomesFrame.counterAxisSizingMode = "AUTO";
    for (const oc of p.outcomes) {
      const ocRow = autoFrame("Outcome Row", "HORIZONTAL");
      ocRow.itemSpacing = 8;
      ocRow.primaryAxisSizingMode = "AUTO";
      ocRow.counterAxisSizingMode = "AUTO";
      ocRow.counterAxisAlignItems = "MIN";
      const check = createText("\u2713", 14, T.green, "Medium");
      const ocText = createText(oc, 14, T.muted, "Regular");
      ocRow.appendChild(check);
      ocRow.appendChild(ocText);
      outcomesFrame.appendChild(ocRow);
    }
    cardContent.appendChild(outcomesFrame);

    // Tags
    const tagsFrame = autoFrame("Tags", "HORIZONTAL");
    tagsFrame.itemSpacing = 8;
    tagsFrame.primaryAxisSizingMode = "AUTO";
    tagsFrame.counterAxisSizingMode = "AUTO";
    tagsFrame.layoutWrap = "WRAP";
    for (const tag of p.tags) {
      const t = pill(tag, T.mutedFg, T.surface, T.border);
      tagsFrame.appendChild(t);
    }
    cardContent.appendChild(tagsFrame);

    card.appendChild(cardContent);

    if (i < 3) {
      row1.appendChild(card);
    } else {
      row2.appendChild(card);
    }
  }

  const grid = autoFrame("Projects Grid", "VERTICAL");
  grid.itemSpacing = 16;
  grid.primaryAxisSizingMode = "AUTO";
  grid.counterAxisSizingMode = "AUTO";
  grid.appendChild(row1);
  grid.appendChild(row2);

  inner.appendChild(grid);
  section.appendChild(inner);
  return section;
}

// === PROCESS SECTION ===
function buildProcess(): FrameNode {
  const section = sectionFrame("Process Section", 10, T.surface, 0.5);
  section.primaryAxisSizingMode = "AUTO";
  section.paddingTop = 96;
  section.paddingBottom = 96;

  const inner = container("Process Container");
  inner.itemSpacing = 48;

  const header = sectionHeader(
    "HOW I WORK",
    "Design process",
    "A structured yet flexible approach to solving complex design challenges, refined through years of shipping enterprise products."
  );
  inner.appendChild(header);

  const steps = [
    {
      num: "01",
      title: "Discovery",
      desc: "Deep-dive into the problem space through stakeholder interviews, user research, competitive analysis, and data review. I map out the ecosystem before designing a single pixel.",
    },
    {
      num: "02",
      title: "Definition",
      desc: "Synthesize research into clear problem statements, user stories, and success metrics. Align with product and engineering on scope, constraints, and priorities.",
    },
    {
      num: "03",
      title: "Exploration",
      desc: "Rapid ideation through sketches, wireframes, and low-fi prototypes. Explore multiple directions before converging on the strongest concepts.",
    },
    {
      num: "04",
      title: "Validation",
      desc: "Test concepts with real users through usability testing, A/B experiments, and stakeholder reviews. Let evidence guide design decisions.",
    },
    {
      num: "05",
      title: "Delivery",
      desc: "Craft high-fidelity designs with detailed specs, interaction patterns, and edge cases documented. Partner closely with engineers through implementation.",
    },
    {
      num: "06",
      title: "Iteration",
      desc: "Monitor post-launch metrics, gather user feedback, and continuously refine. Great design is never truly finished\u2014it evolves with user needs.",
    },
  ];

  // Timeline
  const timeline = autoFrame("Timeline", "VERTICAL");
  timeline.itemSpacing = 24;
  timeline.resize(1200, 1);
  timeline.primaryAxisSizingMode = "AUTO";
  timeline.counterAxisSizingMode = "FIXED";

  for (let i = 0; i < steps.length; i++) {
    const step = steps[i];
    const isLeft = i % 2 === 0;

    const row = autoFrame(`Step ${step.num}`, "HORIZONTAL");
    row.resize(1200, 1);
    row.primaryAxisSizingMode = "FIXED";
    row.counterAxisSizingMode = "AUTO";
    row.counterAxisAlignItems = "MIN";

    const leftSide = autoFrame("Left Side", "HORIZONTAL");
    leftSide.resize(540, 1);
    leftSide.primaryAxisSizingMode = "FIXED";
    leftSide.counterAxisSizingMode = "AUTO";
    leftSide.primaryAxisAlignItems = "MAX";
    leftSide.fills = [];

    // Center column with number circle
    const centerCol = autoFrame("Center", "VERTICAL");
    centerCol.resize(120, 1);
    centerCol.primaryAxisSizingMode = "AUTO";
    centerCol.counterAxisSizingMode = "FIXED";
    centerCol.counterAxisAlignItems = "CENTER";
    centerCol.fills = [];

    // Number circle
    const circle = figma.createFrame();
    circle.name = "Step Number";
    circle.resize(40, 40);
    circle.cornerRadius = 20;
    circle.fills = [];
    circle.strokes = [{ type: "SOLID", color: T.accent }];
    circle.strokeWeight = 2;
    circle.layoutMode = "VERTICAL";
    circle.primaryAxisAlignItems = "CENTER";
    circle.counterAxisAlignItems = "CENTER";
    const numText = createText(step.num, 12, T.accentLight, "Medium");
    circle.appendChild(numText);
    centerCol.appendChild(circle);

    // Vertical connector line (except last)
    if (i < steps.length - 1) {
      const connector = createRect(2, 80, solid(T.border));
      centerCol.appendChild(connector);
    }

    const rightSide = autoFrame("Right Side", "HORIZONTAL");
    rightSide.resize(540, 1);
    rightSide.primaryAxisSizingMode = "FIXED";
    rightSide.counterAxisSizingMode = "AUTO";
    rightSide.fills = [];

    // Step card
    const card = cardFrame(`${step.title} Card`, 440);
    card.paddingLeft = 24;
    card.paddingRight = 24;
    card.paddingTop = 24;
    card.paddingBottom = 24;
    card.itemSpacing = 12;

    const cardTitle = createText(step.title, 18, T.fg, "Bold");
    card.appendChild(cardTitle);
    const cardDesc = createText(step.desc, 14, T.muted, "Regular", 22);
    cardDesc.resize(392, cardDesc.height);
    cardDesc.textAutoResize = "HEIGHT";
    card.appendChild(cardDesc);

    if (isLeft) {
      leftSide.appendChild(card);
      row.appendChild(leftSide);
      row.appendChild(centerCol);
      row.appendChild(rightSide);
    } else {
      row.appendChild(leftSide);
      row.appendChild(centerCol);
      rightSide.appendChild(card);
      row.appendChild(rightSide);
    }

    timeline.appendChild(row);
  }

  inner.appendChild(timeline);
  section.appendChild(inner);
  return section;
}

// === EXPERIENCE SECTION ===
function buildExperience(): FrameNode {
  const section = sectionFrame("Experience Section", 10, T.bg);
  section.primaryAxisSizingMode = "AUTO";
  section.paddingTop = 96;
  section.paddingBottom = 96;

  const inner = container("Experience Container");
  inner.itemSpacing = 48;

  const header = sectionHeader(
    "EXPERIENCE",
    "Where I've made impact"
  );
  inner.appendChild(header);

  const roles = [
    {
      role: "Product Designer",
      company: "Permutive",
      location: "London, UK",
      period: "2022 \u2013 Present",
      highlights: [
        "Led design for AI-powered cohort recommendation engine, reducing creation time by 60%",
        "Redesigned enterprise analytics dashboard, improving time-to-insight by 45%",
        "Built and maintained comprehensive design system serving 3 product squads",
        "Collaborated cross-functionally with engineering, product, and data science teams",
      ],
    },
    {
      role: "Product Designer",
      company: "MainStreet (via Toptal)",
      location: "Remote",
      period: "2021 \u2013 2022",
      highlights: [
        "Designed AI support assistant reducing support volume by 40%",
        "Optimised tax credit eligibility workflow, improving completion by 38%",
        "Established design foundations and component library for rapid iteration",
      ],
    },
    {
      role: "UI/UX Designer",
      company: "Freelance / Contract",
      location: "Remote",
      period: "2018 \u2013 2021",
      highlights: [
        "Delivered 15+ projects across fintech, health-tech, and e-commerce verticals",
        "Specialised in responsive web applications and design systems",
        "Conducted user research and usability testing for early-stage startups",
      ],
    },
  ];

  const timelineFrame = autoFrame("Experience Timeline", "VERTICAL");
  timelineFrame.itemSpacing = 32;
  timelineFrame.resize(1200, 1);
  timelineFrame.primaryAxisSizingMode = "AUTO";
  timelineFrame.counterAxisSizingMode = "FIXED";

  for (let i = 0; i < roles.length; i++) {
    const role = roles[i];

    const row = autoFrame(`Experience ${i + 1}`, "HORIZONTAL");
    row.itemSpacing = 24;
    row.resize(1200, 1);
    row.primaryAxisSizingMode = "FIXED";
    row.counterAxisSizingMode = "AUTO";
    row.counterAxisAlignItems = "MIN";

    // Timeline dot
    const dotContainer = autoFrame("Dot Container", "VERTICAL");
    dotContainer.resize(40, 1);
    dotContainer.primaryAxisSizingMode = "AUTO";
    dotContainer.counterAxisSizingMode = "FIXED";
    dotContainer.counterAxisAlignItems = "CENTER";
    dotContainer.paddingTop = 16;

    const outerDot = figma.createFrame();
    outerDot.name = "Timeline Dot";
    outerDot.resize(40, 40);
    outerDot.cornerRadius = 20;
    outerDot.fills = solid(T.card);
    outerDot.strokes = [{ type: "SOLID", color: T.cardBorder }];
    outerDot.strokeWeight = 1;
    outerDot.layoutMode = "VERTICAL";
    outerDot.primaryAxisAlignItems = "CENTER";
    outerDot.counterAxisAlignItems = "CENTER";

    const innerDot = figma.createEllipse();
    innerDot.resize(10, 10);
    innerDot.fills = solid(T.accent);
    outerDot.appendChild(innerDot);
    dotContainer.appendChild(outerDot);

    // Connector line
    if (i < roles.length - 1) {
      const line = createRect(2, 100, solid(T.border));
      dotContainer.appendChild(line);
    }

    row.appendChild(dotContainer);

    // Card
    const card = cardFrame(`${role.role} Card`, 1120);
    card.paddingLeft = 32;
    card.paddingRight = 32;
    card.paddingTop = 24;
    card.paddingBottom = 24;
    card.itemSpacing = 16;

    // Top row: role + period
    const topRow = autoFrame("Role Header", "HORIZONTAL");
    topRow.resize(1056, 1);
    topRow.primaryAxisSizingMode = "FIXED";
    topRow.counterAxisSizingMode = "AUTO";
    topRow.primaryAxisAlignItems = "SPACE_BETWEEN";
    topRow.counterAxisAlignItems = "CENTER";

    const roleTitle = createText(role.role, 18, T.fg, "Bold");
    const periodText = createText(role.period, 12, T.mutedFg, "Medium");
    topRow.appendChild(roleTitle);
    topRow.appendChild(periodText);
    card.appendChild(topRow);

    // Company line
    const compLine = autoFrame("Company Line", "HORIZONTAL");
    compLine.itemSpacing = 8;
    compLine.primaryAxisSizingMode = "AUTO";
    compLine.counterAxisSizingMode = "AUTO";
    compLine.counterAxisAlignItems = "CENTER";
    const compName = createText(role.company, 14, T.accentLight, "Medium");
    const compSep = createText("\u00B7", 14, T.mutedFg, "Regular");
    const compLoc = createText(role.location, 14, T.mutedFg, "Regular");
    compLine.appendChild(compName);
    compLine.appendChild(compSep);
    compLine.appendChild(compLoc);
    card.appendChild(compLine);

    // Highlights
    const highlightsFrame = autoFrame("Highlights", "VERTICAL");
    highlightsFrame.itemSpacing = 8;
    highlightsFrame.primaryAxisSizingMode = "AUTO";
    highlightsFrame.counterAxisSizingMode = "AUTO";
    for (const h of role.highlights) {
      const hRow = autoFrame("Highlight", "HORIZONTAL");
      hRow.itemSpacing = 10;
      hRow.primaryAxisSizingMode = "AUTO";
      hRow.counterAxisSizingMode = "AUTO";
      hRow.counterAxisAlignItems = "MIN";
      const dash = createText("\u2013", 14, T.mutedFg, "Regular");
      const hText = createText(h, 14, T.muted, "Regular", 22);
      hRow.appendChild(dash);
      hRow.appendChild(hText);
      highlightsFrame.appendChild(hRow);
    }
    card.appendChild(highlightsFrame);

    row.appendChild(card);
    timelineFrame.appendChild(row);
  }

  inner.appendChild(timelineFrame);
  section.appendChild(inner);
  return section;
}

// === ABOUT SECTION ===
function buildAbout(): FrameNode {
  const section = sectionFrame("About Section", 10, T.surface, 0.5);
  section.primaryAxisSizingMode = "AUTO";
  section.paddingTop = 96;
  section.paddingBottom = 96;

  const inner = container("About Container");
  inner.itemSpacing = 48;

  const header = sectionHeader("ABOUT", "A bit about me");
  inner.appendChild(header);

  // Two columns
  const columns = autoFrame("About Columns", "HORIZONTAL");
  columns.itemSpacing = 48;
  columns.resize(1200, 1);
  columns.primaryAxisSizingMode = "FIXED";
  columns.counterAxisSizingMode = "AUTO";

  // Left column (bio) - 40%
  const leftCol = autoFrame("Bio Column", "VERTICAL");
  leftCol.itemSpacing = 20;
  leftCol.resize(460, 1);
  leftCol.primaryAxisSizingMode = "AUTO";
  leftCol.counterAxisSizingMode = "FIXED";

  const bio1 = createText(
    "I'm a Senior Product Designer based in the United Kingdom, passionate about making complex systems feel intuitive. With over 7 years of experience, I've worked across enterprise SaaS, fintech, and AI-driven platforms.",
    16,
    T.muted,
    "Regular",
    26
  );
  bio1.resize(460, bio1.height);
  bio1.textAutoResize = "HEIGHT";
  leftCol.appendChild(bio1);

  const bio2 = createText(
    "My work sits at the intersection of design, data, and AI. I believe the best products are built when designers deeply understand the technology they're working with and the people they're designing for.",
    16,
    T.muted,
    "Regular",
    26
  );
  bio2.resize(460, bio2.height);
  bio2.textAutoResize = "HEIGHT";
  leftCol.appendChild(bio2);

  const bio3 = createText(
    "When I'm not designing, you'll find me exploring new AI tools, contributing to open-source design resources, or mentoring junior designers making their way into the industry.",
    16,
    T.muted,
    "Regular",
    26
  );
  bio3.resize(460, bio3.height);
  bio3.textAutoResize = "HEIGHT";
  leftCol.appendChild(bio3);

  // Blockquote
  const blockquote = autoFrame("Blockquote", "HORIZONTAL");
  blockquote.itemSpacing = 16;
  blockquote.resize(460, 1);
  blockquote.primaryAxisSizingMode = "AUTO";
  blockquote.counterAxisSizingMode = "FIXED";
  blockquote.paddingLeft = 0;

  const accentBar = createRect(3, 60, solid(T.accent));
  blockquote.appendChild(accentBar);

  const quoteText = createText(
    "AI doesn't replace design thinking \u2014 it raises the bar for what thoughtful design can achieve.",
    16,
    T.muted,
    "Regular",
    26
  );
  quoteText.fontName = { family: "Inter", style: "Regular" };
  quoteText.resize(430, quoteText.height);
  quoteText.textAutoResize = "HEIGHT";
  blockquote.appendChild(quoteText);
  leftCol.appendChild(blockquote);

  columns.appendChild(leftCol);

  // Right column (trait cards) - 60%
  const rightCol = autoFrame("Traits Column", "VERTICAL");
  rightCol.itemSpacing = 16;
  rightCol.resize(692, 1);
  rightCol.primaryAxisSizingMode = "AUTO";
  rightCol.counterAxisSizingMode = "FIXED";

  const traits = [
    {
      title: "Systems Thinker",
      desc: "I see the bigger picture \u2014 mapping flows, dependencies, and edge cases across complex product ecosystems.",
    },
    {
      title: "AI Design Fluency",
      desc: "Deep understanding of AI/ML capabilities and constraints, translating technical complexity into intuitive user experiences.",
    },
    {
      title: "Enterprise Complexity",
      desc: "Comfortable navigating multi-stakeholder environments with legacy systems, regulatory requirements, and scale challenges.",
    },
    {
      title: "Outcome-Driven",
      desc: "Every design decision is tied to measurable business and user outcomes. I track impact, not just output.",
    },
  ];

  const traitCardWidth = Math.floor((692 - 16) / 2); // ~338px

  const traitRow1 = autoFrame("Trait Row 1", "HORIZONTAL");
  traitRow1.itemSpacing = 16;
  traitRow1.primaryAxisSizingMode = "AUTO";
  traitRow1.counterAxisSizingMode = "AUTO";

  const traitRow2 = autoFrame("Trait Row 2", "HORIZONTAL");
  traitRow2.itemSpacing = 16;
  traitRow2.primaryAxisSizingMode = "AUTO";
  traitRow2.counterAxisSizingMode = "AUTO";

  for (let i = 0; i < traits.length; i++) {
    const t = traits[i];
    const card = cardFrame(t.title, traitCardWidth);
    card.paddingLeft = 24;
    card.paddingRight = 24;
    card.paddingTop = 24;
    card.paddingBottom = 24;
    card.itemSpacing = 12;

    const title = createText(t.title, 14, T.fg, "Bold");
    card.appendChild(title);
    const desc = createText(t.desc, 14, T.muted, "Regular", 22);
    desc.resize(traitCardWidth - 48, desc.height);
    desc.textAutoResize = "HEIGHT";
    card.appendChild(desc);

    if (i < 2) {
      traitRow1.appendChild(card);
    } else {
      traitRow2.appendChild(card);
    }
  }

  rightCol.appendChild(traitRow1);
  rightCol.appendChild(traitRow2);
  columns.appendChild(rightCol);

  inner.appendChild(columns);
  section.appendChild(inner);
  return section;
}

// === TESTIMONIALS SECTION ===
function buildTestimonials(): FrameNode {
  const section = sectionFrame("Testimonials Section", 10, T.bg);
  section.primaryAxisSizingMode = "AUTO";
  section.paddingTop = 96;
  section.paddingBottom = 96;

  const inner = container("Testimonials Container");
  inner.itemSpacing = 48;

  const header = sectionHeader(
    "TESTIMONIALS",
    "What collaborators say"
  );
  inner.appendChild(header);

  const testimonials = [
    {
      quote: "Latade has an exceptional ability to translate complex AI concepts into intuitive user experiences. Their work on the cohort recommendation engine was transformative for our product.",
      name: "Sarah Chen",
      role: "Senior PM, Permutive",
      gradientStart: hex("#6366F1"),
      gradientEnd: hex("#A855F7"),
    },
    {
      quote: "Working with Latade is a masterclass in design-engineering collaboration. They understand technical constraints deeply and always find creative solutions that satisfy both users and the codebase.",
      name: "James Okonkwo",
      role: "Staff Engineer, Permutive",
      gradientStart: hex("#3B82F6"),
      gradientEnd: hex("#06B6D4"),
    },
    {
      quote: "Latade transformed our approach to product design. The AI assistant they designed didn't just reduce support tickets \u2014 it fundamentally changed how our users engage with our platform.",
      name: "Maria Rodriguez",
      role: "VP of Product, MainStreet",
      gradientStart: hex("#10B981"),
      gradientEnd: hex("#14B8A6"),
    },
  ];

  const cardWidth = Math.floor((1200 - 32) / 3); // ~389px

  const row = autoFrame("Testimonials Row", "HORIZONTAL");
  row.itemSpacing = 16;
  row.resize(1200, 1);
  row.primaryAxisSizingMode = "FIXED";
  row.counterAxisSizingMode = "AUTO";

  for (const t of testimonials) {
    const card = cardFrame(`Testimonial - ${t.name}`, cardWidth);
    card.paddingLeft = 32;
    card.paddingRight = 32;
    card.paddingTop = 32;
    card.paddingBottom = 32;
    card.itemSpacing = 20;

    // Quote mark
    const quoteMark = createText("\u201C", 48, T.accent, "Bold");
    quoteMark.opacity = 0.2;
    card.appendChild(quoteMark);

    // Quote text
    const quoteText = createText(t.quote, 14, T.muted, "Regular", 22);
    quoteText.resize(cardWidth - 64, quoteText.height);
    quoteText.textAutoResize = "HEIGHT";
    card.appendChild(quoteText);

    // Author row
    const authorRow = autoFrame("Author", "HORIZONTAL");
    authorRow.itemSpacing = 12;
    authorRow.primaryAxisSizingMode = "AUTO";
    authorRow.counterAxisSizingMode = "AUTO";
    authorRow.counterAxisAlignItems = "CENTER";

    // Avatar circle with gradient
    const avatar = figma.createEllipse();
    avatar.resize(40, 40);
    avatar.fills = [
      {
        type: "GRADIENT_LINEAR",
        gradientStops: [
          { color: { ...t.gradientStart, a: 1 }, position: 0 },
          { color: { ...t.gradientEnd, a: 1 }, position: 1 },
        ],
        gradientTransform: [[1, 0, 0], [0, 1, 0]],
      },
    ];
    authorRow.appendChild(avatar);

    const authorInfo = autoFrame("Author Info", "VERTICAL");
    authorInfo.itemSpacing = 2;
    authorInfo.primaryAxisSizingMode = "AUTO";
    authorInfo.counterAxisSizingMode = "AUTO";
    const authorName = createText(t.name, 14, T.fg, "Bold");
    const authorRole = createText(t.role, 12, T.mutedFg, "Regular");
    authorInfo.appendChild(authorName);
    authorInfo.appendChild(authorRole);
    authorRow.appendChild(authorInfo);

    card.appendChild(authorRow);
    row.appendChild(card);
  }

  inner.appendChild(row);
  section.appendChild(inner);
  return section;
}

// === CONTACT SECTION ===
function buildContact(): FrameNode {
  const section = sectionFrame("Contact Section", 10, T.surface, 0.5);
  section.primaryAxisSizingMode = "AUTO";
  section.paddingTop = 96;
  section.paddingBottom = 96;

  const inner = autoFrame("Contact Inner", "VERTICAL");
  inner.itemSpacing = 24;
  inner.primaryAxisSizingMode = "AUTO";
  inner.counterAxisSizingMode = "AUTO";
  inner.counterAxisAlignItems = "CENTER";

  // Label
  const label = createText("GET IN TOUCH", 12, T.accentLight, "Medium");
  label.letterSpacing = { value: 4, unit: "PIXELS" };
  label.textAlignHorizontal = "CENTER";
  inner.appendChild(label);

  // Title
  const title = createText("Let's build thoughtful\nsystems together", 36, T.fg, "Bold", 44);
  title.textAlignHorizontal = "CENTER";
  inner.appendChild(title);

  // Description
  const desc = createText(
    "I'm always open to discussing new opportunities, interesting projects,\nor ways to make complex products better for everyone.",
    16,
    T.muted,
    "Regular",
    26
  );
  desc.textAlignHorizontal = "CENTER";
  inner.appendChild(desc);

  // CTA buttons
  const btns = autoFrame("Contact CTAs", "HORIZONTAL");
  btns.itemSpacing = 16;
  btns.primaryAxisSizingMode = "AUTO";
  btns.counterAxisSizingMode = "AUTO";
  btns.counterAxisAlignItems = "CENTER";

  // Email button
  const emailBtn = autoFrame("Email Btn", "HORIZONTAL");
  emailBtn.paddingLeft = 24;
  emailBtn.paddingRight = 24;
  emailBtn.paddingTop = 12;
  emailBtn.paddingBottom = 12;
  emailBtn.cornerRadius = 8;
  emailBtn.fills = solid(T.white);
  emailBtn.primaryAxisSizingMode = "AUTO";
  emailBtn.counterAxisSizingMode = "AUTO";
  emailBtn.counterAxisAlignItems = "CENTER";
  emailBtn.itemSpacing = 8;
  const emailIcon = createText("\u2709", 14, T.black, "Regular");
  const emailText = createText("Send an Email", 14, T.black, "Medium");
  emailBtn.appendChild(emailIcon);
  emailBtn.appendChild(emailText);
  btns.appendChild(emailBtn);

  // LinkedIn button
  const liBtn = autoFrame("LinkedIn Btn", "HORIZONTAL");
  liBtn.paddingLeft = 24;
  liBtn.paddingRight = 24;
  liBtn.paddingTop = 12;
  liBtn.paddingBottom = 12;
  liBtn.cornerRadius = 8;
  liBtn.fills = [];
  liBtn.strokes = [{ type: "SOLID", color: T.border }];
  liBtn.strokeWeight = 1;
  liBtn.primaryAxisSizingMode = "AUTO";
  liBtn.counterAxisSizingMode = "AUTO";
  liBtn.counterAxisAlignItems = "CENTER";
  liBtn.itemSpacing = 8;
  const liIcon = createText("in", 14, T.fg, "Bold");
  const liText = createText("LinkedIn", 14, T.fg, "Medium");
  liBtn.appendChild(liIcon);
  liBtn.appendChild(liText);
  btns.appendChild(liBtn);

  inner.appendChild(btns);

  // Download CV link
  const cvLink = autoFrame("CV Link", "HORIZONTAL");
  cvLink.itemSpacing = 8;
  cvLink.primaryAxisSizingMode = "AUTO";
  cvLink.counterAxisSizingMode = "AUTO";
  cvLink.counterAxisAlignItems = "CENTER";
  cvLink.paddingTop = 8;
  const cvIcon = createText("\uD83D\uDCC4", 14, T.muted, "Regular");
  const cvText = createText("Download CV", 14, T.muted, "Regular");
  cvLink.appendChild(cvIcon);
  cvLink.appendChild(cvText);
  inner.appendChild(cvLink);

  section.appendChild(inner);
  return section;
}

// === FOOTER ===
function buildFooter(): FrameNode {
  const footer = sectionFrame("Footer", 64, T.bg);
  footer.strokes = [{ type: "SOLID", color: T.border }];
  footer.strokeWeight = 1;
  footer.strokeAlign = "INSIDE";
  footer.primaryAxisAlignItems = "CENTER";
  footer.counterAxisAlignItems = "CENTER";

  const inner = autoFrame("Footer Inner", "HORIZONTAL");
  inner.resize(1200, 64);
  inner.counterAxisSizingMode = "FIXED";
  inner.primaryAxisSizingMode = "FIXED";
  inner.primaryAxisAlignItems = "SPACE_BETWEEN";
  inner.counterAxisAlignItems = "CENTER";

  // Left
  const leftText = createText("\u00A9 2026 Latade. Designed with intent.", 14, T.mutedFg, "Regular");
  inner.appendChild(leftText);

  // Right links
  const rightLinks = autoFrame("Footer Links", "HORIZONTAL");
  rightLinks.itemSpacing = 16;
  rightLinks.primaryAxisSizingMode = "AUTO";
  rightLinks.counterAxisSizingMode = "AUTO";
  rightLinks.counterAxisAlignItems = "CENTER";
  const footerItems = ["Email", "\u00B7", "LinkedIn", "\u00B7", "CV"];
  for (const item of footerItems) {
    const t = createText(item, 14, T.mutedFg, "Regular");
    rightLinks.appendChild(t);
  }
  inner.appendChild(rightLinks);

  footer.appendChild(inner);
  return footer;
}

// ---------------------------------------------------------------------------
// 5. MAIN: ASSEMBLE ALL SECTIONS
// ---------------------------------------------------------------------------
async function main(): Promise<void> {
  await loadFonts();

  // Create the root frame
  const root = figma.createFrame();
  root.name = "Latade \u2014 Portfolio Design (Desktop)";
  root.layoutMode = "VERTICAL";
  root.primaryAxisSizingMode = "AUTO";
  root.counterAxisSizingMode = "FIXED";
  root.resize(1440, 100); // height will auto-expand
  root.fills = solid(T.bg);
  root.clipsContent = true;
  root.x = 0;
  root.y = 0;

  // Build and append all sections
  const navbar = buildNavbar();
  root.appendChild(navbar);
  navbar.layoutSizingHorizontal = "FILL";

  const hero = buildHero();
  root.appendChild(hero);
  hero.layoutSizingHorizontal = "FILL";

  const marquee = buildMarquee();
  root.appendChild(marquee);
  marquee.layoutSizingHorizontal = "FILL";

  const projects = buildProjects();
  root.appendChild(projects);
  projects.layoutSizingHorizontal = "FILL";

  const process = buildProcess();
  root.appendChild(process);
  process.layoutSizingHorizontal = "FILL";

  const experience = buildExperience();
  root.appendChild(experience);
  experience.layoutSizingHorizontal = "FILL";

  const about = buildAbout();
  root.appendChild(about);
  about.layoutSizingHorizontal = "FILL";

  const testimonials = buildTestimonials();
  root.appendChild(testimonials);
  testimonials.layoutSizingHorizontal = "FILL";

  const contact = buildContact();
  root.appendChild(contact);
  contact.layoutSizingHorizontal = "FILL";

  const footer = buildFooter();
  root.appendChild(footer);
  footer.layoutSizingHorizontal = "FILL";

  // Focus on the result
  figma.currentPage.selection = [root];
  figma.viewport.scrollAndZoomIntoView([root]);

  figma.closePlugin("Portfolio design generated successfully!");
}

main();
