using System;

namespace PrisonSystemManagement.Services.Photos
{
    public class PhotoRetriever
    {
        private const string PhotosFolderPath = "Services/Photos/Uploads";

        public string GetPhotoUrl(string fileName)
        {
            // Combine the folder path and file name to get the full path
            string fullPath = Path.Combine(PhotosFolderPath, fileName);

            // Return the URL or file path for accessing the photo
            return fullPath;
        }
    }
}
