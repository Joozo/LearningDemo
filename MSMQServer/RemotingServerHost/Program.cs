using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Runtime.Remoting;
using System.Runtime.Remoting.Channels.Tcp;
using System.Runtime.Remoting.Channels.Http;
using System.Runtime.Remoting.Channels.Ipc;
using System.Runtime.Remoting.Channels;

namespace RemotingServerHost
{
    /// <summary>
    /// 创建宿主应用程序
    /// </summary>
    class Program
    {
        static void Main(string[] args)
        {
            //创建三种通道
            //TcpChannel tcp = new TcpChannel(8010);
            //HttpChannel http = new HttpChannel(8011);
            //IpcChannel ipc = new IpcChannel("IpcTest");

            ////注册通道
            //ChannelServices.RegisterChannel(tcp, false);
            //ChannelServices.RegisterChannel(http, false);
            //ChannelServices.RegisterChannel(ipc, false);

            RemotingConfiguration.Configure("RemotingServerHost.exe.config", false);

            foreach (var item in ChannelServices.RegisteredChannels)
            {
                Console.WriteLine("TcpChannel通道名称：{0}，通道优先级：{1}", item.ChannelName, item.ChannelPriority);
            }

            //foreach (var channel in ChannelServices.RegisteredChannels)
            //{
            //    if (channel.ChannelName=="myTcp")
            //    {
            //        TcpChannel tcp = channel as TcpChannel;
            //        //关闭通道
            //        tcp.StopListening(null);
            //        //注销通道
            //        ChannelServices.UnregisterChannel(tcp);
            //    }
            //}


            Console.WriteLine("Remoting Server Start");

            //// 打印通道信息
            //Console.WriteLine("TcpChannel通道名称：{0}，通道优先级：{1}", tcp.ChannelName, tcp.ChannelPriority);
            //Console.WriteLine("HttpChannel通道名称：{0}，通道优先级：{1}", http.ChannelName, http.ChannelPriority);
            //Console.WriteLine("IpcChannel通道名称：{0}，通道优先级：{1}", ipc.ChannelName, ipc.ChannelPriority);

            //注册对象
            //注册MyRemotingObject到.NET Remoting运行库中
            //RemotingConfiguration.RegisterWellKnownServiceType(typeof(RemotingObject.MyRemotingObject), "MyRemotingObject", WellKnownObjectMode.Singleton);

            Console.WriteLine("Press any key to exit");
            Console.ReadLine();
        }
    }
}
