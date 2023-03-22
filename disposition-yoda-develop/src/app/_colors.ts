const getVar = (prop) => {
  const html = getComputedStyle(document.documentElement);
  return html.getPropertyValue(prop);
};

const brandColors: any = {
  blue: getVar('--blue'),
  indigo: getVar('--indigo'),
  purple: getVar('--purple'),
  pink: getVar('--pink'),
  red: getVar('--red'),
  orange: getVar('--orange'),
  yellow: getVar('--yellow'),
  green: getVar('--green'),
  teal: getVar('--teal'),
  cyan: getVar('--cyan'),
  white: getVar('--white'),
  gray: getVar('--gray'),
  'gray-dark': getVar('--gray-dark'),
  'light-blue': getVar('--light-blue'),
  primary: getVar('--primary'),
  secondary: getVar('--secondary'),
  success: getVar('--success'),
  info: getVar('--info'),
  warning: getVar('--warning'),
  danger: getVar('--danger'),
  light: getVar('--light'),
  dark: getVar('--dark'),
};

export default brandColors;

export const hexToRgbA = (inputHex, alpha) => {
  const hex = inputHex.replace(' ', '');
  let c;
  if (/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)) {
    c = hex.substring(1).split('');
    if (c.length === 3) {
      c = [c[0], c[0], c[1], c[1], c[2], c[2]];
    }
    c = '0x' + c.join('');
    return `rgba(${[(c >> 16) & 255, (c >> 8) & 255, c & 255].join(',')}, ${alpha})`;
  } else {
    console.warn('Bad Hex: ' + hex);
    return hex;
  }
};

export const pointGlobal = {
  pointBorderColor: '#fff',
  pointHoverBackgroundColor: '#fff',
  pointHoverBorderColor: 'rgba(148,159,177,0.8)'
};
