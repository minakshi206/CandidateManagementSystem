using CandidateManagementAPI.Data;
using CandidateManagementAPI.model;
using CandidateManagementAPI.model;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;

namespace CandidateManagementAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CandidatesController : ControllerBase
    {
        private readonly DbConnection db;

        public CandidatesController(DbConnection db)
        {
            this.db = db;
        }

        [HttpGet]
        public IActionResult GetCandidates()
        {
            List<Candidate> list = new List<Candidate>();

            SqlConnection con = db.GetConnection();

            string query = "SELECT * FROM Candidates";

            SqlCommand cmd = new SqlCommand(query, con);

            con.Open();

            SqlDataReader reader = cmd.ExecuteReader();

            while (reader.Read())
            {
                Candidate c = new Candidate();

                c.CandidateId = Convert.ToInt32(reader["CandidateId"]);
                c.CandidateName = reader["CandidateName"].ToString();
                c.Email = reader["Email"].ToString();
                c.MobileNumber = reader["MobileNumber"].ToString();
                c.DateOfBirth = Convert.ToDateTime(reader["DateOfBirth"]);
                c.Gender = reader["Gender"].ToString();
                c.Qualification = reader["Qualification"].ToString();
                c.Experience = Convert.ToDecimal(reader["Experience"]);
                c.Skills = reader["Skills"].ToString();
                c.PreferredLocation = reader["PreferredLocation"].ToString();
                c.EmploymentType = reader["EmploymentType"].ToString();
                c.Status = reader["Status"].ToString();

                list.Add(c);
            }

            con.Close();

            return Ok(list);
        }

        [HttpGet("{id}")]
        public IActionResult GetCandidate(int id)
        {
            Candidate c = new Candidate();

            SqlConnection con = db.GetConnection();

            string query = "SELECT * FROM Candidates WHERE CandidateId = @id";

            SqlCommand cmd = new SqlCommand(query, con);

            cmd.Parameters.AddWithValue("@id", id);

            con.Open();

            SqlDataReader reader = cmd.ExecuteReader();

            if (reader.Read())
            {
                c.CandidateId = Convert.ToInt32(reader["CandidateId"]);
                c.CandidateName = reader["CandidateName"].ToString();
                c.Email = reader["Email"].ToString();
                c.MobileNumber = reader["MobileNumber"].ToString();
                c.DateOfBirth = Convert.ToDateTime(reader["DateOfBirth"]);
                c.Gender = reader["Gender"].ToString();
                c.Qualification = reader["Qualification"].ToString();
                c.Experience = Convert.ToDecimal(reader["Experience"]);
                c.Skills = reader["Skills"].ToString();
                c.PreferredLocation = reader["PreferredLocation"].ToString();
                c.EmploymentType = reader["EmploymentType"].ToString();
                c.Status = reader["Status"].ToString();

                con.Close();

                return Ok(c);
            }

            con.Close();

            return NotFound("Candidate not found");
        }

        [HttpPost]
        public IActionResult AddCandidate(Candidate c)
        {
            SqlConnection con = db.GetConnection();

            string query = @"INSERT INTO Candidates
                    (CandidateName, Email, MobileNumber, DateOfBirth,
                     Gender, Qualification, Experience, Skills,
                     PreferredLocation, EmploymentType, Status)
                    VALUES
                    (@CandidateName, @Email, @MobileNumber, @DateOfBirth,
                     @Gender, @Qualification, @Experience, @Skills,
                     @PreferredLocation, @EmploymentType, @Status)";

            SqlCommand cmd = new SqlCommand(query, con);

            cmd.Parameters.AddWithValue("@CandidateName", c.CandidateName);
            cmd.Parameters.AddWithValue("@Email", c.Email);
            cmd.Parameters.AddWithValue("@MobileNumber", c.MobileNumber);
            cmd.Parameters.AddWithValue("@DateOfBirth", c.DateOfBirth);
            cmd.Parameters.AddWithValue("@Gender", c.Gender);
            cmd.Parameters.AddWithValue("@Qualification", c.Qualification);
            cmd.Parameters.AddWithValue("@Experience", c.Experience);
            cmd.Parameters.AddWithValue("@Skills", c.Skills);
            cmd.Parameters.AddWithValue("@PreferredLocation", c.PreferredLocation);
            cmd.Parameters.AddWithValue("@EmploymentType", c.EmploymentType);
            cmd.Parameters.AddWithValue("@Status", c.Status);

            con.Open();

            cmd.ExecuteNonQuery();

            con.Close();

            return Ok("Candidate added successfully");
        }

        [HttpPut("{id}")]
        public IActionResult UpdateCandidate(int id, Candidate c)
        {
            SqlConnection con = db.GetConnection();

            string query = @"UPDATE Candidates SET
                     CandidateName = @CandidateName,
                     Email = @Email,
                     MobileNumber = @MobileNumber,
                     DateOfBirth = @DateOfBirth,
                     Gender = @Gender,
                     Qualification = @Qualification,
                     Experience = @Experience,
                     Skills = @Skills,
                     PreferredLocation = @PreferredLocation,
                     EmploymentType = @EmploymentType,
                     Status = @Status
                     WHERE CandidateId = @CandidateId";

            SqlCommand cmd = new SqlCommand(query, con);

            cmd.Parameters.AddWithValue("@CandidateId", id);
            cmd.Parameters.AddWithValue("@CandidateName", c.CandidateName);
            cmd.Parameters.AddWithValue("@Email", c.Email);
            cmd.Parameters.AddWithValue("@MobileNumber", c.MobileNumber);
            cmd.Parameters.AddWithValue("@DateOfBirth", c.DateOfBirth);
            cmd.Parameters.AddWithValue("@Gender", c.Gender);
            cmd.Parameters.AddWithValue("@Qualification", c.Qualification);
            cmd.Parameters.AddWithValue("@Experience", c.Experience);
            cmd.Parameters.AddWithValue("@Skills", c.Skills);
            cmd.Parameters.AddWithValue("@PreferredLocation", c.PreferredLocation);
            cmd.Parameters.AddWithValue("@EmploymentType", c.EmploymentType);
            cmd.Parameters.AddWithValue("@Status", c.Status);

            con.Open();

            int rows = cmd.ExecuteNonQuery();

            con.Close();

            if (rows > 0)
            {
                return Ok("Candidate updated successfully");
            }

            return NotFound("Candidate not found");
        }

        [HttpDelete("{id}")]
        public IActionResult DeleteCandidate(int id)
        {
            SqlConnection con = db.GetConnection();

            string query = "DELETE FROM Candidates WHERE CandidateId = @id";

            SqlCommand cmd = new SqlCommand(query, con);

            cmd.Parameters.AddWithValue("@id", id);

            con.Open();

            int rows = cmd.ExecuteNonQuery();

            con.Close();

            if (rows > 0)
            {
                return Ok("Candidate deleted successfully");
            }

            return NotFound("Candidate not found");
        }

        [HttpGet("search")]
        public IActionResult SearchCandidates(
    string name = "",
    string skills = "",
    decimal? experience = null,
    string status = "")
        {
            List<Candidate> list = new List<Candidate>();

            SqlConnection con = db.GetConnection();

            string query = "SELECT * FROM Candidates WHERE 1=1";

            if (name != "")
            {
                query += " AND CandidateName LIKE @name";
            }

            if (skills != "")
            {
                string[] skillList = skills.Split(',');

                query += " AND (";

                for (int i = 0; i < skillList.Length; i++)
                {
                    if (i > 0)
                    {
                        query += " OR ";
                    }

                    query += "LOWER(Skills) LIKE @skill" + i;
                }

                query += ")";
            }

            if (experience.HasValue)
            {
                query += " AND Experience = @experience";
            }

            if (status != "")
            {
                query += " AND Status = @status";
            }

            SqlCommand cmd = new SqlCommand(query, con);

            if (name != "")
            {
                cmd.Parameters.AddWithValue("@name", "%" + name + "%");
            }

            if (skills != "")
            {
                string[] skillList = skills.Split(',');

                for (int i = 0; i < skillList.Length; i++)
                {
                    cmd.Parameters.AddWithValue(
                        "@skill" + i,
                        "%" + skillList[i].Trim().ToLower() + "%");
                }
            }

            if (experience.HasValue)
            {
                cmd.Parameters.AddWithValue("@experience", experience.Value);
            }

            if (status != "")
            {
                cmd.Parameters.AddWithValue("@status", status);
            }

            con.Open();

            SqlDataReader reader = cmd.ExecuteReader();

            while (reader.Read())
            {
                Candidate c = new Candidate();

                c.CandidateId = Convert.ToInt32(reader["CandidateId"]);
                c.CandidateName = reader["CandidateName"].ToString();
                c.Email = reader["Email"].ToString();
                c.MobileNumber = reader["MobileNumber"].ToString();
                c.DateOfBirth = Convert.ToDateTime(reader["DateOfBirth"]);
                c.Gender = reader["Gender"].ToString();
                c.Qualification = reader["Qualification"].ToString();
                c.Experience = Convert.ToDecimal(reader["Experience"]);
                c.Skills = reader["Skills"].ToString();
                c.PreferredLocation = reader["PreferredLocation"].ToString();
                c.EmploymentType = reader["EmploymentType"].ToString();
                c.Status = reader["Status"].ToString();

                list.Add(c);
            }

            con.Close();

            return Ok(list);
        }


    }
}