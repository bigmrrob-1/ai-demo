'use client';

import { useQuery } from 'convex/react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { api } from '../convex/_generated/api';

export default function Home() {
  const trends = useQuery(api.trends.get);

  return (
    <div className="min-h-screen bg-background">
      <main className="container mx-auto max-w-6xl px-4 py-8">
        <div className="mb-12 text-center">
          <h1 className="mb-4 bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text font-bold text-6xl text-transparent">
            KICKS AI
          </h1>
          <p className="text-muted-foreground text-xl">Concept Launchpad</p>
          <p className="mt-4 text-lg">
            Where sneaker innovation meets artificial intelligence
          </p>
        </div>

        <div className="mb-12 flex justify-center">
          <Button className="bg-black text-white hover:bg-gray-800" size="lg">
            Generate New Concept
          </Button>
        </div>

        <div>
          <h2 className="mb-6 font-semibold text-3xl">Trending Now</h2>
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
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {trends.map((trend: any) => (
                <Card
                  className="transition-shadow hover:shadow-lg"
                  key={trend._id}
                >
                  <CardHeader>
                    <CardTitle>{trend.name}</CardTitle>
                    <CardDescription>
                      {trend.concepts?.length || 0} concepts
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
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
