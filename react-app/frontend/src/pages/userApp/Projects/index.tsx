import ProjectCard from "@/components/ProjectCard";
import ErrorBoundary from "@/lib/ErrorBoundary";

function Projects() {
  return (
    <>
      <ErrorBoundary>
        <ProjectCard />
      </ErrorBoundary>
    </>
  );
}
export default Projects;
