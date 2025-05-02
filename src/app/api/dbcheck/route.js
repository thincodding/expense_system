// pages/api/dbcheck.js (for Pages Router)
import connectDB from '../../config/config';

export async function GET(req) {
  try {
    // Attempt to connect to the database
    const db = await connectDB();

    if (db) {
      // If the database connection is successful, send a success response
      return new Response(
        JSON.stringify({ message: 'Database connection successful!' }),
        { status: 200 }
      );
    } else {
      // If db is falsy (e.g., connection failed), log and return an error message
      console.error("Error connecting to the database", db);
      return new Response(
        JSON.stringify({ message: 'Database connection failed' }),
        { status: 500 }
      );
    }
  } catch (error) {
    // If there's an error, send a failure response
    console.error("Error:", error.message);
    return new Response(
      JSON.stringify({ message: 'Database connection failed', error: error.message }),
      { status: 500 }
    );
  }
}
