using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PrisonSystemManagement.Data;
using PrisonSystemManagement.Model;

namespace PrisonSystemManagement.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class VizitaController : ControllerBase
    {

        private DataContext _context;

        public VizitaController(DataContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<List<Vizita>>> Get()
        {
            return Ok(await _context.Vizita.ToListAsync());
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<List<Vizita>>> Get(int id)
        {
            var vizita = await _context.Vizita.FindAsync(id);
            if (vizita == null)
                return BadRequest("Vizita not found.");
            return Ok(vizita);
        }

        [HttpPost]
        public async Task<ActionResult<List<Vizita>>> CreateVizita(Vizita vizita)
        {
            _context.Vizita.Add(vizita);
            await _context.SaveChangesAsync();

            return Ok(await _context.Vizita.ToListAsync());
        }

        [HttpPut("{id}")]
        public async Task<ActionResult<List<Vizita>>> UpdateVizita(Vizita request)
        {
            var dbVizita = await _context.Vizita.FindAsync(request.VizitaID);
            if (dbVizita == null)
                return BadRequest("Vizita not found.");

            dbVizita.VizitaID = request.VizitaID;
            dbVizita.VizitoriID = request.VizitoriID;
            dbVizita.BurgosuriID = request.BurgosuriID;
            dbVizita.Afersia = request.Afersia;
            dbVizita.Data = request.Data;
            dbVizita.KohaFillimit = request.KohaFillimit;
            dbVizita.KohaMbarimit = request.KohaMbarimit;
            dbVizita.OficeriID = request.OficeriID;
            dbVizita.Created_at = request.Created_at;
            dbVizita.Updated_at = request.Updated_at;

            await _context.SaveChangesAsync();

            return Ok(await _context.Vizita.ToListAsync());
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteVizitan(int id)
        {
            var dbVizita = await _context.Vizita.FindAsync(id);
            if (dbVizita == null)
                return BadRequest("Vizita not found.");

            _context.Vizita.Remove(dbVizita);
            await _context.SaveChangesAsync();

            return Ok(await _context.Vizita.ToListAsync());
        }
    }
}
