using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

using Stock.Database;
using Stock.Models;

namespace Stock.Repository
{
    public class ProductRepository : IProductRepository
    {
        private readonly StockContext _context;

        public ProductRepository(StockContext context)
        {
            _context = context;
        }
        public async Task<IEnumerable<Product>> GetAll()
        {
            return await _context.Product.ToListAsync(); //get all produtcs
        }
        public async Task<Product> GetById(int productId)
        {
            return await _context.Product.FindAsync(productId); //get product by id
        }
        public async Task<Product> Create([Bind("Name,Quantity,UnitValue")] Product newProduct)
        {
            //create and return the product
            await _context.Product.AddAsync(newProduct);
            await _context.SaveChangesAsync();
            return newProduct;
        }
        public async Task<Product> Update([Bind("ProductId,Name,Quantity,UnitValue")] Product updateProduct)
        {
            //change status and save
            try {
                _context.Entry(updateProduct).State = EntityState.Modified;
                await _context.SaveChangesAsync();
                return updateProduct;
            }
            catch (DbUpdateConcurrencyException)
            {
                return null; //product not found
            }
        }
        public async Task<Product> Delete(Product deleteProduct)
        {
            _context.Product.Remove(deleteProduct);
            await _context.SaveChangesAsync();

            return deleteProduct;
        }
    }
}