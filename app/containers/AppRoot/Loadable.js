/**
 *
 * Asynchronously loads the component for AppRoot
 *
 */

import loadable from 'loadable-components';

export default loadable(() => import('./index'));
