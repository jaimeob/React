/**
 *
 * Asynchronously loads the component for Servicios
 *
 */

import loadable from 'loadable-components';

export default loadable(() => import('./index'));
