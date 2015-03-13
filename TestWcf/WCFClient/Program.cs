using System;
using System.Collections.Generic;
using System.Linq;
using System.ServiceModel;
using System.Text;
using System.Threading.Tasks;

namespace WCFClient
{
    class Program
    {
        static EndpointAddress edpHttp = new EndpointAddress("http://10.11.109.7:8001/Service.svc");
        static void Main(string[] args)
        {
            MyClient client = new MyClient(new WSHttpBinding(SecurityMode.None), edpHttp);
            
            Console.WriteLine(client.DoWork());

            Console.ReadKey();
        }
    }
}
