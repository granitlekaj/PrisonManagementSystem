namespace PrisonSystemManagement.Model
{
    public class Infiermeria
    {
        public int InfiermeriaID { get; set; }
        public int SektoriID { get; set; }
        public string? Kapaciteti { get; set; }
        public DateTime Created_at { get; set; }
        public DateTime Updated_at { get; set; }
    }
}
