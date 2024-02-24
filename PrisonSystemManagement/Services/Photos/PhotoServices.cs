using System;
using System.IO;

namespace PrisonSystemManagement.Services.Photos
{
    public class PhotoService
    {
        private readonly PhotoUploader _photoUploader;
        private readonly PhotoRetriever _photoRetriever;
        private readonly PhotoUpdater _photoUpdater;
        private readonly PhotoDeleter _photoDeleter;

        public PhotoService()
        {
            _photoUploader = new PhotoUploader();
            _photoRetriever = new PhotoRetriever();
            _photoUpdater = new PhotoUpdater();
            _photoDeleter = new PhotoDeleter();
        }

        // Example method for uploading a photo
        public string UploadPhoto(Stream photoStream, string fileName)
        {
            return _photoUploader.UploadPhoto(photoStream, fileName);
        }

        // Example method for retrieving a photo URL
        public string GetPhotoUrl(string fileName)
        {
            return _photoRetriever.GetPhotoUrl(fileName);
        }

        // Example method for updating a photo
        public void UpdatePhoto(Stream updatedPhotoStream, string fileName)
        {
            _photoUpdater.UpdatePhoto(updatedPhotoStream, fileName);
        }

        // Example method for deleting a photo
        public void DeletePhoto(string fileName)
        {
            _photoDeleter.DeletePhoto(fileName);
        }
    }
}
