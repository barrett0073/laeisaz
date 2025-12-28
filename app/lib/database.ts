import mysql from 'mysql2/promise'

declare global {
  var mysql: mysql.Pool | undefined
}

// Global connection pool to maintain connections across hot reloads
let pool = global.mysql;

if (!pool) {
  // Direct database configuration - no SSL
  const config = {
    host: '185.164.72.61',
    port: 3306,
    user: 'Adify',
    password: '1385138Mm@',
    database: 'adify',
    waitForConnections: true,
    connectionLimit: 10,
    maxIdle: 5,
    idleTimeout: 60000,
    queueLimit: 0,
    enableKeepAlive: true,
    keepAliveInitialDelay: 0
    // No SSL configuration - let MySQL2 handle it automatically
  };
  
  pool = global.mysql = mysql.createPool(config);
}

export const db = pool;

// Helper function with retry logic for database operations
export async function executeQuery(query: string, params?: any[], retries = 2): Promise<any> {
  let lastError: any;
  
  for (let attempt = 0; attempt <= retries; attempt++) {
    try {
      const [rows] = await db.execute(query, params);
      return rows;
    } catch (error: any) {
      lastError = error;
      console.error(`Database query attempt ${attempt + 1} failed:`, error.message);
      
      // Don't retry for certain errors
      if (error.code && ['ER_NO_SUCH_TABLE', 'ER_BAD_FIELD_ERROR'].includes(error.code)) {
        throw error;
      }
      
      // Wait before retrying (except on last attempt)
      if (attempt < retries) {
        await new Promise(resolve => setTimeout(resolve, 1000 * (attempt + 1)));
      }
    }
  }
  
  throw lastError;
}

// Helper function to handle connection (for backward compatibility)
export default async function connectToDatabase() {
  try {
    // Test the connection with timeout
    const connection = await pool.getConnection();
    console.log('Successfully connected to MySQL database');
    connection.release();
    return pool;
  } catch (error) {
    console.error('Failed to connect to MySQL database:', error);
    throw error;
  }
} 