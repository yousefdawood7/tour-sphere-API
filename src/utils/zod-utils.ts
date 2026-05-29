import { z } from 'zod';

export const zodIssue = function (requiredMsg: string, typeMsg: string) {
  return (issue: { input: unknown }) =>
    issue.input === undefined ? requiredMsg : typeMsg;
};

export const handleZodErrors = function (zodError: z.ZodError) {
  const errorObjects: Record<string, string> = {};

  Object.entries(z.flattenError<unknown>(zodError).fieldErrors).forEach(
    (fieldError) =>
      (errorObjects[fieldError[0]] = (fieldError[1] as string[])[0] as string), // to get first error from the zod error
  );

  return { fieldErrors: errorObjects };
};
