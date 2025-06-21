import { TRPCClientError } from '@trpc/client';
import { TRPCError } from '@trpc/server';

import { AppRouter } from '~trpc/router/root';

export function isTRPCClientError(
  cause: unknown
): cause is TRPCClientError<AppRouter> {
  return cause instanceof TRPCClientError;
}

export function isTRPCError(cause: unknown): cause is TRPCError {
  return cause instanceof TRPCError;
}
