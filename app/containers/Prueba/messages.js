/*
 * Prueba Messages
 *
 * This contains all the text for the Prueba container.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.containers.Prueba';

export default defineMessages({
  header: {
    id: `${scope}.header`,
    defaultMessage: 'This is the Prueba container!',
  },
});
