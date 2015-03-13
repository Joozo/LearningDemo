using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace TestWcf
{
    public class Service : IService
    {
        public string DoWork()
        {
            return "你妹！";
        }
    }
}