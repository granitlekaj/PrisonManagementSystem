using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using PrisonSystemManagement.Model;

namespace PrisonSystemManagement.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class NdertesaController : ControllerBase
    {
        private readonly DataContext _context;

        public NdertesaController(DataContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Ndertesa>>> GetNdertesat()
        {
            return await _context.Ndertesa.ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Ndertesa>> GetNdertesa(int id)
        {
            var ndertesa = await _context.Ndertesa.FindAsync(id);

            if (ndertesa == null)
            {
                return NotFound();
            }

            return ndertesa;
        }

        [HttpPost]
        public async Task<ActionResult<Ndertesa>> PostNdertesa(Ndertesa ndertesa)
        {
            _context.Ndertesa.Add(ndertesa);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetNdertesa), new { id = ndertesa.NdertesaId }, ndertesa);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> PutNdertesa(int id, Ndertesa ndertesa)
        {
            if (id != ndertesa.NdertesaId)
            {
                return BadRequest();
            }

            _context.Entry(ndertesa).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!NdertesaExists(id))
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
        public async Task<IActionResult> DeleteNdertesa(int id)
        {
            var ndertesa = await _context.Ndertesa.FindAsync(id);
            if (ndertesa == null)
            {
                return NotFound();
            }

            _context.Ndertesa.Remove(ndertesa);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool NdertesaExists(int id)
        {
            return _context.Ndertesa.Any(e => e.NdertesaId == id);
        }
    }

}