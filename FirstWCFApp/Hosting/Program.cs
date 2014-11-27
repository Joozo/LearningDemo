using System;
using System.Collections.Generic;
using System.Linq;
using System.ServiceModel;
using System.ServiceModel.Description;
using System.Text;
using System.Threading.Tasks;
using Contract;
using Services;

namespace Hosting
{
    /// <summary>
    /// 必须以管理员权限运行VS  然后运行该项目
    /// 在浏览器中输入http://127.0.0.1:8888/HelloWorldService/metadata  即可看到数据
    /// </summary>
    class Program
    {
        // 服务宿主程序   Hosting
        /// <summary>
        /// 服务寄宿的目的就是开启一个进程来为WCF服务提供一个运行的环境。通过为服务添加一个或多个终结点，使之暴露给服务消费者使用。
        /// 服务消费者再通过相应匹配的终结点对服务进行调用，下面通过创建一个控制台程序来实现WCF服务的自我寄宿方式
        /// </summary>
        /// <param name="args"></param>
        static void Main(string[] args)
        {
            //WCF实例是通过基于WCF服务的类型（typeof(HelloWorldService)）来创建
            using (ServiceHost host = new ServiceHost(typeof(HelloWorldService)))
            {
                #region 如果使用配置文件  region之间的代码可以注释掉
                //AddServiceEndpoint添加了一个终结点，
                //具体终结点的地址为http://127.0.0.1:8888/HelloWorldService，
                //采用的绑定（Binding）类型为WSHttpBinding，并指定了服务契约的类型为IHelloWorld。
                //host.AddServiceEndpoint(typeof(IHelloWorld), new WSHttpBinding(), "http://127.0.0.1:8888/HelloWorldService");
                //if (host.Description.Behaviors.Find<ServiceMetadataBehavior>() == null)
                //{
                //    ServiceMetadataBehavior behvior = new ServiceMetadataBehavior();
                //    behvior.HttpGetEnabled = true;
                //    behvior.HttpGetUrl = new Uri("http://127.0.0.1:8888/HelloWorldService/metadata");
                //    host.Description.Behaviors.Add(behvior);
                //}
                #endregion

                host.Opened += delegate
                {
                    Console.WriteLine("HelloWorldService 已经启动, 按任意键终止服务！");
                };
                host.Open();
                Console.Read();
            };
        }
    }
}
