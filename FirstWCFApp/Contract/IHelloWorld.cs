using System;
using System.Collections.Generic;
using System.Linq;
using System.ServiceModel;
using System.Text;
using System.Threading.Tasks;

namespace Contract
{
    //服务契约 

    // ServiceContract 指示接口或类在 Windows Communication Foundation (WCF) 应用程序中定义服务协定。
    [ServiceContract(Name = "HellworldService", Namespace = "http://www.Learninghard.com")]
    public interface IHelloWorld
    {
        // OperationContract 指示方法定义一个操作，该操作是 Windows Communication Foundation (WCF) 应用程序中服务协定的一部分。
        [OperationContract(Name = "GetHelloWorldWithoutParam")]
        string GetHelloWord();

        [OperationContract(Name = "GetHelloWorldWithParam")]
        string GetHelloWord(string name);
    }
}
