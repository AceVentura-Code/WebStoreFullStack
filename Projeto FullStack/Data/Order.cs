using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Projeto_FullStack.Data
{
    public class Order
    {
        [Key]
        public int Id { get; set; }
        [ForeignKey("User")]
        public int UserId { get; set; }

        [Required]
        public List<ProductsInCart> ProductsInTheCart { get; set; }
        public DateTime OrderDate { get; set; }
        [Required]
        public string? ShippingAddress { get; set; }
        public string? Status { get; set; }

    }
}
