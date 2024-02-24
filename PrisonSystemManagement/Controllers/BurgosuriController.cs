using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PrisonSystemManagement.Model;
using PrisonSystemManagement.Data;
using Microsoft.AspNetCore.Authorization;

namespace PrisonSystemManagement.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BurgosuriController : ControllerBase
        {

            private DataContext _context;

            public BurgosuriController(DataContext context)
            {
                _context = context;
            }

            [HttpGet]
            
            public async Task<ActionResult<List<Burgosuri>>> Get()
            {
                return Ok(await _context.Burgosuri.ToListAsync());
            }

            [HttpGet("{id}")]
            public async Task<ActionResult<List<Burgosuri>>> Get(int id)
            {
                var burgosuri = await _context.Burgosuri.FindAsync(id);
                if (burgosuri == null)
                    return BadRequest("Burgosuri not found.");
                return Ok(burgosuri);
            }

            [HttpPost]
            public async Task<ActionResult<List<Burgosuri>>> CreateBurgosuri(Burgosuri burgosuri)
            {
                burgosuri.DateLindja = burgosuri.DateLindja.Date;
                _context.Burgosuri.Add(burgosuri);
                await _context.SaveChangesAsync();

                return Ok(await _context.Burgosuri.ToListAsync());
            }

            [HttpPut("{id}")]
            public async Task<ActionResult<List<Burgosuri>>> UpdateBurgosuri(Burgosuri request)
            {
                var dbBurgosuri = await _context.Burgosuri.FindAsync(request.BurgosuriID);
                if (dbBurgosuri == null)
                    return BadRequest("Burgosuri not found.");

                dbBurgosuri.BurgosuriID = request.BurgosuriID;
                dbBurgosuri.Emri = request.Emri;
                dbBurgosuri.Mbiemri = request.Mbiemri;
                dbBurgosuri.Adresa = request.Adresa;
                dbBurgosuri.DataHyrjes = request.DataHyrjes;
                dbBurgosuri.DataDaljes = request.DataDaljes;
                dbBurgosuri.DateLindja = request.DateLindja;
                dbBurgosuri.QeliaID = request.QeliaID;
                dbBurgosuri.Gjinia = request.Gjinia;
                dbBurgosuri.Created_at = request.Created_at;
                dbBurgosuri.Updated_at = request.Updated_at;
        

                await _context.SaveChangesAsync();

                return Ok(await _context.Burgosuri.ToListAsync());
            }

            [HttpDelete("{id}")]
            public async Task<IActionResult> DeleteBurgosurin(int id)
            {
                var dbBurgosuri = await _context.Burgosuri.FindAsync(id);
                if (dbBurgosuri == null)
                    return BadRequest("Burgosuri not found.");

                _context.Burgosuri.Remove(dbBurgosuri);
                await _context.SaveChangesAsync();

                return Ok(await _context.Burgosuri.ToListAsync());
            }
       
    }
}
