import { ProjectItem } from "@/hooks/useFetchData";
import { useState } from "react";

export const useDialog = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);

  const handleProjectClick = (project: ProjectItem) => {
    setSelectedProject(project);
    toggleDialog();
  };

  const toggleDialog = () => setIsOpen((prev) => !prev);
  return { isOpen, toggleDialog, selectedProject, setSelectedProject, handleProjectClick };
};
