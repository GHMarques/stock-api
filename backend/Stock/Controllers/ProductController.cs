using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Microsoft.AspNetCore.Cors;

using Stock.Models;
using Stock.Repository;

namespace Stock.Controllers
{

  [ApiController]
  [Route("[controller]")]
  public class ProductController : ControllerBase
  {
    private readonly IProductRepository _repository;

    public ProductController(IProductRepository repository)
    {
      _repository = repository;
    }
    [HttpGet]
    public async Task<ActionResult<IEnumerable<Product>>> GetAll()
    {
      var productList = await _repository.GetAll();
      return Ok(productList);
    }

    [HttpGet("{productId}")]
    public async Task<ActionResult<Product>> GetById(int productId)
    {
      var product = await _repository.GetById(productId);
      if (product == null)
      {
        return NotFound("Product not found.");
      }
      return Ok(product);
    }

    [HttpPost]
    public async Task<ActionResult<Product>> Create([FromBody] Product newProduct)
    {
      if (!ModelState.IsValid)
      {
        return BadRequest(ModelState);
      }

      var product = await _repository.Create(newProduct);
      return CreatedAtAction("GetById", new { ProductId = product.ProductId }, product);
    }

    [HttpPut]
    public async Task<ActionResult<Product>> Update([FromBody] Product product)
    {
      if (!ModelState.IsValid)
      {
        return BadRequest(ModelState);
      }
      else if (product == null)
      {
        return NotFound("Inform the product, please.");
      }

      var editProduct = await _repository.Update(product);
      if (editProduct == null)
      {
        return NotFound("Product does not exist.");
      }
      return Ok(editProduct);
    }

    [HttpDelete("{productId}")]
    public async Task<ActionResult<Product>> Delete(int productId)
    {
      var product = await _repository.GetById(productId);
      if (product == null)
      {
        return NotFound("Product not found.");
      }

      var remove = await _repository.Delete(product);
      return Ok(remove);
    }


  }
}