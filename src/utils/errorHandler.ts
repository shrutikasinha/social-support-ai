export const getErrorMessage = (
  error: unknown,
  fallbackMessage: string = "An unexpected error occurred",
): string => {
  if (!error) {
    return fallbackMessage;
  }

  if (
    typeof error === "object" &&
    "data" in error &&
    error.data &&
    typeof error.data === "object"
  ) {
    const data = error.data as Record<string, unknown>;

    if ("error" in data && data.error && typeof data.error === "object") {
      const errorObj = data.error as Record<string, unknown>;
      if ("message" in errorObj && typeof errorObj.message === "string") {
        return errorObj.message;
      }
    }

    // Check for direct message in data
    if ("message" in data && typeof data.message === "string") {
      return data.message;
    }
  }

  // Handle standard Error objects
  if (error instanceof Error) {
    return error.message;
  }

  // Handle string errors
  if (typeof error === "string") {
    return error;
  }

  // Check for message property in generic objects
  if (
    typeof error === "object" &&
    "message" in error &&
    typeof error.message === "string"
  ) {
    return error.message;
  }

  // Fallback
  return fallbackMessage;
};
