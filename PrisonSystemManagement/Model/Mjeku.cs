namespace PrisonSystemManagement.Model
{
    public class Mjeku
    {
        public int MjekuID { get; set; }
        public string? Emri { get; set; }
        public string? Mbiemri { get; set; }
        public string? Adresa { get; set; }
        public DateTime DateLindja { get; set; }
        public char Gjinia { get; set; }
        public string? GradaAkademike { get; set; }
        public DateTime Created_at { get; set; }
        public DateTime Updated_at { get; set; }
        
    }
}
