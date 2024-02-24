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
    public class LendaController : ControllerBase
    {
        private readonly DataContext _context;

        public LendaController(DataContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Lenda>>> GetLendet()
        {
            return await _context.Lenda.ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Lenda>> GetLenda(int id)
        {
            var lenda = await _context.Lenda.FindAsync(id);

            if (lenda == null)
            {
                return NotFound();
            }

            return lenda;
        }

        [HttpPost]
        public async Task<ActionResult<Lenda>> PostLenda(Lenda lenda)
        {
            _context.Lenda.Add(lenda);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetLenda), new { id = lenda.LendaId }, lenda);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> PutLenda(int id, Lenda lenda)
        {
            if (id != lenda.LendaId)
            {
                return BadRequest();
            }

            _context.Entry(lenda).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!LendaExists(id))
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
        public async Task<IActionResult> DeleteLenda(int id)
        {
            var lenda = await _context.Lenda.FindAsync(id);
            if (lenda == null)
            {
                return NotFound();
            }

            _context.Lenda.Remove(lenda);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool LendaExists(int id)
        {
            return _context.Lenda.Any(e => e.LendaId == id);
        }
    }
}
