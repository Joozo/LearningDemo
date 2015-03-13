using System;
using System.Collections.Generic;
using System.Linq;
using System.ServiceModel;
using System.ServiceModel.Channels;
using System.Text;
using System.Threading.Tasks;
using TestWcf;

namespace WCFClient
{
    /// <summary>
    /// 用于调用服务的类  
    /// </summary>
    public class MyClient : ClientBase<IService>, IService
    {
        public MyClient(Binding binding, EndpointAddress edpAddress)
            : base(binding, edpAddress)
        {

        }

        /// <summary>
        /// 调用服务端函数
        /// </summary>
        /// <returns></returns>
        public string DoWork()
        {
            return base.Channel.DoWork();
        }

    }
}
