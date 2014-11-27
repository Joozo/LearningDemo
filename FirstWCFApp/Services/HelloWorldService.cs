using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Contract;

namespace Services
{
    /// <summary>
    /// 具体的WCF服务
    /// </summary>
    public class HelloWorldService : IHelloWorld
    {
        public string GetHelloWord()
        {
            return "Hello World";
        }

        public string GetHelloWord(string name)
        {
            return "Hello " + name;
        }
    }
}
