using backend.Models;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UploadController : Controller
    {
        [HttpPost]
        [Route("uploadFile")]
        public Response UploadFile([FromForm] FileModel fileModel)
        {
            Response response = new Response();

            try
            {
                string path = Path.Combine("@D:\\Programming\\youtube\\Leaning Partner\\file-upload\\backend\\backend\\Resources", fileModel.FileName)
                using(Stream stream = new FileStream(path, FileMode.Create)) 
                {
                    fileModel.file.CopyTo(stream);
                }
                response.StatusCode = 200;
                response.ErrorMessage = "Image created successfully";
            }
            catch (Exception ex)
            {

            }

            return response;
        }
    }
}
