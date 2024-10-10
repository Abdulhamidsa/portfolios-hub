import ProjectCard from "@/components/ProjectCard";
import ErrorBoundary from "@/lib/ErrorBoundary";

function Profile() {
  return (
    <>
      <ErrorBoundary>
        <ProjectCard />
      </ErrorBoundary>
    </>
  );
}

export default Profile;
