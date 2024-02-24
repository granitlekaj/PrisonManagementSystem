using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PrisonSystemManagement.Data;
using PrisonSystemManagement.Model;

namespace PrisonSystemManagement.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class InfiermeriaController : ControllerBase
    {
        private DataContext _context;

        public InfiermeriaController(DataContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<List<Infiermeria>>> Get()
        {
            return Ok(await _context.Infiermeria.ToListAsync());
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<List<Infiermeria>>> Get(int id)
        {
            var infiermeria = await _context.Infiermeria.FindAsync(id);
            if (infiermeria == null)
                return BadRequest("Infiermeria not found.");
            return Ok(infiermeria);
        }

        [HttpPost]
        public async Task<ActionResult<List<Infiermeria>>> CreateInfiermeria(Infiermeria infiermeria)
        {
            _context.Infiermeria.Add(infiermeria);
            await _context.SaveChangesAsync();

            return Ok(await _context.Infiermeria.ToListAsync());


        }

        [HttpPut("{id}")]
        public async Task<ActionResult<List<Infiermeria>>> UpdateInfiermeria(Infiermeria request)
        {
            var dbInfiermeria = await _context.Infiermeria.FindAsync(request.InfiermeriaID);
            if (dbInfiermeria == null)
                return BadRequest("Infiermeria not found.");

            dbInfiermeria.InfiermeriaID = request.InfiermeriaID;
            dbInfiermeria.SektoriID = request.SektoriID;
            dbInfiermeria.Kapaciteti = request.Kapaciteti;
            dbInfiermeria.Created_at = request.Created_at;
            dbInfiermeria.Updated_at = request.Updated_at;

            await _context.SaveChangesAsync();

            return Ok(await _context.Infiermeria.ToListAsync());
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteInfiermeria(int id)
        {
            var dbInfiermeria = await _context.Infiermeria.FindAsync(id);
            if (dbInfiermeria == null)
                return BadRequest("Infiermeria not found.");

            _context.Infiermeria.Remove(dbInfiermeria);
            await _context.SaveChangesAsync();

            return Ok(await _context.Infiermeria.ToListAsync());
        }
    }
}
