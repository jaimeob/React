/**
 *
 * Asynchronously loads the component for Formularios
 *
 */
import React from 'react';
import loadable from '@loadable/component';

export default loadable(() => import('./index'), {
  fallback: (
    <div
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        heigth: '100%',
      }}>
        Loading
    </div>
  ),
});
