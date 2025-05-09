"use client";

import React from 'react';
import {
  Button,
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
  Heading,
  Paragraph,
  Lead,
  Small,
  Muted,
  Blockquote
} from '@/app/components/ui';

export function UIDemo() {
  return (
    <div className="container mx-auto p-md space-y-xl">
      <section>
        <Heading level={2}>UI Component Library</Heading>
        <Lead>This demo showcases the new UI components built with Tailwind CSS.</Lead>
      </section>

      <section className="space-y-lg">
        <Heading level={3}>Typography</Heading>
        <div className="space-y-md">
          <Heading level={1}>Heading 1</Heading>
          <Heading level={2}>Heading 2</Heading>
          <Heading level={3}>Heading 3</Heading>
          <Heading level={4}>Heading 4</Heading>
          <Heading level={5}>Heading 5</Heading>
          <Heading level={6}>Heading 6</Heading>
          
          <Lead>This is a lead paragraph that stands out from regular text.</Lead>
          <Paragraph>This is a standard paragraph with regular styling. It's designed to be easy to read while matching the overall design system.</Paragraph>
          <Small>This is smaller text, often used for captions or supporting information.</Small>
          <Muted>This is muted text, ideal for less important information.</Muted>
          
          <Blockquote>
            "The key to consistent design is using a shared design system that enforces standards across the application."
          </Blockquote>
        </div>
      </section>

      <section className="space-y-lg">
        <Heading level={3}>Buttons</Heading>
        <div className="flex flex-wrap gap-md">
          <Button>Default Button</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="destructive">Destructive</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="link">Link Button</Button>
        </div>
        
        <div className="flex flex-wrap gap-md">
          <Button size="sm">Small</Button>
          <Button>Default Size</Button>
          <Button size="lg">Large</Button>
        </div>
      </section>

      <section className="space-y-lg">
        <Heading level={3}>Cards</Heading>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-lg">
          <Card>
            <CardHeader>
              <CardTitle>Basic Card</CardTitle>
              <CardDescription>A simple card with title and description</CardDescription>
            </CardHeader>
            <CardContent>
              <Paragraph>This is the main content area of the card.</Paragraph>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Card with Footer</CardTitle>
              <CardDescription>Includes actions in the footer</CardDescription>
            </CardHeader>
            <CardContent>
              <Paragraph>Cards can include various types of content.</Paragraph>
            </CardContent>
            <CardFooter className="justify-between">
              <Small>Last updated: Today</Small>
              <Button variant="outline" size="sm">View</Button>
            </CardFooter>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Interactive Card</CardTitle>
              <CardDescription>Full-featured component</CardDescription>
            </CardHeader>
            <CardContent>
              <Paragraph>Cards are versatile containers for related content.</Paragraph>
            </CardContent>
            <CardFooter className="flex justify-end space-x-md">
              <Button variant="ghost" size="sm">Cancel</Button>
              <Button size="sm">Submit</Button>
            </CardFooter>
          </Card>
        </div>
      </section>
    </div>
  );
} 