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
    public class ShitesiController : ControllerBase
    {
        private readonly DataContext _context;

        public ShitesiController(DataContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Shitesi>>> GetShitesit()
        {
            return await _context.Shitesi.ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Shitesi>> GetShitesi(int id)
        {
            var shitesi = await _context.Shitesi.FindAsync(id);

            if (shitesi == null)
            {
                return NotFound();
            }

            return shitesi;
        }

        [HttpPost]
        public async Task<ActionResult<Shitesi>> PostShitesi(Shitesi shitesi)
        {
            _context.Shitesi.Add(shitesi);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetShitesi), new { id = shitesi.ShitesiId }, shitesi);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> PutShitesi(int id, Shitesi shitesi)
        {
            if (id != shitesi.ShitesiId)
            {
                return BadRequest();
            }

            _context.Entry(shitesi).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ShitesiExists(id))
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
        public async Task<IActionResult> DeleteShitesi(int id)
        {
            var shitesi = await _context.Shitesi.FindAsync(id);
            if (shitesi == null)
            {
                return NotFound();
            }

            _context.Shitesi.Remove(shitesi);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool ShitesiExists(int id)
        {
            return _context.Shitesi.Any(e => e.ShitesiId == id);
        }
    }
}
