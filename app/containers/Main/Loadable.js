/**
 *
 * Asynchronously loads the component for Main
 *
 */

import loadable from 'loadable-components';

export default loadable(() => import('./index'));
