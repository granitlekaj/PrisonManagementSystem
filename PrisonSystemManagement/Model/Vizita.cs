namespace PrisonSystemManagement.Model
{
    public class Vizita
    {
        public int VizitaID { get; set; }
        public int VizitoriID { get; set; }
        public int BurgosuriID { get; set; }
        public string? Afersia { get; set; }
        public DateTime? Data { get; set; }
        public string? KohaFillimit { get; set; }
        public string? KohaMbarimit { get; set; }
        public int OficeriID { get; set; }
        public DateTime Created_at { get; set; }
        public DateTime Updated_at { get; set; }
    }
}
