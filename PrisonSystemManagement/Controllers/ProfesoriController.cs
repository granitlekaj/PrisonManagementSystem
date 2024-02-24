using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PrisonSystemManagement.Model;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PrisonSystemManagement.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProfesoriController : ControllerBase
    {
        private readonly DataContext _context;

        public ProfesoriController(DataContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Profesori>>> GetProfesorat()
        {
            return await _context.Profesori.ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Profesori>> GetProfesori(int id)
        {
            var profesori = await _context.Profesori.FindAsync(id);

            if (profesori == null)
            {
                return NotFound();
            }

            return profesori;
        }

        [HttpPost]
        public async Task<ActionResult<Profesori>> PostProfesori(Profesori profesori)
        {
            _context.Profesori.Add(profesori);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetProfesori), new { id = profesori.ProfesoriId }, profesori);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> PutProfesori(int id, Profesori profesori)
        {
            if (id != profesori.ProfesoriId)
            {
                return BadRequest();
            }

            _context.Entry(profesori).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ProfesoriExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteProfesori(int id)
        {
            var profesori = await _context.Profesori.FindAsync(id);
            if (profesori == null)
            {
                return NotFound();
            }

            _context.Profesori.Remove(profesori);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool ProfesoriExists(int id)
        {
            return _context.Profesori.Any(e => e.ProfesoriId == id);
        }
    }
}
