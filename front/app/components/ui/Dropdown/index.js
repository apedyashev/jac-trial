// libs
import React from 'react';
import {PropTypes} from 'prop-types';
import cn from 'classnames';
// components
import {Dropdown as DropdownSUI} from 'semantic-ui-react';
// other
import styles from './index.css';

// TODO: style this (looks unstyled in storybook)
export default function Dropdown({
  value,
  text,
  open,
  closeOnBlur,
  closeOnChange,
  scrolling,
  options,
  simple,
  item,
  button,
  icon,
  trigger,
  className,
  children,
  onChange,
  onClick,
}) {
  const handleChange = (e, {value: newValue}) => {
    onChange(newValue);
  };
  return (
    <DropdownSUI
      text={text}
      open={open}
      closeOnBlur={closeOnBlur}
      closeOnChange={closeOnChange}
      scrolling={scrolling}
      className={cn(styles.dropdown, className)}
      trigger={trigger}
      value={value}
      options={options}
      simple={simple}
      item={item}
      button={button}
      icon={icon}
      onChange={handleChange}
      onClick={onClick}
    >
      {children}
    </DropdownSUI>
  );
}
Dropdown.propTypes = {
  text: PropTypes.any,
  value: PropTypes.any,
  open: PropTypes.bool,
  scrolling: PropTypes.bool,
  item: PropTypes.bool,
  icon: PropTypes.any,
  simple: PropTypes.bool,
  button: PropTypes.bool,
  closeOnChange: PropTypes.bool,
  closeOnBlur: PropTypes.bool,
  className: PropTypes.string,
  trigger: PropTypes.any,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.number,
      text: PropTypes.string,
      value: PropTypes.string,
    })
  ),
  onChange: PropTypes.func,
  onClick: PropTypes.func,
  children: PropTypes.any,
};
Dropdown.defaultProps = {
  simple: true,
  item: true,
  onChange: () => {},
};
