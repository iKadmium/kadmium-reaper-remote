using Microsoft.AspNetCore.Mvc;

namespace kadmium_reaper_remote_dotnet.Controllers
{
    public class HomeController : Controller
    {
        public IActionResult Index()
        {
            return File("/index.html", "text/html");
        }

        public IActionResult Error()
        {
            return View();
        }
    }
}