import React from 'react';
import { ProjectItem } from './types';

interface Props {
  projects: { items: ProjectItem[] };
}

export const ProjectsSection: React.FC<Props> = ({ projects }) => {
  const { items } = projects;

  return (
    <section className="space-y-4">
      <h2 className="text-xl font-semibold">Projects</h2>

      <div className="grid gap-4 md:grid-cols-2">
        {items.map((project) => (
          <div
            key={project.id}
            className="rounded-2xl bg-slate-950/70 p-4 shadow-lg shadow-slate-900/80 border border-slate-800 flex gap-4"
          >
            {project.posterUrl && (
              <img
                src={project.posterUrl}
                alt={project.title}
                className="h-32 w-24 rounded-xl object-cover border border-slate-700/70"
              />
            )}
            <div className="flex-1 space-y-1">
              <h3 className="text-base font-semibold text-slate-100">
                {project.title}
              </h3>
              <p className="text-sm text-indigo-300">{project.role}</p>
              <p className="text-xs text-slate-400 capitalize">
                {project.medium}
                {project.year && ` • ${project.year}`}
              </p>
              {project.platformOrCompany && (
                <p className="text-xs text-slate-400">
                  {project.platformOrCompany}
                </p>
              )}
              {project.description && (
                <p className="text-xs text-slate-300 mt-2">
                  {project.description}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
