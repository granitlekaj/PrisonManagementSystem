using System;
using System.IO;

namespace PrisonSystemManagement.Services.Photos
{
    public class PhotoUploader
    {
        private const string PhotosFolderPath = "Services/Photos/Uploads";

        public string UploadPhoto(Stream photoStream, string fileName)
        {
            // Generate a unique file name to avoid conflicts
            string uniqueFileName = Guid.NewGuid().ToString() + Path.GetExtension(fileName);

            // Combine the folder path and unique file name to get the full path
            string fullPath = Path.Combine(PhotosFolderPath, uniqueFileName);

            // Save the photo to the specified path
            using (var fileStream = new FileStream(fullPath, FileMode.Create))
            {
                photoStream.CopyTo(fileStream);
            }

            // Return the unique file name (or the full path, depending on your needs)
            return uniqueFileName;
        }
    }
}
