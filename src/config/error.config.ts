type ErrorConfigType = {
  [key: string]: {
    status: 'fail' | 'error';
    message: string;
  };
};

// For customizing the errors
export const ERROR_CONFIG = {
  VALIDATION_ERROR: {
    status: 'fail',
    message: 'Validation failed',
  },
} as const satisfies ErrorConfigType;
