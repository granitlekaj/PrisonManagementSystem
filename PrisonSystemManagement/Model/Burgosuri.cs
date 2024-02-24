namespace PrisonSystemManagement.Model
{
    public class Burgosuri
    {
        public int BurgosuriID { get; set; }
        public string? Emri { get; set; }
        public string? Mbiemri { get; set; }
        public string? Adresa { get; set; }

        public DateTime DataHyrjes { get; set; }
        public DateTime DataDaljes { get; set; }
        public DateTime DateLindja { get; set; }
        public int QeliaID { get; set; }
        public char Gjinia { get; set; }
        public DateTime Created_at { get; set; }
        public DateTime Updated_at { get; set; }
       
        
    }
}
