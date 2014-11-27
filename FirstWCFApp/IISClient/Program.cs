using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using IISClient.HelloWorldService;

namespace IISClient
{
    class Program
    {
        static void Main(string[] args)
        {
            using (HellworldServiceClient client = new HellworldServiceClient())
            {
                Console.WriteLine("服务返回的结果是: {0}", client.GetHelloWord());
                Console.WriteLine("服务返回的结果是: {0}", client.GetHelloWord());
            }
            Console.Read();
        }
    }
}
