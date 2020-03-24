/**
 *
 * Asynchronously loads the component for Inventario
 *
 */

import loadable from 'loadable-components';

export default loadable(() => import('./index'));
