import ProjectCard from "@/components/ProjectCard";
import ErrorBoundary from "@/lib/ErrorBoundary";

function Auth() {
  return (
    <>
      <ErrorBoundary>
        <ProjectCard />
      </ErrorBoundary>
    </>
  );
}

export default Auth;
