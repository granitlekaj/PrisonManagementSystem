using System;
using System.IO;

namespace PrisonSystemManagement.Services.Photos
{
    public class PhotoUpdater
    {
        private const string PhotosFolderPath = "Services/Photos/Uploads";

        public void UpdatePhoto(Stream updatedPhotoStream, string fileName)
        {
            // Combine the folder path and file name to get the full path
            string fullPath = Path.Combine(PhotosFolderPath, fileName);

            // Update the photo by overwriting the existing file
            using (var fileStream = new FileStream(fullPath, FileMode.Create))
            {
                updatedPhotoStream.CopyTo(fileStream);
            }
        }
    }
}
