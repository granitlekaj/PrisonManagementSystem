namespace PrisonSystemManagement.Model
{
    public class Vizitori
    {
        public int VizitoriID { get; set; }
        public string? Emri { get; set; }
        public string? Mbiemri { get; set; }
        public string? Adresa { get; set; }
        public DateTime Created_at { get; set; }
        public DateTime Updated_at { get; set; }
    }
}
