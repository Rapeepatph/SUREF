using SUREF.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace SUREF.Controllers
{
    public class MapController : Controller
    {
        // GET: Map
        public ActionResult Index()
        {
            return View();
        }
        [HttpGet]
        public JsonResult getAdsb()
        {
            ADSB app = new ADSB();
            List<ADSBModel> result = new List<ADSBModel>();
            string path = ControllerContext.HttpContext.Server.MapPath("~/DataConfig/ADSBPosition.xml");
            result= app.GetAdsbData(path);
            if (result == null)
            {
                return Json(new  { status = false}, JsonRequestBehavior.AllowGet);
            }
            return Json(result, JsonRequestBehavior.AllowGet);
        }
    }
}