namespace PrisonSystemManagement.Model
{
    public class Kontrolla
    {
        public int KontrollaID { get; set; }
        public int MjekuID { get; set; }
        public int BurgosuriID { get; set; }
        public int InfiermeriaID { get; set; }
        public DateTime Data { get; set; }
        public string? Arsyeja { get; set; }
        public DateTime Created_at { get; set; }
        public DateTime Updated_at { get; set; }
    }
}
