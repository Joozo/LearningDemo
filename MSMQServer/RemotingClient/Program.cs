using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Remoting;
using System.Text;
using System.Threading.Tasks;
using RemotingObject;

namespace RemotingClient
{
    class Program
    {
        static void Main(string[] args)
        {
            //MyRemotingObject proxyObj1 = Activator.GetObject(typeof(MyRemotingObject), "tcp://localhost:8010/MyRemotingObject") as MyRemotingObject;
            //if (proxyObj1 == null)
            //{
            //    Console.WriteLine("tcp服务器连接失败");
            //}

            //MyRemotingObject proxyObj2 = Activator.GetObject(typeof(MyRemotingObject), "http://localhost:8011/MyRemotingObject") as MyRemotingObject;
            //if (proxyObj2 == null)
            //{
            //    Console.WriteLine("http服务器连接失败");
            //}

            //MyRemotingObject proxyObj3 = Activator.GetObject(typeof(MyRemotingObject), "ipc://IpcTest/MyRemotingObject") as MyRemotingObject;
            //if (proxyObj2 == null)
            //{
            //    Console.WriteLine("连接Ipc服务器失败");
            //}
          
            //使用HTTP通道得到远程对象
            RemotingConfiguration.Configure("RemotingClient.exe.config", false);
            MyRemotingObject proxyobj1 = new MyRemotingObject();
            if (proxyobj1 == null)
            {
                Console.WriteLine("连接服务器失败");
            }

            Console.WriteLine("Remoting Client Start");

            Console.WriteLine("TCP通道结果：{0}", proxyobj1.AddForTcpTest(100, 200));
            Console.WriteLine("HTTP通道结果：{0}", proxyobj1.MinusForHttpTest(100, 200));
            Console.WriteLine("IPC通道结果：{0}", proxyobj1.MultipleForIPCTest(100, 200));
            
            
            Console.WriteLine("Press any key to exit!");
            Console.Read();
        }
    }
}
