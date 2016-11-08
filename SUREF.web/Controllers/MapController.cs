using SUREF.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace SUREF.Controllers
{
    [Authorize]
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
            try
            {
                Surveillance sur = new Surveillance();
                List<SurveillanceModel> result = new List<SurveillanceModel>();
                string path = ControllerContext.HttpContext.Server.MapPath("~/DataConfig/ADSBPosition.xml");
                result = sur.GetData(path);
                if (result == null)
                {
                    return Json(new { status = false }, JsonRequestBehavior.AllowGet);
                }
                return Json(result, JsonRequestBehavior.AllowGet);
            }
            catch
            {
                return null;
            }
        }
        [HttpGet]
        public JsonResult getSSR()
        {
            try
            {
                Surveillance sur = new Surveillance();
                List<SurveillanceModel> result = new List<SurveillanceModel>();
                string path = ControllerContext.HttpContext.Server.MapPath("~/DataConfig/SSRPosition.xml");
                result = sur.GetData(path);
                if (result == null)
                {
                    return Json(new { status = false }, JsonRequestBehavior.AllowGet);
                }
                return Json(result, JsonRequestBehavior.AllowGet);
            }
            catch
            {
                return null;
            }
        }
    }
}