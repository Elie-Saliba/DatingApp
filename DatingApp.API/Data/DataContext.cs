using DatingApp.API.Models;
using Microsoft.EntityFrameworkCore;

namespace DatingApp.API.Data
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions<DataContext> optiions) : base(optiions){}
        
        public DbSet<Value> Values { get; set; }

        public DbSet<User> Users{ get; set; }
    }

}