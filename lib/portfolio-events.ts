export type PortfolioProjectId = "subsage" | "mxshare" | "cipherspend";

export const OPEN_PROJECT_EVENT = "portfolio:open-project";

export function openProject(projectId: PortfolioProjectId) {
  window.dispatchEvent(
    new CustomEvent<{ projectId: PortfolioProjectId }>(OPEN_PROJECT_EVENT, {
      detail: { projectId }
    })
  );
}
