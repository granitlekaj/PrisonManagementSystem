using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using PrisonSystemManagement.Model;

namespace PrisonSystemManagement.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LiftiController : ControllerBase
    {
        private readonly DataContext _context;

        public LiftiController(DataContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Lifti>>> GetLiftet()
        {
            return await _context.Lifti.ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Lifti>> GetLifti(int id)
        {
            var lifti = await _context.Lifti.FindAsync(id);

            if (lifti == null)
            {
                return NotFound();
            }

            return lifti;
        }

        [HttpPost]
        public async Task<ActionResult<Lifti>> PostLifti(Lifti lifti)
        {
            _context.Lifti.Add(lifti);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetLifti), new { id = lifti.LiftiId }, lifti);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> PutLifti(int id, Lifti lifti)
        {
            if (id != lifti.LiftiId)
            {
                return BadRequest();
            }

            _context.Entry(lifti).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!LiftiExists(id))
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
        public async Task<IActionResult> DeleteLifti(int id)
        {
            var lifti = await _context.Lifti.FindAsync(id);
            if (lifti == null)
            {
                return NotFound();
            }

            _context.Lifti.Remove(lifti);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool LiftiExists(int id)
        {
            return _context.Lifti.Any(e => e.LiftiId == id);
        }
    }
}
