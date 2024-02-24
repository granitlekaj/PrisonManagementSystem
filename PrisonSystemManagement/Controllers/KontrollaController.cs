using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PrisonSystemManagement.Data;
using PrisonSystemManagement.Model;

namespace PrisonSystemManagement.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class KontrollaController : ControllerBase
    {

        private DataContext _context;

       public KontrollaController(DataContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<List<Kontrolla>>> Get()
        {
            return Ok(await _context.Kontrolla.ToListAsync());
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<List<Kontrolla>>> Get(int id)
        {
            var kontrolla = await _context.Kontrolla.FindAsync(id);
            if (kontrolla == null)
                return BadRequest("Kontrolla not found.");
            return Ok(kontrolla);
        }

        [HttpPost]
        public async Task<ActionResult<List<Kontrolla>>> CreateKontrolla(Kontrolla kontrolla)
        {
            _context.Kontrolla.Add(kontrolla);
            await _context.SaveChangesAsync();

            return Ok(await _context.Kontrolla.ToListAsync());
        }

        [HttpPut("{id}")]
        public async Task<ActionResult<List<Kontrolla>>> UpdateKontrolla(Kontrolla request)
        {
            var dbKontrolla = await _context.Kontrolla.FindAsync(request.KontrollaID);
            if (dbKontrolla == null)
                return BadRequest("Kontrolla not found.");

            dbKontrolla.KontrollaID = request.KontrollaID;
            dbKontrolla.MjekuID = request.MjekuID;
            dbKontrolla.BurgosuriID = request.BurgosuriID;
            dbKontrolla.InfiermeriaID = request.InfiermeriaID;
            dbKontrolla.Data = request.Data;
            dbKontrolla.Arsyeja = request.Arsyeja;
            dbKontrolla.Created_at = request.Created_at;
            dbKontrolla.Updated_at = request.Updated_at;

            await _context.SaveChangesAsync();

            return Ok(await _context.Kontrolla.ToListAsync());
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteKontrollan(int id)
        {
            var dbKontrolla = await _context.Kontrolla.FindAsync(id);
            if (dbKontrolla == null)
                return BadRequest("Kontrolla not found.");

            _context.Kontrolla.Remove(dbKontrolla);
            await _context.SaveChangesAsync();

            return Ok(await _context.Kontrolla.ToListAsync());
        }
    }
}
