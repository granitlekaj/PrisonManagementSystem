using System;

namespace PrisonSystemManagement.Services.Photos
{
    public class PhotoDeleter
    {
        private const string PhotosFolderPath = "Services/Photos/Uploads";

        public void DeletePhoto(string fileName)
        {
            // Combine the folder path and file name to get the full path
            string fullPath = Path.Combine(PhotosFolderPath, fileName);

            // Delete the photo from the specified path
            File.Delete(fullPath);
        }
    }
}
