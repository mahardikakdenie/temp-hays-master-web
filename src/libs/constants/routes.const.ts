export class Routes {
  // BASE
  static API_AUTH = '/auth';
  static API_GATEWAY = '/v1';
  static API_MASTER = '/master';
  static API_MEDIA = '/media';
  static API_USER = '/user';
  static API_BANNER = Routes.API_MASTER + '/banner';

  // AUTH
  static AUTH_LOGIN = Routes.API_AUTH + '/login';
  static AUTH_MENU = Routes.API_AUTH + '/menu';
  static AUTH_PERMISSION = Routes.API_AUTH + '/permission';

  // USER
  static USER = Routes.API_USER;
  static USER_LIST = Routes.API_USER + '/list';

  // BANNER
  static BANNER = Routes.API_BANNER;
  static BANNER_LIST = Routes.API_BANNER + '/list';
}
