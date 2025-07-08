export type LoginDevice = {
  firebase_id: string;
  device_browser: string;
  device_browser_version: string;
  device_imei: string;
  device_model: string;
  device_type: string;
  device_vendor: string;
  device_os: string;
  device_os_version: string;
  device_platform: 'Web' | 'Mobile';
  user_agent: string;
  app_version: string;
};

export type LoginForm = {
  user: string;
  password: string;
  device?: LoginDevice;
};
