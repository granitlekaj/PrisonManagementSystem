using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PrisonSystemManagement.Data;
using PrisonSystemManagement.Model;

namespace PrisonSystemManagement.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class QeliaController : ControllerBase
    {
        private DataContext _context;

        public QeliaController(DataContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<List<Qelia>>> Get()
        {
            return Ok(await _context.Qelia.ToListAsync());
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<List<Qelia>>> Get(int id)
        {
            var qelia = await _context.Qelia.FindAsync(id);
            if (qelia == null)
                return BadRequest("Qelia not found.");
            return Ok(qelia);
        }

        [HttpPost]
        public async Task<ActionResult<List<Qelia>>> CreateQelia(Qelia qelia)
        {
            _context.Qelia.Add(qelia);
            await _context.SaveChangesAsync();

            return Ok(await _context.Qelia.ToListAsync());


        }

        [HttpPut("{id}")]
        public async Task<ActionResult<List<Qelia>>> UpdateQelia(Qelia request)
        {
            var dbQelia = await _context.Qelia.FindAsync(request.QeliaID);
            if (dbQelia == null)
                return BadRequest("Qelia not found.");

            dbQelia.QeliaID = request.QeliaID;
            dbQelia.EmriQelis = request.EmriQelis;
            dbQelia.KapacitetiTeBurgosurve = request.KapacitetiTeBurgosurve;
            dbQelia.SektoriID = request.SektoriID;
            dbQelia.Created_at = request.Created_at;
            dbQelia.Updated_at = request.Updated_at;

            await _context.SaveChangesAsync();

            return Ok(await _context.Qelia.ToListAsync());
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteQelia(int id)
        {
            var dbQelia = await _context.Qelia.FindAsync(id);
            if (dbQelia == null)
                return BadRequest("Qelia not found.");

            _context.Qelia.Remove(dbQelia);
            await _context.SaveChangesAsync();

            return Ok(await _context.Qelia.ToListAsync());
        }
    }
}
