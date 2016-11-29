using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SUREF.Models
{
    public class FlightListViewModel
    {
        public decimal Id { get; set; }
        public decimal SensorID { get; set; }
        public DateTime DateOfFlight { get; set; }
        public string AircraftID { get; set; }
        public string Mode3ACode { get; set; }
        public string FilePath { get; set; }
    }
}