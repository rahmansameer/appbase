import { createClient } from "@sanity/client";

export const sanityServer = createClient({
  projectId: "w5k7su72",
  dataset: "production",
  apiVersion: "2024-01-01",
  useCdn: false,
});
