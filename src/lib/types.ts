/** TypeScript interfaces for project and case study data */

export interface ProjectOverviewMeta {
  role: string;
  timelineLabel?: string;
  timeline: string;
  team: string;
  tools: string[];
}

export interface CaseStudySection {
  heading: string;
  body: string[];
}

export interface CaseStudyOutcome {
  metric: string;
  badge?: string;
  description: string;
}

export interface CaseStudyLearning {
  label: string;
  heading: string;
  items: string[];
}

export interface CaseStudyFeedback {
  quote: string;
  name: string;
}

export interface CaseStudyGalleryItem {
  image: string;
  title: string;
}

export interface BeforeAfterPanel {
  image: string;
  label: string;
  points: string[];
}

export interface CaseStudyBeforeAfter {
  before: BeforeAfterPanel;
  after: BeforeAfterPanel;
}

export interface CaseStudyContentSection {
  label: string;
  heading: string;
  items: string[];
}

export interface CaseStudyLabelledSection {
  label: string;
  heading: string;
  body: string[];
}

export interface CaseStudyData {
  overview: ProjectOverviewMeta;
  heroImage?: string;
  challenge: CaseStudySection;
  contentSections?: CaseStudyContentSection[];
  approach: CaseStudySection[];
  hideApproach?: boolean;
  approachImages?: string[];
  beforeAfter?: CaseStudyBeforeAfter;
  video?: string;
  videoInsertAfterIndex?: number;
  videoWhiteBg?: boolean;
  gallery?: CaseStudyGalleryItem[];
  validation?: CaseStudyLabelledSection;
  learnings?: CaseStudyLearning;
  outcomesLabel?: string;
  outcomesHeading?: string;
  outcomes: CaseStudyOutcome[];
  feedback?: CaseStudyFeedback;
}

export interface Project {
  slug: string;
  title: string;
  company: string;
  summary: string;
  outcomes: string[];
  tags: string[];
  color: string;
  image: string;
  hidden?: boolean;
  caseStudy: CaseStudyData;
}
