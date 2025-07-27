'use client';

import { useQuery } from 'convex/react';
import { api } from '../convex/_generated/api';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export default function Home() {
  const trends = useQuery(api.trends.get);

  return (
    <div className="min-h-screen bg-background">
      <main className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="text-center mb-12">
          <h1 className="text-6xl font-bold mb-4 bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
            KICKS AI
          </h1>
          <p className="text-xl text-muted-foreground">Concept Launchpad</p>
          <p className="mt-4 text-lg">
            Where sneaker innovation meets artificial intelligence
          </p>
        </div>

        <div className="flex justify-center mb-12">
          <Button size="lg" className="bg-black hover:bg-gray-800 text-white">
            Generate New Concept
          </Button>
        </div>

        <div>
          <h2 className="text-3xl font-semibold mb-6">Trending Now</h2>
          {trends === undefined ? (
            <div className="flex justify-center">
              <p className="text-muted-foreground">Loading trends...</p>
            </div>
          ) : trends.length === 0 ? (
            <Card>
              <CardContent className="pt-6">
                <p className="text-center text-muted-foreground">
                  No trends found. Start by adding some trending concepts!
                </p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {trends.map((trend: any) => (
                <Card
                  key={trend._id}
                  className="hover:shadow-lg transition-shadow"
                >
                  <CardHeader>
                    <CardTitle>{trend.name}</CardTitle>
                    <CardDescription>
                      {trend.concepts?.length || 0} concepts
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex gap-2 flex-wrap">
                      <Badge variant="secondary">AI Generated</Badge>
                      <Badge variant="outline">Trending</Badge>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
