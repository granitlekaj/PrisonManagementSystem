using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PrisonSystemManagement.Data;
using PrisonSystemManagement.Model;

namespace PrisonSystemManagement.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class KrimiController : ControllerBase
    {
        private DataContext _context;

        public KrimiController(DataContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<List<Krimi>>> Get()
        {
            return Ok(await _context.Krimi.ToListAsync());
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<List<Krimi>>> Get(int id)
        {
            var krimi = await _context.Krimi.FindAsync(id);
            if (krimi == null)
                return BadRequest("Krimi not found.");
            return Ok(krimi);
        }

        [HttpPost]
        public async Task<ActionResult<List<Krimi>>> CreateKrimi(Krimi krimi)
        {
            _context.Krimi.Add(krimi);
            await _context.SaveChangesAsync();

            return Ok(await _context.Krimi.ToListAsync());


        }

        [HttpPut("{id}")]
        public async Task<ActionResult<List<Krimi>>> UpdateKrimi(Krimi request)
        {
            var dbKrimi = await _context.Krimi.FindAsync(request.KrimiID);
            if (dbKrimi == null)
                return BadRequest("Krimi not found.");

            dbKrimi.KrimiID = request.KrimiID;
            dbKrimi.BurgosuriID = request.BurgosuriID;
            dbKrimi.DataKrimit = request.DataKrimit;
            dbKrimi.LlojiKrimit = request.LlojiKrimit;
            dbKrimi.Created_at = request.Created_at;
            dbKrimi.Updated_at = request.Updated_at;

            await _context.SaveChangesAsync();

            return Ok(await _context.Krimi.ToListAsync());
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteKrimi(int id)
        {
            var dbKrimi = await _context.Krimi.FindAsync(id);
            if (dbKrimi == null)
                return BadRequest("Krimi not found.");

            _context.Krimi.Remove(dbKrimi);
            await _context.SaveChangesAsync();

            return Ok(await _context.Krimi.ToListAsync());
        }
    }
}
