import type { ImageMetadata } from "astro";
import { getImage } from "astro:assets";

// Project screenshots live in src/assets so sharp can compress and hash them at
// build time. db.ts keeps storing plain public-style paths, and this module is
// the single place that translates those into generated assets.
//
// It exists as a shared module rather than inline in a component because more
// than one page renders project images, and a page that skips the translation
// silently requests files that no longer exist under public/.
const projectAssets = import.meta.glob<{ default: ImageMetadata }>(
  "/src/assets/proyectos/**/*.{png,jpg,jpeg,webp}",
  { eager: true },
);

const optimizedByPath = new Map<string, string>();

for (const [modulePath, module] of Object.entries(projectAssets)) {
  // db.ts stores paths from /proyectos onward, so the shared suffix is what
  // links a glob key to a db entry regardless of the prefix Vite emits.
  const originalPath = modulePath.slice(modulePath.indexOf("/proyectos/"));
  const optimized = await getImage({
    src: module.default,
    format: "webp",
    quality: 82,
  });
  optimizedByPath.set(originalPath, optimized.src);
}

// An empty map means the glob matched nothing, which is a configuration error.
// Failing loudly beats degrading to the original paths, which no longer resolve
// now that the files left public/ - that turns one broken build into a page
// full of silent 404s.
if (optimizedByPath.size === 0) {
  throw new Error(
    "No images matched /src/assets/proyectos/**. Project screenshots are expected there since they moved out of public/.",
  );
}

export function resolveProjectImage(path: string): string;
export function resolveProjectImage(path: undefined): undefined;
export function resolveProjectImage(path: string | undefined): string | undefined;
export function resolveProjectImage(path: string | undefined): string | undefined {
  if (!path) return path;

  const optimized = optimizedByPath.get(path);
  if (!optimized) {
    console.warn(`[projectImages] No optimized asset for "${path}" - it will 404.`);
    return path;
  }

  return optimized;
}

// Returns the same projects with every image path pointing at its generated
// asset, so callers can render and serialize them without thinking about it.
export function withOptimizedImages<
  T extends { image?: string; images?: string[] },
>(projects: T[]): T[] {
  return projects.map((project) => ({
    ...project,
    image: resolveProjectImage(project.image),
    images: project.images?.map((image) => resolveProjectImage(image)),
  }));
}
