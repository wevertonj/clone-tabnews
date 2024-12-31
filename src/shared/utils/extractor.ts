import { FastifyRequest } from 'fastify';

export function extractor(request: unknown): string | string[] {
  const parserequest = request as FastifyRequest;
  const version = parserequest.headers['x-api-version'] as string | undefined;
  const versionInt = parseInt(version ?? '');
  const defaultVersion = parseInt(process.env.DEFAULT_VERSION ?? '1');
  const result: string[] = [];

  if (versionInt) {
    for (let i = versionInt; i >= defaultVersion; i--) {
      result.push(i.toString());
    }
  } else {
    result.push(defaultVersion.toString());
  }

  return result;
};
