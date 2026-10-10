const app = require('./src/app');
const env = require('./src/config/env');
const prisma = require('./src/config/prisma');

const port = env.PORT;

const server = app.listen(port, () => {
  console.log(`===============================================`);
  console.log(`🏥 Medscraft Clinic Backend running on port ${port}`);
  console.log(`🌍 Environment: ${env.NODE_ENV}`);
  console.log(`🩺 Health check: http://localhost:${port}/api/health`);
  console.log(`🚀 API v1:       http://localhost:${port}/api/v1`);
  console.log(`===============================================`);

  // 🔄 24/7 Render Keep-Alive Auto-Ping (Prevents server from sleeping)
  const appUrl = process.env.RENDER_EXTERNAL_URL || process.env.APP_URL;
  if (appUrl) {
    const PING_INTERVAL = 14 * 60 * 1000; // 14 minutes (Render sleeps after 15m)
    console.log(`🛡️ Render Keep-Alive active! Auto-pinging ${appUrl} every 14 mins.`);
    setInterval(async () => {
      try {
        const pingEndpoint = `${appUrl}/api/health`;
        const res = await fetch(pingEndpoint);
        console.log(`[Keep-Alive Ping] ${new Date().toISOString()} - Status: ${res.status}`);
      } catch (err) {
        console.warn(`[Keep-Alive Ping Error]: ${err.message}`);
      }
    }, PING_INTERVAL);
  }
});

// Graceful shutdown handling
const gracefulShutdown = (signal) => {
  console.log(`\n🛑 Received ${signal}. Starting graceful shutdown...`);
  server.close(async () => {
    console.log('💤 HTTP server closed.');
    try {
      await prisma.$disconnect();
      console.log('🔌 Database connection closed.');
      process.exit(0);
    } catch (err) {
      console.error('Error during database disconnect:', err);
      process.exit(1);
    }
  });

  // Force shutdown after 10 seconds timeout
  setTimeout(() => {
    console.error('⚠️ Could not close connections in time, forcefully shutting down');
    process.exit(1);
  }, 10000);
};

process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
process.on('SIGINT', () => gracefulShutdown('SIGINT'));

module.exports = server;
