using System;

namespace wapi1.Models
{
    public class TodoItem
    {
        public long Id { get; set; }

        public string Name { get; set; }

        public bool IsComplete{ get; set; }

        public DateTime Deadline { get; set; }

        public DateTime Submission { get; set; }

        public string Description { get;  set;}


    }
    public class Person {
        
        public long Id { get; set; }
        public string First {get; set;}
        public string Last {get; set;}

        
        
    }
}