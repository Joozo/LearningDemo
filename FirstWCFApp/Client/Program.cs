using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Client.HelloWorldServices;
using System.ServiceModel;
using Contract;


namespace Client
{
    class Program
    {
        static void Main(string[] args)
        {
            //利用服务引用  需要配置文件 
            using (HellworldServiceClient proxy = new HellworldServiceClient())
            {
                Console.WriteLine("服务返回的结果是: {0}", proxy.GetHelloWorldWithoutParam());
            };

            //由通道工厂生成的通道类型  不需要配置文件 
            var factory = new ChannelFactory<IHelloWorld>(new WSHttpBinding(), new EndpointAddress("http://127.0.0.1:8888/HelloWorldService"));
            var client = factory.CreateChannel();

            Console.WriteLine("服务返回的结果是: {0}", client.GetHelloWord("Test"));

            Console.Read();

        }
    }
}
