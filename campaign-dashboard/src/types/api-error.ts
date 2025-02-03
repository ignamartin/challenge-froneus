import { z } from "zod";

import type { ErrorDTO } from "./error";

const ErrorDTO = z.object({
  code: z.string().min(1),
  message: z.string().min(1),
});

export const isApiError = (obj: unknown): obj is ErrorDTO =>
  ErrorDTO.safeParse(obj).success;

export class ApiError extends Error implements ErrorDTO {
  public readonly code: string;

  private constructor(code: string, message: string) {
    super(message);
    this.code = code;
  }

  static throwError(error: ErrorDTO): never {
    throw new ApiError(error.code, error.message);
  }
}
