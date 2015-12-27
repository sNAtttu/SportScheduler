using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Data.Entity.Validation;
using System.Diagnostics;
using System.Linq;
using System.Web.Http;
using System.Web.Http.Cors;

namespace SportSchedApi.Controllers
{
    [RoutePrefix("api/Exercise")]
    public class ExerciseController : ApiController
    {
        public List<Exercise> Get()
        {
            List<Exercise> exercises = new List<Exercise>();
            var dbx = new SportSchedEntities();
            exercises = dbx.Exercises.Select(e => e).ToList();
            return exercises;
        }
        [Route("Seed")]
        public string GetSeed()
        {
            try {
                var dbx = new SportSchedEntities();
                Exercise ex = new Exercise {ExerciseType = "Running", ScheduledTime = DateTime.Now, Title = "Aamulenkki", Userid = "Santoro" };
                Exercise ex1 = new Exercise { ExerciseType = "Tennis", ScheduledTime = DateTime.Now.Date, Title = "Tennis med Stubu", Userid = "Santoro" };
                Exercise ex2 = new Exercise { ExerciseType = "Running", ScheduledTime = DateTime.Now.Date.AddDays(1), Title = "Saunalenkki", Userid = "Santoro" };
                dbx.Exercises.Add(ex);
                dbx.Exercises.Add(ex1);
                dbx.Exercises.Add(ex2);
                dbx.SaveChanges();
                return "OK";
            }
            catch(DbEntityValidationException dbEx)
            {
                foreach (var validationErrors in dbEx.EntityValidationErrors)
                {
                    foreach (var validationError in validationErrors.ValidationErrors)
                    {
                        Trace.TraceInformation("Property: {0} Error: {1}",
                                                validationError.PropertyName,
                                                validationError.ErrorMessage);
                        Trace.TraceError("lol");
                    }
                }
                return "NOT OK";
            }
            catch(Exception ex)
            {
                string exception = ex.Message;
                Trace.TraceInformation(ex.Message);
                return ex.Message;
            }
        }
    }
}