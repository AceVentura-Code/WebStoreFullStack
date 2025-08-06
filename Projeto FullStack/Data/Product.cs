using System.ComponentModel.DataAnnotations;

namespace Projeto_FullStack.Data
{
    public class Product
    {
        [Key]
        public int Id { get; set; }
        [Required]
        public string Name { get; set; }
        [Required]
        public decimal Price { get; set; }
        [Required]
        public decimal Rating { get; set; }

        public string? ImageUrl { get; set; }
        public string? MediaType { get; set; }
        public string? Description { get; set; }
        public string? Tags { get; set; }


    }
}
