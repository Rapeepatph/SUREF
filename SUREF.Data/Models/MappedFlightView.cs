//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated from a template.
//
//     Manual changes to this file may cause unexpected behavior in your application.
//     Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace SUREF.Data.Models
{
    using System;
    using System.Collections.Generic;
    
    public partial class MappedFlightView
    {
        public decimal Id { get; set; }
        public decimal FlightID { get; set; }
        public decimal AnotherFlightID { get; set; }
        public System.DateTime TimeFrom { get; set; }
        public System.DateTime TimeTo { get; set; }
        public decimal ZIGMA_E_SQ { get; set; }
        public int N { get; set; }
        public decimal RMS { get; set; }
        public System.DateTime CreateTime { get; set; }
        public System.DateTime ProcessRound { get; set; }
        public string Diagnose { get; set; }
        public decimal F1SensorID { get; set; }
        public string F1AircraftID { get; set; }
        public string F1Callsign { get; set; }
        public string F1Mode3ACode { get; set; }
        public string F1TrackID { get; set; }
        public System.DateTime F1TimeFrom { get; set; }
        public System.DateTime F1TimeTo { get; set; }
        public decimal F2SensorID { get; set; }
        public string F2AircraftID { get; set; }
        public string F2Callsign { get; set; }
        public string F2Mode3ACode { get; set; }
        public string F2TrackID { get; set; }
        public System.DateTime F2TimeFrom { get; set; }
        public System.DateTime F2TimeTo { get; set; }
    }
}