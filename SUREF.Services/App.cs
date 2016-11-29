using CCMS.Core;
using SUREF.Data.Models;
using SUREF.Repositories;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SUREF.Services
{
    public class App : RootClass
    {
        public bool TestingMode { get; private set; }
        public App(bool testing = false)
            : base(testing)
        {
            this.TestingMode = testing;
        }
        protected override DbContext NewDbContext()
        {
            return new SUREFDb();
        }
        protected override void RegisterServices()
        {
            this.AddService<FlightView, FlightService, FlightRepository>();
        }
        protected override void RegisterServicesForUnitTests()
        {
            //this.AddService<Node, NodeService, FakeRepository<Node>>();
        }
        public FlightService FlightView
        {
            get { return this.Services<FlightView, FlightService>(); }
        }
    }
}
