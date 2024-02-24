using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PrisonSystemManagement.Data;
using PrisonSystemManagement.Model;

namespace PrisonSystemManagement.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SektoriController : ControllerBase
    {
        private DataContext _context;

        public SektoriController(DataContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<List<Sektori>>> Get()
        {
            return Ok(await _context.Sektori.ToListAsync());
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<List<Sektori>>> Get(int id)
        {
            var sektori = await _context.Sektori.FindAsync(id);
            if (sektori == null)
                return BadRequest("Sektori not found.");
            return Ok(sektori);
        }

        [HttpPost]
        public async Task<ActionResult<List<Sektori>>> CreateSektori(Sektori sektori)
        {
            _context.Sektori.Add(sektori);
            await _context.SaveChangesAsync();

            return Ok(await _context.Sektori.ToListAsync());


        }

        [HttpPut("{id}")]
        public async Task<ActionResult<List<Sektori>>> UpdateSektori(Sektori request)
        {
            var dbSektori = await _context.Sektori.FindAsync(request.SektoriID);
            if (dbSektori == null)
                return BadRequest("Sektori not found.");

            dbSektori.SektoriID = request.SektoriID;
            dbSektori.EmriSektorit = request.EmriSektorit;
            dbSektori.Created_at = request.Created_at;
            dbSektori.Updated_at = request.Updated_at; 

            await _context.SaveChangesAsync();

            return Ok(await _context.Sektori.ToListAsync());
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteSektori(int id)
        {
            var dbSektori = await _context.Sektori.FindAsync(id);
            if (dbSektori == null)
                return BadRequest("Sektori not found.");

            _context.Sektori.Remove(dbSektori);
            await _context.SaveChangesAsync();

            return Ok(await _context.Sektori.ToListAsync());
        }
    }
}
