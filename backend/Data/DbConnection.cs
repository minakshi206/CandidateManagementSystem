using Microsoft.Data.SqlClient;


namespace CandidateManagementAPI.Data
{
    public class DbConnection
    {
        private readonly string connectionString;

        public DbConnection(IConfiguration configuration)
        {
            connectionString = configuration.GetConnectionString("DefaultConnection");
        }

        public SqlConnection GetConnection()
        {
            return new SqlConnection(connectionString);
        }
    }
}
