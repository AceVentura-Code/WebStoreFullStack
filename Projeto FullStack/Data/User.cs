using System.ComponentModel.DataAnnotations;

namespace Projeto_FullStack.Data
{
    public class User
    {   
        [Key]
        public int Id { get; set; }
        [Required]
        public string Name { get; set; }
        [Required]
        public string PassWord { get; set; }
        [Required]
        public string Email { get; set; }
        [Required]
        public string Address { get; set; }//dividir em varios campos Rua, cidade,  codigo postal, 

        public List<Order>? Orders { get; set; }
        public int Age { get; set; }//substituir por data nascimento
        public string AccessLevel { get; set; }

    }
}
