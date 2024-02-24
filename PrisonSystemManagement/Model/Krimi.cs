namespace PrisonSystemManagement.Model
{
    public class Krimi
    {
        public int KrimiID { get; set; }
        public int BurgosuriID { get; set; }
        public DateTime DataKrimit { get; set; }
        public string? LlojiKrimit { get; set; }
        public DateTime Created_at { get; set; }
        public DateTime Updated_at { get; set; }
    }
}
