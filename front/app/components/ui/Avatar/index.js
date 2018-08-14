// libs
import React from 'react';
import {PropTypes} from 'prop-types';
import cn from 'classnames';
// components
import ReactImage from 'react-image';
import {Loader} from 'components/ui';
// other
import styles from './index.css';
import '!file-loader?name=[name].[ext]!images/no-image.png';

export default function Avatar({src, small, medium}) {
  return (
    <ReactImage
      className={cn(styles.root, {
        [styles.small]: small,
        [styles.medium]: medium,
      })}
      src={[src, '/no-image.png']}
      loader={<Loader size={100} className={styles.loader} />}
    />
  );
}
Avatar.propTypes = {};
