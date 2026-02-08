export type ApiValidationError = {
  fieldName: string;
  message: string;
};

export type ApiErrorResponse = {
  status: number;
  message: string;
  errors?: ApiValidationError[];
};
