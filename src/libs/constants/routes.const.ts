export class Routes {
  // BASE
  static API_AUTH = '/auth';
  static API_GATEWAY = '/v1';
  static API_MASTER = '/master';
  static API_MEDIA = '/media';
  static API_USER = '/user';
  static API_BANNER = Routes.API_MASTER + '/banner';
  static API_ARTICLE = Routes.API_MASTER + '/article';
  static API_CONTACT = Routes.API_MASTER + '/contact';

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
  static USER_ACCESS = Routes.API_USER + '/access';
  static USER_ACCESS_OPTIONS = Routes.USER_ACCESS + '/options';

  // ARTICLE
  static ARTICLE = Routes.API_ARTICLE;
  static ARTICLE_LIST = Routes.API_ARTICLE + '/list';

  // CONTACT
  static CONTACT = Routes.API_CONTACT;
  static CONTACT_LIST = Routes.API_CONTACT + '/list';

  // Category
  static CATEGORY = '/category';
  static CATEGORY_LIST = Routes.CATEGORY + '/list';
}
