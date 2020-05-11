using Microsoft.EntityFrameworkCore;

namespace wapi1.Models
{
    public class TodoContext : DbContext
    {
        public DbSet<TodoItem> TodoItems {get; set;}

        public DbSet<Person> Persons { get; set; }

        public TodoContext(DbContextOptions<TodoContext> options) : base(options) { }
    }

}