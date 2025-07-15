export class Api {
  // AXIOS
  static MAX_TIMEOUT = 12000;
  static API_PREFIX = '/api/v1';
  static API_BASE_URL = process.env.API_BASE_URL + Api.API_PREFIX;
  static API_MEDIA_URL = process.env.API_BASE_URL;
}
