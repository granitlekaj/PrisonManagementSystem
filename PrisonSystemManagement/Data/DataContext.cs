using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using PrisonSystemManagement.Model;
using PrisonSystemManagement.DTO;

namespace PrisonSystemManagement.Data
{
    public class DataContext : DbContext
    {
        protected readonly IConfiguration _configuration;

        
        public DataContext(IConfiguration configuration, DbContextOptions<DataContext> options) : base(options)
        {
            _configuration = configuration;
        }

        public DbSet<Drejtori> Drejtori { get; set; }
        public DbSet<Infiermeria> Infiermeria { get; set; }
        public DbSet<Sektori> Sektori { get; set; }
        public DbSet<Oficeri> Oficeri { get; set; }
        public DbSet<Mjeku> Mjeku { get; set; }
        public DbSet<Qelia> Qelia { get; set; }
        public DbSet<Burgosuri> Burgosuri { get; set; }
        public DbSet<Krimi> Krimi { get; set; }
        public DbSet<Kontrolla> Kontrolla { get; set; }
        public DbSet<Vizitori> Vizitori { get; set; }
        public DbSet<Vizita> Vizita { get; set; }
        public DbSet<Users> Users { get; set; }
        public DbSet<Role> Role { get; set; }
        public DbSet<Ndertesa> Ndertesa { get; set; }
        public DbSet<Lifti> Lifti { get; set; }
        public DbSet<Lenda> Lenda { get; set; }
        public DbSet<Profesori> Profesori { get; set; }
        public DbSet<Shitorja> Shitorja { get; set; }
        public DbSet<Shitesi> Shitesi { get; set; }

    }
}
