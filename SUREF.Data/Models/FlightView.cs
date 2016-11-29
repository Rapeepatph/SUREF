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
    
    public partial class FlightView
    {
        public decimal ID { get; set; }
        public decimal SensorID { get; set; }
        public System.DateTime DateofFlight { get; set; }
        public string AircraftID { get; set; }
        public string CallSign { get; set; }
        public string Mode3ACode { get; set; }
        public string TrackID { get; set; }
        public System.DateTime TimeFrom { get; set; }
        public System.DateTime TimeTo { get; set; }
        public int C5M_NR { get; set; }
        public int C5M_NT { get; set; }
        public int C5M_NC_V { get; set; }
        public int C5M_NC_I { get; set; }
        public decimal C5M_R2 { get; set; }
        public decimal C5M_R7 { get; set; }
        public decimal C5M_R14 { get; set; }
        public int C5R_NR { get; set; }
        public int C5R_NT { get; set; }
        public int C5R_NC_V { get; set; }
        public int C5R_NC_I { get; set; }
        public decimal C5R_R2 { get; set; }
        public decimal C5R_R7 { get; set; }
        public decimal C5R_R14 { get; set; }
        public int C3M_NR { get; set; }
        public int C3M_NT { get; set; }
        public int C3M_NC_V { get; set; }
        public int C3M_NC_I { get; set; }
        public decimal C3M_R2 { get; set; }
        public decimal C3M_R7 { get; set; }
        public decimal C3M_R14 { get; set; }
        public int C3R_NR { get; set; }
        public int C3R_NT { get; set; }
        public int C3R_NC_V { get; set; }
        public int C3R_NC_I { get; set; }
        public decimal C3R_R2 { get; set; }
        public decimal C3R_R7 { get; set; }
        public decimal C3R_R14 { get; set; }
        public decimal NUCP { get; set; }
        public int C5M_LONGGAP_COUNT { get; set; }
        public int C5R_LONGGAP_COUNT { get; set; }
        public int C3M_LONGGAP_COUNT { get; set; }
        public int C3R_LONGGAP_COUNT { get; set; }
        public string FilePath { get; set; }
        public System.DateTime CreateTime { get; set; }
        public System.DateTime ProcessRound { get; set; }
    }
}
