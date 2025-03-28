
import { useState, useEffect, useRef } from "react";
import { Bot, Send, Mic, MicOff, Share2, Save, List, RefreshCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useToast } from "@/hooks/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { popularVerses } from "@/data/bible-data";

interface Message {
  id: string;
  content: string;
  role: "user" | "assistant";
  timestamp: Date;
}

interface ConversationHistory {
  id: string;
  title: string;
  messages: Message[];
  date: Date;
}

const BibleAssistant = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "initial",
      content: "Hello! I'm your Catholic Bible Assistant. I can help you understand scripture, Catholic teachings, and answer questions about the faith. How can I assist you today?",
      role: "assistant",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [conversations, setConversations] = useState<ConversationHistory[]>([]);
  const [currentConversation, setCurrentConversation] = useState<string>("current");
  const [category, setCategory] = useState<string>("general");
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [activeTab, setActiveTab] = useState("chat");
  const microphoneRef = useRef<SpeechRecognition | null>(null);
  const synthesisRef = useRef<SpeechSynthesisUtterance | null>(null);
  const { toast } = useToast();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    const savedConversations = localStorage.getItem("bibleAssistantConversations");
    if (savedConversations) {
      try {
        const parsed = JSON.parse(savedConversations);
        setConversations(parsed.map((conv: any) => ({
          ...conv,
          messages: conv.messages.map((msg: any) => ({
            ...msg,
            timestamp: new Date(msg.timestamp)
          })),
          date: new Date(conv.date)
        })));
      } catch (e) {
        console.error("Failed to parse conversations:", e);
      }
    }
  }, []);

  useEffect(() => {
    if (isRecording) {
      startSpeechRecognition();
    } else {
      stopSpeechRecognition();
    }
    
    return () => {
      stopSpeechRecognition();
    };
  }, [isRecording]);

  const saveConversations = (convs: ConversationHistory[]) => {
    localStorage.setItem("bibleAssistantConversations", JSON.stringify(convs));
  };

  const startSpeechRecognition = () => {
    if ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      const recognition = new SpeechRecognition();
      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.lang = 'en-US';
      
      recognition.onresult = (event) => {
        const transcript = Array.from(event.results)
          .map(result => result[0])
          .map(result => result.transcript)
          .join('');
        
        setInput(transcript);
      };
      
      recognition.onerror = (event) => {
        console.error("Speech recognition error", event.error);
        setIsRecording(false);
        toast({
          title: "Speech Recognition Error",
          description: `Error: ${event.error}. Please try again.`,
          variant: "destructive",
        });
      };
      
      recognition.start();
      microphoneRef.current = recognition;
    } else {
      toast({
        title: "Not Supported",
        description: "Speech recognition is not supported in your browser.",
        variant: "destructive",
      });
      setIsRecording(false);
    }
  };
  
  const stopSpeechRecognition = () => {
    if (microphoneRef.current) {
      microphoneRef.current.stop();
      microphoneRef.current = null;
    }
  };

  const speak = (text: string) => {
    if ('speechSynthesis' in window) {
      if (isSpeaking) {
        window.speechSynthesis.cancel();
        setIsSpeaking(false);
        return;
      }
      
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'en-US';
      
      const voices = window.speechSynthesis.getVoices();
      const preferredVoice = voices.find(voice => 
        voice.name.includes('Female') || 
        voice.name.includes('Google') || 
        voice.name.includes('Natural')
      );
      
      if (preferredVoice) {
        utterance.voice = preferredVoice;
      }
      
      utterance.onend = () => {
        setIsSpeaking(false);
      };
      
      synthesisRef.current = utterance;
      window.speechSynthesis.speak(utterance);
      setIsSpeaking(true);
    } else {
      toast({
        title: "Not Supported",
        description: "Text-to-speech is not supported in your browser.",
        variant: "destructive",
      });
    }
  };

  const handleSendMessage = async () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: input,
      role: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      let response = "";
      
      const lowercaseInput = input.toLowerCase();
      
      if (category === "bible_verses") {
        if (lowercaseInput.includes("verse") || lowercaseInput.includes("scripture")) {
          const verseIndex = Math.floor(Math.random() * popularVerses.length);
          response = `Here's a verse that might help: "${popularVerses[verseIndex].citation}": ${popularVerses[verseIndex].text}`;
        } else {
          response = "I can help you find specific Bible verses. Try asking about a topic or mention a specific book of the Bible.";
        }
      } else if (category === "catholic_teachings") {
        if (lowercaseInput.includes("eucharist")) {
          response = "The Eucharist is the source and summit of the Christian life. The Catholic Church teaches the Real Presence of Christ in the Eucharist - that the bread and wine become the Body and Blood of Christ through transubstantiation.";
        } else if (lowercaseInput.includes("mary") || lowercaseInput.includes("virgin")) {
          response = "The Blessed Virgin Mary is venerated in the Catholic Church as the Mother of God (Theotokos). Catholics believe in her Immaculate Conception, Perpetual Virginity, and her Assumption into Heaven.";
        } else if (lowercaseInput.includes("confession") || lowercaseInput.includes("reconciliation")) {
          response = "The Sacrament of Reconciliation (Confession) is how Catholics receive God's forgiveness for their sins. It includes contrition, confession to a priest, absolution, and penance.";
        } else {
          response = "Catholic teachings cover many topics including the Sacraments, prayer, moral teachings, and Church history. Feel free to ask about specific teachings.";
        }
      } else if (category === "prayer_guidance") {
        if (lowercaseInput.includes("rosary")) {
          response = "The Rosary is a meditative prayer focusing on the life of Christ. It consists of the Apostles' Creed, Our Father, Hail Marys, Glory Be, and meditation on the Mysteries (Joyful, Sorrowful, Glorious, and Luminous).";
        } else if (lowercaseInput.includes("novena")) {
          response = "A novena is a nine-day period of prayer for a specific intention. There are many different novenas dedicated to various saints, the Blessed Mother, and for different needs.";
        } else {
          response = "Prayer is conversation with God that involves speaking and listening. The Catholic tradition offers many forms of prayer including vocal prayer, meditation, and contemplation. I can help guide you through specific prayers if you'd like.";
        }
      } else {
        const generalResponses = [
          "The Catholic Church teaches that the Bible is the inspired word of God, containing both the Old and New Testaments, including the deuterocanonical books which are sometimes called the Apocrypha by non-Catholics.",
          "The Blessed Virgin Mary is honored in the Catholic tradition as the Mother of God (Theotokos) and the first disciple of Jesus. The Church teaches several dogmas about Mary including her Immaculate Conception, Perpetual Virginity, and bodily Assumption into heaven.",
          "According to Catholic teaching, the Sacrament of Reconciliation (Confession) is a gift from Christ to the Church that allows sinners to receive God's forgiveness through the ministry of priests. It involves contrition, confession, absolution, and penance.",
          "The Holy Eucharist is the source and summit of Christian life. Catholics believe in the Real Presence of Christ in the Eucharist through transubstantiation, where the bread and wine become Christ's Body and Blood.",
          "Prayer is lifting the mind and heart to God. The Catholic tradition teaches various forms of prayer including vocal prayer, meditation, contemplative prayer, and liturgical prayer."
        ];
        
        if (lowercaseInput.includes("bible") || lowercaseInput.includes("scripture")) {
          response = generalResponses[0];
        } else if (lowercaseInput.includes("mary") || lowercaseInput.includes("virgin")) {
          response = generalResponses[1];
        } else if (lowercaseInput.includes("confession") || lowercaseInput.includes("reconciliation")) {
          response = generalResponses[2]; 
        } else if (lowercaseInput.includes("eucharist") || lowercaseInput.includes("communion")) {
          response = generalResponses[3];
        } else if (lowercaseInput.includes("pray") || lowercaseInput.includes("prayer")) {
          response = generalResponses[4];
        } else {
          response = generalResponses[Math.floor(Math.random() * generalResponses.length)];
        }
      }

      setTimeout(() => {
        const assistantMessage: Message = {
          id: Date.now().toString(),
          content: response,
          role: "assistant",
          timestamp: new Date(),
        };

        setMessages((prev) => [...prev, assistantMessage]);
        setIsLoading(false);
      }, 1000);
    } catch (error) {
      console.error("Failed to get AI response:", error);
      toast({
        title: "Error",
        description: "Failed to get a response. Please try again.",
        variant: "destructive",
      });
      setIsLoading(false);
    }
  };

  const toggleRecording = () => {
    setIsRecording(!isRecording);
  };

  const saveConversation = () => {
    if (messages.length <= 1) {
      toast({
        title: "Cannot Save",
        description: "Start a conversation before saving.",
        variant: "destructive",
      });
      return;
    }

    const firstUserMessage = messages.find(m => m.role === "user")?.content || "New Conversation";
    const title = firstUserMessage.length > 30 
      ? firstUserMessage.substring(0, 30) + "..." 
      : firstUserMessage;
    
    const newConversation: ConversationHistory = {
      id: Date.now().toString(),
      title,
      messages: [...messages],
      date: new Date(),
    };
    
    const updatedConversations = [...conversations, newConversation];
    setConversations(updatedConversations);
    saveConversations(updatedConversations);
    
    startNewConversation();
    
    toast({
      title: "Conversation Saved",
      description: "You can access it from the History tab.",
    });
  };

  const loadConversation = (id: string) => {
    const conversation = conversations.find(c => c.id === id);
    if (conversation) {
      setMessages(conversation.messages);
      setCurrentConversation(id);
      // Automatically switch to chat tab when a conversation is loaded
      setActiveTab("chat");
    }
  };

  const startNewConversation = () => {
    setMessages([{
      id: "initial",
      content: "Hello! I'm your Catholic Bible Assistant. I can help you understand scripture, Catholic teachings, and answer questions about the faith. How can I assist you today?",
      role: "assistant",
      timestamp: new Date(),
    }]);
    setCurrentConversation("current");
  };

  const shareVerse = (verse: string) => {
    if (navigator.share) {
      navigator.share({
        title: 'Bible Verse',
        text: verse,
      })
      .then(() => {
        toast({
          title: "Shared Successfully",
          description: "The verse has been shared.",
        });
      })
      .catch((error) => {
        console.error('Error sharing:', error);
        copyToClipboard(verse);
      });
    } else {
      copyToClipboard(verse);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
      .then(() => {
        toast({
          title: "Copied to Clipboard",
          description: "You can now paste the verse wherever you like.",
        });
      })
      .catch((err) => {
        console.error('Failed to copy text: ', err);
        toast({
          title: "Copy Failed",
          description: "Could not copy to clipboard.",
          variant: "destructive",
        });
      });
  };

  const handleSpeakMessage = (message: Message) => {
    if (message.role === "assistant") {
      speak(message.content);
    }
  };

  return (
    <Tabs value={activeTab} onValueChange={setActiveTab} className="h-[calc(100vh-120px)] flex flex-col">
      <Card className="flex-1 flex flex-col">
        <CardHeader className="pb-2">
          <div className="flex justify-between items-center">
            <CardTitle className="flex items-center gap-2">
              <Bot className="h-5 w-5 text-primary" />
              Bible Assistant
            </CardTitle>
            <TabsList>
              <TabsTrigger value="chat">Chat</TabsTrigger>
              <TabsTrigger value="history">History</TabsTrigger>
            </TabsList>
          </div>
          <CardDescription>
            Ask me about Catholic teachings, scripture, and Church history.
          </CardDescription>
        </CardHeader>

        <TabsContent value="chat" className="flex-1 flex flex-col px-4 overflow-hidden">
          <div className="mb-4">
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select question category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="general">General Questions</SelectItem>
                <SelectItem value="bible_verses">Bible Verses</SelectItem>
                <SelectItem value="catholic_teachings">Catholic Teachings</SelectItem>
                <SelectItem value="prayer_guidance">Prayer Guidance</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <CardContent className="flex-1 overflow-hidden p-0">
            <ScrollArea className="h-full pr-4">
              <div className="space-y-4 py-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${
                      message.role === "user" ? "justify-end" : "justify-start"
                    }`}
                  >
                    <div
                      className={`max-w-[80%] rounded-lg px-4 py-2 ${
                        message.role === "user"
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted"
                      }`}
                    >
                      <p className="text-sm">{message.content}</p>
                      <div className="mt-1 flex justify-between items-center">
                        <p className="text-xs opacity-70">
                          {message.timestamp.toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </p>
                        {message.role === "assistant" && (
                          <div className="flex gap-1">
                            <Button 
                              variant="ghost" 
                              size="icon" 
                              className="h-6 w-6" 
                              onClick={() => handleSpeakMessage(message)}
                            >
                              {isSpeaking ? <RefreshCcw className="h-3 w-3" /> : <Mic className="h-3 w-3" />}
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="icon" 
                              className="h-6 w-6" 
                              onClick={() => shareVerse(message.content)}
                            >
                              <Share2 className="h-3 w-3" />
                            </Button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
                {isLoading && (
                  <div className="flex justify-start">
                    <div className="max-w-[80%] rounded-lg px-4 py-3 bg-muted">
                      <div className="flex space-x-2">
                        <div className="h-2 w-2 rounded-full bg-primary animate-bounce [animation-delay:-0.3s]"></div>
                        <div className="h-2 w-2 rounded-full bg-primary animate-bounce [animation-delay:-0.15s]"></div>
                        <div className="h-2 w-2 rounded-full bg-primary animate-bounce"></div>
                      </div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>
            </ScrollArea>
          </CardContent>

          <CardFooter className="pt-2">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage();
              }}
              className="flex w-full gap-2"
            >
              <Button
                type="button"
                size="icon"
                variant={isRecording ? "default" : "outline"}
                onClick={toggleRecording}
                className={isRecording ? "animate-pulse" : ""}
              >
                {isRecording ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
              </Button>
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask a question about the Catholic faith..."
                className="flex-1"
              />
              <Button 
                type="button" 
                size="icon" 
                variant="outline"
                onClick={saveConversation}
              >
                <Save className="h-4 w-4" />
              </Button>
              <Button type="submit" size="icon" disabled={!input.trim() || isLoading}>
                <Send className="h-4 w-4" />
              </Button>
            </form>
          </CardFooter>
        </TabsContent>

        <TabsContent value="history" className="flex-1 px-4 overflow-hidden">
          <CardContent className="h-full p-0">
            <ScrollArea className="h-full pr-4">
              <div className="space-y-4 py-4">
                <Button 
                  onClick={startNewConversation} 
                  variant="outline" 
                  className="w-full"
                >
                  <List className="mr-2 h-4 w-4" /> New Conversation
                </Button>
                
                {conversations.length === 0 ? (
                  <div className="text-center py-8 text-muted-foreground">
                    <p>No saved conversations yet.</p>
                    <p className="text-sm mt-2">Your conversations will appear here when you save them.</p>
                  </div>
                ) : (
                  conversations.map((conversation) => (
                    <Card 
                      key={conversation.id} 
                      className={`cursor-pointer hover:bg-accent/50 ${
                        currentConversation === conversation.id ? "border-primary" : ""
                      }`}
                      onClick={() => loadConversation(conversation.id)}
                    >
                      <CardHeader className="py-3">
                        <CardTitle className="text-base">{conversation.title}</CardTitle>
                        <CardDescription>
                          {conversation.date.toLocaleDateString()} · {conversation.messages.length - 1} messages
                        </CardDescription>
                      </CardHeader>
                    </Card>
                  ))
                )}
              </div>
            </ScrollArea>
          </CardContent>
        </TabsContent>
      </Card>
    </Tabs>
  );
};

export default BibleAssistant;
