using Microsoft.EntityFrameworkCore;

using Stock.Models;

namespace Stock.Database
{
    public class StockContext : DbContext
    {

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            //SQLite source file
            optionsBuilder.UseSqlite(@"Data Source=../../database/Stock.db;");
        }
        //include models
        public DbSet<Product> Product { get; set; }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            //fill database
            modelBuilder.Entity<Product>().HasData(
                new Product() { ProductId = 1, Name = "Product 1", Quantity = 1, UnitValue = 1.50 },
                new Product() { ProductId = 2, Name = "Product 2", Quantity = 2, UnitValue = 10.00 }
            );
        }
    }
}