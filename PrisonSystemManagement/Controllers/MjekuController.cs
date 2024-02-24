using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PrisonSystemManagement.Data;
using PrisonSystemManagement.Model;

namespace PrisonSystemManagement.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MjekuController : ControllerBase
    {
            private DataContext _context;

            public MjekuController(DataContext context)
            {
                _context = context;
            }

            [HttpGet]
            public async Task<ActionResult<List<Mjeku>>> Get()
            {
                return Ok(await _context.Mjeku.ToListAsync());
            }

            [HttpGet("{id}")]
            public async Task<ActionResult<List<Mjeku>>> Get(int id)
            {
                var mjeku = await _context.Mjeku.FindAsync(id);
                if (mjeku == null)
                    return BadRequest("Mjeku not found.");
                return Ok(mjeku);
            }

            [HttpPost]
            public async Task<ActionResult<List<Mjeku>>> CreateMjeku(Mjeku mjeku)
            {
                mjeku.DateLindja = mjeku.DateLindja.Date;
                _context.Mjeku.Add(mjeku);
                await _context.SaveChangesAsync();

                return Ok(await _context.Mjeku.ToListAsync());
            }

            [HttpPut("{id}")]
            public async Task<ActionResult<List<Mjeku>>> UpdateMjeku(Mjeku request)
            {
                var dbMjeku = await _context.Mjeku.FindAsync(request.MjekuID);
                if (dbMjeku == null)
                    return BadRequest("Mjeku not found.");

                dbMjeku.MjekuID = request.MjekuID;
                dbMjeku.Emri = request.Emri;
                dbMjeku.Mbiemri = request.Mbiemri;
                dbMjeku.Adresa = request.Adresa;
                dbMjeku.DateLindja = request.DateLindja;
                dbMjeku.Gjinia = request.Gjinia;
                dbMjeku.GradaAkademike = request.GradaAkademike;
                dbMjeku.Created_at = request.Created_at;
                dbMjeku.Updated_at = request.Updated_at;

            await _context.SaveChangesAsync();

                return Ok(await _context.Mjeku.ToListAsync());
            }

            [HttpDelete("{id}")]
            public async Task<IActionResult> DeleteMjeku(int id)
            {
                var dbMjeku = await _context.Mjeku.FindAsync(id);
                if (dbMjeku == null)
                    return BadRequest("Mjeku not found.");

                _context.Mjeku.Remove(dbMjeku);
                await _context.SaveChangesAsync();

                return Ok(await _context.Mjeku.ToListAsync());
            }
        
    }
}
