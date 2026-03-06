import { Fragment } from "react";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getProjectBySlug, getNextProject, getAllSlugs } from "@/lib/data";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BackLink from "@/components/case-study/BackLink";
import CaseStudyHero from "@/components/case-study/CaseStudyHero";
import CaseStudyOverview from "@/components/case-study/CaseStudyOverview";
import CaseStudyChallenge from "@/components/case-study/CaseStudyChallenge";
import CaseStudyContentSection from "@/components/case-study/CaseStudyContentSection";
import CaseStudyApproach from "@/components/case-study/CaseStudyApproach";
import CaseStudyApproachImage from "@/components/case-study/CaseStudyApproachImage";
import CaseStudyGallery from "@/components/case-study/CaseStudyGallery";
import CaseStudyBeforeAfter from "@/components/case-study/CaseStudyBeforeAfter";
import CaseStudyVideo from "@/components/case-study/CaseStudyVideo";
import CaseStudyValidation from "@/components/case-study/CaseStudyValidation";
import CaseStudyLearnings from "@/components/case-study/CaseStudyLearnings";
import CaseStudyOutcomes from "@/components/case-study/CaseStudyOutcomes";
import CaseStudyFeedback from "@/components/case-study/CaseStudyFeedback";
import NextProjectTeaser from "@/components/case-study/NextProjectTeaser";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return {};

  return {
    title: `${project.title} — ${project.company}`,
    description: project.summary,
  };
}

export default async function CaseStudyPage({ params }: Props) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) notFound();

  const nextProject = getNextProject(slug);

  return (
    <>
      <Navbar />
      <main>
        <BackLink />
        <CaseStudyHero project={project} />
        <CaseStudyOverview overview={project.caseStudy.overview} />
        {project.caseStudy.heroImage && (
          <CaseStudyApproachImage
            src={project.caseStudy.heroImage}
            alt={`${project.title} hero`}
          />
        )}
        <CaseStudyChallenge challenge={project.caseStudy.challenge} />
        {project.caseStudy.contentSections &&
          project.caseStudy.contentSections.map((section, i) => (
            <CaseStudyContentSection key={i} section={section} />
          ))}
        {!project.caseStudy.hideApproach && (
          <CaseStudyApproach approach={project.caseStudy.approach} />
        )}
        {project.caseStudy.approachImages &&
          project.caseStudy.approachImages.map((src, i) => (
            <Fragment key={i}>
              <CaseStudyApproachImage
                src={src}
                alt={`${project.title} process image ${i + 1}`}
              />
              {project.caseStudy.video &&
                project.caseStudy.videoInsertAfterIndex === i && (
                  <CaseStudyVideo
                    src={project.caseStudy.video}
                    whiteBg={project.caseStudy.videoWhiteBg}
                  />
                )}
            </Fragment>
          ))}
        {project.caseStudy.beforeAfter && (
          <CaseStudyBeforeAfter data={project.caseStudy.beforeAfter} />
        )}
        {project.caseStudy.gallery && (
          <CaseStudyGallery items={project.caseStudy.gallery} />
        )}
        {project.caseStudy.video &&
          project.caseStudy.videoInsertAfterIndex == null && (
            <CaseStudyVideo
              src={project.caseStudy.video}
              whiteBg={project.caseStudy.videoWhiteBg}
            />
          )}
        {project.caseStudy.validation && (
          <CaseStudyValidation section={project.caseStudy.validation} />
        )}
        {project.caseStudy.learnings && (
          <CaseStudyLearnings learnings={project.caseStudy.learnings} />
        )}
        <CaseStudyOutcomes
          outcomes={project.caseStudy.outcomes}
          label={project.caseStudy.outcomesLabel}
          heading={project.caseStudy.outcomesHeading}
        />
        {project.caseStudy.feedback && (
          <CaseStudyFeedback feedback={project.caseStudy.feedback} />
        )}
        <NextProjectTeaser nextProject={nextProject} />
      </main>
      <Footer />
    </>
  );
}
