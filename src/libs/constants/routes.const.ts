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
  static API_ARTIST = Routes.API_MASTER + '/artist';
  static API_EXHIBITION = Routes.API_MASTER + '/exhibition';

  // AUTH
  static AUTH_LOGIN = Routes.API_AUTH + '/login';
  static AUTH_MENU = Routes.API_AUTH + '/menu';
  static AUTH_PERMISSION = Routes.API_AUTH + '/permission';

  // USER
  static USER = Routes.API_USER;
  static USER_LIST = Routes.API_USER + '/list';
  static USER_ACCESS_LIST = Routes.API_USER + '/access/list';
  static USER_ACCESS_OPTION = Routes.API_USER + '/access/options';

  // BANNER
  static BANNER = Routes.API_BANNER;
  static BANNER_LIST = Routes.API_BANNER + '/list';
  static BANNER_TYPE_OPTION = Routes.BANNER + '/type';

  // User Access
  static USER_ACCESS = Routes.API_USER + '/access';
  static USER_ACCESS_OPTIONS = Routes.USER_ACCESS + '/options';

  // ARTICLE
  static ARTICLE = Routes.API_ARTICLE;
  static ARTICLE_LIST = Routes.API_ARTICLE + '/list';

  // Artist
  static ARTIST = Routes.API_ARTIST;
  static ARTIST_LIST = Routes.API_ARTIST + '/list';

  // Exhibition
  static EXHIBITION = Routes.API_EXHIBITION;
  static EXHIBITION_LIST = Routes.API_EXHIBITION + '/list';

  // CONTACT
  static CONTACT = Routes.API_CONTACT;
  static CONTACT_LIST = Routes.API_CONTACT + '/list';

  // Category
  static CATEGORY = '/category';
  static CATEGORY_LIST = Routes.CATEGORY + '/list';

  // Sub-Category
  static SUB_CATEGORY = '/sub-category';
  static SUB_CATEGORY_LIST = Routes.SUB_CATEGORY + '/list';

  // Theme
  static THEME = '/theme';
  static THEME_LIST = Routes.THEME + '/list';

  // Field Category
  static FIELD_CATEGORY = '/field-category';
  static FIELD_CATEGORY_LIST = Routes.FIELD_CATEGORY + '/field-category';

  // Products
  static PRODUCT = '/product';
  static PRODUCT_LISY = Routes.PRODUCT + '/list';

  // TRANSACTIONS
  static TRANSACTION = '/transaction';
  static TRASACTION_LIST = Routes.TRANSACTION + '/list';
}
