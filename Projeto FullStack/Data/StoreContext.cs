//using Microsoft.EntityFrameworkCore;
using System.Data.Entity;
using Microsoft.EntityFrameworkCore;

namespace Projeto_FullStack.Data
{
    public class StoreContext : Microsoft.EntityFrameworkCore.DbContext
    {
        public StoreContext() { }

        public Microsoft.EntityFrameworkCore.DbSet<Order>? Orders { get; set; }

        public Microsoft.EntityFrameworkCore.DbSet<Product>? Products { get; set; }

        public Microsoft.EntityFrameworkCore.DbSet<User>? Users { get; set; }



        protected readonly IConfiguration Configuration;

        public StoreContext(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        protected override void OnConfiguring(DbContextOptionsBuilder options)
        {
            // connect to sql server database
            options.UseSqlServer(Configuration.GetConnectionString("DevConnention"));
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        { 
            //modelBuilder.Entity<ProductsInCart>().HasNoKey();
            //modelBuilder.Entity<ProductsInCart>().HasOne(Order.OrderId);
            modelBuilder.Entity<Order>().HasMany(p => p.ProductsInTheCart);
            modelBuilder.Entity<User>().HasMany(o => o.Orders);
            //modelBuilder.Entity<Order>().HasMany(o => o.Products).HasOne(u=>User);
        }
    }
}
