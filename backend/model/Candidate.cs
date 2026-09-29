namespace CandidateManagementAPI.model
{
   
        public class Candidate
        {
            public int CandidateId { get; set; }

            public string CandidateName { get; set; }

            public string Email { get; set; }

            public string MobileNumber { get; set; }

            public DateTime DateOfBirth { get; set; }

            public string Gender { get; set; }

            public string Qualification { get; set; }

            public decimal Experience { get; set; }

            public string Skills { get; set; }

            public string PreferredLocation { get; set; }

            public string EmploymentType { get; set; }

            public string Status { get; set; }
        }
}
