import { type SchemaTypeDefinition } from "sanity";
import { tool } from "./tool";
import { collection } from "./collection";
import { productPage } from "./productPage";
import { category } from "./category";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [tool, category, collection, productPage],
};
