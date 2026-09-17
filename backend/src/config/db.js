import pkg from 'pg';
const { Pool } = pkg;

// PostgreSQL Pool configuration
const pool = new Pool({
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '5432'),
  user: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || 'postgres',
  database: process.env.DB_NAME || 'mypim_express_db',
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});

// Helper for SQL queries
export const query = (text, params) => pool.query(text, params);

// Helper for real-time PostgreSQL LISTEN / NOTIFY
export const subscribeToNotifications = async (channel, onNotification) => {
  try {
    const client = await pool.connect();
    await client.query(`LISTEN ${channel}`);
    client.on('notification', (msg) => {
      if (msg.channel === channel && onNotification) {
        onNotification(JSON.parse(msg.payload));
      }
    });
    console.log(`📡 Suscrito exitosamente a notificaciones PostgreSQL en vivo: ${channel}`);
  } catch (err) {
    console.warn(`⚠️ No se pudo conectar a PostgreSQL en vivo (${err.message}). Operando en modo memoria/fallback.`);
  }
};

export default pool;
