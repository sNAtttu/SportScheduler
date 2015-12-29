using System;
using System.Collections.Generic;
using System.Data.Entity.Validation;
using System.Diagnostics;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web.Http;

namespace SportSchedApi.Controllers
{
    [RoutePrefix("api/TrainingType")]
    public class TrainingTypeController : ApiController
    {
        public List<TrainingType> Get()
        {
            List<TrainingType> types = new List<TrainingType>();
            var dbx = new SportSchedEntities();
            types = dbx.TrainingTypes.Select(e => e).ToList();
            return types;
        }
        [Route("Seed")]
        public string GetSeed()
        {
            try
            {
                var dbx = new SportSchedEntities();

                TrainingType type = new TrainingType { TrainingType1 = "Running" };
                TrainingType type1 = new TrainingType { TrainingType1 = "Tennis" };
                TrainingType type2 = new TrainingType { TrainingType1 = "Gym" };
                TrainingType type3= new TrainingType { TrainingType1 = "Walking" };
                TrainingType type4 = new TrainingType { TrainingType1 = "Freestyle" };
                dbx.TrainingTypes.Add(type);
                dbx.TrainingTypes.Add(type1);
                dbx.TrainingTypes.Add(type2);
                dbx.TrainingTypes.Add(type3);
                dbx.TrainingTypes.Add(type4);
                dbx.SaveChanges();
                return "OK";
            }
            catch (DbEntityValidationException dbEx)
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
            catch (Exception ex)
            {
                string exception = ex.Message;
                Trace.TraceInformation(ex.Message);
                return ex.Message;
            }
        }
    }
}
