// setupServer.js

import uploadScenarioRouter from './routes/uploadScenario.js';
import scenariosRouter from './routes/scenarios.js';

export default async function setupServer(expressApp) {
  expressApp.use('/api', uploadScenarioRouter);
  expressApp.use('/api', scenariosRouter);
}
