using Newtonsoft.Json;
using SurveillanceDataKeeper;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;

namespace SUREF.Models
{
    public class GetJsonData
    {
        public static List<List<object>> getData(string path,string date)
        {
            List<List<object>> result = new List<List<object>>(); 
            //string date = "20161102";            
            //string filename = "C:\\Users\\Rapeepatph\\Documents\\Visual Studio 2015\\Projects\\lib for n p\\temp_21_62top\\1\\"+date+"\\"+key;
            if (File.Exists(path))
            {
                string[] lines = System.IO.File.ReadAllLines(path);
                foreach (string line in lines)
                {
                    try
                    {
                        IMetaDataS meta = new MetaDataS();
                        meta.StringToObj(line);
                        DateTime dt = getDateTime(date, meta.TimeOfDay);
                        if (meta.Latitude == null) continue;
                        double latitude = meta.Latitude.Value;
                        if (meta.Longitude == null) continue;
                        double longitude = meta.Longitude.Value;
                        double? height = (meta.Cat == 21) ? meta.GeometricHeight : meta.GeometricAltitude;
                        short sic = meta.SelectedSIC;
                        int cat = meta.Cat;
                        List<string> source = meta.Source;
                        List<short> sic_list = new List<short>();
                        if(source !=null)
                        {
                            foreach (string item in source)
                            {
                                string[] element = item.Split(',');
                                sic_list.Add(Int16.Parse(element[1]));
                            }
                        }
                        List<object> each = new List<object>();
                        //string eachPoint = dt.ToString("yyyy-MM-dd hh:mm:ss.fff") + "," + latitude + "," + longitude + "," + sic.ToString() + "," + JsonConvert.SerializeObject(sic_list);                
                        each.Add(dt.ToString("yyyy-MM-dd HH:mm:ss.fff"));
                        each.Add(latitude);
                        each.Add(longitude);
                        each.Add((height == null)?"n/a": height.Value.ToString());
                        each.Add(sic);
                        each.Add(sic_list);
                        each.Add(cat);
                        result.Add(each);
                    }
                    catch(Exception ex)
                    {
                        throw;
                    }
                }
                return result;
            }
            return null;

        }

        public static DateTime getDateTime(string date, double timeOfDay)
        {
            int year = Int32.Parse(date.Substring(0, 4));
            int month = Int32.Parse(date.Substring(4, 2));
            int day = Int32.Parse(date.Substring(6, 2));
            DateTime result = new DateTime(year,month,day,0,0,0);
            result = result.AddSeconds(timeOfDay);
            return result;
        }
    }
}