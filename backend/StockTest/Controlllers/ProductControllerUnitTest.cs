using Microsoft.AspNetCore.Mvc;
using Moq;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Xunit;

using Stock.Controllers;
using Stock.Models;
using Stock.Repository;

namespace StockTest
{
    public class ProductControllerUnitTest
    {
        private readonly ProductController _controller;
        private readonly Mock<IProductRepository> _mockRepository;

        public ProductControllerUnitTest()
        {
            _mockRepository = new Mock<IProductRepository>();
            _controller = new ProductController(_mockRepository.Object);
        }

        [Fact]
        public void PassingGetAllReturnType()
        {
            var actual = _controller.GetAll();
            Assert.IsType<Task<ActionResult<IEnumerable<Product>>>>(actual);
        }

        [Fact]
        public async Task PassingGetAllResult()
        {
            _mockRepository.Setup(repository => repository.GetAll()).ReturnsAsync(new List<Product>() { new Product(), new Product()});
            var result = await _controller.GetAll();
            var expected = 2;
            var actual = ((Microsoft.AspNetCore.Mvc.ObjectResult)result.Result).Value as List<Product>;
            var type = Assert.IsType<ActionResult<IEnumerable<Product>>>(result); 
            Assert.Equal(expected, actual.Count());
            _mockRepository.Verify(test => test.GetAll(), Times.Once());
        }

        [Fact]
        public async Task PassingGetByIdType(){
            var product = new Product { ProductId = 5, Name = "Product 5", Quantity = 5, UnitValue = 10 };
            _mockRepository.Setup(actual => actual.GetById(5)).ReturnsAsync(product);
            var result = await _controller.GetById(5);
            var actual = ((Microsoft.AspNetCore.Mvc.ObjectResult)result.Result).Value as Product;
            var type = Assert.IsType<ActionResult<Product>>(result);
            Assert.Equal(product, actual);
        }

        [Theory]
        [InlineData(0)]
        [InlineData(6)]
        public async Task FallingGetByIdType(int productId){
            var product = new Product { ProductId = 5, Name = "Product 5", Quantity = 5, UnitValue = 10 };
            _mockRepository.Setup(actual => actual.GetById(5)).ReturnsAsync(product);
            var expected = "Product not found.";
            var result = await _controller.GetById(productId);
            var actual = ((Microsoft.AspNetCore.Mvc.ObjectResult)result.Result).Value;
            var type = Assert.IsType<ActionResult<Product>>(result);
            Assert.Equal(expected, actual);
            _mockRepository.Verify(test => test.GetById(productId), Times.Once());
        }

        [Fact]
        public async Task PassingCreate(){
            var product = new Product { ProductId = 5, Name = "Product 5", Quantity = 5, UnitValue = 10 };
            _mockRepository.Setup(actual => actual.Create(product)).ReturnsAsync(product);
            var result = await _controller.Create(product);
            var actual = ((Microsoft.AspNetCore.Mvc.ObjectResult)result.Result).Value as Product;
            var type = Assert.IsType<ActionResult<Product>>(result);
            Assert.Equal(product, actual);
            _mockRepository.Verify(test => test.Create(product), Times.Once());
        }

        [Fact]
        public async Task PassingUpdate(){
            var product = new Product { ProductId = 5, Name = "Product 5", Quantity = 5, UnitValue = 10 };
            var expected = new Product { ProductId = 5, Name = "Product 6", Quantity = 6, UnitValue = 1 };
            _mockRepository.Setup(actual => actual.Create(product)).ReturnsAsync(product);
            _mockRepository.Setup(actual => actual.Update(expected)).ReturnsAsync(expected);
            var result = await _controller.Update(expected);
            var actual = ((Microsoft.AspNetCore.Mvc.ObjectResult)result.Result).Value as Product;
            var type = Assert.IsType<ActionResult<Product>>(result);
            Assert.Equal(expected, actual);
        }

        [Fact]
        public async Task PassingDelete(){
            var product = new Product { ProductId = 5, Name = "Product 5", Quantity = 5, UnitValue = 10 };
            _mockRepository.Setup(test => test.Delete(product)).ReturnsAsync(product);
            var actual = await _mockRepository.Object.Delete(product);
            Assert.Equal(product, actual);
        }


    }
}
