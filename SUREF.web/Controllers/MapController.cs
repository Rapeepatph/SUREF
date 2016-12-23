using SUREF.Data.Models;
using SUREF.Models;
using SUREF.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.RegularExpressions;
using System.Web;
using System.Web.Mvc;

namespace SUREF.Controllers
{
    [Authorize]
    public class MapController : Controller
    {
        private App app = new App(testing: false);
        // GET: Map
        public ActionResult Index(string id,string date)
        {
            var flight = app.FlightView.Query(x => x.AircraftID == id).FirstOrDefault();
            ViewBag.TimeFrom = flight.TimeFrom.TimeOfDay;
            ViewBag.TimeTo = flight.TimeTo.TimeOfDay;
            ViewBag.AircraftID = id;
            ViewBag.Date = Regex.Replace(date, "-", "");
            return View();
        }
        public ActionResult testMap()
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
        [HttpGet]
        public JsonResult getTrack(int sensor,string date,string id)
        {
            try
            {
                string path = ControllerContext.HttpContext.Server.MapPath("~/Data/" + sensor + "/" + date + "/" + id);
                List<List<object>> result = GetJsonData.getData(path,date);
                if (result == null)
                {
                    return Json(new { status = false }, JsonRequestBehavior.AllowGet);
                }
                return Json(result, JsonRequestBehavior.AllowGet);
            }
            catch(Exception)
            {
                return null;
            }
        }
        
        protected override void Dispose(bool disposing)
        {
            if (disposing) app.Dispose();
            base.Dispose(disposing);
        }
    }
}