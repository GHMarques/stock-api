using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Stock.Models;

namespace Stock.Repository
{
    public interface IProductRepository
    {
        Task<IEnumerable<Product>> GetAll();
        Task<Product> GetById(int productId);
        Task<Product> Create(Product newProduct);
        Task<Product> Update(Product updateProduct);
        Task<Product> Delete(Product deleteProduct);
    }
}