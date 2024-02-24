using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PrisonSystemManagement.Data;
using PrisonSystemManagement.Model;

namespace PrisonSystemManagement.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OficeriController : ControllerBase
    {
        private DataContext _context;

        public OficeriController(DataContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<List<Oficeri>>> Get()
        {
            return Ok(await _context.Oficeri.ToListAsync());
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<List<Oficeri>>> Get(int id)
        {
            var oficeri = await _context.Oficeri.FindAsync(id);
            if (oficeri == null)
                return BadRequest("Officeri not found.");
            return Ok(oficeri);
        }

        [HttpPost]
        public async Task<ActionResult<List<Oficeri>>> CreateOficeri(Oficeri oficeri)
        {
            oficeri.DateLindja = oficeri.DateLindja.Date;
            _context.Oficeri.Add(oficeri);
            await _context.SaveChangesAsync();

            return Ok(await _context.Oficeri.ToListAsync());
        }

        [HttpPut("{id}")]
        public async Task<ActionResult<List<Oficeri>>> UpdateOficeri(Oficeri request)
        {
            var dbOficeri = await _context.Oficeri.FindAsync(request.OficeriID);
            if (dbOficeri == null)
                return BadRequest("Oficeri not found.");

            dbOficeri.OficeriID = request.OficeriID;
            dbOficeri.Emri = request.Emri;
            dbOficeri.Mbiemri = request.Mbiemri;
            dbOficeri.Adresa = request.Adresa;
            dbOficeri.DateLindja = request.DateLindja;
            dbOficeri.Gjinia = request.Gjinia;
            dbOficeri.Created_at = request.Created_at;
            dbOficeri.Updated_at = request.Updated_at;


            await _context.SaveChangesAsync();

            return Ok(await _context.Oficeri.ToListAsync());
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteOficeri(int id)
        {
            var dbOficeri = await _context.Oficeri.FindAsync(id);
            if (dbOficeri == null)
                return BadRequest("Oficeri not found.");

            _context.Oficeri.Remove(dbOficeri);
            await _context.SaveChangesAsync();

            return Ok(await _context.Oficeri.ToListAsync());
        }
    }
}
