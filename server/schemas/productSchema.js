import zod from "zod";

export const productSchema = zod.object({
  title: zod.string(),
  price: zod.number(),
  description: zod.string(),
  image: zod.string(),
  category: zod.string(),
});
