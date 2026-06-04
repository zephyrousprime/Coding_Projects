using System;
using Blast.API.Core;
using Blast.API.Search;

namespace AiChatPlugin
{
    // Basic plugin class implementing IBlastPlugin
    public class AiChatPlugin : IBlastPlugin
    {
        public string Name => "AiChatPlugin";
        public string Description => "Chat with AI from Fluent Search";
        public string Publisher => "Your Name or Organization";
        public string Version => "1.0.0.0";

        public void Init(IBlastContext context)
        {
            // Initialization logic here
        }

        public void Dispose()
        {
            // Cleanup logic here
        }

        // You would implement search or chat logic here in the future
    }
}
