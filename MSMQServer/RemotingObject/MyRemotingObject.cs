using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RemotingObject
{
    public class MyRemotingObject : MarshalByRefObject
    {
        // 用来测试Tcp通道 
        public int AddForTcpTest(int a, int b)
        {
            return a + b;
        }

        // 用来测试Http通道
        public int MinusForHttpTest(int a, int b)
        {
            return a - b;
        }

        // 用来测试IPC通道
        public int MultipleForIPCTest(int a, int b)
        {
            return a * b;
        }
    }
}
