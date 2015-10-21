using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using BeIT.MemCached;

namespace Demo
{
    class Program
    {
        static void Main(string[] args)
        {
            //新实例
            MemcachedClient cachedClient = MemcachedClient.GetInstance("MyCacheConfig");

            cachedClient.SendReceiveTimeout = 5000;
            cachedClient.ConnectTimeout = 5000;
            cachedClient.MinPoolSize = 1;
            cachedClient.MaxPoolSize = 5;

            //删除所有的项
            cachedClient.FlushAll();

            //Set key不存在添加  存在覆盖
            cachedClient.Set("kjt", "kjt.com");
            cachedClient.Add("key", "Test");
            //Add key不存在添加  存在不添加
            cachedClient.Add("key", "00");

            //替换原来的值
            if (cachedClient.Replace("key", "Windows"))
            {
                //Console.WriteLine(cachedClient.Get("Windows"));
            }

            Console.WriteLine(cachedClient.Get("key"));
            Console.WriteLine(cachedClient.Get("kjt"));

            //从缓存中删除
            //cachedClient.Delete("key");

            //Console.WriteLine(cachedClient.Get("key") == null ? "deleted" : "no");

            //查询运行状态
            foreach (KeyValuePair<string, Dictionary<string, string>> host in cachedClient.Status())
            {
                Console.Out.WriteLine("Host: " + host.Key);
                foreach (KeyValuePair<string, string> item in host.Value)
                {

                    Console.WriteLine("-- Key：" + item.Key + "      Value:" + item.Value);
                }
            }


            Console.Read();
        }
    }
}
