using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace PrisonSystemManagement.Model
{
    public class Profesori
    {
        public int ProfesoriId { get; set; }

        public string Emri { get; set; }

        public int LendaId { get; set; }
    }
}
