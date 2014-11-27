using System;
using System.Collections.Generic;
using System.Linq;
using System.Messaging;
using System.Text;
using System.Threading.Tasks;

namespace MSMQClient
{
    /// <summary>
    /// MSMQ 客户端
    /// </summary>
    class Program
    {
        static void Main(string[] args)
        {
            if (MessageQueue.Exists(@".\Private$\TestMSMQ"))
            {
                // 创建消息队列对象
                using (MessageQueue mq = new MessageQueue(@".\Private$\TestMSMQ"))
                {
                    // 设置消息队列的格式化器
                    mq.Formatter = new XmlMessageFormatter(new string[] { "System.String" });
                    foreach (Message msg in mq.GetAllMessages())
                    {
                        Console.WriteLine("接收到的消息: {0}", msg.Body);
                    }

                    Message firstmsg = mq.Receive(); // 取出消息队列中队列中的第一条消息，并从消息队列中移除它
                    Console.WriteLine("接收到的第一条消息: {0}", firstmsg.Body);
                }
            }
            Console.Read();
        }
    }
}
