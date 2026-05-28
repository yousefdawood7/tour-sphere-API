export const zodIssue = function (requiredMsg: string, typeMsg: string) {
  return (issue: { input: unknown }) =>
    issue.input === undefined ? requiredMsg : typeMsg;
};
