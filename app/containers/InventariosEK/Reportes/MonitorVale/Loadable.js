/**
 *
 * Asynchronously loads the component for MonitorVale
 *
 */

import loadable from 'loadable-components';

export default loadable(() => import('./index'));
