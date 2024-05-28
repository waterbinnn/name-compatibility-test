import classNames from 'classnames/bind';

interface Styles {
  [key: string]: string;
}

export const useStyle = (styles: Styles) => {
  const styled = classNames.bind(styles);
  return { styled };
};
