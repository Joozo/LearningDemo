using System;
using System.Collections.Generic;
using System.Linq;
using System.Messaging;
using System.Text;
using System.Threading.Tasks;

namespace MSMQServer
{
    /// <summary>
    /// MSMQ 服务端
    /// </summary>
    class Program
    {
        static void Main(string[] args)
        {
            // 创建一个公共队列,公共队列只能创建在域环境里
            //if (!MessageQueue.Exists(@".\LearningHardMSMQ")) // 判断此路径下是否已经有该队列
            //{
            //    using (MessageQueue mq = MessageQueue.Create(@".\LearningHardMSMQ"))
            //    {
            //        mq.Label = "LearningHardQueue"; // 设置队列标签
            //        Console.WriteLine("已经创建了一个公共队列");
            //        Console.WriteLine("路径为:{0}", mq.Path);
            //        Console.WriteLine("队列名字为:{0}", mq.QueueName);
            //        mq.Send("MSMQ Message", "Leaning Hard"); // 发送消息
            //    }
            //}

            if (MessageQueue.Exists(@".\Private$\TestMSMQ"))
            {
                //删除消息队列
                MessageQueue.Delete(@".\Private$\TestMSMQ");
            }
            // 创建一个私有消息队列
            if (!MessageQueue.Exists(@".\Private$\TestMSMQ"))
            {
                using (MessageQueue mq = MessageQueue.Create(@".\Private$\TestMSMQ"))
                {
                    mq.Label = "LearningHardPrivateQueue";
                    Console.WriteLine("已经创建了一个私有队列");
                    Console.WriteLine("路径为:{0}", mq.Path);
                    Console.WriteLine("私有队列名字为:{0}", mq.QueueName);
                    mq.Send("我的第一条私有消息", "by Jreey"); // 发送消息
                }
            }

            // 遍历所有的公共消息队列
            //foreach (MessageQueue mq in MessageQueue.GetPublicQueues())
            //{
            //    mq.Send("Sending MSMQ public message" + DateTime.Now.ToLongDateString(), "Learning Hard");
            //    Console.WriteLine("Public Message is sent to {0}", mq.Path);
            //}

            if (MessageQueue.Exists(@".\Private$\TestHardMSMQ"))
            {
                // 获得私有消息队列
                MessageQueue mq = new MessageQueue(@".\Private$\TestMSMQ");
                mq.Send("第二条私有消息，发送时间：" + DateTime.Now.ToLongDateString(), "by Jreey");
                Console.WriteLine("发送消息到 {0}", mq.Path);
            }

            Console.Read();

        }
    }
}
