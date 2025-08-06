using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Projeto_FullStack.Data
{
    public class ProductsInCart
    {
        [ForeignKey("Order")]
        public int OrderId { get; set; }
        [Key]
        public int IrrelevantId { get; set; }
        [Required]
        public Product Product { get; set; }
        public int ProductAmount { get; set; }

    }
}
