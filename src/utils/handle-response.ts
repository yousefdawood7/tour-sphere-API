export const handleResposeError = function (
  statusCode: number,
  resError: Record<string, unknown>,
) {
  return {
    status: statusCode < 500 ? 'fail' : 'error',
    statusCode,
    ...resError,
  };
};
