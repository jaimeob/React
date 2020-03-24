export const RESTART_ON_REMOUNT = '@@saga-injector/restart-on-remount';
export const DAEMON = '@@saga-injector/daemon';
export const ONCE_TILL_UNMOUNT = '@@saga-injector/once-till-unmount';

export const DRAWER_WIDTH = 240;

export const NETWORK_STATUS_CODES = {
  200: 'OK',
  404: 'NOTFOUND',
  409: 'CONFLICT',
  500: 'ERROR',
};

export const MIME_TYPES = {
  ALL_IMAGES: 'image/*',
  PNG_IMAGES: 'image/png',
  JPG_IMAGES: 'image/jpg',
}

export const REGEXS = {
  alphanumeric: /^([0-9]|[a-z])+([0-9a-z]+)$/i,
  numeric: /^[ 0-9]*$/,
}