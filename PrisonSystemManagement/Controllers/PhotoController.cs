using Microsoft.AspNetCore.Mvc;
using System.IO;
using PrisonSystemManagement.Services.Photos;

namespace PrisonSystemManagement.Controllers
{
    [Route("api/photos")]
    [ApiController]
    public class PhotoController : ControllerBase
    {
        private readonly PhotoService _photoService;

        public PhotoController()
        {
            _photoService = new PhotoService();
        }

        [HttpPost]
        [Route("upload")]
        public IActionResult UploadPhoto([FromForm] Stream photoStream, [FromForm] string fileName)
        {
            string uploadedFileName = _photoService.UploadPhoto(photoStream, fileName);

            // You can return a response with the uploaded file name or any other relevant information
            return Ok(uploadedFileName);
        }

        [HttpGet]
        [Route("retrieve/{fileName}")]
        public IActionResult GetPhotoUrl(string fileName)
        {
            string photoUrl = _photoService.GetPhotoUrl(fileName);

            // You can return a response with the photo URL or any other relevant information
            return Ok(photoUrl);
        }

        [HttpPut]
        [Route("update/{fileName}")]
        public IActionResult UpdatePhoto([FromForm] Stream updatedPhotoStream, string fileName)
        {
            _photoService.UpdatePhoto(updatedPhotoStream, fileName);

            // You can return a response with a success message or any other relevant information
            return Ok();
        }

        [HttpDelete]
        [Route("delete/{fileName}")]
        public IActionResult DeletePhoto(string fileName)
        {
            _photoService.DeletePhoto(fileName);

            // You can return a response with a success message or any other relevant information
            return Ok();
        }
    }
}
