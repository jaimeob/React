/**
 *
 * Asynchronously loads the component for Captura
 *
 */

import loadable from 'loadable-components';

export default loadable(() => import('./index'));
