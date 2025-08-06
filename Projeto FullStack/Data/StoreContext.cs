using Microsoft.EntityFrameworkCore;
//using System.Data.Entity;

namespace Projeto_FullStack.Data
{
    public class StoreContext : DbContext
    {
        public DbSet<Order>? Orders { get; set; }

        public DbSet<Product>? Products { get; set; }

        public DbSet<User>? Users { get; set; }



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
