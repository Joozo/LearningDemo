using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Sockets;
using System.Text;
using System.Threading.Tasks;

namespace SocketService
{
    class Program
    {
        static void Main(string[] args)
        {
            Console.WriteLine("Starting：  创建 Socket 对象");
            //创建实例
            Socket listener = new Socket(AddressFamily.InterNetwork, SocketType.Stream, ProtocolType.Tcp);
            //绑定端口
            listener.Bind(new IPEndPoint(IPAddress.Any, 8008));
            //侦听端口
            listener.Listen(10);

            while (true)
            {
                Console.WriteLine("正在打开 8008 端口");
                //新建接受实例
                Socket socket = listener.Accept();
                string receiveValue = string.Empty;
                while (true)
                {
                    byte[] receiveBytes = new byte[1024];
                    //接收数据
                    int numBytes = socket.Receive(receiveBytes);
                    Console.WriteLine("开始接受 .");
                    receiveValue += Encoding.ASCII.GetString(receiveBytes, 0, numBytes);
                    if (receiveValue.IndexOf("[FINAL]") > -1)
                    {
                        break;
                    }
                }
                Console.WriteLine("服务端接受的信息：{0}", receiveValue);
                string replyValue = "Message successfully recevied";
                byte[] replyMessage = Encoding.ASCII.GetBytes(replyValue);
                //将数据发送到连接的Socket
                socket.Send(replyMessage);
                //禁用接受和发送
                socket.Shutdown(SocketShutdown.Both);
                socket.Close();
            }
        }
    }
}
