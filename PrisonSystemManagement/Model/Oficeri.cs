using System.ComponentModel.DataAnnotations.Schema;

namespace PrisonSystemManagement.Model
{
    public class Oficeri
    {
      public int OficeriID { get; set; }
      public string? Emri { get; set; }
      public string? Mbiemri { get; set; }
      public string? Adresa { get; set; }
      public DateTime DateLindja { get; set; }
      public char Gjinia { get; set; }
      public DateTime Created_at { get; set; }
      public DateTime Updated_at { get; set; }
    }
}
