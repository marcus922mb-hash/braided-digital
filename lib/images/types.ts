import type { DemoContent, DemoImage } from "@/features/demos/types";

export type ImageProviderName = "pexels" | "pixabay" | "unsplash";
export type ImageOrientation = "landscape" | "portrait" | "square";

export type ImageSearchRequest = {
  query: string;
  count: number;
  orientation?: ImageOrientation;
};

export type ImageCandidate = DemoImage & {
  provider: ImageProviderName;
  width: number;
  height: number;
  score?: number;
};

export type ImageProvider = {
  readonly id: ImageProviderName;
  isConfigured(): boolean;
  search(request: ImageSearchRequest): Promise<ImageCandidate[]>;
};

export type EnrichDemoImagesInput = {
  content: DemoContent;
  industry: string | null;
  city?: string | null;
};

