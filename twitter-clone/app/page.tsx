"use client";

import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Heart, MessageCircle, Repeat2, Share, Home, Hash, Bell, Mail, User, MoreHorizontal, Image as ImageIcon } from "lucide-react";

interface Tweet {
  id: number;
  author: string;
  username: string;
  avatar: string;
  content: string;
  timestamp: string;
  likes: number;
  retweets: number;
  replies: number;
  liked?: boolean;
  retweeted?: boolean;
}

export default function TwitterHome() {
  const [tweets, setTweets] = useState<Tweet[]>([
    {
      id: 1,
      author: "Sarah Chen",
      username: "@sarahchen",
      avatar: "",
      content: "Just deployed my first Next.js app with shadcn/ui! The developer experience is absolutely incredible. 🚀",
      timestamp: "2h",
      likes: 234,
      retweets: 45,
      replies: 12,
    },
    {
      id: 2,
      author: "Alex Rodriguez",
      username: "@alexdev",
      avatar: "",
      content: "Hot take: TypeScript makes you a better JavaScript developer even if you never use it in production.",
      timestamp: "4h",
      likes: 892,
      retweets: 156,
      replies: 78,
    },
    {
      id: 3,
      author: "Emma Watson",
      username: "@emmawatson",
      avatar: "",
      content: "Finally switched to Tailwind CSS. I can't believe I waited this long. The utility-first approach just makes sense once you get used to it.",
      timestamp: "6h",
      likes: 445,
      retweets: 67,
      replies: 34,
    },
    {
      id: 4,
      author: "James Kim",
      username: "@jameskim",
      avatar: "",
      content: "Building in public: Day 30 of my SaaS journey. Revenue hit $1K MRR today! 🎉 Here's what I learned...",
      timestamp: "8h",
      likes: 1203,
      retweets: 234,
      replies: 89,
    },
  ]);

  const [newTweet, setNewTweet] = useState("");

  const handlePostTweet = () => {
    if (!newTweet.trim()) return;

    const tweet: Tweet = {
      id: Date.now(),
      author: "You",
      username: "@yourhandle",
      avatar: "",
      content: newTweet,
      timestamp: "now",
      likes: 0,
      retweets: 0,
      replies: 0,
    };

    setTweets([tweet, ...tweets]);
    setNewTweet("");
  };

  const handleLike = (id: number) => {
    setTweets(tweets.map(tweet =>
      tweet.id === id
        ? { ...tweet, liked: !tweet.liked, likes: tweet.liked ? tweet.likes - 1 : tweet.likes + 1 }
        : tweet
    ));
  };

  const handleRetweet = (id: number) => {
    setTweets(tweets.map(tweet =>
      tweet.id === id
        ? { ...tweet, retweeted: !tweet.retweeted, retweets: tweet.retweeted ? tweet.retweets - 1 : tweet.retweets + 1 }
        : tweet
    ));
  };

  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar */}
      <div className="hidden md:flex w-64 flex-col border-r p-4 space-y-2">
        <div className="flex items-center space-x-2 mb-4">
          <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
            <span className="text-white font-bold text-xl">𝕏</span>
          </div>
        </div>

        <Button variant="ghost" className="justify-start space-x-4 text-lg py-6">
          <Home className="h-6 w-6" />
          <span>Home</span>
        </Button>

        <Button variant="ghost" className="justify-start space-x-4 text-lg py-6">
          <Hash className="h-6 w-6" />
          <span>Explore</span>
        </Button>

        <Button variant="ghost" className="justify-start space-x-4 text-lg py-6">
          <Bell className="h-6 w-6" />
          <span>Notifications</span>
        </Button>

        <Button variant="ghost" className="justify-start space-x-4 text-lg py-6">
          <Mail className="h-6 w-6" />
          <span>Messages</span>
        </Button>

        <Button variant="ghost" className="justify-start space-x-4 text-lg py-6">
          <User className="h-6 w-6" />
          <span>Profile</span>
        </Button>

        <Button className="w-full rounded-full py-6 mt-4 bg-blue-500 hover:bg-blue-600">
          Post
        </Button>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col max-w-2xl border-r">
        <div className="border-b p-4 sticky top-0 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 z-10">
          <h1 className="text-xl font-bold">Home</h1>
        </div>

        {/* Tweet Composer */}
        <div className="border-b p-4">
          <div className="flex space-x-3">
            <Avatar>
              <AvatarImage src="" />
              <AvatarFallback>YO</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <Textarea
                placeholder="What's happening?!"
                className="min-h-[120px] resize-none border-0 focus-visible:ring-0 text-lg p-0"
                value={newTweet}
                onChange={(e) => setNewTweet(e.target.value)}
              />
              <div className="flex items-center justify-between mt-3 pt-3 border-t">
                <div className="flex space-x-2">
                  <Button variant="ghost" size="icon" className="h-9 w-9 text-blue-500">
                    <ImageIcon className="h-5 w-5" />
                  </Button>
                </div>
                <Button
                  className="rounded-full bg-blue-500 hover:bg-blue-600 px-6"
                  onClick={handlePostTweet}
                  disabled={!newTweet.trim()}
                >
                  Post
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Timeline */}
        <ScrollArea className="flex-1">
          {tweets.map((tweet) => (
            <div key={tweet.id}>
              <Card className="rounded-none border-0 border-b">
                <CardHeader className="pb-3">
                  <div className="flex space-x-3">
                    <Avatar>
                      <AvatarImage src={tweet.avatar} />
                      <AvatarFallback>{tweet.author.split(" ").map(n => n[0]).join("")}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2">
                        <span className="font-bold hover:underline cursor-pointer">{tweet.author}</span>
                        <span className="text-muted-foreground">{tweet.username}</span>
                        <span className="text-muted-foreground">·</span>
                        <span className="text-muted-foreground">{tweet.timestamp}</span>
                        <div className="ml-auto">
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pb-3">
                  <p className="text-base whitespace-pre-wrap">{tweet.content}</p>
                </CardContent>
                <CardFooter className="pt-0">
                  <div className="flex justify-between w-full max-w-md">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-muted-foreground hover:text-blue-500 space-x-2"
                    >
                      <MessageCircle className="h-5 w-5" />
                      <span>{tweet.replies}</span>
                    </Button>

                    <Button
                      variant="ghost"
                      size="sm"
                      className={`space-x-2 ${tweet.retweeted ? 'text-green-500' : 'text-muted-foreground hover:text-green-500'}`}
                      onClick={() => handleRetweet(tweet.id)}
                    >
                      <Repeat2 className="h-5 w-5" />
                      <span>{tweet.retweets}</span>
                    </Button>

                    <Button
                      variant="ghost"
                      size="sm"
                      className={`space-x-2 ${tweet.liked ? 'text-red-500' : 'text-muted-foreground hover:text-red-500'}`}
                      onClick={() => handleLike(tweet.id)}
                    >
                      <Heart className={`h-5 w-5 ${tweet.liked ? 'fill-current' : ''}`} />
                      <span>{tweet.likes}</span>
                    </Button>

                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-muted-foreground hover:text-blue-500"
                    >
                      <Share className="h-5 w-5" />
                    </Button>
                  </div>
                </CardFooter>
              </Card>
            </div>
          ))}
        </ScrollArea>
      </div>

      {/* Right Sidebar */}
      <div className="hidden lg:flex w-80 flex-col p-4 space-y-4">
        <Card>
          <CardHeader>
            <h2 className="text-xl font-bold">What's happening</h2>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="text-sm text-muted-foreground">Trending in Technology</p>
              <p className="font-bold">#NextJS</p>
              <p className="text-sm text-muted-foreground">45.2K posts</p>
            </div>
            <Separator />
            <div>
              <p className="text-sm text-muted-foreground">Trending in Web Development</p>
              <p className="font-bold">#shadcnui</p>
              <p className="text-sm text-muted-foreground">23.8K posts</p>
            </div>
            <Separator />
            <div>
              <p className="text-sm text-muted-foreground">Trending Worldwide</p>
              <p className="font-bold">#TypeScript</p>
              <p className="text-sm text-muted-foreground">67.3K posts</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <h2 className="text-xl font-bold">Who to follow</h2>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Avatar className="h-10 w-10">
                  <AvatarFallback>VD</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-bold text-sm">Vercel</p>
                  <p className="text-sm text-muted-foreground">@vercel</p>
                </div>
              </div>
              <Button variant="outline" size="sm" className="rounded-full">Follow</Button>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Avatar className="h-10 w-10">
                  <AvatarFallback>SH</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-bold text-sm">shadcn</p>
                  <p className="text-sm text-muted-foreground">@shadcn</p>
                </div>
              </div>
              <Button variant="outline" size="sm" className="rounded-full">Follow</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
