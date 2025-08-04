"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BotIcon, VideoIcon, SparklesIcon, TrendingUpIcon, ArrowRightIcon, PlayIcon, CheckCircleIcon } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useTRPC } from "@/trpc/client";
import { useQuery } from "@tanstack/react-query";
import { GenerateAvatar } from "@/components/generate-avatar";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

const features = [
  {
    icon: BotIcon,
    title: "AI-Powered Agents",
    description: "Create custom AI interviewers with specific instructions and expertise for different roles and interview types.",
    color: "text-blue-600",
    bgColor: "bg-blue-50",
  },
  {
    icon: VideoIcon,
    title: "Live Video Interviews",
    description: "Conduct realistic mock interviews with real-time video, audio, and interactive conversations.",
    color: "text-green-600",
    bgColor: "bg-green-50",
  },
  {
    icon: SparklesIcon,
    title: "AI-Generated Summaries",
    description: "Get detailed feedback, performance analysis, and actionable insights after each interview session.",
    color: "text-purple-600",
    bgColor: "bg-purple-50",
  },
  {
    icon: TrendingUpIcon,
    title: "Track Progress",
    description: "Monitor your improvement over time with detailed analytics and performance metrics.",
    color: "text-orange-600",
    bgColor: "bg-orange-50",
  },
];

const benefits = [
  "Practice anytime, anywhere with AI interviewers",
  "Get instant feedback and improvement suggestions",
  "Build confidence before real interviews",
  "Customize interview scenarios for your target role",
  "Review recordings and transcripts for self-improvement",
  "Track your progress and skill development",
];

export const HomeView = () => {
  const trpc = useTRPC();
  
  const { data: recentMeetings } = useQuery(
    trpc.meetings.getMany.queryOptions({
      pageSize: 3,
    })
  );

  const { data: agents } = useQuery(
    trpc.agents.getMany.queryOptions({
      pageSize: 3,
    })
  );

  const { data: freeUsage } = useQuery(
    trpc.premium.getFreeUsage.queryOptions()
  );

  return (
    <div className="flex-1 overflow-auto">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-primary/5 via-primary/10 to-primary/5 border-b">
        <div className="px-4 md:px-8 py-12 md:py-16">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <div className="flex items-center justify-center mb-6">
              <Image src="/logo.svg" alt="Mockviews" width={64} height={64} />
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-foreground">
              Master Your Next Interview with{" "}
              <span className="text-primary">AI-Powered</span> Practice
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Practice with intelligent AI interviewers, get instant feedback, and build the confidence you need to land your dream job.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
              <Button asChild size="lg" className="text-lg px-8">
                <Link href="/meetings">
                  <PlayIcon className="mr-2" />
                  Start Practicing
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="text-lg px-8">
                <Link href="/agents">
                  <BotIcon className="mr-2" />
                  Create AI Agent
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="px-4 md:px-8 py-12 space-y-16">
        {/* Quick Stats */}
        {freeUsage && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <Card>
              <CardContent className="p-6 text-center">
                <div className="flex items-center justify-center w-12 h-12 bg-blue-100 rounded-full mx-auto mb-4">
                  <VideoIcon className="w-6 h-6 text-blue-600" />
                </div>
                <div className="text-2xl font-bold">{freeUsage.meetingCount}</div>
                <div className="text-sm text-muted-foreground">Practice Sessions</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 text-center">
                <div className="flex items-center justify-center w-12 h-12 bg-purple-100 rounded-full mx-auto mb-4">
                  <BotIcon className="w-6 h-6 text-purple-600" />
                </div>
                <div className="text-2xl font-bold">{freeUsage.agentCount}</div>
                <div className="text-sm text-muted-foreground">AI Agents Created</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 text-center">
                <div className="flex items-center justify-center w-12 h-12 bg-green-100 rounded-full mx-auto mb-4">
                  <TrendingUpIcon className="w-6 h-6 text-green-600" />
                </div>
                <div className="text-2xl font-bold">Ready</div>
                <div className="text-sm text-muted-foreground">To Improve</div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Features Section */}
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Everything You Need to Ace Your Interview
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Our AI-powered platform provides comprehensive interview preparation tools to help you succeed.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-shadow">
                <CardContent className="p-8">
                  <div className={cn("w-16 h-16 rounded-full flex items-center justify-center mb-6", feature.bgColor)}>
                    <feature.icon className={cn("w-8 h-8", feature.color)} />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Meetings */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <VideoIcon className="w-5 h-5" />
                Recent Practice Sessions
              </CardTitle>
              <Button asChild variant="ghost" size="sm">
                <Link href="/meetings">
                  View All
                  <ArrowRightIcon className="w-4 h-4 ml-1" />
                </Link>
              </Button>
            </CardHeader>
            <CardContent className="space-y-4">
              {recentMeetings?.items.length ? (
                recentMeetings.items.map((meeting) => (
                  <div key={meeting.id} className="flex items-center justify-between p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors">
                    <div className="flex items-center gap-3">
                      <GenerateAvatar
                        seed={meeting.agent.name}
                        variant="botttsNeutral"
                        className="w-8 h-8"
                      />
                      <div>
                        <p className="font-medium text-sm">{meeting.name}</p>
                        <p className="text-xs text-muted-foreground">
                          with {meeting.agent.name}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <Badge variant="outline" className="text-xs">
                        {meeting.status}
                      </Badge>
                      {meeting.createdAt && (
                        <p className="text-xs text-muted-foreground mt-1">
                          {format(meeting.createdAt, "MMM d")}
                        </p>
                      )}
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-8">
                  <VideoIcon className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
                  <p className="text-muted-foreground">No practice sessions yet</p>
                  <Button asChild className="mt-3" size="sm">
                    <Link href="/meetings">Start Your First Session</Link>
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>

          {/* AI Agents */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <BotIcon className="w-5 h-5" />
                Your AI Agents
              </CardTitle>
              <Button asChild variant="ghost" size="sm">
                <Link href="/agents">
                  View All
                  <ArrowRightIcon className="w-4 h-4 ml-1" />
                </Link>
              </Button>
            </CardHeader>
            <CardContent className="space-y-4">
              {agents?.items.length ? (
                agents.items.map((agent) => (
                  <div key={agent.id} className="flex items-center justify-between p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors">
                    <div className="flex items-center gap-3">
                      <GenerateAvatar
                        seed={agent.name}
                        variant="botttsNeutral"
                        className="w-8 h-8"
                      />
                      <div>
                        <p className="font-medium text-sm">{agent.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {agent.meetingCount} sessions
                        </p>
                      </div>
                    </div>
                    <Button asChild variant="ghost" size="sm">
                      <Link href={`/agents/${agent.id}`}>
                        View
                      </Link>
                    </Button>
                  </div>
                ))
              ) : (
                <div className="text-center py-8">
                  <BotIcon className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
                  <p className="text-muted-foreground">No AI agents created yet</p>
                  <Button asChild className="mt-3" size="sm">
                    <Link href="/agents">Create Your First Agent</Link>
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Benefits Section */}
        <div className="max-w-4xl mx-auto">
          <Card className="bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20">
            <CardContent className="p-8">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold mb-3">Why Choose Mockviews?</h3>
                <p className="text-muted-foreground">
                  Join thousands of professionals who have improved their interview skills with our platform.
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <CheckCircleIcon className="w-5 h-5 text-green-600 flex-shrink-0" />
                    <span className="text-sm">{benefit}</span>
                  </div>
                ))}
              </div>

              <div className="text-center mt-8">
                <Button asChild size="lg">
                  <Link href="/upgrade">
                    <SparklesIcon className="mr-2" />
                    Upgrade for More Features
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* CTA Section */}
        <div className="text-center max-w-2xl mx-auto">
          <h3 className="text-2xl font-bold mb-4">Ready to Start Practicing?</h3>
          <p className="text-muted-foreground mb-6">
            Create your first AI interviewer and begin your journey to interview success today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg">
              <Link href="/agents">
                <BotIcon className="mr-2" />
                Create AI Agent
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/meetings">
                <VideoIcon className="mr-2" />
                Schedule Practice
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};