﻿using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;
using System.Xml;

namespace SUREF.Models
{
    public class ADSBModel
    {
        public string Name { get; set; }
        public string Type { get; set; }
        public int SIC { get; set; }
        public float Lat { get; set; }
        public float Lng { get; set; }

        public ADSBModel(string name, string type, int sic, float lat, float lng)
        {
            Name = name;
            Type = type;
            SIC = sic;
            Lat = lat;
            Lng = lng;
        }
    }
   public class ADSB
    {
        public  List<ADSBModel> GetAdsbData(string path)
        {
             List<ADSBModel> _adsbs =new List<ADSBModel>();

            XmlDocument doc = new XmlDocument();
            doc.Load(path);
            foreach(XmlNode node in doc.DocumentElement)
            {
                string name = node["name"].InnerText;
                string type = node["type"].InnerText;
                int sic = int.Parse(node["sic"].InnerText);
                float lat = ChangeToDouble(node["lat"].InnerText);
                float lng = ChangeToDouble(node["lng"].InnerText);
                ADSBModel adsb = new ADSBModel(name, type, sic, lat, lng);
                _adsbs.Add(adsb);
            }
            return _adsbs;
        }

        private float ChangeToDouble(string innerText)
        {
            string[] data = innerText.Split('|');
            float Degree, Lipda, Filipda, Output;
            Degree = float.Parse(data[0]);
            Lipda = float.Parse(data[1]) / 60;
            Filipda = float.Parse(data[2]) / 3600;
            Output = Degree + Lipda + Filipda;
            return Output;
        }
    }

}