﻿using System.Web;
using System.Web.Optimization;

namespace SUREF
{
    public class BundleConfig
    {
        // For more information on bundling, visit http://go.microsoft.com/fwlink/?LinkId=301862
        public static void RegisterBundles(BundleCollection bundles)
        {
            bundles.Add(new ScriptBundle("~/bundles/jquery").Include(
                        "~/Scripts/jquery-{version}.js"));

            bundles.Add(new ScriptBundle("~/bundles/jqueryval").Include(
                        "~/Scripts/jquery.validate*"));

            // Use the development version of Modernizr to develop with and learn from. Then, when you're
            // ready for production, use the build tool at http://modernizr.com to pick only the tests you need.
            bundles.Add(new ScriptBundle("~/bundles/modernizr").Include(
                        "~/Scripts/modernizr-*"));

            bundles.Add(new ScriptBundle("~/bundles/bootstrap").Include(
                      "~/Scripts/bootstrap.js",
                      "~/Scripts/respond.js"));
            bundles.Add(new ScriptBundle("~/bundles/moment").Include(
                      "~/Scripts/moment.min.js"));
            bundles.Add(new StyleBundle("~/Content/css").Include(
                      "~/Content/bootstrap.css",
                      "~/Content/site.css",
                      "~/Content/leaflet.css",
                      "~/Content/leaflet.label.css",
                      "~/Content/font-awesome.min.css",
                      "~/Content/ng-table.css"));
            bundles.Add(new ScriptBundle("~/bundles/angular").Include(
                      "~/Scripts/angular.js",
                      "~/Scripts/angular-route.js",
                      "~/Scripts/angular-resource.js",
                      "~/Scripts/app/app.js",
                      "~/Scripts/app/services.js",
                      "~/Scripts/app/flight.js",
                      "~/Scripts/ng-table.js",
                      "~/Scripts/ui-bootstrap-tpls.js"
                      ));
            bundles.Add(new ScriptBundle("~/bundles/leaflet").Include(
                      "~/Scripts/leaflet.js",
                      "~/Scripts/app/mapFix.js",
                      "~/Scripts/leaflet.label.js",
                      "~/Scripts/leaflet.polylineDecorator.js",
                      "~/Scripts/angular-leaflet-directive.min.js"
                      ));
            bundles.Add(new ScriptBundle("~/bundles/highcharts").Include(
                      //"~/Scripts/highcharts.js",
                      "~/Scripts/highcharts.src.js",
                      "~/Scripts/app/chart.js",
                      "~/Scripts/app/getChart.js",
                      "~/Scripts/highcharts-ng.js"
                      ));
        }
    }
}
