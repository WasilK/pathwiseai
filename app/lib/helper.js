// Helper function to convert entries to markdown
export function entriesToMarkdown(entries, type) {
  if (!entries?.length) return "";

  return (
    `## ${type}\n\n` +
    entries
      .map((entry) => {
        const dateRange = entry.current
          ? `${entry.startDate} - Present`
          : `${entry.startDate} - ${entry.endDate}`;
        return `### ${entry.title} @ ${entry.organization}&nbsp;&nbsp;&nbsp;(${dateRange})\n\n${entry.description}`;
      })
      .join("\n\n")
  );
}

export function projectsToMarkdown(projects) {
  if (!projects?.length) return "";

  return (
    `## Projects\n\n` +
    projects
      .map((project) => {
        const dateRange = project.current
          ? `${project.startDate} - Present`
          : `${project.startDate} - ${project.endDate || "N/A"}`;

        return `### ${project.projectTitle}&nbsp;&nbsp;&nbsp;[${project.projectLink}](${project.projectLink})\n(${dateRange})\n\n${project.description}`;
      })
      .join("\n\n")
  );
}

export function certificatesToMarkdown(certificates) {
  if (!certificates?.length) return "";

  return (
    `## Certificates\n\n` +
    certificates
      .map((certificate) => {
        const dateRange = certificate.current
          ? `${certificate.startDate} - Present`
          : `${certificate.startDate} - ${certificate.endDate || "N/A"}`;

        return `### ${certificate.Title}&nbsp;&nbsp;&nbsp;[${certificate.Link}](${certificate.Link})\n(${dateRange})\n\n${certificate.description}`;
      })
      .join("\n\n")
  );
}

export function summaryToMarkdown(summary) {
  if (!summary) return "";

  return `## Summary\n\n${summary}\n`;
}
