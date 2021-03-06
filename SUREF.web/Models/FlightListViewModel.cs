﻿using System;
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
        public string CallSign { get; set; }
        public string  TimeFrom { get; set; }
        public string TimeTo { get; set; }
        public DateTime CreateTime { get; set; }
        public DateTime ProcessRound { get; set; }
        public string Mode3ACode { get; set; }
        public string FilePath { get; set; }
    }
}