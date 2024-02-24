using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace PrisonSystemManagement.Model
{
    public class Drejtori
    {
        public int DrejtoriID { get; set; }
        public int SektoriID { get; set; }
        public string? Emri { get; set; }
        public string? Mbiemri { get; set; }
        public string? Adresa { get; set; }
        public DateTime DateLindja { get; set; }
        public char Gjinia { get; set; }
        public DateTime Created_at { get; set; }
        public DateTime Updated_at { get; set; }
        

    }
}
