import { match } from 'ts-pattern';

type GetBaseUrlConfig = {
  app: 'api';
};

const getApiBaseUrl = () => {
  // HACK: Due to unknown causes, URLs as types cannot be uniquely resolved,
  // so following is described in the form of a Immediately Invoked Function Expression.
  const baseUrl = (() => {
    if (typeof process === 'undefined') {
      return new URL('https://ikihaji-tube-api.up.railway.app/api');
    }
    if (process.env['IKIHAJI_TUBE_API_ENDPOINT']) {
      return new URL(process.env['IKIHAJI_TUBE_API_ENDPOINT']);
    }
    if (process.env['NODE_ENV'] === 'production') {
      return new URL('https://ikihaji-tube-api.up.railway.app/api');
    }

    return new URL(`http://localhost:${process.env['PORT'] || 4000}`);
  })();

  return baseUrl;
};

/**
 * Get the base URL of the app.
 * @param app The app from which to get the base URL.
 * @returns The base URL of the app with trailing slash removed.
 * @example
 * ```ts
 * const baseUrl = getBaseUrl({ app: 'api' });
 * // => https://ikihaji-tube-api.up.railway.app/api
 * ```
 */
export const getBaseUrl = ({ app }: GetBaseUrlConfig) => {
  const baseUrl = match(app)
    .with('api', () => getApiBaseUrl())
    .exhaustive();

  baseUrl.pathname = baseUrl.pathname.replace(/\/$/, '');

  return baseUrl;
};
