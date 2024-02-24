using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PrisonSystemManagement.Data;
using PrisonSystemManagement.Model;

namespace PrisonSystemManagement.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class VizitoriController : ControllerBase
    {

        private DataContext _context;

        public VizitoriController(DataContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<List<Vizitori>>> Get()
        {
            return Ok(await _context.Vizitori.ToListAsync());
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<List<Vizitori>>> Get(int id)
        {
            var vizitori = await _context.Vizitori.FindAsync(id);
            if (vizitori == null)
                return BadRequest("Vizitori not found.");
            return Ok(vizitori);
        }

        [HttpPost]
        public async Task<ActionResult<List<Vizitori>>> CreateVizitori(Vizitori vizitori)
        {
            _context.Vizitori.Add(vizitori);
            await _context.SaveChangesAsync();

            return Ok(await _context.Vizitori.ToListAsync());
        }

        [HttpPut("{id}")]
        public async Task<ActionResult<List<Vizitori>>> UpdateVizitori(Vizitori request)
        {
            var dbVizitori = await _context.Vizitori.FindAsync(request.VizitoriID);
            if (dbVizitori == null)
                return BadRequest("Vizitori not found.");

            dbVizitori.VizitoriID = request.VizitoriID;
            dbVizitori.Emri = request.Emri;
            dbVizitori.Mbiemri = request.Mbiemri;
            dbVizitori.Adresa = request.Adresa;
            dbVizitori.Created_at = request.Created_at;
            dbVizitori.Updated_at = request.Updated_at;

            await _context.SaveChangesAsync();

            return Ok(await _context.Vizitori.ToListAsync());
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteVizitorin(int id)
        {
            var dbVizitori = await _context.Vizitori.FindAsync(id);
            if (dbVizitori == null)
                return BadRequest("Vizitori not found.");

            _context.Vizitori.Remove(dbVizitori);
            await _context.SaveChangesAsync();

            return Ok(await _context.Vizitori.ToListAsync());
        }
    }
}
