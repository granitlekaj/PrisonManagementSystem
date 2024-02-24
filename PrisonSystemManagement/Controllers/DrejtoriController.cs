using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PrisonSystemManagement.Data;
using PrisonSystemManagement.Model;

namespace PrisonSystemManagement.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    
    public class DrejtoriController : ControllerBase
    {

        private DataContext _context;

        public DrejtoriController(DataContext context)
        {
            _context = context;
        }

        [HttpGet]
        
        public async Task<ActionResult<List<Drejtori>>> Get()
        {
            return Ok(await _context.Drejtori.ToListAsync());
        }

        [HttpGet("{id}")]
        
        public async Task<ActionResult<List<Drejtori>>> Get(int id)
        {
            var drejtori = await _context.Drejtori.FindAsync(id);
            if (drejtori == null)
                return BadRequest("Drejtori not found.");
            return Ok(drejtori);
        }

        [HttpPost]
        public async Task<ActionResult<List<Drejtori>>> CreateDrejtori([FromForm] Drejtori drejtori)
        {
            drejtori.DateLindja = drejtori.DateLindja.Date;
            _context.Drejtori.Add(drejtori);
            await _context.SaveChangesAsync();

            return Ok(await _context.Drejtori.ToListAsync());
        }

        [HttpPut("{id}")]
        public async Task<ActionResult<List<Drejtori>>> UpdateDrejtori(Drejtori request)
        {
            var dbDrejtori = await _context.Drejtori.FindAsync(request.DrejtoriID);
            if (dbDrejtori == null)
                return BadRequest("Drejtori not found.");

            dbDrejtori.DrejtoriID = request.DrejtoriID;
            dbDrejtori.SektoriID = request.SektoriID;
            dbDrejtori.Emri = request.Emri;
            dbDrejtori.Mbiemri = request.Mbiemri;
            dbDrejtori.Adresa = request.Adresa;
            dbDrejtori.DateLindja = request.DateLindja;
            dbDrejtori.Gjinia = request.Gjinia;
            dbDrejtori.Created_at = request.Created_at;
            dbDrejtori.Updated_at = request.Updated_at;
           

            await _context.SaveChangesAsync();

            return Ok(await _context.Drejtori.ToListAsync());
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteDrejtorin(int id)
        {
            var dbDrejtori = await _context.Drejtori.FindAsync(id);
            if (dbDrejtori == null)
                return BadRequest("Drejtori not found.");

            _context.Drejtori.Remove(dbDrejtori);
            await _context.SaveChangesAsync();

            return Ok(await _context.Drejtori.ToListAsync());
        }
    }
}
