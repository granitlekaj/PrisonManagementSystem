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
    public class ShitorjaController : ControllerBase
    {
        private readonly DataContext _context;

        public ShitorjaController(DataContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Shitorja>>> GetShitorjet()
        {
            return await _context.Shitorja.ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Shitorja>> GetShitorja(int id)
        {
            var shitorja = await _context.Shitorja.FindAsync(id);

            if (shitorja == null)
            {
                return NotFound();
            }

            return shitorja;
        }

        [HttpPost]
        public async Task<ActionResult<Shitorja>> PostShitorja(Shitorja shitorja)
        {
            _context.Shitorja.Add(shitorja);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetShitorja), new { id = shitorja.ShitorjaId }, shitorja);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> PutShitorja(int id, Shitorja shitorja)
        {
            if (id != shitorja.ShitorjaId)
            {
                return BadRequest();
            }

            _context.Entry(shitorja).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ShitorjaExists(id))
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
        public async Task<IActionResult> DeleteShitorja(int id)
        {
            var shitorja = await _context.Shitorja.FindAsync(id);
            if (shitorja == null)
            {
                return NotFound();
            }

            _context.Shitorja.Remove(shitorja);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool ShitorjaExists(int id)
        {
            return _context.Shitorja.Any(e => e.ShitorjaId == id);
        }
    }
}

