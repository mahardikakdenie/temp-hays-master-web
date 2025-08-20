export class App {
  // APP
  static APP_BASE_URL = process.env.APP_BASE_URL || '';

  // NAME
  static SESSION_NAME = '_SID_HaysGallery';
  static REDIRECT_NAME = '_C03PfQ';

  // SECRET
  static SIGN_SECRET = process.env.SIGN_SECRET || '';
  static SESSION_SECRET = process.env.SESSION_SECRET || '';

  static INITIAL_FILTER = {
    startDate: '',
    endDate: '',
    status: '',
  };
}
