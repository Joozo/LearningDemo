using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Sockets;
using System.Text;
using System.Threading.Tasks;

namespace SocketClient
{
    class Program
    {
        static void Main(string[] args)
        {
            byte[] receiveBytes = new byte[1024];
            //解析域名或者IP
            IPHostEntry ipHost = Dns.GetHostEntry("127.0.0.1");
            //获取与主机关联的IP地址列表
            IPAddress ipAddress = ipHost.AddressList[3];
            //IP地址和端口号连接为一个节点
            IPEndPoint ipEndPoint = new IPEndPoint(ipAddress, 8008);
            Console.WriteLine("Starting： 创建 Socket 对象");

            //创建发送socket实例
            Socket sender = new Socket(AddressFamily.InterNetwork, SocketType.Stream, ProtocolType.Tcp);
            //建立远程主机连接
            sender.Connect(ipEndPoint);
            Console.WriteLine("成功连接到：{0}", sender.RemoteEndPoint);

            string sendingMessage = "Hello my first socket test";
            Console.WriteLine("信息:{0}", sendingMessage);
            byte[] forwardMessage = Encoding.ASCII.GetBytes(sendingMessage + "[FINAL]");
            // 将数据发送到连接的Socket
            sender.Send(forwardMessage);
            //接受数据，写入缓冲区
            int totalBytesRecevied = sender.Receive(receiveBytes);
            Console.WriteLine("准备从服务端接受信息：{0}", Encoding.ASCII.GetString(receiveBytes, 0, totalBytesRecevied));
            sender.Shutdown(SocketShutdown.Both);
            sender.Close();
            Console.ReadLine();
        }
    }
}
